import React from "react";
import {createHashRouter} from "react-router-dom";
import {Cards} from "features/cards/Cards"
import Error404 from "common/errors/404/Error404"
import {Packs} from "features/packs/Packs"
import {Profile} from "features/auth/profile/Profile"
import {Learn} from "features/learn/Learn"
import {CheckEmail} from "features/auth/check-email/CheckEmail"
import {Login} from "features/auth/login/Login"
import {ForgotPasswordForm} from "features/auth/forgot-password/ForgotPasswordForm"
import {SignUpForm} from "features/auth/sign-up/SignUpForm"
import {SetNewPasswordForm} from "features/auth/set-new-password/SetNewPasswordForm"
import {paths} from "common/constants/constants"
import App from "app/App"

export const router = createHashRouter([
  {
    path: paths.MAIN,
    element: <App  />,
    errorElement: <Error404  />,
    children: [
      {
        path: paths.LOGIN,
        element: <Login  />
      },
      {
        path: paths.SIGN_UP,
        element: <SignUpForm  />
      },
      {
        path: paths.SET_NEW_PASSWORD,
        element: <SetNewPasswordForm  />
      },
      {
        path: paths.FORGOT_PASSWORD,
        element: <ForgotPasswordForm />
      },
      {
        path: paths.CHECK_EMAIL,
        element: <CheckEmail />
      },
      {
        path: paths.PROFILE,
        element: <Profile />
      },
      {
        path: paths.CARDS,
        element: <Cards />
      },
      {
        path: paths.PACKS,
        element: <Packs />
      },
      {
        path: paths.LEARN,
        element: <Learn />
      }
    ]
  }
]);