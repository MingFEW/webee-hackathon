import React, { useEffect } from 'react'
import { Appbar, Button, Card, Divider, Text, TextInput } from 'react-native-paper'

import { useTheme } from '@/hooks'
import { FlatList, Pressable, View } from 'react-native'
import { Screen } from '@/components/screen'
import { MachineCard } from '@/components/machine-card'
import { MachineType } from '@/models/machine-type'
import { useSelector } from 'react-redux'
import { selectMachineType } from '@/store/machine-types/selectors'

import { MachineTypeScreenProps } from './machine-type-screen.props'

export const MachineTypeScreen: React.FC<MachineTypeScreenProps> = (props) => {
  const { Common, Fonts, Gutters, Layout } = useTheme()

  const {
    route: { params },
  } = props

  const { name: machineName } = useSelector(selectMachineType(params.machineTypeId)) as MachineType

  return (
    <Screen headerTitle={machineName}>
      <View style={[Gutters.regularHMargin, Gutters.regularVMargin]}>
        <View style={[Layout.rowHCenter, Layout.justifyContentBetween, Gutters.regularBPadding]}>
          <Text style={Fonts.titleBig}>{machineName}</Text>
          <Pressable style={Common.button.base}>
            <Text style={Common.button.baseText}>+ MACHINE</Text>
          </Pressable>
        </View>
        <Divider />
      </View>

      <FlatList
        data={[]}
        renderItem={({ item, index }) => <MachineCard />}
        keyExtractor={(_, index: number) => `${index}`}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  )
}
