import React, { memo, useCallback, useMemo, useState } from 'react'
import { Card, Switch, Text, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { DatePickerModal } from 'react-native-paper-dates'
import { Pressable, View } from 'react-native'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import { machinesActions } from '@/store/machines/actions'

import { Machine } from '@/models/machine'
import { MachineType } from '@/models/machine-type'
import { MachineField } from '@/models/machine-field'

import { useTheme } from '@/hooks'

interface Props {
  machine: Machine
  machineType: MachineType
  machineIndex: number
}

const MachineCard: React.FC<Props> = memo((props) => {
  const dispatch = useDispatch()
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const { machine, machineType } = props
  const { id: machineId, data } = machine

  const cardLabel: string = useMemo(() => {
    const getFieldValue = machine.data.find((m) => m.fieldId === machineType.labeledAs)
      ?.value as string
    return getFieldValue || `Unnamed machine type`
  }, [machine, machineType])

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

  const onToggleDatePicker = useCallback((): void => {
    setShowDatePicker((prev) => !prev)
  }, [])

  const renderFieldComponent = (
    fieldId: string,
    value: string | number | boolean | null,
  ): JSX.Element => {
    const field = machineType.fields.find((f) => f.id === fieldId) as MachineField
    const { type, label } = field

    if (type === 'date') {
      return (
        <>
          <Pressable onPress={onToggleDatePicker}>
            <View style={[Common.inputField, Layout.rowHCenter, Layout.justifyContentBetween]}>
              <Text>{value ? moment.unix(value as number).format('DD/MM/YYYY') : label}</Text>
              <Icon name="calendar" size={24} color={Colors.primary} />
            </View>
          </Pressable>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={showDatePicker}
            onDismiss={onToggleDatePicker}
            date={value ? moment.unix(value as number).toDate() : undefined}
            onConfirm={(date) => {
              dispatch(
                machinesActions.machineFieldUpdated({
                  machineId,
                  field: {
                    fieldId,
                    value: moment(date.date).unix(),
                  },
                  fieldType: field,
                }),
              )
              onToggleDatePicker()
            }}
          />
        </>
      )
    }
    if (type === 'checkbox') {
      return (
        <View style={Layout.rowHCenter}>
          <Switch
            value={value as boolean}
            color={Colors.primary}
            style={Gutters.smallRMargin}
            onValueChange={(checked: boolean) => {
              dispatch(
                machinesActions.machineFieldUpdated({
                  machineId,
                  field: {
                    fieldId,
                    value: checked,
                  },
                  fieldType: field,
                }),
              )
            }}
          />
          <Text>{label}</Text>
        </View>
      )
    }
    return (
      <TextInput
        keyboardType={type === 'number' ? 'numeric' : 'default'}
        style={Common.textInput}
        mode="outlined"
        outlineColor={Colors.primary}
        activeOutlineColor={Colors.primary}
        label={label}
        value={`${value}`}
        onChangeText={(text: string) => {
          dispatch(
            machinesActions.machineFieldUpdated({
              machineId,
              field: {
                fieldId,
                value: `${text}`,
              },
              fieldType: field,
            }),
          )
        }}
      />
    )
  }

  return (
    <Card style={[Common.card, Gutters.regularHMargin, Gutters.regularVMargin]}>
      <Text style={Fonts.cardTitle}>{cardLabel}</Text>
      <View style={Gutters.regularTMargin}>
        {data.map((field) => (
          <View key={field.fieldId} style={Gutters.smallVMargin}>
            {renderFieldComponent(field.fieldId, field.value)}
          </View>
        ))}
        <Pressable
          style={Gutters.largeTMargin}
          onPress={() => dispatch(machinesActions.machineRemoved({ machineId }))}
        >
          <View style={Layout.rowHCenter}>
            <Icon name="trash-can-outline" size={24} style={Gutters.smallRMargin} />
            <Text>REMOVE</Text>
          </View>
        </Pressable>
      </View>
    </Card>
  )
})

export default MachineCard
