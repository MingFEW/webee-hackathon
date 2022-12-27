/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native'
import buttonStyles from './components/Buttons'
import { CommonParams } from './theme'

export default function <C>({ Colors, MetricsSizes, ...args }: CommonParams<C>) {
  return {
    button: buttonStyles({ Colors, MetricsSizes, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      card: {
        backgroundColor: Colors.white,
        borderRadius: 0,
        padding: 10,
      },
      inputField: {
        backgroundColor: Colors.white,
        borderColor: Colors.primary,
        borderRadius: 4,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
      },
      textInput: {
        backgroundColor: Colors.white,
      },
    }),
  }
}
