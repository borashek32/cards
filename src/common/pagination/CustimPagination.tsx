import React, {ChangeEvent} from "react"
import s from "features/packs/table/styles.module.css"
import {MenuItem, Pagination, Select, SelectChangeEvent} from "@mui/material"
import {packsActions} from "features/packs/packs.slice"
import {useAppDispatch} from "common/hooks"
import {useSelector} from "react-redux"
import {selectCardPacksTotalCount, selectPage, selectPageCount} from "features/packs/packs.selectors"


export const CustomPagination = () => {

  const dispatch = useAppDispatch()
  const cardPacksTotalCount = useSelector(selectCardPacksTotalCount)
  const pageCount = useSelector(selectPageCount) ?? 4
  const page = useSelector(selectPage)

  // pagination
  const handleChangePacksPerPage = (event: SelectChangeEvent) => {
    dispatch(packsActions.setParams({params: {pageCount: Number(event.target.value)}}))
  }
  const newPageCount = Math.ceil(cardPacksTotalCount / pageCount)

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    dispatch(packsActions.setParams({params: {page: newPage}}))
  }

  return (
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
  )
}