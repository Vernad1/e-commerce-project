import { Layout } from "../../components/appLayout/Layout";
import { Button } from "../../components/ui/button/Button";
import { useAppSelector } from "../../hooks/redux";

export default function HomePage() {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return (
    <Layout>
      <h1>Home</h1>
      {!isAuth && <Button>Войти</Button>}
      {isAuth && <div>Вы успешно вошли</div>}
    </Layout>
  );
}
