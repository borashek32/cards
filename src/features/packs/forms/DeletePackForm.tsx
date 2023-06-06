import React, {FC} from "react"
import {Card} from "common/components/Card/AuthCard/Card"
import Button from "common/components/Button/Button"
import s from "./styles.module.css"
import {useAppDispatch} from "common/hooks"
import {packsThunks} from "features/packs/packs.slice"
import closeImg from 'assets/img/close.svg'
import {toast} from "react-toastify"
import {LeftTitle} from "common/components/Title/LeftTitle/LeftTitle"
import {useNavigate, useParams} from "react-router-dom"
import {PackType} from "features/packs/packs.types"
import {useSelector} from "react-redux"
import {selectCardsPackName} from "features/cards/cards.selectors"


type Props = {
  pack: PackType
  setDeleteMode: (deleteMode: boolean) => void
}

export const DeletePackForm: FC<Props> = ({ pack, setDeleteMode }) => {

  const dispatch = useAppDispatch()
  const packName = useSelector(selectCardsPackName)
  const navigate = useNavigate()
  const {cardsPack_id} = useParams()

  const removePackHandler = () => {
    setCloseDeleteForm()
    dispatch(packsThunks.removePack({id:pack._id || cardsPack_id as string, withUpdate:false}))
      .unwrap()
      .then((res) => {
        navigate('/packs')
        toast.success(`Pack ${pack.name || packName} was deleted successfully`)
      })
  }

  const setCloseDeleteForm = () => setDeleteMode(false)

  return (
    <div className={s.background}>
      <Card id={'cards-profile'}>
        <div className={s.closeImgWrapper}>
          <img
            src={closeImg}
            alt="close image"
            className={s.closeImg}
            onClick={setCloseDeleteForm}
          />
        </div>
        <LeftTitle title={"Delete Pack"}/>
        <p className={s.desc}>
          Do you really want to remove <strong>{pack.name || packName}</strong>?
        </p>
        <p className={s.desc}>
          All cards will be deleted.
        </p>
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
            onClick={setCloseDeleteForm}
            className={s.button}
          />
        </div>
      </Card>
    </div>
  )
}