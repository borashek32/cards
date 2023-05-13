import s from "features/header/styles.module.css"
import cat from "assets/img/catYellow.jpg"
import {NavLink, useNavigate} from "react-router-dom"
import user from "assets/img/user.svg"
import logout from "assets/img/logout.svg"
import triangle from "assets/img/triangle.svg"
import React, {useState} from "react"
import {SubmitHandler} from "react-hook-form"
import {authThunks} from "features/auth/auth.slice"
import {useAppDispatch} from "common/hooks"

export const DropDownMenu = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handleOpenMenu = () => setIsOpenMenu(!isOpenMenu)

  const finalClassName = s.header__menuWrapper + ' '
    + (isOpenMenu ? s.animationFadeIn : s.animationFadeOut)

  const onSubmit: SubmitHandler<any> = () => {
    dispatch(authThunks.logout())
      .unwrap()
      .then(() => {
        navigate('/login')
      })
  }


  return (
    <div onClick={handleOpenMenu}>
      <div className={s.header__userSection}>
        <p className={s.header__userName}>User</p>
        <img src={cat}
             alt="user img"
             className={s.header__userImg}
        />
      </div>
      {isOpenMenu && <div className={finalClassName}>
        <div className={s.header__menu}>
          <ul className={s.header__menuList}>
            <NavLink to={'/profile'}>
              <li className={s.header__menuListItemWrapper} onClick={handleOpenMenu}>
                <img src={user} alt="user img"/>
                <p className={s.header__itemName}>Profile</p>
              </li>
            </NavLink>
            <NavLink to={'/packs'}>
              <li className={s.header__menuListItemWrapper} onClick={handleOpenMenu}>
                <img src={user} alt="user img"/>
                <p className={s.header__itemName}>Packs</p>
              </li>
            </NavLink>
          </ul>

          <button onClick={onSubmit} className={s.header__logoutButton} type="button" style={{cursor: "pointer"}}>
            <img src={logout} alt="log out"/>
            <p className={s.header__itemName}>Log out</p>
          </button>
        </div>
        <img src={triangle} alt="triangle" className={s.triangle}/>
      </div>
      }
    </div>
  )
}