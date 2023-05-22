import React, {FC} from "react"
import {Card} from "common/components/Card/Card"
import {Title} from "common/components/Title/Title"
import styles from "features/auth/profile/styles.module.css"
import Button from "common/components/Button/Button"
import {TextField} from "@mui/material"
import i from "common/components/Input/styles.module.css"
import s from "./styles.module.css"
import {useAppDispatch} from "common/hooks"
import {SubmitHandler, useForm} from "react-hook-form"
import {toast} from "react-toastify"
import {packsThunks} from "features/packs/packs.slice"
import {Footer} from "common/components/Footer/Footer"
import closeImg from 'assets/img/close.svg'


type Props = {
  setOpenCreateModal: (openCreateModal: boolean) => void
}
type FormDataType = {
  name: string
}

export const CreatePackForm: FC<Props> = ({setOpenCreateModal}) => {

  const {register, formState: {errors}, handleSubmit} = useForm<FormDataType>({mode: "onChange"})
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    dispatch(packsThunks.createPack(data))
      .unwrap()
      .then(() => {
        toast.success("New Pack was added successfully")
      })
    setOpenCreateModal(false)
  }


  return (
    <div className={s.background}>
      <Card id={'cards-profile'}>
        <div className={s.closeImgWrapper}>
          <img src={closeImg} alt="close image" className={s.closeImg} onClick={() => setOpenCreateModal(false)}/>
        </div>
        <Title title={"Add New Pack"}/>
        <div className={styles.profile__wrapper}>
          <form onSubmit={handleSubmit(onSubmit)} action="#" autoComplete={'off'} style={{width: "350px"}}>
            <TextField
              fullWidth={true}
              label={"Pack Name"}
              variant={"standard"}
              autoComplete="off"
              placeholder={"Enter Pack Name"}
              className={i.input}
              {...(register("name", {
                required: "Name field is required",
                minLength: {
                  value: 3,
                  message: "Min length of card name field is 3 symbols"
                }
              }))}
              defaultValue={''}
              type="text"
            />
            {errors.name && <span className={i.error}>{errors.name.message}</span>}
            <Footer>
              <Button name={"Create"} xType={"default"}/>
            </Footer>
          </form>
        </div>
      </Card>
    </div>
  )
}