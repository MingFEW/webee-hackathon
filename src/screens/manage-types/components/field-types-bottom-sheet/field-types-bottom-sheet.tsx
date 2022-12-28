import React, { memo } from 'react'
import { View } from 'react-native'
import { List } from 'react-native-paper'

import { MachineFieldType } from '@/models/machine-field'
import { useTheme } from '@/hooks'

import { BottomSheet } from '@/components/bottom-sheet'

import { FIELD_TYPES } from './data'

interface FieldTypesBottomSheetProps {
  isVisbile: boolean
  onDismiss: () => void
  onFieldSelect: (field: MachineFieldType) => void
}

export const FieldTypesBottomSheet: React.FC<FieldTypesBottomSheetProps> = memo((props) => {
  const { Layout, Colors } = useTheme()
  const { isVisbile, onDismiss, onFieldSelect } = props
  return (
    <BottomSheet isVisible={isVisbile} onDismiss={onDismiss} onBackdropPress={onDismiss}>
      <View style={Layout.fullWidth}>
        <List.Section>
          <List.Subheader>Add Field</List.Subheader>
          {FIELD_TYPES.map((field) => (
            <List.Item
              key={field.value}
              title={field.label}
              left={(iconProps) => (
                <List.Icon {...iconProps} icon={field.icon} color={Colors.primary} />
              )}
              onPress={() => {
                onFieldSelect(field.value as MachineFieldType)
                onDismiss()
              }}
            />
          ))}
        </List.Section>
      </View>
    </BottomSheet>
  )
})
