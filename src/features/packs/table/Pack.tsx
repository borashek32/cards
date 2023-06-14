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
import {useSelector} from "react-redux"
import {selectPackName} from "features/learn/learn.selectors"
import {cardsActions} from "features/cards/cards.slice"
import {selectCardsPackName} from "features/cards/cards.selectors"
import {selectPack} from "features/packs/packs.selectors"


type Props = {
  pack: PackType
  isOwner: boolean
}

export const Pack: FC<Props> = ({ pack, isOwner }) => {

  const dispatch = useAppDispatch()

  const createdDate = new Date(pack.created)
  const updatedDate = new Date(pack.updated)

  const [editMode, setEditMode] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)

  const setSelectedPack = () => {
    dispatch(packsActions.setSelectedPack({ _id: pack._id }))
  }

  return (
    <tr key={pack._id} className={s.table__tr}>
      <td className={s.table__colValue}>
        <NavLink
          to={`/cards/${pack._id}`}
          className={s.table__link}
        >
          <div onClick={setSelectedPack}>
            {pack.name}
          </div>
        </NavLink>
      </td>
      <td className={s.table__colValue}>
        {pack.cardsCount}
      </td>
      <td className={s.table__colValue}>
        {pack.updated ? updatedDate.toLocaleString() : createdDate.toLocaleString()}
      </td>
      <td className={s.table__colValue}>
        {pack.user_name}
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
                pack={pack}
                setEditMode={setEditMode}
              />}

              <img
                onClick={() => setDeleteMode(true)}
                src={bin} alt="bin"
              />
              {deleteMode && <DeletePackForm
                pack={pack}
                setDeleteMode={setDeleteMode}
              />}
            </>
          }
          <NavLink to={`/cards/${pack._id}`}>
            <img src={teacher} alt="teacher"/>
          </NavLink>
        </div>
      </td>
    </tr>
  )
}