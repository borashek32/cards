import s from "features/packs/nav/styles.module.css"
import {Range} from "common/components/Range/Range"
import React, {useCallback, useEffect, useState} from "react"
import {packsActions} from "features/packs/packs.slice"
import {debounce} from "lodash"
import {useAppDispatch} from "common/hooks"
import {useSelector} from "react-redux"
import {selectMaxCardsCount, selectMinCardsCount} from "features/packs/packs.selectors"


export const RangeFilter = () => {

  const dispatch = useAppDispatch()

  const minCardsCount = useSelector(selectMinCardsCount)
  const maxCardsCount = useSelector(selectMaxCardsCount)

  const [value, setValue] = useState<number[]>([minCardsCount as number, maxCardsCount as number])

  const handleChangeSliderValue = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      setValue(value)
      debouncedChangeSliderValue(value)
    }
  }

  const debouncedChangeSliderValue = useCallback(debounce((value: number[]) => {
    dispatch(packsActions.setParams({params: {min: value[0], max: value[1]}}))
  }, 1000), [])

  useEffect(() => {
    setValue([minCardsCount as number, maxCardsCount as number])
  }, [minCardsCount as number, maxCardsCount as number])

  return (
    <>
      <div className={s.nav__numberOfCards + " " + s.nav__position}>
        <p className={s.nav__filterTitle}>Number of cards</p>
        <div className={s.nav__rangeWrapper}>
          <div className={s.nav__rangeInput}>
            <p>{value[0]}</p>
          </div>
          <Range
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