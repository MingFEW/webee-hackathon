/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'
import { ThemeVariables } from './theme'

export default function ({ FontSize, Colors }: ThemeVariables) {
  return StyleSheet.create({
    appTitle: {
      color: Colors.text,
      fontSize: FontSize.big,
      fontWeight: '600',
    },
    cardTitle: {
      color: Colors.text,
      fontSize: FontSize.regular,
      fontWeight: '700',
      lineHeight: 19,
    },
    smallPrimaryText: {
      color: Colors.primary,
      fontSize: FontSize.small,
      fontWeight: '500',
      lineHeight: 14,
    },
    textBig: {
      color: Colors.text,
      fontSize: FontSize.big,
    },
    textBold: {
      fontWeight: '700',
    },
    textBoldRegular: {
      color: Colors.text,
      fontSize: FontSize.regular,
      fontWeight: 'bold',
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLarge: {
      color: Colors.text,
      fontSize: FontSize.large,
    },
    textLeft: {
      textAlign: 'left',
    },
    textMedium: {
      fontWeight: '600',
    },
    textRegular: {
      color: Colors.text,
      fontSize: FontSize.regular,
    },
    textRight: {
      textAlign: 'right',
    },
    textSmall: {
      color: Colors.text,
      fontSize: FontSize.small,
    },
  })
}
