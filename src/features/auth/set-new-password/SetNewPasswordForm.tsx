import React, {useState} from "react"
import {Card} from "common/components/Card/Card";
import {Title} from "common/components/Title/Title";
import s from "features/auth/styles.module.css";
import {Footer} from "common/components/Footer/Footer";
import Button from "common/components/Button/Button";
import i from "common/components/Input/styles.module.css"
import {TextField} from "@mui/material"
import {SubmitHandler, useForm} from "react-hook-form"
import {Navigate, useParams} from "react-router-dom"
import {authThunks} from "features/auth/auth.slice"
import {useAppDispatch} from "common/hooks/use-app-dispatch"
import eye from "assets/img/eye.svg"


type FormDataType = {
  password: string
  resetPasswordToken: string
}

export const SetNewPasswordForm = () => {

  const dispatch = useAppDispatch()
  const [isPasswordInputType, setIsPasswordInputType] = useState(true)
  const [newPasswordExists, setNewPasswordExists] = useState(false)
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<FormDataType>({
    mode: "onChange",
    defaultValues: {
      password: ''
    }
  })

  const resetPasswordToken: string | undefined = useParams().token

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    resetPasswordToken && dispatch(authThunks.setNewPassword({...data, resetPasswordToken}))
    setNewPasswordExists(true)
    reset()
  }

  if (newPasswordExists) return <Navigate to={"/login"}/>

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="#" autoComplete={'off'}>
      <Card id={'cards-new-password'}>
        <Title title={"Create new password"}/>
        <div className={s.auth__inputGroup}>
          <div className={i.inputWrapper}>
            <TextField
              fullWidth={true}
              label={"Password"}
              variant={"standard"}
              autoComplete="off"
              placeholder={"Password"}
              className={i.input}
              {...(register("password", {
                required: "Password field is required",
                pattern: {
                  value: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
                  message: 'Please, enter symbols, numbers and latin letters',
                },
                minLength: {
                  value: 8,
                  message: "Password is too short, min length is 8 symbols"
                }
              }))}
              type={isPasswordInputType ? "password" : "text"}
            />
            <div className={i.eyeWrapper}>
              <img
                src={eye}
                alt="password hidden img"
                className={i.eye}
                onClick={() => setIsPasswordInputType(!isPasswordInputType)}
              />
              {isPasswordInputType && <hr className={i.hr}/>}
            </div>
            {errors.password && <span className={i.error}>{errors.password.message}</span>}
          </div>
        </div>
        <p className={s.auth__alreadyHaveAcc} style={{marginTop: "18px"}}>
          Create new password and we will send you further instructions to email
        </p>
        <Footer>
          <Button callback={() => {
          }} name={"Create new password"} xType={"default"}/>
        </Footer>
      </Card>
    </form>
  )
}