import { MachineTypesState } from './machine-types/types'
import { MachinesState } from './machines/types'

export type RootState = {
  machineTypes: MachineTypesState
  machines: MachinesState
}
