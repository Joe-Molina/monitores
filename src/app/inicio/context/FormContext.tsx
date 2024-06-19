import { createContext } from "react";
import { FormState } from "../interfaces/interfaces";

export type FormContextProps = {
  formState: FormState,
  setTypeForm: (type: string) => void
  setIdForm: (id: number) => void
  setPositionForm: (position: number) => void
  setNameForm: (name: string) => void
  setDurationForm: (duration: number) => void
  setStartDateForm: (fecha_inicio: Date) => void
  setEndDateForm: (Fecha_Fin: Date) => void
};

export const FormContext = createContext<FormContextProps>({} as FormContextProps)
