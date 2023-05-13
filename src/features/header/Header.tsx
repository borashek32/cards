import React from 'react'
import s from 'features/header/styles.module.css'
import logo from 'assets/img/logo.svg'
import {DropDownMenu} from "features/header/DropDownMenu"
import {useAppSelector} from "common/hooks"


export const Header = () => {

  const profile = useAppSelector(state => state.auth.profile)

  return (
    <div id={'hw5-header'} className={s.header}>
      <div className={s.header__container}>
        <img src={logo} alt="IT-incubator Logo" className={s.header__logo}/>
        {profile && <DropDownMenu/>}
      </div>
    </div>
  )
}
