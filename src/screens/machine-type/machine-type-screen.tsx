import React from 'react'
import { Divider, Text } from 'react-native-paper'

import { useTheme } from '@/hooks'
import { FlatList, Pressable, View } from 'react-native'
import { Screen } from '@/components/screen'
import { MachineCard } from '@/components/machine-card'
import { MachineType } from '@/models/machine-type'
import { useDispatch, useSelector } from 'react-redux'
import { selectMachineType } from '@/store/machine-types/selectors'
import { selectAllMachines } from '@/store/machines/selectors'

import { MachineTypeScreenProps } from './machine-type-screen.props'
import { machinesActions } from '@/store/machines/actions'

export const MachineTypeScreen: React.FC<MachineTypeScreenProps> = (props) => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const {
    route: { params },
  } = props

  const machineType = useSelector(selectMachineType(params.machineTypeId)) as MachineType
  const allMachines = useSelector(selectAllMachines)

  return (
    <Screen headerTitle={machineType.name}>
      <View style={[Gutters.regularHMargin, Gutters.regularVMargin]}>
        <View style={[Layout.rowHCenter, Layout.justifyContentBetween, Gutters.regularBPadding]}>
          <Text style={Fonts.titleBig}>{machineType.name}</Text>
          <Pressable
            style={Common.button.base}
            onPress={() => dispatch(machinesActions.machineAdded({ type: machineType }))}
          >
            <Text style={Common.button.baseText}>+ MACHINE</Text>
          </Pressable>
        </View>
        <Divider />
      </View>
      <FlatList
        data={allMachines.filter((m) => m.categoryId === params.machineTypeId) as any}
        renderItem={({ item, index }: { item: MachineType; index: number }) => (
          <MachineCard machine={item as any} machineType={machineType} machineIndex={index} />
        )}
        keyExtractor={(item: MachineType) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={[Gutters.smallVMargin, Layout.rowCenter]}>
            <Text style={Fonts.textRegular}>No items to display</Text>
          </View>
        }
      />
    </Screen>
  )
}
