import React, { memo } from 'react'
import { View } from 'react-native'
import { List } from 'react-native-paper'

import { MachineField } from '@/models/machine-field'
import { useTheme } from '@/hooks'

import { BottomSheet } from '@/components/bottom-sheet'

interface SetTitleBottomSheetProps {
  isVisbile: boolean
  onDismiss: () => void
  fields: MachineField[]
  onFieldSelect: (fieldId: string) => void
}

export const SetTitleBottomSheet: React.FC<SetTitleBottomSheetProps> = memo((props) => {
  const { Layout, Colors } = useTheme()
  const { isVisbile, onDismiss, fields, onFieldSelect } = props
  return (
    <BottomSheet isVisible={isVisbile} onDismiss={onDismiss} onBackdropPress={onDismiss}>
      <View style={Layout.fullWidth}>
        <List.Section>
          <List.Subheader>Set title</List.Subheader>
          {fields
            .filter((f) => f.type === 'text')
            .map((field: MachineField) => (
              <List.Item
                key={field.id}
                title={field.label}
                left={(iconProps) => (
                  <List.Icon
                    {...iconProps}
                    icon={
                      field.type === 'text'
                        ? 'format-color-text'
                        : field.type === 'number'
                        ? 'numeric'
                        : field.type === 'checkbox'
                        ? 'checkbox-marked-outline'
                        : 'calendar'
                    }
                    color={Colors.primary}
                  />
                )}
                onPress={() => {
                  onFieldSelect(field.id)
                  onDismiss()
                }}
              />
            ))}
        </List.Section>
      </View>
    </BottomSheet>
  )
})
