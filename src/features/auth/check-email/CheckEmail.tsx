import React from "react"
import { Card } from "common/components/Card/Card";
import { Title } from "common/components/Title/Title";
import s from "features/auth/styles.module.css";
import email from "img/email.svg";
import { Footer } from "common/components/Footer/Footer";
import Button from "common/components/Button/Button";

export const CheckEmail = () => {

  return (
    <Card id={'cards-check-email'}>
      <Title title={"Check email"}/>
      <div className={s.auth__checkEmailWrapper}>
        <img src={email} alt="email"/>
        <p className={s.auth__sendEmailDesc}>We’ve sent an Email with instructions to example@mail.com</p>
      </div>
      <Footer>
        <Button callback={() => {}} name={"Back to login"} xType={"default"} />
      </Footer>
    </Card>
  )
}