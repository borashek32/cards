import React from "react"
import { Card } from "common/components/Card/AuthCard/Card";
import { Title } from "common/components/Title/Title";
import s from "features/auth/styles.module.css";
import email from "assets/img/email.svg";
import { Footer } from "common/components/Footer/Footer";
import Button from "common/components/Button/Button";
import {useNavigate} from "react-router-dom"

export const CheckEmail = () => {

  const navigate = useNavigate()

  const backToLogin = () => navigate('/login')

  return (
    <Card id={'cards-check-email'}>
      <Title title={"Check email"}/>
      <div className={s.auth__checkEmailWrapper}>
        <img src={email} alt="email"/>
        <p className={s.auth__sendEmailDesc}>We’ve sent an Email with instructions to example@mail.com</p>
      </div>
      <Footer>
        <Button callback={backToLogin} name={"Back to login"} xType={"default"} />
      </Footer>
    </Card>
  )
}