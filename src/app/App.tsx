import React, {useEffect} from "react";
import {Header} from "features/header/Header"
import {Layout} from "features/layout/Layout"
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"
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
import {authThunks} from "features/auth/auth.slice"
import Error404 from "common/errors/404/Error404"
import {selectProfile} from "features/auth/auth.selectors"


function App() {

  const isLoading = useSelector(selectIsLoading)
  const profile = useSelector(selectProfile)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(authThunks.authMe())
      .unwrap()
      .then((res) => {

      })
  }, [])

  return (
    <BrowserRouter>
      <Layout>
        <Header/>
        {isLoading && <div><LinearProgress /></div>}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/set-new-password/:token" element={<SetNewPasswordForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/check-email" element={<CheckEmail />} />

          <Route path="/profile" element={profile ? <Profile /> : <Login />} />
          <Route path="/cards/:cardsPack_id" element={profile ? <Cards /> : <Login />} />
          <Route path="/packs" element={profile ? <Packs /> : <Login />} />
          <Route path="/learn" element={profile ? <Learn /> : <Login />} />

          <Route path="/stand" element={<Stand/>}/>

          {/*TODO*/}
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;


