import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { generateEmptyMachine, parseMachineField } from './helpers'
import {
  AllMachineOfSpecificTypeRemovedPayload,
  AllMachineSpecificFieldRemovedPayload,
  MachineAddedPayload,
  MachineFieldAddedPayload,
  MachineFieldUpdatedPayload,
  MachineRemovedPayload,
  MachinesState,
} from './types'

export const initialState: MachinesState = {
  machines: [],
}

export const machinesSlice = createSlice({
  name: 'machines',
  initialState,
  reducers: {
    machineAdded(state, action: PayloadAction<MachineAddedPayload>) {
      const newMachine = generateEmptyMachine(action.payload.type)
      state.machines.push(newMachine)
    },
    machineRemoved(state, action: PayloadAction<MachineRemovedPayload>) {
      state.machines = state.machines.filter((m) => m.id !== action.payload.machineId)
    },
    allMachinesOfSpecificTypeRemoved(
      state,
      action: PayloadAction<AllMachineOfSpecificTypeRemovedPayload>,
    ) {
      state.machines = state.machines.filter((m) => m.categoryId !== action.payload.typeId)
    },
    allMachinesSpecificFieldRemoved(
      state,
      action: PayloadAction<AllMachineSpecificFieldRemovedPayload>,
    ) {
      state.machines = state.machines.map((m) => ({
        ...m,
        data: m.data.filter((f) => f.fieldId !== action.payload.fieldId),
      }))
    },
    machineFieldAdded(state, action: PayloadAction<MachineFieldAddedPayload>) {
      const { machineId, field } = action.payload

      const machine = state.machines.find((m) => m.id === machineId)
      const fieldIndex = machine?.data.findIndex((f) => f.fieldId === field.fieldId) ?? -1

      if (machine && fieldIndex < 0) {
        machine.data.push(field)
      }
    },
    machineFieldUpdated(state, action: PayloadAction<MachineFieldUpdatedPayload>) {
      const { machineId, fieldType, field } = action.payload

      const machine = state.machines.find((m) => m.id === machineId)
      const fieldIndex = machine?.data.findIndex((f) => f.fieldId === field.fieldId) ?? -1

      if (machine && fieldIndex >= 0) {
        machine.data[fieldIndex] = parseMachineField(fieldType, field)
      }
    },
  },
})
