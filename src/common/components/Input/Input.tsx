import {TextField} from "@mui/material"
import i from "./styles.module.css"
import {FC} from "react"
import React from "react"


type Props = {
  placeholder: string
  label?: string
  type: string
  options?: any
}

export const Input: FC<Props> = ({placeholder, label, type, options}) => {

  return (
    <Input
      label={label}
      // variant={"outlined"}
      // autoComplete="off"
      placeholder={placeholder}
      // className={i.input}
      type={type}
    />
  )
}