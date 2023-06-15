import React, {FC, useState} from "react"
import s from 'features/packs/table/styles.module.css'
import {PackType} from "./../packs.types"
import {Pack} from "features/packs/table/Pack"
import {useSelector} from "react-redux"
import {selectAuthorizedUserId} from "features/auth/auth.selectors"
import downIcon from 'assets/img/down.svg'
import {useAppDispatch} from "common/hooks"
import {packsActions} from "features/packs/packs.slice"


type Props = {
  packsToRender: PackType[]
}

export const PacksTable: FC<Props> = ({packsToRender}) => {

  const dispatch = useAppDispatch()

  // these are used to determine if authorized user is owner or not
  const authorizedUserId = useSelector(selectAuthorizedUserId)
  const [sort, setSort] = useState<'0updated' | '1updated'>('0updated')

  // sort
  const handleChangeSort = () => {
    if (sort === "0updated") {
      setSort("1updated")
    } else {
      setSort("0updated")
    }
    dispatch(packsActions.setParams({ params: { sortPacks: sort } }))
  }

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

          <td
            className={s.table__colName}
            onClick={handleChangeSort}
            style={{display: "flex", alignItems: "center", gap: "5px", cursor: "pointer"}}
          >
            {sort === '0updated' ? 'First Updated' : 'Last Updated'}
            <img
              src={downIcon}
              className={sort === '0updated' ? s.arrowRevert : ''}
            />
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
        {packsToRender.map((pack: PackType) => {

          const isOwner = authorizedUserId === pack.user_id

          return <Pack
            key={pack._id}
            pack={pack}
            isOwner={isOwner}
          />
        })}
        </tbody>
      </table>
    </div>
  )
}