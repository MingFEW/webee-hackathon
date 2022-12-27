import { MachineField } from './machine-field'

export type MachineType<Fields extends MachineField[] = MachineField[]> = {
  id: string
  name: string
  createdAt: Date
  labeledAs: Fields[number]['key']
  fields: Fields
}
