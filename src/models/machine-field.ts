type FieldDataTypes = {
  date: number
  text: string
  checkbox: boolean
  number: number
}

type FieldType = keyof FieldDataTypes

type Field<K extends FieldType> = {
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

export type MachineFieldValue<F extends MachineField> = F & {
  value: FieldDataTypes[F['type']]
}
