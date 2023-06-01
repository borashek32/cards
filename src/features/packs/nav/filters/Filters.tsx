import s from "features/packs/nav/styles.module.css"
import {Range} from "common/components/Range/Range"
import React, {FC, useCallback, useState} from "react"
import {useSelector} from "react-redux"
import {selectProfile} from "features/auth/auth.selectors"
import {FilterValueType} from "features/packs/packs.types"
import {packsActions} from "features/packs/packs.slice"
import {debounce} from "lodash"
import {useAppDispatch} from "common/hooks"


type Props = {
  authorizedUserId?: string
}

export const Filters: FC<Props> = ({authorizedUserId}) => {

  const dispatch = useAppDispatch()

  // "My" | "All"
  const profile = useSelector(selectProfile)

  const handleChangeFilterValue = (filterValue: FilterValueType) => {
    handleChangeFilter(filterValue)
  }

  const handleChangeFilter = (filterValue: FilterValueType) => {
    if (filterValue === "My") {
      dispatch(packsActions.setParams({params: {user_id: profile?._id}}))
    } else {
      dispatch(packsActions.setParams({params: {user_id: ''}}))
    }
  }

  // range min max cards count
  const [value, setValue] = useState<number[]>([0, 100])

  const handleChangeSliderValue = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      setValue(value)
      debouncedChangeSliderValue(value)
    }
  }

  const debouncedChangeSliderValue = useCallback(debounce((value: number[]) => {
    dispatch(packsActions.setParams({params: {min: value[0], max: value[1]}}))
  }, 1000), [])

  return (
    <>
      <div className={s.nav__showPackCards + " " + s.nav__position}>
        <p className={s.nav__filterTitle}>Show packs cards</p>
        <div className={s.nav__filterButtonsWrapper}>
          <button
            onClick={() => handleChangeFilterValue('My')}
            className={s.nav__filterButton + ' ' + (authorizedUserId && s.nav__filterButton_active)}
          >
            My
          </button>
          <button
            onClick={() => handleChangeFilterValue('All')}
            className={s.nav__filterButton + ' ' + (!authorizedUserId && s.nav__filterButton_active)}
          >
            All
          </button>
        </div>
      </div>

      <div className={s.nav__numberOfCards + " " + s.nav__position}>
        <p className={s.nav__filterTitle}>Number of cards</p>
        <div className={s.nav__rangeWrapper}>
          <div className={s.nav__rangeInput}>
            <p>{value[0]}</p>
          </div>
          <Range
            min={0}
            max={100}
            value={value}
            onChange={handleChangeSliderValue}
          />
          <div className={s.nav__rangeInput}>
            <p>{value[1]}</p>
          </div>
        </div>
      </div>
    </>
  )
}