import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { loginUser } from "../../store/reducers/user/ActionCreators";
import { userSlice } from "../../store/reducers/user/UserSlice";
import style from "./loginPage.module.css";
import { AuthForm } from "../auth/components/authForm/AuthForm";
import { AuthLayout } from "../auth/components/authLayout/AuthLayout";

export const LoginPage = () => {
  const { pathname } = useLocation();

  const { error } = useAppSelector((state) => state.user);
  const dispath = useAppDispatch();
  const nav = useNavigate();

  const handleLoginEvent = (e: any, email: string, password: string) => {
    e.preventDefault();
    const userCreditals = {
      email,
      password,
    };
    dispath(loginUser(userCreditals))
      .unwrap()
      .then((res) => {
        nav("/");
      })
      .catch((e) => console.log(e));
  };

  function toggleLocation() {
    dispath(userSlice.actions.clearError());
  }

  return (
    <AuthLayout>
      <div className={style.container}>
        <div className={style.signInOptions}>
          <div
            className={
              style.signInTitle +
              (pathname === "/registration" ? " " + style.active : "")
            }
          >
            <Link onClick={toggleLocation} to={"/registration"}>
              Регистрация
            </Link>
          </div>
          <div
            className={
              style.signInTitle +
              (pathname === "/login" ? " " + style.active : "")
            }
          >
            <Link onClick={toggleLocation} to={"/login"}>
              Авторизация
            </Link>
          </div>
        </div>
        <div className={style.formWrapper}>
          <AuthForm
            buttonTitle="Войти"
            handleForm={handleLoginEvent}
          ></AuthForm>
          {error && <h2>Ошибка:{error}</h2>}
        </div>
      </div>
    </AuthLayout>
  );
};
