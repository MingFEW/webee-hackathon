import React, { memo } from 'react'
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Pressable, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { machineTypesActions } from '@/store/machine-types/actions'

import { useTheme } from '@/hooks'
import { MachineField } from '@/models/machine-field'
import { MachineType } from '@/models/machine-type'

interface Props {
  data: MachineType
  onSetTitle: () => void
  onAddField: () => void
  onRemove: () => void
}

export const CardItem: React.FC<Props> = memo((props) => {
  const dispatch = useDispatch()
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const { data, onSetTitle, onAddField, onRemove } = props
  const { id: machineTypeId, name, labeledAs, fields } = data

  const renderInputField = (field: MachineField): JSX.Element => {
    const { id: fieldId, type, label } = field
    return (
      <View key={fieldId} style={Layout.rowHCenter}>
        <View style={[Layout.fill, Gutters.smallRMargin]}>
          <TextInput
            style={[Common.textInput, Gutters.tinyVMargin]}
            mode="outlined"
            outlineColor={Colors.primary}
            activeOutlineColor={Colors.primary}
            label="Field"
            value={label}
            placeholder="Enter field name"
            onChangeText={(text: string) =>
              dispatch(
                machineTypesActions.machineTypeFieldUpdated({
                  typeId: machineTypeId,
                  field: {
                    ...field,
                    label: text,
                  },
                }),
              )
            }
          />
        </View>
        <Pressable
          onPress={() =>
            dispatch(
              machineTypesActions.machineTypeFieldRemoved({ typeId: machineTypeId, fieldId }),
            )
          }
        >
          <View style={Layout.rowCenter}>
            <Text style={[Gutters.tinyRMargin, Fonts.smallPrimaryText]}>{type}</Text>
            <IconButton icon="trash-can-outline" size={24} />
          </View>
        </Pressable>
      </View>
    )
  }

  return (
    <Card style={[Common.card, Gutters.regularHMargin, Gutters.regularVMargin]}>
      <Text style={Fonts.cardTitle}>{name || 'Marchine type'}</Text>
      <View style={Gutters.regularTMargin}>
        <TextInput
          style={[Common.textInput, Gutters.tinyVMargin]}
          outlineColor={Colors.primary}
          activeOutlineColor={Colors.primary}
          mode="outlined"
          label="Type name"
          value={name}
          placeholder="Enter type name"
          onChangeText={(text: string) =>
            dispatch(
              machineTypesActions.machineTypeNameUpdated({ typeId: machineTypeId, newName: text }),
            )
          }
        />
        {fields.map((field: MachineField) => renderInputField(field))}
        <Button
          style={[Common.button.base, Gutters.largeTMargin]}
          labelStyle={Common.button.baseText}
          mode="text"
        >
          {`SET TITLE: ${labeledAs}`}
        </Button>
        <View style={[Layout.rowHCenter, Layout.justifyContentBetween, Gutters.largeTMargin]}>
          <View>
            <Button
              style={Common.button.outline}
              labelStyle={Common.button.baseText}
              mode="outlined"
              onPress={() =>
                dispatch(
                  machineTypesActions.machineTypeFieldAdded({
                    typeId: machineTypeId,
                    fieldType: 'text',
                  }),
                )
              }
            >
              + ADD FIELD
            </Button>
            <Button
              style={Common.button.outline}
              labelStyle={Common.button.baseText}
              mode="outlined"
              onPress={() =>
                dispatch(
                  machineTypesActions.machineTypeFieldAdded({
                    typeId: machineTypeId,
                    fieldType: 'date',
                  }),
                )
              }
            >
              + ADD FIELD date
            </Button>
            <Button
              style={Common.button.outline}
              labelStyle={Common.button.baseText}
              mode="outlined"
              onPress={() =>
                dispatch(
                  machineTypesActions.machineTypeFieldAdded({
                    typeId: machineTypeId,
                    fieldType: 'number',
                  }),
                )
              }
            >
              + ADD FIELD number
            </Button>
            <Button
              style={Common.button.outline}
              labelStyle={Common.button.baseText}
              mode="outlined"
              onPress={() =>
                dispatch(
                  machineTypesActions.machineTypeFieldAdded({
                    typeId: machineTypeId,
                    fieldType: 'checkbox',
                  }),
                )
              }
            >
              + ADD FIELD checkbox
            </Button>
          </View>
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
