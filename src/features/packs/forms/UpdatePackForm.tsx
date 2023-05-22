import React, {FC} from "react"
import {Card} from "common/components/Card/Card"
import {Title} from "common/components/Title/Title"
import styles from "features/auth/profile/styles.module.css"
import Button from "common/components/Button/Button"
import {TextField} from "@mui/material"
import i from "common/components/Input/styles.module.css"
import {useAppDispatch} from "common/hooks"
import {SubmitHandler, useForm} from "react-hook-form"
import {toast} from "react-toastify"
import {packsThunks} from "features/packs/packs.slice"
import {Footer} from "common/components/Footer/Footer"
import {PackType} from "features/packs/packs.types"
import {Layout} from "features/layout/Layout"
import s from "features/packs/forms/styles.module.css"
import closeImg from "assets/img/close.svg"


type Props = {
  p: PackType
  setEditMode: (openModal: boolean) => void
}
type FormDataType = {
  name: string
}

export const UpdatePackForm: FC<Props> = ({p,setEditMode}) => {

  const {register, formState: {errors}, handleSubmit} = useForm<FormDataType>({mode: "onChange"})
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    dispatch(packsThunks.updatePack({ ...p, name: data.name }))
      .unwrap()
      .then(() => {
        toast.success("Pack was updated successfully")
      })
    setEditMode(false)
  }


  return (
    <div className={s.background}>
      <Card id={'cards-profile'}>
        <div className={s.closeImgWrapper}>
          <img src={closeImg} alt="close image" className={s.closeImg} onClick={() => setEditMode(false)}/>
        </div>
        <Title title={"Edit Pack"}/>
        <div className={styles.profile__wrapper}>
          <form onSubmit={handleSubmit(onSubmit)} action="#" autoComplete={'off'} style={{width: "350px"}}>
            <TextField
              fullWidth={true}
              label={"Edit Pack Name"}
              variant={"standard"}
              autoComplete="off"
              placeholder={"Pack Name"}
              className={i.input}
              {...(register("name", {
                required: "Pack Name field is required",
                minLength: {
                  value: 3,
                  message: "Min length of card name field is 3 symbols"
                }
              }))}
              defaultValue={p.name}
              type="text"
            />
            {errors.name && <span className={i.error}>{errors.name.message}</span>}
            <Footer>
              <Button name={"Edit"} xType={"default"} />
            </Footer>
          </form>
        </div>
      </Card>
    </div>
  )
}