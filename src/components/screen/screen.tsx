import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { DrawerActions, useNavigation } from '@react-navigation/native'

import { useTheme } from '@/hooks'

interface ScreenProps {
  headerTitle: string
  children: React.ReactNode
}

const Screen: React.FC<ScreenProps> = (props) => {
  const { Layout, Fonts, Colors } = useTheme()
  const navigation = useNavigation()
  const { children, headerTitle } = props

  const onToggleDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer())
  }, [navigation])

  return (
    <View style={[Layout.fill]}>
      <Appbar.Header>
        <Appbar.Action icon="menu" size={32} color={Colors.primary} onPress={onToggleDrawer} />
        <Appbar.Content title={headerTitle} titleStyle={[Fonts.appTitle]} />
      </Appbar.Header>

      {children}
    </View>
  )
}

export default Screen
