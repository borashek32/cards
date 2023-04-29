import { useAppDispatch } from "common/hooks/hooks";
import { authThunks } from "features/auth/auth.slice";
import s from "features/auth/styles.module.css";
import React from "react";
import { Card } from "common/components/Card/Card";
import { Title } from "common/components/Title/Title";
import Input from "common/components/Input/Input";
import Checkbox from "common/components/Checkbox/Checkbox";
import { NavLink } from "react-router-dom";
import { Footer } from "common/components/Footer/Footer";
import Button from "common/components/Button/Button";

export const Login = () => {
  const dispatch = useAppDispatch();

  const registerHandler = () => {
    const payload = {
      email: "borashek@nya.nya",
      password: "1qazxcvBG",
      rememberMe: false
    }
    dispatch(authThunks.login(payload));
  };

  return (
    <Card id={'cards-Login'}>
      <Title title={"Sign in"} />
      <div className={s.auth__inputGroup}>
        <Input placeholder={"Email"} label={"Email"} type={"text"} valueInvisible={false} />
        <Input placeholder={"Password"} label={"Password"} type={"text"} valueInvisible={true} />
      </div>
      <div className={s.auth__rememberMe}>
        <Checkbox>
          <label className={s.auth__label}>Remember me</label>
        </Checkbox>
      </div>
      <div className={s.auth__forgotPasswordWrapper}>
        <NavLink to={"/forgot-password"}>
          <p className={s.auth__label}>Forgot password?</p>
        </NavLink>
      </div>
      <Footer>
        <Button callback={registerHandler} name={"Sign in"} xType={"default"} />
        <p className={s.auth__alreadyHaveAcc}>Not registered yet?</p>
        <NavLink to={"./registration"}>
          <p className={s.auth__redirect}>Sign up</p>
        </NavLink>
      </Footer>
    </Card>
  )
}