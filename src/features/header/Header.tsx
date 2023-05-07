import React from 'react'
import s from 'features/header/styles.module.css'
import logo from 'assets/img/logo.svg'
import {useSelector} from "react-redux"
import {selectIsLoggedIn} from "features/auth/auth.selectors"
import {DropDownMenu} from "features/header/DropDownMenu"


export const Header = () => {

  const isLoggedIn = useSelector(selectIsLoggedIn)


  return (
    <div id={'hw5-header'} className={s.header}>
      <div className={s.header__container}>
        <img src={logo} alt="IT-incubator Logo" className={s.header__logo}/>
        {isLoggedIn && <DropDownMenu/>}
      </div>
    </div>
  )
}
