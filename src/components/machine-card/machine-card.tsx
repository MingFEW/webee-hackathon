import React, { memo, useCallback, useState } from 'react'
import { Card, Switch, Text, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { DatePickerModal } from 'react-native-paper-dates'

import { useTheme } from '@/hooks'
import { Pressable, View } from 'react-native'

const MachineCard: React.FC = memo(() => {
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

  const onToggleDatePicker = useCallback((): void => {
    setShowDatePicker((prev) => !prev)
  }, [])

  const renderFieldComponent = (type: string): JSX.Element => {
    if (type === 'date') {
      return (
        <>
          <Pressable onPress={onToggleDatePicker}>
            <View style={[Common.inputField, Layout.rowHCenter, Layout.justifyContentBetween]}>
              <Text>Select Date</Text>
              <Icon name="calendar" size={24} color={Colors.primary} />
            </View>
          </Pressable>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={showDatePicker}
            onDismiss={onToggleDatePicker}
            date={undefined}
            onConfirm={() => {}}
          />
        </>
      )
    }
    if (type === 'checkbox') {
      return (
        <View style={Layout.rowHCenter}>
          <Switch value={true} color={Colors.primary} style={Gutters.smallRMargin} />
          <Text>2nd hand?</Text>
        </View>
      )
    }
    return (
      <TextInput
        keyboardType={type === 'number' ? 'number-pad' : 'default'}
        style={Common.textInput}
        mode="outlined"
        outlineColor={Colors.primary}
        activeOutlineColor={Colors.primary}
        label="Field"
        placeholder="Enter field name"
      />
    )
  }

  return (
    <Card style={[Common.card, Gutters.regularHMargin, Gutters.regularVMargin]}>
      <Text style={Fonts.cardTitle}>Machine Cra A23</Text>
      <View style={Gutters.regularTMargin}>
        <View style={Gutters.smallVMargin}>{renderFieldComponent('text')}</View>
        <View style={Gutters.smallVMargin}>{renderFieldComponent('checkbox')}</View>
        <View style={Gutters.smallVMargin}>{renderFieldComponent('date')}</View>
        <View style={Gutters.smallVMargin}>{renderFieldComponent('number')}</View>
        <Pressable style={Gutters.largeTMargin}>
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
