import React, {FC, useCallback} from "react"
import noFilters from 'assets/img/noFilters.svg'
import s from 'features/packs/nav/styles.module.css'
import {RangeFilter} from "common/components/Filters/RangeFilter"
import {Search} from "common/components/Search/Search"
import {useAppDispatch} from "common/hooks"
import {packsActions} from "features/packs/packs.slice"
import {SubmitHandler} from "react-hook-form"
import {debounce} from "lodash"
import {MyAllFilter} from "common/components/Filters/MyAllFilter"
import {useSelector} from "react-redux"
import {selectSearchPackName} from "features/packs/packs.selectors"


type FormDataType = {
  searchFormValue: string
}

export const Nav: FC = () => {

  const dispatch = useAppDispatch()
  const packName = useSelector(selectSearchPackName)

  // My | All
  const handleChangeFilter = (userId?: string) => {
    if (userId) {
      dispatch(packsActions.setParams({ params: { user_id: userId } }))
    } else {
      dispatch(packsActions.setParams({ params: { user_id: '' } }))
    }
  }

  // to search packs
  const onSubmit: SubmitHandler<FormDataType> = useCallback(debounce((data: FormDataType) => {
    dispatch(packsActions.setParams({ params: { packName: data.searchFormValue } }))
  }, 300), [])

  // to reset all filters
  const resetFilters = () => {
    dispatch(packsActions.setParams({
      params: {
        page: 1,
        pageCount: 4,
        min: 0,
        max: 100,
        packName: '',
        user_id: ''
      }
    }))
  }

  return (
    <div className={s.nav}>
      <Search
        searchValue={packName}
        onSubmit={onSubmit}
        title={"Search packs"}
      />

      <MyAllFilter handleChangeFilter={handleChangeFilter} />

      <RangeFilter />

      <div className={s.nav__buttonWrapper}>
        <button
          onClick={resetFilters}
          className={s.nav__buttonNoFilters}
        >
          <img src={noFilters} alt="no filter img"/>
        </button>
      </div>
    </div>
  )
}