import React from 'react'
import s from 'features/header/styles.module.css'
import s1 from 'app/App.module.css'
import logo from 'assets/img/logo.svg'
import cat from 'assets/img/catYellow.jpg'


export const Header = () => {

  return (
    <div id={'hw5-header'} className={s.header}>
      <div className={s1.container}>
        <div className={s.header__container}>
          <img src={logo} alt="IT-incubator Logo" className={s.header__logo} />
          <div className={s.header__userSection}>
            <p className={s.header__userName}>User</p>
            <img src={cat}
                 alt="user img"
                 className={s.header__userImg}/>
          </div>
        </div>
      </div>
    </div>
  )
}
