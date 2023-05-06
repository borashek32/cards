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
import {Navigate} from "react-router-dom"
import {useAppDispatch} from "common/hooks"
import cat from 'assets/img/catYellow.jpg'


export const Profile = () => {

  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const profile = useSelector(selectProfile)
  const [editMode, setEditMode] = useState(false)
  const {handleSubmit, setValue} = useForm()
  const ifProfileExists = profile && profile.name

  useEffect(() => {
    console.log("useEffect")
    dispatch(authThunks.authMe())
  }, [ifProfileExists, dispatch])

  const onSubmit: SubmitHandler<any> = () => dispatch(authThunks.logout())

  if (!isLoggedIn) return <Navigate to={"/login"}/>

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
              <EditProfileForm userName={profile && profile.name} editMode={editMode} setEditMode={setEditMode} />
            </div>}
          <p className={styles.profile__userEmail}>{profile && profile.email}</p>
        </div>

        <Footer>
          <form onSubmit={handleSubmit(onSubmit)} action="#">
            <Button name={"Log out"} xType={"secondary"}/>
          </form>
        </Footer>
      </div>
    </Card>
  )
}