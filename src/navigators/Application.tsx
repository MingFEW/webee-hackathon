import React from 'react'
import { SafeAreaView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { SafeAreaProvider } from 'react-native-safe-area-context'

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
  const { colors } = NavigationTheme

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
        <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
          <Drawer.Navigator
            initialRouteName="ManageTypes"
            screenOptions={{ headerShown: false }}
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Stack.Screen name="ManageTypes" component={ManageTypesScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="MachineType" component={MachineTypeScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default ApplicationNavigator
