import React from 'react'
import { SafeAreaView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useTheme } from '@/hooks'
// import MainNavigator from './Main'
import { navigationRef } from './utils'

// Screens
import { ManageTypesScreen } from '@/screens/manage-types/manage-types-screen'
import { DashboardScreen } from '@/screens/dashboard/dashboard-screen'
import { DrawerContent } from '@/components/drawer-content'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MachinesScreen } from '@/screens/machines/machines-screen'

const Stack = createStackNavigator()
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
            <Stack.Screen name="MachinesByTypes" component={MachinesScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default ApplicationNavigator
