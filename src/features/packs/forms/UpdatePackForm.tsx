import React, {ChangeEvent, FC, useState} from "react"
import {Card} from "common/components/Card/AuthCard/Card"
import styles from "features/auth/profile/styles.module.css"
import Button from "common/components/Button/Button"
import {TextField} from "@mui/material"
import i from "common/components/Input/styles.module.css"
import {useAppDispatch} from "common/hooks"
import {SubmitHandler, useForm} from "react-hook-form"
import {toast} from "react-toastify"
import {packsThunks} from "features/packs/packs.slice"
import {EditPackValuesType, PackType} from "features/packs/packs.types"
import s from "features/packs/forms/styles.module.css"
import closeImg from "assets/img/close.svg"
import {LeftTitle} from "common/components/Title/LeftTitle/LeftTitle"
import {useSelector} from "react-redux"
import {selectCardsPackName} from "features/cards/cards.selectors"
import {useParams} from "react-router-dom"
import {cardsActions} from "features/cards/cards.slice"


type Props = {
  pack: PackType
  setEditMode: (editMode: boolean) => void
}

export const UpdatePackForm: FC<Props> = ({ pack, setEditMode }) => {

  const dispatch = useAppDispatch()
  const packName = useSelector(selectCardsPackName)
  const {cardsPack_id} = useParams()

  const [editValues, setEditValues] = useState<EditPackValuesType>({
    _id: pack._id || cardsPack_id as string,
    name: pack.name || packName,
    privateCard: pack.private
  })

  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm<EditPackValuesType>({mode: "onChange"})

  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditValues({
      ...editValues,
      name: e.currentTarget.value
    })
  }

  const onSubmit: SubmitHandler<EditPackValuesType> = (data) => {
    setCloseEditForm()
    dispatch(packsThunks.updatePack({ ...pack, name: data.name, _id: editValues._id }))
      .unwrap()
      .then((res) => {
        toast.success("Pack was updated successfully")
        dispatch(cardsActions.updatePackFulfilled)
      })
  }

  const setCloseEditForm = () => setEditMode(false)

  return (
    <div className={s.background}>
      <Card id={'cards-profile'}>
        <div
          className={s.closeImgWrapper}
          onClick={setCloseEditForm}
        >
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
              onChange={handleChangeInputValue}
              value={editValues.name}
              type="text"
            />
            {errors.name && <span className={i.error}>{errors.name.message}</span>}

            <div className={s.checkboxWrapper}>
              <input type={"checkbox"} {...register('privateCard')} className={s.checkbox} />
              <label htmlFor="#" style={{color: "#000"}} className={s.label}>Private Pack</label>
            </div>
              <div className={s.buttonsWrapper}>
                <Button
                  name={"Update"}
                  xType={'default'}
                  className={s.button}
                />
                <Button
                  name={"Cancel"}
                  xType={"secondary"}
                  onClick={setCloseEditForm}
                  className={s.button}
                />
              </div>
          </form>
        </div>
      </Card>
    </div>
  )
}