import React, { memo, useCallback } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'

import { useTheme } from '@/hooks'

const DrawerContent: React.FC<DrawerContentComponentProps> = memo((props) => {
  const { Gutters } = useTheme()
  const navigation = useNavigation()
  const { state, navigation: drawerNavigation } = props

  const onNavigate = useCallback(
    (routeName: string): void => {
      navigation.navigate(routeName as never)
      drawerNavigation.closeDrawer()
    },
    [navigation, drawerNavigation],
  )

  return (
    <View style={[Gutters.regularHPadding, Gutters.regularVPadding]}>
      {state.routes.map((o) => {
        return (
          <Button key={o.key} onPress={() => onNavigate(o.name)}>
            <Text>{o.name}</Text>
          </Button>
        )
      })}
    </View>
  )
})

export default DrawerContent
