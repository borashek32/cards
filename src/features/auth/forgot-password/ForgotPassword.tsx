import React from "react"
import { Card } from "common/components/Card/Card";
import { Title } from "common/components/Title/Title";
import s from "features/auth/styles.module.css";
import Input from "common/components/Input/Input";
import { Footer } from "common/components/Footer/Footer";
import Button from "common/components/Button/Button";
import { NavLink } from "react-router-dom";

export const ForgotPassword = () => {

  return (
    <Card id={'cards-forgot-password'}>
      <Title title={"Forgot your password"}/>
      <div className={s.auth__inputGroup}>
        <Input placeholder={"Email"} label={"Email"} type={"text"} valueInvisible={false}/>
      </div>
      <p className={s.auth__alreadyHaveAcc} style={{marginTop: "18px"}}>
        Enter your email address and we will send you further instructions
      </p>
      <Footer>
        <Button callback={() => {}} name={"Send Instructions"} xType={"default"}/>
        <p className={s.auth__alreadyHaveAcc}>Did you remember your password?</p>
        <NavLink to={"/login"}>
          <p className={s.auth__redirect}>Try logging in</p>
        </NavLink>
      </Footer>
    </Card>
  )
}