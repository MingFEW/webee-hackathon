import React, { useEffect } from 'react'
import { Appbar, Button, Card, Divider, Text, TextInput } from 'react-native-paper'

import { useTheme } from '@/hooks'
import { FlatList, Pressable, View } from 'react-native'
import { Screen } from '@/components/screen'
import { MachineCard } from '@/components/machine-card'

export const MachinesScreen: React.FC = () => {
  const { Common, Fonts, Gutters, Layout } = useTheme()

  return (
    <Screen headerTitle="Machines by Types">
      <View style={[Gutters.regularHMargin, Gutters.regularVMargin]}>
        <View style={[Layout.rowHCenter, Layout.justifyContentBetween, Gutters.regularBPadding]}>
          <Text style={Fonts.titleBig}>Cranes</Text>
          <Pressable style={Common.button.base}>
            <Text style={Common.button.baseText}>+ MACHINE</Text>
          </Pressable>
        </View>
        <Divider />
      </View>

      <FlatList
        data={[1, 2, 3]}
        renderItem={({ item, index }) => <MachineCard />}
        keyExtractor={(_, index: number) => `${index}`}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  )
}
