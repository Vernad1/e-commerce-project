import { Products } from "./pages/Products/Products";
import { AdminPage } from "./pages/admin/AdminPage";
import { AuthPage } from "./pages/auth/AuthPage";
import HomePage from "./pages/home/HomePage";
import { LoginPage } from "./pages/login/LoginPage";
import { NotFoundPage } from "./pages/notFoundPage/NotFoundPage";
import { Product } from "./pages/product/Product";
import { RegisterPage } from "./pages/register/RegisterPage";
import { ShoppingCartPage } from "./pages/shoppingCartPage/ShoppingCartPage";
import {
  HOME_ROUTE,
  REGISTER_ROUTE,
  LOGIN_ROUTE,
  NOT_FOUND_ROUTE,
  PRODUCTS_ROUTE,
  CATEGORIES,
  PRODUCT_ROUTE,
  CATEGORIES_FILTERS,
  ADMIN_ROUTE,
  ADMIN_ROUTE_SIZES,
  SHOPPING_CART_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: HOME_ROUTE,
    Component: HomePage,
  },
  {
    path: NOT_FOUND_ROUTE,
    Component: NotFoundPage,
  },
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: HomePage,
  },
  {
    path: REGISTER_ROUTE,
    Component: AuthPage,
  },
  {
    path: LOGIN_ROUTE,
    Component: AuthPage,
  },
  {
    path: NOT_FOUND_ROUTE,
    Component: NotFoundPage,
  },
  {
    path: PRODUCTS_ROUTE,
    Component: Products,
  },
  {
    path: CATEGORIES,
    Component: Products,
  },
  {
    path: PRODUCT_ROUTE,
    Component: Product,
  },
  {
    path: CATEGORIES_FILTERS,
    Component: Products,
  },
  {
    path: ADMIN_ROUTE,
    Component: AdminPage,
  },
  {
    path: ADMIN_ROUTE_SIZES,
    Component: AdminPage,
  },
  {
    path: SHOPPING_CART_ROUTE,
    Component: ShoppingCartPage,
  },
];
