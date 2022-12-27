import React, { memo } from 'react'
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme } from '@/hooks'
import { View } from 'react-native'

interface Props {
  onSetTitle: () => void
  onAddField: () => void
  onRemove: () => void
}

export const CardItem: React.FC<Props> = memo((props) => {
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const { onSetTitle, onAddField, onRemove } = props

  const renderInputField = (): JSX.Element => {
    return (
      <View style={Layout.rowHCenter}>
        <View style={[Layout.fill, Gutters.smallRMargin]}>
          <TextInput
            style={[Common.textInput, Gutters.tinyVMargin]}
            mode="outlined"
            outlineColor={Colors.primary}
            activeOutlineColor={Colors.primary}
            label="Field"
            placeholder="Enter field name"
          />
        </View>
        <View style={Layout.rowCenter}>
          <Text style={[Gutters.tinyRMargin, Fonts.smallPrimaryText]}>Text</Text>
          <IconButton icon="trash-can-outline" size={24} />
        </View>
      </View>
    )
  }

  return (
    <Card style={[Common.card, Gutters.regularHMargin, Gutters.regularVMargin]}>
      <Text style={Fonts.cardTitle}>Show title of type</Text>
      <View style={Gutters.regularTMargin}>
        <TextInput
          style={[Common.textInput, Gutters.tinyVMargin]}
          outlineColor={Colors.primary}
          activeOutlineColor={Colors.primary}
          mode="outlined"
          label="Type name"
          placeholder="Enter type name"
        />

        {/* field list */}
        {renderInputField()}
        {renderInputField()}
        {renderInputField()}

        <Button
          style={[Common.button.base, Gutters.largeTMargin]}
          labelStyle={Common.button.baseText}
          mode="text"
          onPress={onSetTitle}
        >
          {`SET TITLE: {field name}`}
        </Button>
        <View style={[Layout.rowHCenter, Layout.justifyContentBetween, Gutters.largeTMargin]}>
          <Button
            style={Common.button.outline}
            labelStyle={Common.button.baseText}
            mode="outlined"
            onPress={onAddField}
          >
            + ADD FIELD
          </Button>
          <Button onPress={onRemove}>
            <View style={[Layout.rowHCenter]}>
              <Icon name="trash-can-outline" size={24} style={Gutters.smallRMargin} />
              <Text>REMOVE</Text>
            </View>
          </Button>
        </View>
      </View>
    </Card>
  )
})
