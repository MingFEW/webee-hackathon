export type FieldKey = 'date' | 'text' | 'checkbox' | 'number'

type FieldValue<K extends FieldKey> = {
  date: Date
  text: string
  checkbox: boolean
  number: number
}[K]

type Field<K extends FieldKey> = {
  key: string
  type: K
  label: string
}

export type MachineTextField = Field<'text'>
export type MachineDateField = Field<'date'>
export type MachineCheckboxField = Field<'checkbox'>
export type MachineNumberField = Field<'number'>

export type MachineField =
  | MachineTextField
  | MachineDateField
  | MachineCheckboxField
  | MachineNumberField

export type MachineFieldValue<F extends MachineField> = {
  key: F['key']
  value: FieldValue<F['type']>
}
