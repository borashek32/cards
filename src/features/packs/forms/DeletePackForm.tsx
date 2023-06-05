import React, {useState} from "react"
import {Card} from "common/components/Card/AuthCard/Card"
import Button from "common/components/Button/Button"
import s from "./styles.module.css"
import {useAppDispatch} from "common/hooks"
import {packsActions, packsThunks} from "features/packs/packs.slice"
import closeImg from 'assets/img/close.svg'
import {toast} from "react-toastify"
import {LeftTitle} from "common/components/Title/LeftTitle/LeftTitle"
import {useSelector} from "react-redux"
import {selectDeletePackFormValues, selectPack} from "features/packs/packs.selectors"
import {DeletePackValuesType} from "features/packs/packs.types"
import {useNavigate} from "react-router-dom"


export const DeletePackForm = () => {

  const dispatch = useAppDispatch()
  const p = useSelector(selectPack)
  const deletePackValues = useSelector(selectDeletePackFormValues)
  const navigate = useNavigate()

  const removePackHandler = () => {
    closeDeleteForm()
    dispatch(packsThunks.removePack(p._id))
      .unwrap()
      .then((res) => {
        navigate('/packs')
        toast.success(`Pack ${p.name} was deleted successfully`)
      })
  }

  const closeDeleteForm = () => {
    dispatch(packsActions.setDeletePackMode({ deletePackMode: false }))
  }

  return (
    <div className={s.background}>
      <Card id={'cards-profile'}>
        <div className={s.closeImgWrapper}>
          <img src={closeImg} alt="close image" className={s.closeImg} onClick={closeDeleteForm}/>
        </div>
        <LeftTitle title={"Delete Pack"}/>
        <p className={s.desc}>Do you really want to remove <strong>{deletePackValues.name}</strong>?</p>
        <p className={s.desc}>All cards will be deleted.</p>
        <div className={s.buttonsWrapper}>
          <Button
            name={"Delete"}
            xType={'red'}
            onClick={removePackHandler}
            className={s.button}
          />
          <Button
            name={"Cancel"}
            xType={"secondary"}
            onClick={closeDeleteForm}
            className={s.button}
          />
        </div>
      </Card>
    </div>
  )
}