import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={() => <></>} />
    </Tab.Navigator>
  )
}

export default MainNavigator
