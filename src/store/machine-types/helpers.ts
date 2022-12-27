import { MachineField } from '@/models/machine-field'
import { MachineType } from '@/models/machine-type'
import { generateUuid } from '@/utils/randomizer'
import moment from 'moment'

export const generateEmptyMachineField = (): MachineField => ({
  id: generateUuid(),
  label: '',
  type: 'text',
})

export const generateEmptyMachineType = (): MachineType => {
  const emptyField = generateEmptyMachineField()

  return {
    id: generateUuid(),
    name: '',
    createdAt: moment().unix(),
    labeledAs: emptyField.id,
    fields: [emptyField],
  }
}
