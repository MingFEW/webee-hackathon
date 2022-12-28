import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { CommonParams } from '@/theme/theme'

export default function <C>({ Colors, FontSize, Layout }: CommonParams<C>) {
  const base: ViewStyle = {
    borderRadius: 0,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    ...Layout.rowCenter,
  }
  const baseText: TextStyle = {
    color: Colors.white,
    fontWeight: '700',
    fontSize: FontSize.regular,
  }
  const rounded: ViewStyle = {
    ...base,
    borderRadius: 4,
  }

  return StyleSheet.create({
    base,
    baseText,
    outline: {
      ...base,
      backgroundColor: Colors.primary,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: Colors.primary,
      borderColor: Colors.primary,
      borderWidth: 2,
    },
    outlineText: {
      ...baseText,
      color: Colors.white,
    },
    rounded,
  })
}
