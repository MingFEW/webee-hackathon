import React, { memo, useCallback } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { useTheme } from '@/hooks'
import { MachineType } from '@/models/machine-type'
import { selectAllMachineTypes } from '@/store/machine-types/selectors'
import { NavigatorParamList } from '@/navigators/types'

const DrawerContent: React.FC<DrawerContentComponentProps> = memo((props) => {
  const { Gutters } = useTheme()
  const navigation = useNavigation<NavigationProp<NavigatorParamList>>()
  const machineTypes: MachineType[] = useSelector(selectAllMachineTypes)
  const { state, navigation: drawerNavigation } = props

  const onNavigate = useCallback(
    (routeName: keyof NavigatorParamList, params?: any): void => {
      navigation.navigate(routeName, params)
      drawerNavigation.closeDrawer()
    },
    [navigation, drawerNavigation],
  )

  return (
    <View style={[Gutters.regularHPadding, Gutters.regularVPadding]}>
      {state.routes.map((o) => {
        if (o.name === 'MachineType') {
          return (
            <View key={o.key}>
              <Text>Marchines by Types</Text>
              {machineTypes.map((item: MachineType) => (
                <Button
                  key={item.id}
                  onPress={() =>
                    onNavigate(
                      o.name as keyof NavigatorParamList,
                      item.id ? { machineTypeId: item.id } : {},
                    )
                  }
                >
                  <Text>{item.name}</Text>
                </Button>
              ))}
            </View>
          )
        }
        return (
          <Button key={o.key} onPress={() => onNavigate(o.name as keyof NavigatorParamList)}>
            <Text>{o.name}</Text>
          </Button>
        )
      })}
    </View>
  )
})

export default DrawerContent
