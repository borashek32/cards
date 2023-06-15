import React from 'react'
import s from 'features/header/styles.module.css'
import logo from 'assets/img/logo.svg'
import {DropDownMenu} from "features/header/DropDownMenu"
import {NavLink} from "react-router-dom"


export const Header = () => {

  return (
    <div id={'hw5-header'} className={s.header}>
      <div className={s.header__container}>
        <NavLink to={"/packs"}>
          <img src={logo} alt="IT-incubator Logo" className={s.header__logo}/>
        </NavLink>

        <DropDownMenu />
      </div>
    </div>
  )
}
