import { StyleSheet } from 'react-native'
import buttonStyles from './components/Buttons'
import { CommonParams } from './theme'

export default function <C>({ Colors, MetricsSizes, Layout, ...args }: CommonParams<C>) {
  return {
    button: buttonStyles({ Colors, MetricsSizes, Layout, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundPrimary50: {
        backgroundColor: Colors.primary50,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      bottomSheet: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
        position: 'relative',
        ...Layout.colCenter,
      },
      card: {
        backgroundColor: Colors.white,
        borderRadius: 0,
        padding: 10,
      },
      drawerItem: {
        borderRadius: 8,
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 8,
        ...Layout.rowHCenter,
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
