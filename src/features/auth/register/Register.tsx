import s from 'features/auth/styles.module.css'
import { useAppDispatch } from "common/hooks/hooks"
import { authThunks } from "features/auth/auth.slice"
import React from 'react'
import { Title } from "common/components/Title/Title"
import Input from "common/components/Input/Input"
import { Footer } from "common/components/Footer/Footer"
import Button from "common/components/Button/Button"
import { NavLink } from "react-router-dom"
import { Card } from "common/components/Card/Card"
import i from "common/components/Input/styles.module.css"
import {Controller, useForm} from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'


type FormDataType = {
  email: string
  password: string
  confirmPassword: string
}

export const Register = () => {

  const dispatch = useAppDispatch()
  const { register, handleSubmit, control, formState: { errors }, reset, watch } = useForm<FormDataType>({
    mode: "onChange",
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const password = watch("password", "")

  const onSubmit = () => {
    const payload = {
      email: "borashek@nya.nya",
      password: "1qazxcvBG"
    }
    dispatch(authThunks.register(payload))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="#" autoComplete={'off'}>
      <Card id={'cards-registration'}>
        <Title title={"Sign up"} />
        <div className={s.auth__inputGroup}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <input
                value={field.value}
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
            )}
          />
          {errors.email && <span className={i.error}>{errors.email.message}</span>}
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <input
                value={field.value}
                autoComplete="off"
                placeholder={"Password"}
                className={i.input}
                {...(register("password", {
                  required: "Password field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
                    message: 'Valid password consists of special symbols, numbers and latin letters',
                  },
                  minLength: {
                    value: 8,
                    message: "Password is too short, min length is 8 symbols"
                  }
                }))}
                type="password"
              />
            )}
          />
          {errors.password && <span className={i.error}>{errors.password.message}</span>}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <input
                value={field.value}
                autoComplete="off"
                placeholder={"Confirm password"}
                className={i.input}
                {...(register("confirmPassword", {
                  required: "Confirm password field is required",
                  validate: {
                    value: (value: string) => value === password || "Passwords do not match"
                  },
                  minLength: 8
                }))}
                type="password"
              />
            )}
          />
          {errors.confirmPassword && <span className={i.error}>{errors.confirmPassword.message}</span>}
        </div>
        <Footer>
          <Button callback={() =>{}} name={"Sign up"} xType={"default"} />
          <p className={s.auth__alreadyHaveAcc}>Already have an account?</p>
          <NavLink to={"/login"}>
            <p className={s.auth__redirect}>Sign in</p>
          </NavLink>
        </Footer>
      </Card>
    </form>
  )
}