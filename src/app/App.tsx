import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks/hooks";
import { appActions } from "app/app.slice";
import {Header} from "features/header/Header"
import {Layout} from "features/layout/Layout"
import {HashRouter, Route, Routes} from "react-router-dom"
import {Login} from "features/auth/login/Login"
import {SignUpForm} from "features/auth/sign-up/SignUpForm"
import {SetNewPasswordForm} from "features/auth/set-new-password/SetNewPasswordForm"
import {ForgotPasswordForm} from "features/auth/forgot-password/ForgotPasswordForm"
import {CheckEmail} from "features/auth/check-email/CheckEmail"
import {Profile} from "features/auth/profile/Profile"
import {Cards} from "features/cards/Cards"
import {Packs} from "features/packs/Packs"
import {Learn} from "features/learn/Learn"
import Stand from "common/components/Stand"
import Error404 from "common/errors/404/Error404"
import {authThunks} from "features/auth/auth.slice"


function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.app.isLoading);

  useEffect(() => {
    setTimeout(() => {
      dispatch(authThunks.initializeApp())
      dispatch(appActions.setIsLoading({isLoading: false}))
    }, 3000);
  }, []);

  return (
    <div className="App">
      <Header/>
      <Layout>
        {isLoading && <h1>Loader...</h1>}
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
    </div>
  );
}

export default App;


