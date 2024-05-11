import { ChangeEvent, useCallback, useState } from "react";
import { IValidations, useValidation } from "./useValidation";

export const useInput = (initialValue: string, validations: IValidations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const onBlur = useCallback(() => {
    setIsDirty(true);
  }, []);

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};
