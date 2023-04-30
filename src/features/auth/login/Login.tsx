import {useAppDispatch} from "common/hooks/hooks"
import {authThunks} from "features/auth/auth.slice"
import s from "features/auth/styles.module.css"
import React, {useEffect} from "react"
import {Card} from "common/components/Card/Card"
import {Title} from "common/components/Title/Title"
import {Navigate, NavLink} from "react-router-dom"
import {Footer} from "common/components/Footer/Footer"
import Button from "common/components/Button/Button"
import {SubmitHandler, useForm} from "react-hook-form"
import {useSelector} from "react-redux"
import {selectIsLoggedIn} from "features/auth/auth.selectors"
import i from "common/components/Input/styles.module.css"
import c from "common/components/Checkbox/styles.module.css"
import {TextField} from "@mui/material"


type FormDataType = {
  email: string
  password: string
  rememberMe: boolean
}

export const Login = () => {

  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const {register, handleSubmit, formState: {errors}, reset} = useForm<FormDataType>({
    mode: "onChange",
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    console.log(data)
    dispatch(authThunks.login(data))
    reset()
  }

  if (isLoggedIn) return <Navigate to={"/profile"}/>


  return (
    <form onSubmit={handleSubmit(onSubmit)} action="#" autoComplete={'off'}>
      <Card id={'cards-Login'}>
        <Title title={"Sign in"}/>
        <div className={s.auth__inputGroup}>
          <div className={i.inputWrapper}>
            <TextField
              label={"Email"}
              variant={"standard"}
              autoComplete="off"
              placeholder={"Email"}
              className={i.input}
              {...(register("email", {
                required: "Email field is required",
                pattern: {
                  value: /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9-]+.)+([a-zA-Z]{2,})$/,
                  message: 'Enter valid email address',
                },
                minLength: 7
              }))}
              type="email"
            />
            {errors.email && <span className={i.error}>{errors.email.message}</span>}
          </div>

          <div className={i.inputWrapper}>
            <TextField
              label={"Password"}
              variant={"standard"}
              autoComplete="off"
              placeholder={"Password"}
              className={i.input}
              {...(register("password", {
                required: "Password field is required",
                pattern: {
                  value: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}':"\\|,.<>/?]*$/,
                  message: 'Enter valid password',
                },
                minLength: 8
              }))}
              type="password"
            />
            {errors.password && <span className={i.error}>{errors.password.message}</span>}
          </div>
        </div>

        <div className={s.auth__rememberMe}>
          <div style={{display: "flex", gap: "12px"}}>
            <input
              className={c.checkbox}
              {...(register("rememberMe"))}
              type="checkbox"
            />
            <span className={s.auth__label}>Remember me</span>
          </div>
        </div>
        <div className={s.auth__forgotPasswordWrapper}>
          <NavLink to={"/forgot-password"}>
            <p className={s.auth__label}>Forgot password?</p>
          </NavLink>
        </div>
        <Footer>
          <Button type={"submit"} callback={() => {
          }} name={"Sign in"} xType={"default"}/>
          <p className={s.auth__alreadyHaveAcc}>Not registered yet?</p>
          <NavLink to={"/sign-up"}>
            <p className={s.auth__redirect}>Sign up</p>
          </NavLink>
        </Footer>
      </Card>
    </form>
  )
}