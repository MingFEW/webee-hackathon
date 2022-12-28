import { all } from 'redux-saga/effects'
import { machinesSaga } from './machines/saga'

export default function* rootSaga() {
  yield all([machinesSaga()])
}
