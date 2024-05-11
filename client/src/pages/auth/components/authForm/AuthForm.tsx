import style from "./authForm.module.css";
import { useInput } from "../../../../hooks/useInput";

interface AuthFormProps {
  type?: string;
  handleForm: Function;
  buttonTitle?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  handleForm,
  buttonTitle,
}) => {
  const email = useInput("", { minLength: 8, inputType: "email" });
  const password = useInput("", { minLength: 8, inputType: "password" });

  return (
    <form>
      <div className={style.formInner}>
        <div className={style.inputWrapper}>
          <label htmlFor="email">email:</label>
          <input
            className={style.input}
            name="email"
            type="text"
            placeholder="email"
            id="email"
            value={email.value}
            onChange={(e) => email.onChange(e)}
            onBlur={email.onBlur}
          ></input>

          {email.isDirty && email.isError && (
            <div className={style.emailError}>{email.errorMessage}</div>
          )}
        </div>

        <div className={style.inputWrapper}>
          <label htmlFor="password">password:</label>
          <input
            className={style.input}
            name="password"
            id="password"
            type="password"
            placeholder="password"
            value={password.value}
            onChange={(e) => password.onChange(e)}
            onBlur={password.onBlur}
          ></input>
          {password.isDirty && password.isError && (
            <div className={style.emailError}>{password.errorMessage}</div>
          )}
        </div>

        <button
          disabled={email.isError || password.isError}
          onClick={(e) => handleForm(e, email.value, password.value)}
        >
          {buttonTitle}
        </button>
      </div>
    </form>
  );
};
