import { MachineField, MachineFieldValue } from './machine-field'

export type Machine<F extends MachineField[] = MachineField[]> = {
  id: string
  categoryId: string
  createdAt: Date
  data: MachineFieldValue<F[number]>[]
}
