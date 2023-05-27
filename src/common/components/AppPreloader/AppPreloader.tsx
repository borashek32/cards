import {CircularProgress} from "@mui/material"
import React from "react"
import s from './styles.module.css'

export const AppPreloader = () => {

  return <div className={s.appPreloaderWrapper}>
    <CircularProgress />
  </div>
}