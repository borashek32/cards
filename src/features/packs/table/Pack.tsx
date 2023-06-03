import {PackType} from "features/packs/packs.types"
import React, {FC, useState} from "react"
import s from "features/packs/table/styles.module.css"
import teacher from "assets/img/teacher.svg"
import pencil from "assets/img/pencil.svg"
import bin from "assets/img/bin.svg"
import {UpdatePackForm} from "features/packs/forms/UpdatePackForm"
import {DeletePackForm} from "features/packs/forms/DeletePackForm"
import {useSelector} from "react-redux"
import {selectProfile} from "features/auth/auth.selectors"
import {NavLink} from "react-router-dom"
import {selectEditPackMode} from "features/packs/packs.selectors"
import {useAppDispatch} from "common/hooks"
import {packsActions} from "features/packs/packs.slice"


type Props = {
  p: PackType
  key: string
}

export const Pack: FC<Props> = ({p}) => {

  const dispatch = useAppDispatch()
  const editMode = useSelector(selectEditPackMode)
  const authorizedUser = useSelector(selectProfile)
  const [deleteModal, setDeleteModal] = useState(false)

  const createdDate = new Date(p.created)
  const updatedDate = new Date(p.updated)

  const isOwner = authorizedUser?._id === p.user_id

  const setEditMode = () => {
    dispatch(packsActions.setEditPackFormValues({
      values: {
        _id: p._id,
        name: p.name,
        privateCard: p.private
      }
    }))
    dispatch(packsActions.setEditPackMode({editPackMode: true}))
  }

  const openPackCards = () => {
    dispatch(packsActions.setSelectedPack({ _id: p._id }))
  }

  return (
    <tr key={p._id} className={s.table__tr}>
      <td className={s.table__colValue}>
        <NavLink to={`/cards/${p._id}`} onClick={openPackCards} className={s.table__link}>
          {p.name}
        </NavLink>
      </td>
      <td className={s.table__colValue}>
        {p.cardsCount}
      </td>
      <td className={s.table__colValue}>
        {p.updated ? updatedDate.toLocaleString() : createdDate.toLocaleString()}
      </td>
      <td className={s.table__colValue}>
        {p.user_name}
      </td>
      <td
        className={s.table__colValue_actions}>
        <div
          className={s.table__colValue_actionsWrapper + ' '
            + (authorizedUser?._id !== p.user_id && s.table__colValue_actions_justLearn)}>

          {isOwner &&
            <>
              <img onClick={setEditMode} src={pencil} alt="pencil"/>
              {/*{editMode && <UpdatePackForm p={p} />}*/}

              <img onClick={() => setDeleteModal(true)} src={bin} alt="bin"/>
              {deleteModal && <DeletePackForm p={p} setDeleteModal={setDeleteModal}/>}
            </>
          }
          <img src={teacher} alt="teacher"/>
        </div>
      </td>
    </tr>
  )
}