import s from "features/packs/nav/styles.module.css"
import React, {FC, SetStateAction} from "react"
import {FilterValueType} from "features/packs/packs.types"


type Props = {
  handleChangeFilter: (filterValue: FilterValueType) => void
  setFilter: (filter: SetStateAction<FilterValueType>) => void
  filter: FilterValueType
}

export const MyAllFilter: FC<Props> = ({ handleChangeFilter, setFilter , filter }) => {

  const handleChangeFilterValue = (filterValue: FilterValueType) => {
    if (filterValue === "All") {
      setFilter("All")
    } else {
      setFilter("My")
    }
    handleChangeFilter(filterValue)
  }

  return (
    <div className={s.nav__showPackCards + " " + s.nav__position}>
      <p className={s.nav__filterTitle}>Show packs cards</p>
      <div className={s.nav__filterButtonsWrapper}>
        <button
          onClick={() => handleChangeFilterValue('My')}
          className={s.nav__filterButton + ' ' + (filter === "My" && s.nav__filterButton_active)}
        >
          My
        </button>
        <button
          onClick={() => handleChangeFilterValue('All')}
          className={s.nav__filterButton + ' ' + (filter === "All" && s.nav__filterButton_active)}
        >
          All
        </button>
      </div>
    </div>
  )
}