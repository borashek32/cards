import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import {appActions} from "app/app.slice"
import {useAppSelector} from "common/hooks/use-app-selector"

export const GlobalAppError = () => {
  const error = useAppSelector((state) => state.app.error)
  const dispatch = useDispatch()

  if (error !== null) {
    toast.error(error);
  }

  // clear error message
  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setAppError({ error: null }))
    }, 2000)
  }, [error])

  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};