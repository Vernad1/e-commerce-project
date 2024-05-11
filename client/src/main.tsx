import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/appRouter/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Auth } from "./features/auth/Auth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth>
          <AppRouter></AppRouter>
        </Auth>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
