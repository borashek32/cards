import React, {useEffect} from "react";
import {Header} from "features/header/Header"
import {Layout} from "features/layout/Layout"
import {BrowserRouter, Route, Routes} from "react-router-dom"
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
import {useAppDispatch} from "common/hooks/use-app-dispatch"
import {LinearProgress} from "@mui/material"
import {useSelector} from "react-redux"
import {selectIsLoading} from "app/app.selectors"
import {useAppSelector} from "common/hooks"
import {authThunks} from "features/auth/auth.slice"
import Error404 from "common/errors/404/Error404"


function App() {

  const dispatch = useAppDispatch()
  const isLoading = useSelector(selectIsLoading)
  const profile = useAppSelector(state => state.auth.profile)

  useEffect(() => {
    dispatch(authThunks.authMe())
      .unwrap()
      .catch((e) => {

      })
  }, [])

  return (
    <BrowserRouter>
      <Layout>
        <Header/>
        {isLoading && <div><LinearProgress/></div>}
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign-up" element={<SignUpForm/>}/>
          <Route path="/set-new-password/:token" element={<SetNewPasswordForm/>}/>
          <Route path="/forgot-password" element={<ForgotPasswordForm/>}/>
          <Route path="/check-email" element={<CheckEmail/>}/>

          {profile && <Route path="/profile" element={<Profile profile={profile} />} />}
          {profile && <Route path="/cards" element={<Cards/>}/>}
          {profile && <Route path="/packs" element={<Packs/>}/>}
          {profile && <Route path="/learn" element={<Learn/>}/>}

          <Route path="/stand" element={<Stand/>}/>

          <Route path="/*" element={<Error404 />}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;


