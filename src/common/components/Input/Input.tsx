import {TextField} from "@mui/material"
import i from "./styles.module.css"
import {FC} from "react"
import React from "react"


type Props = {
  label: string
  type: string
  options: any
}

export const Input: FC<Props> = ({label, type, options}) => {

  return (
    <TextField
      label={label}
      variant={"standard"}
      autoComplete="off"
      placeholder={label}
      className={i.input}
      type={type}
    />
  )
}