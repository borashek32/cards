import s from "features/header/styles.module.css"
import t from 'features/packs/title/styles.module.css'
import d from 'features/cards/dropDownMenu/styles.module.css'
import React, {useState} from "react"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import triangle from "assets/img/triangle.svg"
import pencil from "assets/img/pencil.svg"
import bin from "assets/img/bin.svg"
import teacher from "assets/img/teacher.svg"
import {useSelector} from "react-redux"
import {UpdatePackForm} from "features/packs/forms/UpdatePackForm"
import {selectPack} from "features/packs/packs.selectors"
import {DeletePackForm} from "features/packs/forms/DeletePackForm"
import {selectCardsPackName} from "features/cards/cards.selectors"


export const DropDownMenu = () => {

  const pack = useSelector(selectPack)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)

  const handleOpenMenu = () => setIsOpenMenu(!isOpenMenu)

  const openEditForm = () => {
    setEditMode(true)
    setIsOpenMenu(false)
  }

  const openDeleteForm = () => {
    setDeleteMode(true)
    setIsOpenMenu(false)
  }

  const finalClassName = t.pack__menuWrapper + ' '
    + (isOpenMenu ? s.animationFadeIn : s.animationFadeOut)

  return (
    <>

      {deleteMode && <DeletePackForm
        pack={pack}
        setDeleteMode={setDeleteMode}
      />}
      {editMode && <UpdatePackForm
        pack={pack}
        setEditMode={setEditMode}
      />}

      <div className={d.background}>
        <DragIndicatorIcon onClick={handleOpenMenu} fontSize={"medium"}/>
        {isOpenMenu &&
          <div className={finalClassName}>
            <div className={s.header__menu}>
              <ul className={s.header__menuList}>
                <li
                  onClick={openEditForm}
                  className={s.header__menuListItemWrapper}
                >
                  <div className={s.header__menuListItemImgWrapper}>
                    <img src={pencil} alt="edit"/>
                  </div>
                  <p className={s.header__itemName}>Edit</p>
                </li>

                <li
                  onClick={openDeleteForm}
                  className={s.header__menuListItemWrapper}
                >
                  <div className={s.header__menuListItemImgWrapper}>
                    <img src={bin} alt="delete"/>
                  </div>
                  <p className={s.header__itemName}>Delete</p>
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