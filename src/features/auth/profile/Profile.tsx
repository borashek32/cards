import {useAppDispatch} from "common/hooks/hooks"
import React, {useState} from "react"
import {Card} from "common/components/Card/Card"
import {Title} from "common/components/Title/Title"
import {SubmitHandler, useForm} from "react-hook-form"
import styles from "features/auth/profile/styles.module.css"
import edit from "img/edit.svg"
import editPhoto from "img/editPhoto.svg"
import {Footer} from "common/components/Footer/Footer"
import Button from "common/components/Button/Button"
import i from "common/components/Input/styles.module.css"
import {EditProfileForm} from "features/auth/profile/EditProfilrForm"
import {authThunks} from "features/auth/auth.slice"
import {useSelector} from "react-redux"
import {selectIsLoggedIn} from "features/auth/auth.selectors"
import {Navigate} from "react-router-dom"


export const Profile = () => {

  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const [editMode, setEditMode] = useState(false)
  const {handleSubmit} = useForm()

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
    dispatch(authThunks.logout())
  }

  if (!isLoggedIn) return <Navigate to={"/login"} />

  return (
    <Card id={'cards-profile'}>
      <Title title={"Personal Information"}/>
      <div className={styles.profile__wrapper}>
        <div className={styles.profile__userPhotoWrapper}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/410/747/original/cute-siamese-cat-on-yellow-background-free-photo.jpg"
            alt="user img"
            className={styles.profile__userPhoto}/>
          <div className={styles.profile__editPhotoWrapper}>
            <img src={editPhoto} alt="edit photo" className={styles.profile__editPhoto}/>
          </div>
        </div>

        <div className={styles.profile__userInfoWrapper}>
          {!editMode ? <div className={styles.profile__userNameWrapper}>
              <p className={styles.profile__userName}>userName</p>
              <img src={edit} alt="edit profile" onClick={() => setEditMode(true)} className={styles.profile__editImg}/>
            </div>
            : <div className={i.inputWrapper + " " + styles.profile__inputWrapper + ' ' +
              (editMode && styles.profile__inputWrapperFadeIn)}>
              <EditProfileForm />
            </div>}
          <p className={styles.profile__userEmail}>userEmail@gmail.com</p>
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