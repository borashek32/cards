import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Error404 from "common/errors/404/Error404";
import { Login } from "features/auth/login/Login";
import { Register } from "features/auth/register/Register";
import { SetNewPassword } from "features/auth/set-new-password/SetNewPassword";
import { ForgotPassword } from "features/auth/forgot-password/ForgotPassword";
import { CheckEmail } from "features/auth/check-email/CheckEmail";
import { Profile } from "features/profile/Profile";
import { Cards } from "features/cards/Cards";
import { Packs } from "features/packs/Packs";
import { Learn } from "features/learn/Learn";
import Stand from "common/components/Stand";
import App from "app/App";
import { Header } from "features/header/Header";
import { Layout } from "features/layout/Layout";

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />
  },
  // auth
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error404 />
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error404 />
  },
  {
    path: "/set-new-password",
    element: <SetNewPassword />,
    errorElement: <Error404 />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <Error404 />
  },
  {
    path: "/check-email",
    element: <CheckEmail />,
    errorElement: <Error404 />
  },
  {
    path: "/set-new-password",
    element: <SetNewPassword />,
    errorElement: <Error404 />
  },
  // profile
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <Error404 />
  },
  // cards
  {
    path: "/cards",
    element: <Cards />,
    errorElement: <Error404 />
  },
  // packs
  {
    path: "/packs",
    element: <Packs />,
    errorElement: <Error404 />
  },
  // learn
  {
    path: "/learn",
    element: <Learn />,
    errorElement: <Error404 />
  },
  // stand
  {
    path: "/learn",
    element: <Stand />,
    errorElement: <Error404 />
  }
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header />
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
