import React from "react"
import { Card } from "common/components/Card/Card";
import { Title } from "common/components/Title/Title";
import s from "features/auth/styles.module.css";
import Input from "common/components/Input/Input";
import { Footer } from "common/components/Footer/Footer";
import Button from "common/components/Button/Button";

export const SetNewPassword = () => {

  return (
    <Card id={'cards-new-password'}>
      <Title title={"Create new password"}/>
      <div className={s.auth__inputGroup}>
        <Input placeholder={"Password"} label={"Password"} type={"text"} valueInvisible={true}/>
      </div>
      <p className={s.auth__alreadyHaveAcc} style={{marginTop: "18px"}}>
        Create new password and we will send you further instructions to email
      </p>
      <Footer>
        <Button callback={() => {}} name={"Create new password"} xType={"default"}/>
      </Footer>
    </Card>
  )
}