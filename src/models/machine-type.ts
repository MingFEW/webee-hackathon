import { MachineField } from './machine-field'

export type MachineType<Fields extends MachineField[] = MachineField[]> = {
  id: string
  name: string
  createdAt: number
  labeledAs: Fields[number]['id']
  fields: Fields
}
