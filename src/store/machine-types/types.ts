import { MachineField } from '@/models/machine-field'
import { MachineType } from '@/models/machine-type'

export type MachineTypesState = {
  machineTypes: MachineType[]
}

export type MachineTypeAddedPayload = {
  name: string
}

export type MachineTypeNameUpdatedPayload = {
  typeId: string
  newName: string
}

export type MachineTypeLabeledAsUpdatedPayload = {
  typeId: string
  labeledAs: string
}

export type MachineTypeFieldAddedPayload = {
  typeId: string
}

export type MachineTypeFieldUpdatedPayload = {
  typeId: string
  field: MachineField
}

export type MachineTypeFieldRemovedPayload = {
  typeId: string
  fieldId: string
}
