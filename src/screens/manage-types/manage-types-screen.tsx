import React from 'react'
import { Text } from 'react-native-paper'
import { FlatList, Pressable, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { useTheme } from '@/hooks'
import { selectAllMachineTypes } from '@/store/machine-types/selectors'
import { machineTypesActions } from '@/store/machine-types/actions'
import { machinesActions } from '@/store/machines/actions'
import { MachineType } from '@/models/machine-type'

import { Screen } from '@/components/screen'
import { FormCard } from './components/form-card'
import { Empty } from '@/components/empty'

import { ManageTypesScreenProps } from './manage-types-screen.props'

export const ManageTypesScreen: React.FC<ManageTypesScreenProps> = () => {
  const { Layout, Common, Gutters } = useTheme()
  const machineTypes: MachineType[] = useSelector(selectAllMachineTypes)
  const dispatch = useDispatch()

  return (
    <Screen headerTitle="Manage Types">
      <FlatList
        data={machineTypes}
        contentContainerStyle={!machineTypes?.length ? Layout.fill : {}}
        renderItem={({ item, index }: { item: MachineType; index: number }) => (
          <FormCard
            data={item}
            machineTypeIndex={index}
            onRemove={() => {
              dispatch(machineTypesActions.machineTypeRemoved(item.id))
              dispatch(machinesActions.allMachinesOfSpecificTypeRemoved({ typeId: item.id }))
            }}
          />
        )}
        keyExtractor={(item: MachineType) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Empty icon="emoticon-sad-outline" description="No Type." />}
      />

      <View style={[Gutters.regularHMargin]}>
        <Pressable
          style={Common.button.rounded}
          onPress={() => {
            dispatch(machineTypesActions.machineTypeAdded())
          }}
        >
          <Text style={Common.button.baseText}>+ CREATE TYPE</Text>
        </Pressable>
      </View>
    </Screen>
  )
}
