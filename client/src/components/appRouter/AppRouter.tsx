import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../../routes";
import { useAppSelector } from "../../hooks/redux";

export const AppRouter = () => {
  const isAuth = false;
  const user = useAppSelector((state) => state.user.user);
  return (
    <Routes>
      {isAuth &&
        authRoutes.map((route) => {
          return (
            <Route
              path={route.path}
              element={<route.Component />}
              key={route.path}
            ></Route>
          );
        })}
      {publicRoutes.map((route) => {
        return (
          <Route
            path={route.path}
            element={<route.Component />}
            key={route.path}
          ></Route>
        );
      })}
    </Routes>
  );
};
