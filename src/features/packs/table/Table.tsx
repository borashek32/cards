import React, {useEffect, useState} from "react"
import {useAppDispatch} from "common/hooks"
import s from 'features/packs/table/styles.module.css'
import CustomPagination from "common/components/Pagination/CustomPagination"
import {PackType} from "./../packs.types"
import {packsThunks} from "features/packs/packs.slice"
import {selectPacks} from "features/packs/packs.selectors"
import {useSelector} from "react-redux"
import {Pack} from "features/packs/table/Pack"


export const Table = () => {

  const cardPacks = useSelector(selectPacks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(packsThunks.fetchPacks());
  }, [])


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
          {cardPacks?.map((p: PackType) => <Pack p={p} />)}
        </tbody>
      </table>

      <CustomPagination
        page={1}
        onChange={() => {}}
      />
    </div>
  )
}