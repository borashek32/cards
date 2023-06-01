import React, {useEffect} from "react";
import {Header} from "features/header/Header"
import {Layout} from "features/layout/Layout"
import {useAppDispatch} from "common/hooks/use-app-dispatch"
import {LinearProgress} from "@mui/material"
import {useSelector} from "react-redux"
import {selectIsAppInitialized, selectIsLoading} from "app/app.selectors"
import {authThunks} from "features/auth/auth.slice"
import {GlobalAppError} from "common/components/Errors/GlobalError/GlobalError"
import {Outlet, useNavigate} from "react-router-dom"
import {AppPreloader} from "common/components/AppPreloader/AppPreloader"
import s from "./App.module.css"


function App() {

  const isLoading = useSelector(selectIsLoading)
  const isAppInitialized = useSelector(selectIsAppInitialized)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(authThunks.authMe())
      .unwrap()
      .then(() => {
        if (isAppInitialized) return navigate('/packs')
      })
      .catch(() => {
        if (!isAppInitialized) return navigate('/login')
      })
  }, [])

  return (
    <Layout>
      <Header/>
      <GlobalAppError/>
      {isLoading &&
        <div style={{
          position: "absolute",
          top: '60px',
          width: "100%"
        }}>
          <LinearProgress/>
        </div>
      }
      {isAppInitialized
        ? <Outlet/>
        : <div
          className={isLoading ? s.isLoading : ''}
        >
          <AppPreloader />
        </div>
      }
    </Layout>
  );
}

export default App;