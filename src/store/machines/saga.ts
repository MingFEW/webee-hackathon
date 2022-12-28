import { Machine } from '@/models/machine'
import { MachineType } from '@/models/machine-type'
import { all, put, select, takeLatest } from 'redux-saga/effects'
import { machinesSlice } from '.'
import { machineTypesSlice } from '../machine-types'
import { selectMachineType } from '../machine-types/selectors'
import { getDefaultFieldValue } from './helpers'
import { selectAllMachinesByTypeId } from './selectors'

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

export function* addSpecificFieldOfAllMachineSaga(
  action: ReturnType<typeof machineTypesSlice.actions.machineTypeFieldAdded>,
) {
  const allMachinesByTypeId: Machine[] = yield select(
    selectAllMachinesByTypeId(action.payload.typeId),
  )
  const machinesTypesById: MachineType = yield select(selectMachineType(action.payload.typeId))

  for (const machine of allMachinesByTypeId) {
    for (const field of machinesTypesById.fields) {
      yield put(
        machinesSlice.actions.machineFieldAdded({
          machineId: machine.id,
          field: {
            fieldId: field.id,
            value: getDefaultFieldValue(field.type),
          },
        }),
      )
    }
  }
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

export function* watchMachineTypeFieldAdded() {
  yield takeLatest(
    machineTypesSlice.actions.machineTypeFieldAdded.type,
    addSpecificFieldOfAllMachineSaga,
  )
}

export function* machinesSaga() {
  yield all([
    watchMachineTypeRemoved(),
    watchMachineTypeFieldRemoved(),
    watchMachineTypeFieldAdded(),
  ])
}
