import { Machine } from '@/models/machine'
import { MachineField } from '@/models/machine-field'
import { MachineType } from '@/models/machine-type'

export type MachinesState = {
  machines: Machine[]
}

export type MachineAddedPayload = {
  type: MachineType
}

export type MachineRemovedPayload = {
  machineId: string
}

export type AllMachineOfSpecificTypeRemovedPayload = {
  typeId: string
}

export type AllMachineSpecificFieldRemovedPayload = {
  fieldId: string
}

export type MachineFieldUpdatedPayload = {
  machineId: string
  fieldType: MachineField
  field: Machine['data'][number]
}
