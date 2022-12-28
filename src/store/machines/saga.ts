import { all, put, takeLatest } from 'redux-saga/effects'
import { machinesSlice } from '.'
import { machineTypesSlice } from '../machine-types'

export function* removeAllMachinesOfSpecificTypeSaga(
  action: ReturnType<typeof machineTypesSlice.actions.machineTypeRemoved>,
) {
  yield put(machinesSlice.actions.allMachinesOfSpecificTypeRemoved({ typeId: action.payload }))
}

export function* removeSpecificFieldOfAllMachineSaga(
  action: ReturnType<typeof machineTypesSlice.actions.machineTypeFieldRemoved>,
) {
  yield put(
    machinesSlice.actions.allMachinesSpecificFieldRemoved({ fieldId: action.payload.fieldId }),
  )
}

export function* watchMachineTypeRemoved() {
  yield takeLatest(
    machineTypesSlice.actions.machineTypeRemoved.type,
    removeAllMachinesOfSpecificTypeSaga,
  )
}

export function* watchMachineTypeFieldRemoved() {
  yield takeLatest(
    machineTypesSlice.actions.machineTypeFieldRemoved.type,
    removeSpecificFieldOfAllMachineSaga,
  )
}

export function* machinesSaga() {
  yield all([watchMachineTypeRemoved(), watchMachineTypeFieldRemoved()])
}
