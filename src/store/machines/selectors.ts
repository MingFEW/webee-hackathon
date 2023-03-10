import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../types'

import { initialState } from './index'
import { MachinesState } from './types'

const selectSlice = (state: RootState): MachinesState => state.machines ?? initialState

export const selectAllMachines = createSelector([selectSlice], (state) => state.machines)
export const selectAllMachinesByTypeId = (typeId: string) =>
  createSelector([selectAllMachines], (allMachines) =>
    allMachines.filter((m) => m.categoryId === typeId),
  )
