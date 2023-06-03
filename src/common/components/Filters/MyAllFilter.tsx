import s from "features/packs/nav/styles.module.css"
import React, {FC} from "react"
import {useAppDispatch} from "common/hooks"
import {useSelector} from "react-redux"
import {selectProfile} from "features/auth/auth.selectors"
import {FilterValueType} from "features/packs/packs.types"
import {cardsActions} from "features/cards/cards.slice"


type Props = {
  authorizedUserId?: string
  handleChangeFilter: (filterValue: FilterValueType) => void
}

export const MyAllFilter: FC<Props> = ({
                                         authorizedUserId,
                                         handleChangeFilter
}) => {

  const handleChangeFilterValue = (filterValue: FilterValueType) => {
    handleChangeFilter(filterValue)
  }

  return (
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
  )
}