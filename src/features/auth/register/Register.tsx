import s from 'features/auth/styles.module.css'
import { useAppDispatch } from "common/hooks/hooks";
import { authThunks } from "features/auth/auth.slice";
import React from 'react';
import { Title } from "common/components/Title/Title";
import Input from "common/components/Input/Input";
import { Footer } from "common/components/Footer/Footer";
import Button from "common/components/Button/Button";
import { NavLink } from "react-router-dom";
import { Card } from "common/components/Card/Card";

export const Register = () => {

  const dispatch = useAppDispatch();

  const registerHandler = () => {
    const payload = {
      email: "borashek@nya.nya",
      password: "1qazxcvBG"
    }
    dispatch(authThunks.register(payload));
  };

  return (
    <Card id={'cards-registration'}>
      <Title title={"Sign up"} />
      <div className={s.auth__inputGroup}>
        <Input placeholder={"Email"} label={"Email"} type={"text"} valueInvisible={false} />
        <Input placeholder={"Password"} label={"Password"} type={"text"} valueInvisible={true} />
        <Input placeholder={"Confirm password"} label={"Password"} type={"text"} valueInvisible={true} />
      </div>
      <Footer>
        <Button callback={registerHandler} name={"Sign in"} xType={"default"} />
        <p className={s.auth__alreadyHaveAcc}>Already have an account?</p>
        <NavLink to={"./registration"}>
          <p className={s.auth__redirect}>Sign in</p>
        </NavLink>
      </Footer>
    </Card>
  );
}