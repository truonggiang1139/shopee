import { Navigate, Outlet, useRoutes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterLayout from "./layouts/RegisterLayout";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY, path } from "./utils/constants";
import MainLayout from "./layouts/MainLayout";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import UserLayout from "./pages/User/layouts/UserLayout";
import Profile from "./pages/User/pages/Profile";
import HistoryPurchase from "./pages/User/pages/HistoryPurchase";
import ChangePassword from "./pages/User/pages/ChangePassword";
function ProtectedRoute() {
  const isAuthenticated = Cookies.get(ACCESS_TOKEN_KEY);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function RejectedRoute() {
  const isAuthenticated = Cookies.get(ACCESS_TOKEN_KEY);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: path.home,
          element: (
            <MainLayout>
              <ProductList />
            </MainLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            }
          ]
        },
        {
          path: path.productDetail,
          element: (
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          )
        },
        {
          path: path.cart,
          element: (
            <MainLayout>
              <Cart />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ]);
  return routeElements;
}
