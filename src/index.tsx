import React from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "app/App"
import {GlobalAppError} from "common/components/Errors/GlobalError/GlobalError"
import Error404 from "common/errors/404/Error404";
import {Learn} from "features/learn/Learn"
import {Packs} from "features/packs/Packs"
import {Cards} from "features/cards/Cards"
import {Profile} from "features/auth/profile/Profile"
import {CheckEmail} from "features/auth/check-email/CheckEmail"
import {SetNewPasswordForm} from "features/auth/set-new-password/SetNewPasswordForm"
import {ForgotPasswordForm} from "features/auth/forgot-password/ForgotPasswordForm"
import {SignUpForm} from "features/auth/sign-up/SignUpForm"
import {Login} from "features/auth/login/Login"
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Error404/>
  },
  // auth
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error404/>
  },
  {
    path: "/sign-up",
    element: <SignUpForm />,
    errorElement: <Error404/>
  },
  {
    path: "/set-new-password",
    element: <SetNewPasswordForm />,
    errorElement: <Error404/>
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordForm />,
    errorElement: <Error404/>
  },
  {
    path: "/check-email",
    element: <CheckEmail />,
    errorElement: <Error404/>
  },
  // profile
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <Error404/>
  },
  // cards
  {
    path: "/cards",
    element: <Cards />,
    errorElement: <Error404/>
  },
  // packs
  {
    path: "/packs",
    element: <Packs />,
    errorElement: <Error404/>
  },
  // learn
  {
    path: "/learn",
    element: <Learn />,
    errorElement: <Error404/>
  }
]);

root.render(
  <Provider store={store}>
    <GlobalAppError/>
    <App/>
    {/*<RouterProvider router={router} />*/}
  </Provider>
);

reportWebVitals();
