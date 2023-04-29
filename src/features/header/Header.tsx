import React from 'react'
import s from 'features/header/styles.module.css'
import s1 from 'app/App.module.css'
import logo from 'img/logo.svg'


export const Header = () => {

  return (
    <div id={'hw5-header'} className={s.header}>
      <div className={s1.container}>
        <div className={s.header__container}>
          <img src={logo} alt="IT-incubator Logo" className={s.header__logo} />
          <div className={s.header__userSection}>
            <p className={s.header__userName}>User</p>
            <img src="https://static.vecteezy.com/system/resources/previews/002/410/747/original/cute-siamese-cat-on-yellow-background-free-photo.jpg"
                 alt="user img"
                 className={s.header__userImg}/>
          </div>
        </div>
      </div>
    </div>
  )
}
