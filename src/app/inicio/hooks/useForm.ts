import { useContext } from "react";
import { FormContext } from "../context/FormContext";

export const useFormContext = () => {
  const {
    formState,
    setTypeForm,
    setDurationForm,
    setEndDateForm,
    setIdForm,
    setNameForm,
    setPositionForm,
    setStartDateForm,
  } = useContext(FormContext);

  return {
    formState,
    setTypeForm,
    setEndDateForm,
    setIdForm,
    setNameForm,
    setPositionForm,
    setStartDateForm,
  };
};
