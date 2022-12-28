import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { generateEmptyMachineField, generateEmptyMachineType } from './helpers'
import {
  MachineTypeFieldAddedPayload,
  MachineTypeFieldRemovedPayload,
  MachineTypeFieldUpdatedPayload,
  MachineTypeLabeledAsUpdatedPayload,
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
    machineTypeAdded(state) {
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
    machineTypeLabeledAsUpdated(state, action: PayloadAction<MachineTypeLabeledAsUpdatedPayload>) {
      const { typeId, labeledAs } = action.payload

      const machine = state.machineTypes.find((t) => t.id === typeId)
      // const labelExisted = machine?.fields.map((f) => f.id).includes(labeledAs)

      if (machine) {
        machine.labeledAs = labeledAs as string
      }
    },
    machineTypeRemoved(state, action: PayloadAction<string>) {
      state.machineTypes = state.machineTypes.filter((t) => t.id !== action.payload)
    },
    machineTypeFieldAdded(state, action: PayloadAction<MachineTypeFieldAddedPayload>) {
      const { typeId, fieldType } = action.payload

      const machineType = state.machineTypes.find((t) => t.id === typeId)

      if (machineType) {
        const newField = generateEmptyMachineField(fieldType)
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

      if (fieldId === machineType?.labeledAs) {
        machineType.labeledAs = ''
      }
    },
  },
})
