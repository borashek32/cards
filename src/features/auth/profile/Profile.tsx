import React, {FC, useEffect, useState} from "react"
import {Card} from "common/components/Card/Card"
import {Title} from "common/components/Title/Title"
import {SubmitHandler, useForm} from "react-hook-form"
import styles from "features/auth/profile/styles.module.css"
import edit from "assets/img/edit.svg"
import editPhoto from "assets/img/editPhoto.svg"
import {Footer} from "common/components/Footer/Footer"
import Button from "common/components/Button/Button"
import i from "common/components/Input/styles.module.css"
import {EditProfileForm} from "features/auth/profile/EditProfileForm"
import {authThunks} from "features/auth/auth.slice"
import {useAppDispatch} from "common/hooks"
import cat from 'assets/img/catYellow.jpg'
import logout from 'assets/img/logout.svg'
import {ProfileType} from "common/types/types"
import {useNavigate} from "react-router-dom"


type PropsType = {
  profile: ProfileType
}

export const Profile: FC<PropsType> = ({profile}) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const {setValue} = useForm()

  // log out
  const onSubmit: SubmitHandler<any> = () => {
    dispatch(authThunks.logout())
      .unwrap()
      .then(() => {
        navigate('/login')
      })
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