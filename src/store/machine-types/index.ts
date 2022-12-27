import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { generateEmptyMachineField, generateEmptyMachineType } from './helpers'
import {
  MachineTypeFieldAddedPayload,
  MachineTypeFieldRemovedPayload,
  MachineTypeFieldUpdatedPayload,
  MachineTypeNameUpdatedPayload,
  MachineTypesState,
} from './types'

export const initialState: MachineTypesState = {
  machineTypes: [],
}

export const machineTypesSlice = createSlice({
  name: 'machineTypes',
  initialState,
  reducers: {
    machineTypeAdded(state, action: Action) {
      const newType = generateEmptyMachineType()
      state.machineTypes.push(newType)
    },
    machineTypeNameUpdated(state, action: PayloadAction<MachineTypeNameUpdatedPayload>) {
      const { typeId, newName } = action.payload

      const machine = state.machineTypes.find((t) => t.id === typeId)

      if (machine) {
        machine.name = newName
      }
    },
    machineTypeRemoved(state, action: PayloadAction<string>) {
      state.machineTypes = state.machineTypes.filter((t) => t.id !== action.payload)
    },
    machineTypeFieldAdded(state, action: PayloadAction<MachineTypeFieldAddedPayload>) {
      const { typeId } = action.payload

      const machineType = state.machineTypes.find((t) => t.id === typeId)
      const newField = generateEmptyMachineField()

      if (machineType) {
        machineType.fields.push(newField)
      }
    },
    machineTypeFieldUpdated(state, action: PayloadAction<MachineTypeFieldUpdatedPayload>) {
      const { typeId, field } = action.payload

      const machineType = state.machineTypes.find((t) => t.id === typeId)
      const fieldIndex = machineType?.fields.findIndex((f) => f.id === field.id) ?? -1

      if (machineType && fieldIndex >= 0) {
        machineType.fields[fieldIndex] = field
      }
    },
    machineTypeFieldRemoved(state, action: PayloadAction<MachineTypeFieldRemovedPayload>) {
      const { typeId, fieldId } = action.payload

      const machineType = state.machineTypes.find((t) => t.id === typeId)

      if (machineType) {
        machineType.fields = machineType.fields.filter((f) => f.id !== fieldId)
      }
    },
  },
})
