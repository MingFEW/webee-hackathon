import React, { memo, useCallback, useState } from 'react'
import { Card, IconButton, Text, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Pressable, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { useTheme } from '@/hooks'
import { machineTypesActions } from '@/store/machine-types/actions'
import { machinesActions } from '@/store/machines/actions'
import { MachineField } from '@/models/machine-field'
import { MachineType } from '@/models/machine-type'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'

import { FieldTypesBottomSheet } from './field-types-bottom-sheet'
import { SetTitleBottomSheet } from './set-title-bottom-sheet'

interface FormCardProps {
  data: MachineType
  machineTypeIndex: number
  onRemove: () => void
}

export const FormCard: React.FC<FormCardProps> = memo((props) => {
  const dispatch = useDispatch()
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const { data, onRemove } = props
  const { id: machineTypeId, name, labeledAs, fields } = data

  const [isOpenAddFieldBottomSheet, setIsOpenAddFieldBottomSheet] = useState<boolean>(false)
  const [isOpenSetTitleBottomSheet, setIsOpenSetTitleBottomSheet] = useState<boolean>(false)

  const toggleAddFieldBottomSheet = useCallback((): void => {
    setIsOpenAddFieldBottomSheet((prev) => !prev)
  }, [])

  const toggleSetTitleBottomSheet = useCallback((): void => {
    setIsOpenSetTitleBottomSheet((prev) => !prev)
  }, [])

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
            onChangeText={(text: string) => {
              // set the first input text as default field title
              if (type === 'text' && !labeledAs) {
                dispatch(
                  machineTypesActions.machineTypeLabeledAsUpdated({
                    typeId: machineTypeId,
                    labeledAs: text ? fieldId : undefined,
                  }),
                )
              }
              dispatch(
                machineTypesActions.machineTypeFieldUpdated({
                  typeId: machineTypeId,
                  field: {
                    ...field,
                    label: text,
                  },
                }),
              )
            }}
          />
        </View>
        <View style={Layout.rowCenter}>
          <Text style={[Gutters.tinyRMargin, Fonts.smallPrimaryText]}>
            {capitalizeFirstLetter(type)}
          </Text>
          <Pressable
            onPress={() => {
              dispatch(
                machineTypesActions.machineTypeFieldRemoved({ typeId: machineTypeId, fieldId }),
              )
              dispatch(machinesActions.allMachinesSpecificFieldRemoved({ fieldId }))
            }}
          >
            <IconButton icon="trash-can-outline" size={24} />
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <Card style={[Common.card, Gutters.regularHMargin, Gutters.regularVMargin]}>
      <Text style={Fonts.cardTitle}>{name || `Unnamed machine type`}</Text>
      <View style={Gutters.regularTMargin}>
        <TextInput
          style={[Common.textInput, Gutters.tinyVMargin]}
          outlineColor={Colors.primary}
          activeOutlineColor={Colors.primary}
          mode="outlined"
          label="Type name"
          value={name}
          onChangeText={(text: string) =>
            dispatch(
              machineTypesActions.machineTypeNameUpdated({ typeId: machineTypeId, newName: text }),
            )
          }
        />
        {/* Input fields */}
        {fields.map((field: MachineField) => renderInputField(field))}

        {/* Set title */}
        <Pressable
          style={[Common.button.rounded, Gutters.largeTMargin]}
          onPress={toggleSetTitleBottomSheet}
        >
          <Text style={Common.button.baseText}>{`SET TITLE: ${
            labeledAs ? fields.find((f) => f.id === labeledAs)?.label : '{field_label}'
          }`}</Text>
        </Pressable>

        {/* Card bottom */}
        <View style={[Layout.rowHCenter, Layout.justifyContentBetween, Gutters.largeTMargin]}>
          <View>
            <Pressable style={Common.button.rounded} onPress={toggleAddFieldBottomSheet}>
              <Text style={Common.button.baseText}>+ ADD FIELD</Text>
            </Pressable>
          </View>
          <Pressable onPress={onRemove}>
            <View style={[Layout.rowHCenter]}>
              <Icon name="trash-can-outline" size={24} style={Gutters.smallRMargin} />
              <Text>REMOVE</Text>
            </View>
          </Pressable>
        </View>
      </View>

      {/* Bottom sheets */}
      <FieldTypesBottomSheet
        isVisbile={isOpenAddFieldBottomSheet}
        onDismiss={toggleAddFieldBottomSheet}
        onFieldSelect={(field) => {
          dispatch(
            machineTypesActions.machineTypeFieldAdded({
              typeId: machineTypeId,
              fieldType: field,
            }),
          )
        }}
      />
      <SetTitleBottomSheet
        isVisbile={isOpenSetTitleBottomSheet}
        onDismiss={toggleSetTitleBottomSheet}
        fields={fields}
        onFieldSelect={(fieldId: string) => {
          dispatch(
            machineTypesActions.machineTypeLabeledAsUpdated({
              typeId: machineTypeId,
              labeledAs: fieldId,
            }),
          )
        }}
      />
    </Card>
  )
})
