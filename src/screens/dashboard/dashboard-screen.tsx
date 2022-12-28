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
import { Empty } from '@/components/empty'

import { DashboardScreenProps } from './dashboard-screen.props'

export const DashboardScreen: React.FC<DashboardScreenProps> = () => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()
  const machineTypes: MachineType[] = useSelector(selectAllMachineTypes)
  const allMachines: Machine[] = useSelector(selectAllMachines)

  return (
    <Screen headerTitle="Dashboard">
      {machineTypes?.length ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {machineTypes.map((machineType: MachineType, index: number) => {
            const allMachinesByTypeId = allMachines.filter(
              (m: Machine) => m.categoryId === machineType.id,
            )
            return (
              <React.Fragment key={machineType.id}>
                <View style={[Gutters.regularHMargin, Gutters.regularVMargin]}>
                  <View
                    style={[
                      Layout.rowHCenter,
                      Layout.justifyContentBetween,
                      Gutters.regularBPadding,
                    ]}
                  >
                    <Text style={[Fonts.textBig, Fonts.textMedium]}>
                      {machineType.name || `Machine Type #${index + 1}`}
                    </Text>
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
                  allMachinesByTypeId.map((machine: Machine, i: number) => (
                    <MachineCard
                      key={machine.id}
                      machineType={machineType}
                      machine={machine}
                      machineIndex={i}
                    />
                  ))
                ) : (
                  <Empty icon="format-list-text" description="No items to display" />
                )}
              </React.Fragment>
            )
          })}
        </ScrollView>
      ) : (
        <Empty
          icon="format-list-text"
          title="No Machine!"
          description="Please create type first."
        />
      )}
    </Screen>
  )
}
