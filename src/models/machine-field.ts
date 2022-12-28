export type FieldDataTypes = {
  date: number | null
  text: string
  checkbox: boolean
  number: string
}

export type MachineFieldType = keyof FieldDataTypes

type Field<K extends MachineFieldType> = {
  id: string
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
  fieldId: F['id']
  value: FieldDataTypes[F['type']]
}
