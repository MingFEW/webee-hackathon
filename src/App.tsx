import 'react-native-gesture-handler'
import 'react-native-get-random-values'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { en, registerTranslation } from 'react-native-paper-dates'
import { store, persistor } from '@/store'
import ApplicationNavigator from '@/navigators/Application'
import './translations'
import Variables from './theme/Variables'

registerTranslation('en', en)

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Variables.Colors.primary,
  },
}

const App = () => (
  <Provider store={store}>
    {/**
     * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
     * and saved to redux.
     * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
     * for example `loading={<SplashScreen />}`.
     * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
     */}
    <PersistGate loading={null} persistor={persistor}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <ApplicationNavigator />
        </SafeAreaProvider>
      </PaperProvider>
    </PersistGate>
  </Provider>
)

export default App
