import { StyleSheet } from 'react-native'
import { CommonParams } from '@/theme/theme'

export default function <C>({ Colors, Gutters, Layout }: CommonParams<C>) {
  const base = {
    ...Layout.center,
    ...Gutters.largeHPadding,
    height: 40,
    backgroundColor: Colors.primary,
  }
  const rounded = {
    ...base,
    borderRadius: 20,
  }

  return StyleSheet.create({
    base,
    outline: {
      ...base,
      backgroundColor: Colors.transparent,
      borderColor: Colors.primary,
      borderWidth: 2,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: Colors.transparent,
      borderColor: Colors.primary,
      borderWidth: 2,
    },
    rounded,
  })
}
