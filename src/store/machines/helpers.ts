import { Machine } from '@/models/machine'
import { FieldDataTypes, MachineField, MachineFieldType } from '@/models/machine-field'
import { MachineType } from '@/models/machine-type'
import { generateUuid } from '@/utils/randomizer'
import moment from 'moment'

export const getDefaultFieldValue = (type: MachineFieldType): FieldDataTypes[typeof type] => {
  switch (type) {
    case 'text':
      return ''
    case 'number':
      return ''
    case 'checkbox':
      return false
    case 'date':
      return null
  }
}

export const isMatchingFieldType = (
  field: Machine['data'][number],
  type: MachineFieldType,
): boolean => {
  return (
    (typeof field.value === 'string' && type === 'text') ||
    (typeof field.value === 'boolean' && type === 'checkbox') ||
    (typeof field.value === 'string' && type === 'number') ||
    (typeof field.value === 'number' && type === 'date')
  )
}

export const generateEmptyMachine = (type: MachineType): Machine => ({
  id: generateUuid(),
  categoryId: type.id,
  createdAt: moment().unix(),
  data: type.fields.map((f) => ({
    fieldId: f.id,
    value: getDefaultFieldValue(f.type),
  })),
})

export const parseMachineField = (
  fieldSchema: MachineField,
  field: Machine['data'][number],
): Machine['data'][number] => {
  if (isMatchingFieldType(field, fieldSchema.type)) {
    return field
  }

  return {
    ...field,
    value: getDefaultFieldValue(fieldSchema.type),
  }
}
