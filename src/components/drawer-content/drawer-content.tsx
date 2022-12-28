import React, { memo, useCallback, useState } from 'react'
import { Pressable, View } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { selectAllMachineTypes } from '@/store/machine-types/selectors'
import { MachineType } from '@/models/machine-type'
import { NavigatorParamList } from '@/navigators/types'
import { useTheme } from '@/hooks'

const DrawerContent: React.FC<DrawerContentComponentProps> = memo((props) => {
  const { Common, Fonts, Gutters, Colors } = useTheme()
  const navigation = useNavigation<NavigationProp<NavigatorParamList>>()
  const machineTypes: MachineType[] = useSelector(selectAllMachineTypes)
  const { state, navigation: drawerNavigation } = props

  const [subItemIndex, setSubItemIndex] = useState<number>()

  const onNavigate = useCallback(
    (routeName: keyof NavigatorParamList, params?: any): void => {
      navigation.navigate(routeName, params)
      drawerNavigation.closeDrawer()
    },
    [navigation, drawerNavigation],
  )

  return (
    <DrawerContentScrollView>
      {state.routes.map((o, i: number) => {
        const isActive = state.index === i

        if (o.name === 'MachineType') {
          return (
            <View key={o.key}>
              <Divider style={Gutters.regularVMargin} />
              <View style={Common.drawerItem}>
                <Text style={Fonts.textBoldRegular}>Machines by Types</Text>
              </View>
              <View style={Gutters.regularLMargin}>
                {machineTypes.map((item: MachineType, index: number) => (
                  <Pressable
                    style={[
                      Common.drawerItem,
                      isActive && subItemIndex === index
                        ? Common.backgroundPrimary50
                        : Common.backgroundReset,
                    ]}
                    key={item.id}
                    onPress={() => {
                      onNavigate(
                        o.name as keyof NavigatorParamList,
                        item.id ? { machineTypeId: item.id } : {},
                      )
                      setSubItemIndex(index)
                    }}
                  >
                    <Text style={Fonts.textBoldRegular}>{item.name || `Unnamed machine type`}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )
        }
        return (
          <Pressable
            key={i}
            onPress={() => {
              onNavigate(o.name as keyof NavigatorParamList)
            }}
          >
            <View
              style={[
                Common.drawerItem,
                isActive ? Common.backgroundPrimary50 : Common.backgroundReset,
              ]}
            >
              <Icon
                color={isActive ? Colors.primary : Colors.text}
                size={24}
                name={o.name === 'Dashboard' ? 'view-dashboard' : 'application-edit'}
                style={Gutters.smallRMargin}
              />
              <Text style={Fonts.textBoldRegular}>{o.name}</Text>
            </View>
          </Pressable>
        )
      })}
    </DrawerContentScrollView>
  )
})

export default DrawerContent
