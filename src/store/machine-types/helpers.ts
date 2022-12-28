import { MachineField, MachineFieldType } from '@/models/machine-field'
import { MachineType } from '@/models/machine-type'
import { generateUuid } from '@/utils/randomizer'
import moment from 'moment'

export const generateEmptyMachineField = (fieldType?: MachineFieldType): MachineField => ({
  id: generateUuid(),
  label: '',
  type: fieldType || 'text',
})

export const generateEmptyMachineType = (): MachineType => {
  const emptyField = generateEmptyMachineField()

  return {
    id: generateUuid(),
    name: '',
    createdAt: moment().unix(),
    labeledAs: '',
    fields: [emptyField],
  }
}
