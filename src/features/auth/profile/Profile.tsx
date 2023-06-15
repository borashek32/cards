import React, {ChangeEvent, useCallback, useState} from "react"
import {Card} from "common/components/Card/AuthCard/Card"
import {Title} from "common/components/Title/Title"
import {SubmitHandler} from "react-hook-form"
import styles from "features/auth/profile/styles.module.css"
import edit from "assets/img/edit.svg"
import editPhoto from "assets/img/editPhoto.svg"
import {Footer} from "common/components/Footer/Footer"
import Button from "common/components/Button/Button"
import i from "common/components/Input/styles.module.css"
import {EditProfileForm} from "features/auth/profile/forms/EditProfileForm"
import {authThunks} from "features/auth/auth.slice"
import {useAppDispatch} from "common/hooks"
import cat from 'assets/img/catYellow.jpg'
import logout from 'assets/img/logout.svg'
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import {selectProfile, selectProfileAvatar} from "features/auth/auth.selectors"
import {BackLink} from "common/components/BackLink/BackLink"
import {Input} from "@mui/material"
import {toast} from "react-toastify"


export const Profile = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const profile = useSelector(selectProfile)
  const avatar = useSelector(selectProfileAvatar)
  const [editMode, setEditMode] = useState(false)
  const [editPhotoMode, setEditPhotoMode] = useState(false)

  // log out
  const onSubmit: SubmitHandler<any> = () => {
    dispatch(authThunks.logout())
      .unwrap()
      .then(() => {
        navigate('/login')
      })
  }

  // edit profile
  const onEditMode = () => setEditMode(true)

  // change photo
  const onEditPhotoMode = () => setEditPhotoMode(true)

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const file64 = reader.result as string
      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  const uploadUserAvatar = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      if (file.size < 4000000) {
        convertFileToBase64(file, (avatar: string) => {
          dispatch(authThunks.updateProfile({ avatar: avatar }))
            .unwrap()
            .then(() => {
              setEditPhotoMode(false)
              dispatch(authThunks.authMe())
              toast.success("You changed profile avatar successfully:)")
            })
            .catch(() => {
              toast.error('Error: your file is too large! Choose another one, please')
            })
        })
      }
    }
  }, [])

  return (
    <>
      <BackLink backPath={'/packs'} backText={'Back to Packs List'}/>
      <Card id={'cards-profile'}>
        <Title title={"Personal Information"}/>
        <div className={styles.profile__wrapper}>
          <div className={styles.profile__userPhotoWrapper}>
            {!editPhotoMode
              ? <>
                <img
                  src={avatar ?? cat}
                  alt="user img"
                  onClick={onEditPhotoMode}
                  className={styles.profile__userPhoto}
                />
                <div className={styles.profile__editPhotoWrapper}>
                  <img
                    style={{cursor: "pointer"}}
                    src={editPhoto}
                    alt="edit photo"
                    onClick={onEditPhotoMode}
                    className={styles.profile__editPhoto}
                  />
                </div>
              </>

              : <Input
                type={'file'}
                onChange={uploadUserAvatar}
              />}
          </div>

          <div className={styles.profile__userInfoWrapper}>
            {!editMode ?
              <div className={styles.profile__userNameWrapper}>
                <p className={styles.profile__userName}>{profile && profile.name}</p>
                <img src={edit} alt="edit profile" onClick={onEditMode} className={styles.profile__editImg}/>
              </div>
              :
              <div className={i.inputWrapper + " " + styles.profile__inputWrapper + ' ' +
                (editMode && styles.profile__inputWrapperFadeIn)}>
                <EditProfileForm userName={profile && profile.name} editMode={editMode} setEditMode={setEditMode}/>
              </div>
            }
            <p className={styles.profile__userEmail}>{profile && profile.email}</p>
          </div>

          <Footer>
            <Button onClick={onSubmit} name={"Log out"} xType={"secondary"} imgPath={logout}/>
          </Footer>
        </div>
      </Card>
    </>
  )
}