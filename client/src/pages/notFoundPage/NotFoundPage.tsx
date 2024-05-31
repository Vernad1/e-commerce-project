import { Link } from "react-router-dom";
import { Layout } from "../../components/appLayout/Layout";

export const NotFoundPage = () => {
  return (
    <Layout>
      <div>
        NotFoundPage
        <Link to="/">Home</Link>
      </div>
    </Layout>
  );
};
