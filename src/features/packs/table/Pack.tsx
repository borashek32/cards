import {PackType} from "features/packs/packs.types"
import React, {FC} from "react"
import s from "features/packs/table/styles.module.css"
import teacher from "assets/img/teacher.svg"
import pencil from "assets/img/pencil.svg"
import bin from "assets/img/bin.svg"
import {NavLink} from "react-router-dom"
import {useAppDispatch} from "common/hooks"
import {packsActions} from "features/packs/packs.slice"
import {UpdatePackForm} from "features/packs/forms/UpdatePackForm"
import {DeletePackForm} from "features/packs/forms/DeletePackForm"
import {useSelector} from "react-redux"
import {selectDeletePackMode, selectEditPackMode} from "features/packs/packs.selectors"


type Props = {
  p: PackType
  isOwner: boolean
}

export const Pack: FC<Props> = ({p, isOwner}) => {

  const dispatch = useAppDispatch()
  const editMode = useSelector(selectEditPackMode)
  const deleteMode = useSelector(selectDeletePackMode)

  const createdDate = new Date(p.created)
  const updatedDate = new Date(p.updated)

  const setEditMode = () => {
    dispatch(packsActions.setEditPackFormValues({
      values: {
        _id: p._id,
        name: p.name,
        privateCard: p.private
      }
    }))
    dispatch(packsActions.setEditPackMode({ editPackMode: true }))
  }

  const setDeleteMode = () => {
    dispatch(packsActions.setDeletePackMode({ deletePackMode: true }))
    dispatch(packsActions.setDeletePayload({
      values: {
        _id: p._id,
        name: p.name
      }
    }))
  }

  const setSelectedPack = () => {
    dispatch(packsActions.setSelectedPack({ _id: p._id }))
  }

  return (
    <tr key={p._id} className={s.table__tr}>
      <td className={s.table__colValue}>
        <NavLink
          to={`/cards/${p._id}`}
          className={s.table__link}
        >
          <div onClick={setSelectedPack}>
            {p.name}
          </div>
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
            + (!isOwner && s.table__colValue_actions_justLearn)}>

          {isOwner &&
            <>
              <img onClick={setEditMode} src={pencil} alt="pencil"/>
              {editMode && <UpdatePackForm />}

              <img onClick={setDeleteMode} src={bin} alt="bin"/>
              {deleteMode && <DeletePackForm />}
            </>
          }
          <img src={teacher} alt="teacher"/>
        </div>
      </td>
    </tr>
  )
}