import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { machineTypesSlice } from './machine-types'
import { machinesSlice } from './machines'
import rootSaga from './sagas'
import { RootState } from './types'

const reducers = combineReducers<RootState>({
  machineTypes: machineTypesSlice.reducer,
  machines: machinesSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['machineTypes', 'machines'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default
      middlewares.push(createDebugger())
    }

    return [...middlewares, sagaMiddleware]
  },
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

sagaMiddleware.run(rootSaga)

export { store, persistor }
