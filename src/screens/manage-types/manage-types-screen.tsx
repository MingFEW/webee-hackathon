import React from 'react'
import { Text } from 'react-native-paper'
import { FlatList, Pressable, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { useTheme } from '@/hooks'
import { selectAllMachineTypes } from '@/store/machine-types/selectors'
import { machineTypesActions } from '@/store/machine-types/actions'
import { MachineType } from '@/models/machine-type'

import { Screen } from '@/components/screen'
import { FormCard } from './components/form-card'
import { machinesActions } from '@/store/machines/actions'

export const ManageTypesScreen: React.FC = () => {
  const { Common, Gutters } = useTheme()
  const machineTypes: MachineType[] = useSelector(selectAllMachineTypes)
  const dispatch = useDispatch()

  return (
    <Screen headerTitle="Manage Types">
      <FlatList
        data={machineTypes}
        renderItem={({ item }: { item: MachineType }) => (
          <FormCard
            data={item}
            onRemove={() => {
              dispatch(machineTypesActions.machineTypeRemoved(item.id))
              dispatch(machinesActions.allMachinesOfSpecificTypeRemoved({ typeId: item.id }))
            }}
          />
        )}
        keyExtractor={(item: MachineType) => item.id}
        showsVerticalScrollIndicator={false}
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
