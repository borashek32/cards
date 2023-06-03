import s from "features/header/styles.module.css"
import t from 'features/packs/title/styles.module.css'
import React, {useState} from "react"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import triangle from "assets/img/triangle.svg"
import pencil from "assets/img/pencil.svg"
import bin from "assets/img/bin.svg"
import teacher from "assets/img/teacher.svg"
import {useSelector} from "react-redux"
import {selectEditPackMode, selectPack} from "features/packs/packs.selectors"
import {DeletePackForm} from "features/packs/forms/DeletePackForm"
import {packsActions} from "features/packs/packs.slice"
import {useAppDispatch} from "common/hooks"
import {UpdatePackForm} from "features/packs/forms/UpdatePackForm"


export const DropDownMenu = () => {

  const dispatch = useAppDispatch()
  const pack = useSelector(selectPack)
  const editMode = useSelector(selectEditPackMode)
  const [deleteModal, setDeleteModal] = useState(false)
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handleOpenMenu = () => setIsOpenMenu(!isOpenMenu)

  const setEditMode = () => {
    dispatch(packsActions.setEditPackFormValues({
      values: {
        _id: pack._id,
        name: pack.name,
        privateCard: pack.private
      }
    }))
    dispatch(packsActions.setEditPackMode({editPackMode: true}))
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
                  {/*{editMode && <UpdatePackForm p={pack} />}*/}
                </li>
                <li
                  onClick={() => setDeleteModal(true)}
                  className={s.header__menuListItemWrapper}
                >
                  <div className={s.header__menuListItemImgWrapper}>
                    <img src={bin} alt="delete"/>
                  </div>
                  <p className={s.header__itemName}>Delete</p>
                  {deleteModal && <DeletePackForm p={pack} setDeleteModal={setDeleteModal}/>}
                </li>
                <li
                  onClick={() => {}}
                  className={s.header__menuListItemWrapper}
                >
                  <div className={s.header__menuListItemImgWrapper}>
                    <img src={teacher} alt="learn"/>
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