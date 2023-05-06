import {TextField} from "@mui/material"
import i from "common/components/Input/styles.module.css"
import styles from "features/auth/profile/styles.module.css"
import Button from "common/components/Button/Button"
import React, {FC, useEffect} from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import {authThunks} from "features/auth/auth.slice"
import {useAppDispatch} from "common/hooks"


type Props = {
  userName: string | null
  editMode: boolean
  setEditMode: (editMode: boolean) => void
}
export type FormDataType = {
  name: string
}

export const EditProfileForm: FC<Props> = ({userName,editMode, setEditMode}) => {

  const dispatch = useAppDispatch()
  const {register, formState: {errors}, handleSubmit, setValue} = useForm<FormDataType>({mode: "onChange"})

  useEffect(() => {
    userName && setValue("name", userName)
  }, [])

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    dispatch(authThunks.updateProfile(data))
    setEditMode(false)
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} action="#" autoComplete={'off'}>
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
    </form>
  )
}