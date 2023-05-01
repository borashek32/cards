import {TextField} from "@mui/material"
import i from "common/components/Input/styles.module.css"
import styles from "features/auth/profile/styles.module.css"
import Button from "common/components/Button/Button"
import React from "react"
import {useForm} from "react-hook-form"


type FormDataType = {
  name: string
}

export const EditProfileForm = () => {

  const {register, handleSubmit, formState: {errors}, reset} = useForm<FormDataType>({
    mode: "onChange",
    defaultValues: {
      name: ''
    }
  })

  return (
    <>
      <TextField
        label={"User Name"}
        variant={"standard"}
        autoComplete="off"
        placeholder={"User Name"}
        className={i.input}
        {...(register("name", {
          required: "Name field is required",
          minLength: {
            value: 3,
            message: "Min length of name field is 3 symbols"
          }
        }))}
        type="text"
      />
      <div className={styles.profile__buttonSaveUserInfoWrapper}>
        <Button name={"SAVE"} xType={"default"} className={styles.profile__buttonSaveUserInfo}/>
      </div>
      {errors.name && <span className={i.error}>{errors.name.message}</span>}
    </>
  )
}