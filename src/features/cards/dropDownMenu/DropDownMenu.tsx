import s from "features/header/styles.module.css"
import t from 'features/packs/title/styles.module.css'
import React, {useEffect, useState} from "react"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import triangle from "assets/img/triangle.svg"
import pencil from "assets/img/pencil.svg"
import bin from "assets/img/bin.svg"
import teacher from "assets/img/teacher.svg"
import {useSelector} from "react-redux"
import {packsActions} from "features/packs/packs.slice"
import {useAppDispatch} from "common/hooks"
import {selectCardsPackName, selectCardsPackPrivate} from "features/cards/cards.selectors"
import {useParams} from "react-router-dom"


export const DropDownMenu = () => {

  const dispatch = useAppDispatch()
  const packName = useSelector(selectCardsPackName)
  const packPrivate = useSelector(selectCardsPackPrivate)

  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const {cardsPack_id} = useParams()

  useEffect(() => {

  }, [])

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  const setEditMode = () => {
    dispatch(packsActions.setEditPackFormValues({
      values: {
        _id: cardsPack_id ?? '',
        name: packName,
        privateCard: packPrivate
      }
    }))
    dispatch(packsActions.setEditPackMode({editPackMode: true}))
  }

  const setDeleteMode = () => {
    dispatch(packsActions.setDeletePayload({
      values: {
        _id: cardsPack_id ?? '',
        name: packName
      }
    }))
    dispatch(packsActions.setDeletePackMode({ deletePackMode: true }))
  }

  const finalClassName = t.pack__menuWrapper + ' '
    + (isOpenMenu ? s.animationFadeIn : s.animationFadeOut)

  return (
    <>
      <div style={{position: "relative", }}>
        <DragIndicatorIcon onClick={handleOpenMenu} fontSize={"medium"}/>
        {isOpenMenu &&
          <div className={finalClassName}>
            <div className={s.header__menu}>
              <ul className={s.header__menuList}>
                <li
                  onClick={setEditMode}
                  className={s.header__menuListItemWrapper}
                >
                  <div className={s.header__menuListItemImgWrapper}>
                    <img src={pencil} alt="edit"/>
                  </div>
                  <p className={s.header__itemName}>Edit</p>
                </li>

                <li
                  onClick={setDeleteMode}
                  className={s.header__menuListItemWrapper}
                >
                  <div className={s.header__menuListItemImgWrapper}>
                    <img src={bin} alt="delete"/>
                  </div>
                  <p className={s.header__itemName}>Delete</p>
                </li>

                <li
                  onClick={() => {}}
                  className={s.header__menuListItemWrapper}
                >
                  <div className={s.header__menuListItemImgWrapper}>
                    <img src={teacher} alt="learn"/>
                  </div>
                  <p className={s.header__itemName}>Learn</p>
                </li>
              </ul>
              <img src={triangle} alt="triangle" className={s.triangle}/>
            </div>
          </div>
        }
      </div>
    </>
  )
}