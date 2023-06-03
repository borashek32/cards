import React, {ChangeEvent, FC, useEffect, useState} from "react"
import {Card} from "common/components/Card/AuthCard/Card"
import styles from "features/auth/profile/styles.module.css"
import Button from "common/components/Button/Button"
import {TextField} from "@mui/material"
import i from "common/components/Input/styles.module.css"
import {useAppDispatch} from "common/hooks"
import {SubmitHandler, useForm} from "react-hook-form"
import {toast} from "react-toastify"
import {packsActions, packsThunks} from "features/packs/packs.slice"
import {Footer} from "common/components/Footer/Footer"
import {EditPackValuesType, PackType} from "features/packs/packs.types"
import s from "features/packs/forms/styles.module.css"
import closeImg from "assets/img/close.svg"
import {LeftTitle} from "common/components/Title/LeftTitle/LeftTitle"
import {useSelector} from "react-redux"
import {selectEditPackFormValues, selectEditPackMode} from "features/packs/packs.selectors"
import {values} from "lodash"


type Props = {
  p: PackType
}
type FormDataType = {
  _id: string
  name: string
  privateCard: boolean
}

export const UpdatePackForm: FC<Props> = ({p}) => {

  const dispatch = useAppDispatch()
  const editPackFormValues = useSelector(selectEditPackFormValues)
  const [editValues, setEditValues] = useState<EditPackValuesType>({
    _id: editPackFormValues._id,
    name: editPackFormValues.name,
    privateCard: editPackFormValues.privatePack
  });

  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm<EditPackValuesType>({mode: "onChange"})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(e.currentTarget.value)
    setEditValues({
      ...editValues,
      name: e.currentTarget.value
    })
  }

  const onSubmit: SubmitHandler<EditPackValuesType> = (data) => {
    setClose()
    dispatch(packsThunks.updatePack({ ...p, name: data.name, _id: editValues._id }))
      .unwrap()
      .then(() => {
        toast.success("Pack was updated successfully")
      })
  }

  const setClose = () => {
    dispatch(packsActions.setEditPackMode({editPackMode: false}))
    dispatch(packsActions.setEditPackFormValues({ values: {
      _id: '',
      name: '',
      privateCard: false
    }}))
  }

  return (
    <div className={s.background}>
      <Card id={'cards-profile'}>
        <div className={s.closeImgWrapper} onClick={setClose}>
          <img src={closeImg} alt="close image" className={s.closeImg} />
        </div>
        <LeftTitle title={"Edit Pack"} />
        <div className={styles.profile__wrapper}>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'} style={{width: "350px"}}>
            <TextField
              fullWidth={true}
              label={"Name pack"}
              variant={"standard"}
              autoComplete="off"
              placeholder={"Name pack"}
              className={i.input}
              {...(register("name", {
                required: "Pack Name field is required",
                minLength: {
                  value: 3,
                  message: "Min length of card name field is 3 symbols"
                }
              }))}
              onChange={handleChange}
              value={editValues.name}
              type="text"
            />
            {errors.name && <span className={i.error}>{errors.name.message}</span>}

            <div className={s.checkboxWrapper}>
              <input type={"checkbox"} {...register('privateCard')} className={s.checkbox} />
              <label htmlFor="#" style={{color: "#000"}} className={s.label}>Private Pack</label>
            </div>
            <Footer>
              <Button name={"Update"} xType={"default"} />
            </Footer>
          </form>
        </div>
      </Card>
    </div>
  )
}