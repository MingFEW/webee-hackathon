import React from 'react'
import { Button } from 'react-native-paper'
import { FlatList, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { useTheme } from '@/hooks'
import { selectAllMachineTypes } from '@/store/machine-types/selectors'
import { machineTypesActions } from '@/store/machine-types/actions'
import { MachineType } from '@/models/machine-type'

import { Screen } from '@/components/screen'
import { CardItem } from './components/card-item'

export const ManageTypesScreen: React.FC = () => {
  const { Common, Gutters } = useTheme()
  const machineTypes: MachineType[] = useSelector(selectAllMachineTypes)
  const dispatch = useDispatch()

  return (
    <Screen headerTitle="Manage Types">
      <FlatList
        data={machineTypes}
        renderItem={({ item }: { item: MachineType }) => (
          <CardItem
            data={item}
            onSetTitle={() => {}}
            onAddField={() => {}}
            onRemove={() => dispatch(machineTypesActions.machineTypeRemoved(item.id))}
          />
        )}
        keyExtractor={(item: MachineType) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <View style={[Gutters.regularHMargin]}>
        <Button
          style={Common.button.base}
          labelStyle={Common.button.baseText}
          onPress={() => {
            dispatch(machineTypesActions.machineTypeAdded())
          }}
        >
          + CREATE TYPE
        </Button>
      </View>
    </Screen>
  )
}
