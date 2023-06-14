import React, {FC, SetStateAction, useCallback} from "react"
import noFilters from 'assets/img/noFilters.svg'
import s from 'features/packs/nav/styles.module.css'
import {RangeFilter} from "common/components/Filters/RangeFilter"
import {Search} from "common/components/Search/Search"
import {useAppDispatch} from "common/hooks"
import {packsActions} from "features/packs/packs.slice"
import {SubmitHandler} from "react-hook-form"
import {debounce} from "lodash"
import {MyAllFilter} from "common/components/Filters/MyAllFilter"
import {FilterValueType} from "features/packs/packs.types"


type Props = {
  handleChangeFilter: (userId?: string) => void
  // setFilter: (filter: SetStateAction<FilterValueType>) => void
  resetFilters: () => void
  searchValue?: string
}
type FormDataType = {
  searchFormValue: string
}

export const Nav: FC<Props> = ({
                                 handleChangeFilter,
                                 // setFilter,
                                 resetFilters,
                                 searchValue
}) => {

  const dispatch = useAppDispatch()

  // to search packs
  const onSubmit: SubmitHandler<FormDataType> = useCallback(debounce((data: FormDataType) => {
    dispatch(packsActions.setParams({params: {packName: data.searchFormValue}}))
  }, 300), [])

  return (
    <div className={s.nav}>
      <Search
        searchValue={searchValue}
        onSubmit={onSubmit}
        title={"Search packs"}
      />

      <MyAllFilter handleChangeFilter={handleChangeFilter} />

      <RangeFilter />

      <div className={s.nav__buttonWrapper}>
        <button onClick={resetFilters} className={s.nav__buttonNoFilters}>
          <img src={noFilters} alt="no filter img"/>
        </button>
      </div>
    </div>
  )
}