import React from 'react'
import { Divider, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { Pressable, ScrollView, View } from 'react-native'

import { useTheme } from '@/hooks'
import { selectAllMachineTypes } from '@/store/machine-types/selectors'
import { selectAllMachines } from '@/store/machines/selectors'
import { machinesActions } from '@/store/machines/actions'

import { MachineType } from '@/models/machine-type'
import { Machine } from '@/models/machine'

// Components
import { Screen } from '@/components/screen'
import { MachineCard } from '@/components/machine-card'

import { DashboardScreenProps } from './dashboard-screen.props'

export const DashboardScreen: React.FC<DashboardScreenProps> = () => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()
  const machineTypes: MachineType[] = useSelector(selectAllMachineTypes)
  const allMachines: Machine[] = useSelector(selectAllMachines)

  return (
    <Screen headerTitle="Dashboard">
      <ScrollView showsVerticalScrollIndicator={false}>
        {machineTypes.map((machineType: MachineType) => {
          const allMachinesByTypeId = allMachines.filter(
            (m: Machine) => m.categoryId === machineType.id,
          )
          return (
            <React.Fragment key={machineType.id}>
              <View style={[Gutters.regularHMargin, Gutters.regularVMargin]}>
                <View
                  style={[Layout.rowHCenter, Layout.justifyContentBetween, Gutters.regularBPadding]}
                >
                  <Text style={Fonts.titleBig}>{machineType.name}</Text>
                  <Pressable
                    style={Common.button.rounded}
                    onPress={() => dispatch(machinesActions.machineAdded({ type: machineType }))}
                  >
                    <Text style={Common.button.baseText}>+ MACHINE</Text>
                  </Pressable>
                </View>
                <Divider />
              </View>
              {allMachinesByTypeId?.length ? (
                allMachinesByTypeId.map((machine: Machine, index: number) => (
                  <MachineCard
                    key={machine.id}
                    machineType={machineType}
                    machine={machine}
                    machineIndex={index}
                  />
                ))
              ) : (
                <View style={[Gutters.smallVMargin, Layout.rowCenter]}>
                  <Text style={Fonts.textRegular}>No items to display</Text>
                </View>
              )}
            </React.Fragment>
          )
        })}
      </ScrollView>
    </Screen>
  )
}
