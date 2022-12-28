import React, { memo } from 'react'
import { View, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme } from '@/hooks'

interface EmptyProps {
  title?: string
  icon?: string
  description: string
  style?: ViewStyle
}

const Empty: React.FC<EmptyProps> = memo((props) => {
  const { Gutters, Layout, Fonts, Colors } = useTheme()
  const { icon, title, description, style } = props
  return (
    <View style={[Layout.colCenter, Layout.fill, Gutters.smallVMargin, style]}>
      {icon && <Icon name={icon} size={24} style={Gutters.tinyBMargin} />}
      {title && <Text style={[Fonts.textRegular, Fonts.textMedium]}>{title}</Text>}
      <Text style={[Fonts.textRegular, { color: Colors.gray }]}>{description}</Text>
    </View>
  )
})

export default Empty
