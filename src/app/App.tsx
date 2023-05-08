import React, {useEffect, useState} from "react";
import {Header} from "features/header/Header"
import {Layout} from "features/layout/Layout"
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom"
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
import {useAppDispatch} from "common/hooks/use-add-dispatch"
import {toast} from "react-toastify"
import {ProfileType} from "common/types/types"


function App() {

  const dispatch = useAppDispatch()
  const [profile, setProfile] = useState<ProfileType>()

  useEffect(() => {
    dispatch(authThunks.initializeApp())
      .unwrap()
      .then((res) => {
        setProfile(res.profile)
      })
      // .catch((err) => {
      //   toast.error(err.e.response.data.error + " Register or log in, please")
      // })
  }, [dispatch])

  return (
    <BrowserRouter>
      <Header/>
      <Layout>
        {/*{isLoading && <div style={{paddingTop: "60px", marginBottom: "-60px"}}><LinearProgress/></div>}*/}
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign-up" element={<SignUpForm/>}/>
          <Route path="/set-new-password/:token" element={<SetNewPasswordForm/>}/>
          <Route path="/forgot-password" element={<ForgotPasswordForm/>}/>
          <Route path="/check-email" element={<CheckEmail/>}/>

          {profile && <Route path="/profile" element={<Profile profile={profile}/>}/>}

          <Route path="/cards" element={<Cards/>}/>
          <Route path="/packs" element={<Packs/>}/>
          <Route path="/learn" element={<Learn/>}/>

          <Route path="/stand" element={<Stand/>}/>

          {/*<Route path="/error" element={<Error404/>}/>*/}
          <Route path="/*" element={<Error404/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;


