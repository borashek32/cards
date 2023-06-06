import React, {ChangeEvent, FC} from "react"
import s from "features/packs/table/styles.module.css"
import {MenuItem, Pagination, Select, SelectChangeEvent} from "@mui/material"


type Props = {
  handleChangePacksPerPage: (event: SelectChangeEvent) => void
  handleChangePage: (event: ChangeEvent<unknown>, newPage: number) => void
  itemsTotalCount: number
  pageCount: number
  page?: number
}

export const CustomPagination: FC<Props> = ({
                                              itemsTotalCount,
                                              pageCount,
                                              page,
                                              handleChangePacksPerPage,
                                              handleChangePage
}) => {

  const newPageCount = Math.ceil(itemsTotalCount / pageCount)

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