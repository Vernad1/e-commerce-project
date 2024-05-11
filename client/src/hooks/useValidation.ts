import { useEffect, useState } from "react";
import validateEmail from "../service/helpers/validateEmail";

//TODO вынести интерфейс в другое место
export interface IValidations {
  minLength: number;
  inputType: "password" | "email";
}

export const useValidation = (value: string, validations: IValidations) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (value) {
      setIsError(false);

      // Проверка email`a
      if (validations.inputType === "email" && !validateEmail(value)) {
        setIsError(true);
        setErrorMessage("Невалидный email");
        return;
      } else {
        setIsError(false);
      }

      // Проверка пароля
      if (
        validations.inputType === "password" &&
        value.length < validations.minLength
      ) {
        setIsError(true);
        setErrorMessage("Пароль слишком короткий");
        return;
      } else {
        setIsError(false);
      }
    } else {
      setIsError(true);
      setErrorMessage("Поле не может быть пустым");
    }
  }, [value]); // Убрал зависимость от "value"

  return {
    isError,
    errorMessage,
  };
};
