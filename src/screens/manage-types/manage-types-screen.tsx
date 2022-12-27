import React from 'react'
import { Button } from 'react-native-paper'

import { useTheme } from '@/hooks'
import { FlatList, View } from 'react-native'
import { CardItem } from './components/card-item'
import { Screen } from '@/components/screen'

export const ManageTypesScreen: React.FC = () => {
  const { Common, Gutters } = useTheme()

  return (
    <Screen headerTitle="Manage Types">
      <FlatList
        data={[1]}
        renderItem={({ item, index }) => (
          <CardItem onSetTitle={() => {}} onAddField={() => {}} onRemove={() => {}} />
        )}
        keyExtractor={(_, index: number) => `${index}`}
        showsVerticalScrollIndicator={false}
      />

      <View style={[Gutters.regularHMargin]}>
        <Button style={Common.button.base} labelStyle={Common.button.baseText}>
          + CREATE TYPE
        </Button>
      </View>
    </Screen>
  )
}