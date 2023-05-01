import React from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import {BrowserRouter, createBrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import Error404 from "common/errors/404/Error404";
import {Login} from "features/auth/login/Login";
import {SignUpForm} from "features/auth/sign-up/SignUpForm";
import {SetNewPasswordForm} from "features/auth/set-new-password/SetNewPasswordForm";
import {ForgotPasswordForm} from "features/auth/forgot-password/ForgotPasswordForm";
import {CheckEmail} from "features/auth/check-email/CheckEmail";
import {Profile} from "features/auth/profile/Profile";
import {Cards} from "features/cards/Cards";
import {Packs} from "features/packs/Packs";
import {Learn} from "features/learn/Learn";
import Stand from "common/components/Stand";
import {Header} from "features/header/Header";
import {Layout} from "features/layout/Layout";

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <Error404/>
  },
  // auth
  {
    path: "/login",
    element: <Login/>,
    errorElement: <Error404/>
  },
  {
    path: "/sign-up",
    element: <SignUpForm/>,
    errorElement: <Error404/>
  },
  {
    path: "/set-new-password",
    element: <SetNewPasswordForm/>,
    errorElement: <Error404/>
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordForm/>,
    errorElement: <Error404/>
  },
  {
    path: "/check-email",
    element: <CheckEmail/>,
    errorElement: <Error404/>
  },
  // profile
  {
    path: "/profile",
    element: <Profile/>,
    errorElement: <Error404/>
  },
  // cards
  {
    path: "/cards",
    element: <Cards/>,
    errorElement: <Error404/>
  },
  // packs
  {
    path: "/packs",
    element: <Packs/>,
    errorElement: <Error404/>
  },
  // learn
  {
    path: "/learn",
    element: <Learn/>,
    errorElement: <Error404/>
  },
  // stand
  {
    path: "/stand",
    element: <Stand/>,
    errorElement: <Error404/>
  }
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header/>
      <Layout>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/sign-up" element={<SignUpForm/>}/>
            <Route path="/set-new-password/:token" element={<SetNewPasswordForm/>}/>
            <Route path="/forgot-password" element={<ForgotPasswordForm/>}/>
            <Route path="/check-email" element={<CheckEmail/>}/>

            <Route path="/profile" element={<Profile/>}/>

            <Route path="/cards" element={<Cards/>}/>
            <Route path="/packs" element={<Packs/>}/>
            <Route path="/learn" element={<Learn/>}/>

            <Route path="/stand" element={<Stand/>}/>

            <Route path="/error" element={<Error404/>}/>
            <Route path="/*" element={<Error404/>}/>
          </Routes>
        </HashRouter>
      </Layout>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
