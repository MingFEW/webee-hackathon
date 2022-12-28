import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@/hooks'
import { navigationRef } from './utils'

// Screens
import { ManageTypesScreen } from '@/screens/manage-types/manage-types-screen'
import { DashboardScreen } from '@/screens/dashboard/dashboard-screen'
import { MachineTypeScreen } from '@/screens/machine-type/machine-type-screen'
import { DrawerContent } from '@/components/drawer-content'

import { NavigatorParamList } from './types'

const Stack = createStackNavigator<NavigatorParamList>()
const Drawer = createDrawerNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, NavigationTheme } = useTheme()
  const insets = useSafeAreaInsets()
  const { colors } = NavigationTheme

  return (
    <View style={[Layout.fill, { backgroundColor: colors.card, paddingBottom: insets.bottom }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <Drawer.Navigator
          initialRouteName="Dashboard"
          screenOptions={{ headerShown: false }}
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="ManageTypes" component={ManageTypesScreen} />
          <Stack.Screen name="MachineType" component={MachineTypeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default ApplicationNavigator
