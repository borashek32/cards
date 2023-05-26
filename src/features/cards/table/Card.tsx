import React, {FC, useState} from "react"
import s from "features/packs/table/styles.module.css"
import pencil from "assets/img/pencil.svg"
import bin from "assets/img/bin.svg"
import {useSelector} from "react-redux"
import {selectProfile} from "features/auth/auth.selectors"
import {NavLink} from "react-router-dom"
import {CardType} from "features/cards/cards.types"
import {DeleteCardForm} from "features/cards/forms/DeleteCardForm"

type Props = {
  c: CardType
  key: string
  cardsPack_id?: string
}

export const Card: FC<Props> = ({c, cardsPack_id}) => {

  const [editMode, setEditMode] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const authorizedUser = useSelector(selectProfile)

  const createdDate = new Date(c.created)
  const updatedDate = new Date(c.updated)


  return (
    <tr key={c._id} className={s.table__tr}>
      <td className={s.table__colValue}>
        <NavLink to={`/cards/${c._id}`} className={s.table__link}>
          {c.question}
        </NavLink>
      </td>
      <td className={s.table__colValue}>
        {c.answer}
      </td>
      <td className={s.table__colValue}>
        {c.updated ? updatedDate.toLocaleString() : createdDate.toLocaleString()}
      </td>
      <td className={s.table__colValue}>
        {c.user_id}
      </td>
      <td
        className={s.table__colValue_actions}>
        <div className={s.table__colValue_actionsWrapper + ' ' + (authorizedUser?._id === c.user_id && s.table__colValue_actionsWrapper_center)}>
          {authorizedUser?._id === c.user_id &&
            <>
              <img onClick={() => setEditMode(true)} src={pencil} alt="pencil"/>
              {/*{editMode && <UpdatePackForm c={c} setEditMode={setEditMode}/>}*/}

              <img onClick={() => setDeleteModal(true)} src={bin} alt="bin"/>
              {deleteModal && <DeleteCardForm cardsPack_id={cardsPack_id} c={c} setDeleteModal={setDeleteModal}/>}
            </>
          }
        </div>
      </td>
    </tr>
  )
}