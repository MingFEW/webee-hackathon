import React from 'react'
import { Dimensions, Pressable, View, ViewStyle } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme } from '@/hooks'

interface BottomSheetProps {
  isVisible: boolean
  children: React.ReactNode
  onDismiss?: () => void
  onBackdropPress?: () => void
  style?: ViewStyle
  animationIn?: any
  animationOut?: any
}

const BottomSheet: React.FC<BottomSheetProps> = (props) => {
  const { Common, Layout } = useTheme()
  const {
    style,
    onDismiss,
    children,
    animationIn = 'slideInUp',
    animationOut = 'slideOutDown',
    ...rest
  } = props

  const modalStyles = [style, Layout.justifyContentEnd, { margin: 0 }]

  return (
    <ReactNativeModal
      {...rest}
      style={modalStyles}
      animationIn={animationIn}
      animationOut={animationOut}
      backdropOpacity={0.6}
      useNativeDriver
      useNativeDriverForBackdrop
      statusBarTranslucent
      deviceHeight={Dimensions.get('screen').height}
      backdropTransitionInTiming={200}
    >
      <View style={Common.bottomSheet}>
        {onDismiss && (
          <Pressable
            style={[Layout.row, Layout.alignItemsEnd, Layout.justifyContentEnd, Layout.fullWidth]}
            onPress={onDismiss}
          >
            <Icon name="close" size={32} />
          </Pressable>
        )}
        {children}
      </View>
    </ReactNativeModal>
  )
}

export default BottomSheet
