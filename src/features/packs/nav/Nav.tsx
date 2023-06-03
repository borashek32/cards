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
import {selectProfile} from "features/auth/auth.selectors"
import {FilterValueType} from "features/packs/packs.types"


type Props = {
  authorizedUserId?: string
}
type FormDataType = {
  searchValue: string
}

export const Nav: FC<Props> = ({authorizedUserId}) => {

  const dispatch = useAppDispatch()

  // to reset RangeFilter
  const resetFilters = () => {
    dispatch(packsActions.setParams({
      params: {
        page: 1,
        pageCount: 4,
        min: 0,
        max: 100,
        packName: '',
        user_id: '',
        filter: 'All',
      }
    }))
  }

  // All | My
  const profile = useSelector(selectProfile)

  const handleChangeFilter = (filterValue: FilterValueType) => {
    if (filterValue === "My") {
      dispatch(packsActions.setParams({params: {user_id: profile?._id}}))
    } else {
      dispatch(packsActions.setParams({params: {user_id: ''}}))
    }
  }

  // to search packs
  const onSubmit: SubmitHandler<FormDataType> = useCallback(debounce((data: FormDataType) => {
    dispatch(packsActions.setParams({params: {packName: data.searchValue}}))
  }, 300), [])

  return (
    <div className={s.nav}>
      <Search onSubmit={onSubmit} title={"Search packs"} />

      <MyAllFilter
        authorizedUserId={authorizedUserId}
        handleChangeFilter={handleChangeFilter}
      />

      <RangeFilter />

      <div className={s.nav__buttonWrapper}>
        <button onClick={resetFilters} className={s.nav__buttonNoFilters}>
          <img src={noFilters} alt="no filter img"/>
        </button>
      </div>
    </div>
  )
}