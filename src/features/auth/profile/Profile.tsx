import React, {useEffect, useState} from "react"
import {Card} from "common/components/Card/Card"
import {Title} from "common/components/Title/Title"
import {SubmitHandler, useForm} from "react-hook-form"
import styles from "features/auth/profile/styles.module.css"
import edit from "assets/img/edit.svg"
import editPhoto from "assets/img/editPhoto.svg"
import {Footer} from "common/components/Footer/Footer"
import Button from "common/components/Button/Button"
import i from "common/components/Input/styles.module.css"
import {EditProfileForm} from "features/auth/profile/EditProfilrForm"
import {authThunks} from "features/auth/auth.slice"
import {useSelector} from "react-redux"
import {selectIsLoggedIn, selectProfile} from "features/auth/auth.selectors"
import {useNavigate} from "react-router-dom"
import {useAppDispatch} from "common/hooks"
import cat from 'assets/img/catYellow.jpg'
import logout from 'assets/img/logout.svg'


export const Profile = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const profile = useSelector(selectProfile)
  const [editMode, setEditMode] = useState(false)
  const {setValue} = useForm()
  const ifProfileExists = profile && profile.name

  // we send query to auth/me to get profile data
  useEffect(() => {
    dispatch(authThunks.authMe())
    !isLoggedIn && navigate('/login')
  }, [ifProfileExists, dispatch])

  // log out
  const onSubmit: SubmitHandler<any> = () => {
    dispatch(authThunks.logout())
  }

  const onEditMode = () => {
    setEditMode(true)
    setValue("name", profile && profile.name)
  }


  return (
    <Card id={'cards-profile'}>
      <Title title={"Personal Information"}/>
      <div className={styles.profile__wrapper}>
        <div className={styles.profile__userPhotoWrapper}>
          <img
            src={cat}
            alt="user img"
            className={styles.profile__userPhoto}/>
          <div className={styles.profile__editPhotoWrapper}>
            <img src={editPhoto} alt="edit photo" className={styles.profile__editPhoto}/>
          </div>
        </div>

        <div className={styles.profile__userInfoWrapper}>
          {!editMode ? <div className={styles.profile__userNameWrapper}>
              <p className={styles.profile__userName}>{profile && profile.name}</p>
              <img src={edit} alt="edit profile" onClick={onEditMode} className={styles.profile__editImg}/>
            </div>
            : <div className={i.inputWrapper + " " + styles.profile__inputWrapper + ' ' +
              (editMode && styles.profile__inputWrapperFadeIn)}>
              <EditProfileForm userName={profile && profile.name} editMode={editMode} setEditMode={setEditMode}/>
            </div>}
          <p className={styles.profile__userEmail}>{profile && profile.email}</p>
        </div>

        <Footer>
          <Button onClick={onSubmit} name={"Log out"} xType={"secondary"} imgPath={logout}/>
        </Footer>
      </div>
    </Card>
  )
}