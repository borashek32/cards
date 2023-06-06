import {PackType} from "features/packs/packs.types"
import React, {FC, useState} from "react"
import s from "features/packs/table/styles.module.css"
import teacher from "assets/img/teacher.svg"
import pencil from "assets/img/pencil.svg"
import bin from "assets/img/bin.svg"
import {NavLink} from "react-router-dom"
import {useAppDispatch} from "common/hooks"
import {packsActions} from "features/packs/packs.slice"
import {DeletePackForm} from "../forms/DeletePackForm"
import {UpdatePackForm} from "features/packs/forms/UpdatePackForm"


type Props = {
  p: PackType
  isOwner: boolean
}

export const Pack: FC<Props> = ({p, isOwner}) => {

  const dispatch = useAppDispatch()

  const createdDate = new Date(p.created)
  const updatedDate = new Date(p.updated)

  const [editMode, setEditMode] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)

  const setSelectedPack = () => dispatch(packsActions.setSelectedPack({ _id: p._id }))

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
              <img
                onClick={() => setEditMode(true)}
                src={pencil}
                alt="pencil"
              />
              {editMode && <UpdatePackForm
                pack={p}
                setEditMode={setEditMode}
              />}

              <img
                onClick={() => setDeleteMode(true)}
                src={bin} alt="bin"
              />
              {deleteMode && <DeletePackForm
                pack={p}
                setDeleteMode={setDeleteMode}
              />}
            </>
          }
          <img src={teacher} alt="teacher"/>
        </div>
      </td>
    </tr>
  )
}