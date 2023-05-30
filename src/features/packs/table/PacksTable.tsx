import React, {ChangeEvent, useEffect} from "react"
import {useAppDispatch} from "common/hooks"
import s from 'features/packs/table/styles.module.css'
import {PackType} from "./../packs.types"
import {packsActions, packsThunks} from "features/packs/packs.slice"
import {
  selectCardPacksTotalCount,
  selectFilter,
  selectPacks,
  selectPage,
  selectPageCount
} from "features/packs/packs.selectors"
import {useSelector} from "react-redux"
import {Pack} from "features/packs/table/Pack"
import {MenuItem, Pagination, Select, SelectChangeEvent} from "@mui/material"
import {selectProfile} from "features/auth/auth.selectors"


export const PacksTable = () => {

  const cardPacks = useSelector(selectPacks)
  const filter = useSelector(selectFilter)
  const profile = useSelector(selectProfile)
  const dispatch = useAppDispatch()

  const cardPacksTotalCount = useSelector(selectCardPacksTotalCount)
  const pageCount = useSelector(selectPageCount) ?? 4
  const page = useSelector(selectPage)

  // packs per page
  const handleChangePacksPerPage = (event: SelectChangeEvent) => {
    dispatch(packsActions.setParams({params: {pageCount: Number(event.target.value)}}))
  }
  const newPageCount = Math.ceil(cardPacksTotalCount / pageCount)

  // selected page
  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    dispatch(packsActions.setParams({params: {page: newPage}}))
  }

  let packsToRender = cardPacks
  if (filter === "My") {
    packsToRender = cardPacks.filter(p => p.user_id === profile?._id ? p : '')
  }

  useEffect(() => {
    dispatch(packsThunks.fetchPacks())
  }, [page, pageCount])

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
        {packsToRender?.map((p: PackType) => <Pack key={p._id} p={p}/>)}
        </tbody>
      </table>

      <div className={s.paginationWrapper}>
        <Pagination
          count={newPageCount}
          page={page}
          color="primary"
          onChange={handleChangePage}
        />

        <p className={s.paginationText}>Show</p>
        <Select
          value={pageCount.toString()}
          defaultValue={'4'}
          onChange={handleChangePacksPerPage}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
        <p className={s.paginationText}>Packs per page</p>
      </div>
    </div>
  )
}