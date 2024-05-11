import style from "./formContainer.module.css";
import { AuthForm } from "../authForm/AuthForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  loginUser,
  registerUser,
} from "../../../../store/reducers/user/ActionCreators";
import { userSlice } from "../../../../store/reducers/user/UserSlice";

export const FormContainer: React.FC = () => {
  const { pathname } = useLocation();
  const { error } = useAppSelector((state) => state.user);
  const dispath = useAppDispatch();
  const nav = useNavigate();

  const handleRegisterEvent = (e: any, email: string, password: string) => {
    e.preventDefault();
    const userCreditals = {
      email,
      password,
    };
    dispath(registerUser(userCreditals))
      .unwrap()
      .then(() => {
        nav("/");
      });
  };

  // ********************************* //

  const handleLoginEvent = (e: any, email: string, password: string) => {
    e.preventDefault();
    const userCreditals = {
      email,
      password,
    };
    dispath(loginUser(userCreditals))
      .unwrap()
      .then(() => {
        nav("/");
      });
  };

  function toggleLocation() {
    dispath(userSlice.actions.clearError());
  }

  return (
    <div className={style.container}>
      <div className={style.signInOptions}>
        <div
          className={
            style.signInTitle +
            (pathname === "/registration" ? " " + style.active : "")
          }
        >
          <Link reloadDocument onClick={toggleLocation} to={"/registration"}>
            Регистрация
          </Link>
        </div>
        <div
          className={
            style.signInTitle +
            (pathname === "/login" ? " " + style.active : "")
          }
        >
          <Link reloadDocument onClick={toggleLocation} to={"/login"}>
            Авторизация
          </Link>
        </div>
      </div>
      <div className={style.formWrapper}>
        {pathname === "/login" ? (
          <AuthForm
            type={pathname}
            buttonTitle="Войти"
            handleForm={handleLoginEvent}
          ></AuthForm>
        ) : (
          <AuthForm
            type={pathname}
            buttonTitle="Зарегестрироваться"
            handleForm={handleRegisterEvent}
          ></AuthForm>
        )}

        {error && <h2>Ошибка: {error}</h2>}
      </div>
    </div>
  );
};
