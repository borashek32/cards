import React from 'react'
import s from 'common/components/Pagination/styles.module.css'
import Select from "common/components/Select/Select"
import Pagination from '@mui/material/Pagination'

export type SuperPaginationPropsType = {
  id?: string
  page: number
  onChange: (page: number, count: number) => void
}

const CustomPagination: React.FC<SuperPaginationPropsType> = (
  {
    page,
    onChange,
    id = 'hw15',
  }
) => {

  const onChangeSelect = (id: number) => {
    // пишет студент
    onChange(page, id)
  }

  return (
    <div className={s.pagination}>
      <Pagination
        id={id + '-pagination'}
        sx={{
          // стили для Pagination // пишет студент
        }}
        color="primary"
        shape="rounded"
        page={page}
        // onChange={onChangeCallback}
        hideNextButton
        hidePrevButton
      />

      <div className={s.container}>
        <span className={s.text1}>
          показать
        </span>

        <Select
          id={id + '-pagination-select'}
          st={{width: "50px", padding: "4px 6px", appearance: "none"}}
          options={[
            {id: 4, value: 4},
            {id: 7, value: 7},
            {id: 10, value: 10},
          ]}
          onChangeOption={onChangeSelect}
        />

        <span className={s.text2}>
          строк в таблице
        </span>
      </div>
    </div>
  )
}

export default CustomPagination
