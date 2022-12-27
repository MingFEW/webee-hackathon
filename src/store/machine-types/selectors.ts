import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../types'

import { initialState } from './index'
import { MachineTypesState } from './types'

const selectSlice = (state: RootState): MachineTypesState => state.machineTypes ?? initialState

export const selectAllMachineTypes = createSelector([selectSlice], (state) => state.machineTypes)

export const selectMachineType = (id: string) =>
  createSelector([selectAllMachineTypes], (machineTypes) =>
    machineTypes.find((type) => type.id === id),
  )
