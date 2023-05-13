import React, {useEffect, useState} from "react"
import {useSearchParams} from 'react-router-dom'
import {LinearProgress} from "@mui/material"
import {useAppDispatch, useAppSelector} from "common/hooks"
import s from 'features/packs/table/styles.module.css'
import Sort from "common/components/Sort/Sort"
import CustomPagination from "common/components/Pagination/CustomPagination"
import teacher from 'assets/img/teacher.svg'
import pencil from 'assets/img/pencil.svg'
import bin from 'assets/img/bin.svg'
import {ArgUpdatePackType, PackType} from "common/types/types"
import {packsThunks} from "features/packs/packs.slice"
import {useSelector} from "react-redux"
import {selectPacks} from "features/packs/packs.selectors"
import {appActions} from "app/app.slice"
import {toast} from "react-toastify"


type ParamsType = {
  sort: string
  page: number
  count: number
}

export const Table = () => {

  const dispatch = useAppDispatch()
  const packs = useSelector(selectPacks)

  const [sort, setSort] = useState('')
  const [count, setCount] = useState(10)
  const [totalCount, setTotalCount] = useState(100)
  const [searchParams, setSearchParams] = useSearchParams(`?page=1&count=4`)


  useEffect(() => {
    dispatch(packsThunks.getPacks({}))
    const params = Object.fromEntries(searchParams)
    setCount(+params.count || 10)
  }, [searchParams, sort])

  const deletePack = (id: number) => {
    dispatch(packsThunks.deletePack({id: id}))
  }

  const updatePack = (pack: ArgUpdatePackType) => {
    dispatch(packsThunks.updatePack(pack))
  }

  const mappedPacks = packs?.map((p: PackType) => (
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
        <img onClick={() => updatePack({cardsPack: p})} src={pencil} alt="pencil"/>
        <img onClick={() => deletePack(p?._id)} src={bin} alt="bin"/>
      </td>
    </tr>
  ))


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
            <Sort sort={sort} value={'developer'} onChange={() => {}}/>
          </td>
          <td className={s.table__colName}>
            Created By
          </td>
          <td className={s.table__colName}>
            Actions
          </td>
        </tr>
        </thead>

        <tbody>{mappedPacks}</tbody>
      </table>

      <CustomPagination
        page={1}
        itemsCountForPage={count}
        totalCount={totalCount}
        onChange={() => {}}
      />
    </div>
  )
}