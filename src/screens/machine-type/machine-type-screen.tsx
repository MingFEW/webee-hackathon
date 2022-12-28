import React from 'react'
import { Divider, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { FlatList, Pressable, View } from 'react-native'

import { useTheme } from '@/hooks'

import { MachineType } from '@/models/machine-type'
import { selectMachineType } from '@/store/machine-types/selectors'
import { selectAllMachines } from '@/store/machines/selectors'
import { machinesActions } from '@/store/machines/actions'

// Components
import { MachineCard } from '@/components/machine-card'
import { Screen } from '@/components/screen'
import { Empty } from '@/components/empty'

import { MachineTypeScreenProps } from './machine-type-screen.props'

export const MachineTypeScreen: React.FC<MachineTypeScreenProps> = (props) => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const {
    route: { params },
  } = props

  const machineType = useSelector(selectMachineType(params.machineTypeId)) as MachineType
  const allMachines = useSelector(selectAllMachines)

  return (
    <Screen headerTitle={machineType?.name}>
      <View style={[Gutters.regularHMargin, Gutters.regularVMargin]}>
        <View style={[Layout.rowHCenter, Layout.justifyContentBetween, Gutters.regularBPadding]}>
          <Text style={[Fonts.textBig, Fonts.textMedium]}>{machineType?.name}</Text>
          <Pressable
            style={Common.button.rounded}
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
        ListEmptyComponent={<Empty description="No items to display" />}
      />
    </Screen>
  )
}
