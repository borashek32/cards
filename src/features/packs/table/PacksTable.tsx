import React, {FC} from "react"
import s from 'features/packs/table/styles.module.css'
import {PackType} from "./../packs.types"
import {Pack} from "features/packs/table/Pack"


type Props = {
  packsToRender: PackType[]
  authorizedUserId?: string
}

export const PacksTable: FC<Props> = ({packsToRender, authorizedUserId}) => {

  return (
    <div className={s.container}>
      <table className={s.table} style={{marginTop: "38px"}}>
        <thead className={s.table__head}>
        <tr className={s.table__tr}>
          <td className={s.table__colName}>
            Name
          </td>
          <td className={s.table__colName}>
            Cards
          </td>
          <td className={s.table__colName}>
            Last Updated
          </td>
          <td className={s.table__colName}>
            Created By
          </td>
          <td className={s.table__colName}>
            Actions
          </td>
        </tr>
        </thead>

        <tbody>
        {packsToRender?.map((p: PackType) => {

          const isOwner = authorizedUserId === p.user_id

          return <Pack key={p._id} p={p} isOwner={isOwner} />
        })}
        </tbody>
      </table>


    </div>
  )
}