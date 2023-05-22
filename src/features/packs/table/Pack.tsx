import {PackType} from "features/packs/packs.types"
import React, {FC, useState} from "react"
import s from "features/packs/table/styles.module.css"
import teacher from "assets/img/teacher.svg"
import pencil from "assets/img/pencil.svg"
import bin from "assets/img/bin.svg"
import {UpdatePackForm} from "features/packs/forms/UpdatePackForm"
import {packsThunks} from "features/packs/packs.slice"
import {useAppDispatch} from "common/hooks"

type Props = {
  p: PackType
}

export const Pack: FC<Props> = ({p}) => {

  const [editMode, setEditMode] = useState(false)
  const dispatch = useAppDispatch()

  const editPack = () => setEditMode(true)

  const removePackHandler = (id: string) => {
    dispatch(packsThunks.removePack(id))
  };

  return (
    <>
      {editMode && <UpdatePackForm p={p} setEditMode={setEditMode} />}
      <tr key={p?._id} className={s.table__tr}>
        <td className={s.table__colValue}>
          {p?.name}
        </td>
        <td className={s.table__colValue}>
          {p?.cardsCount}
        </td>
        <td className={s.table__colValue}>
          {p?.updated}
        </td>
        <td className={s.table__colValue}>
          {p?.user_name}
        </td>
        <td className={s.table__colValue_actions}>
          <img src={teacher} alt="teacher"/>
          <img onClick={editPack} src={pencil} alt="pencil"/>
          <img onClick={() => removePackHandler(p?._id)} src={bin} alt="bin"/>
        </td>
      </tr>
    </>
  )
}