import { MachineField } from '@/models/machine-field'
import { MachineType } from '@/models/machine-type'
import { generateUuid } from '@/utils/randomizer'

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
    createdAt: new Date(),
    labeledAs: emptyField.id,
    fields: [emptyField],
  }
}
