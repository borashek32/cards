import s from "features/packs/nav/styles.module.css"
import React, {FC} from "react"
import {useSelector} from "react-redux"
import {selectAuthorizedUserId} from "features/auth/auth.selectors"
import {selectParams} from "features/packs/packs.selectors"


type Props = {
  handleChangeFilter: (userId?: string) => void
}

export const MyAllFilter: FC<Props> = ({ handleChangeFilter }) => {

  const userId = useSelector(selectAuthorizedUserId)
  const { user_id } = useSelector(selectParams)

  return (
    <div className={s.nav__showPackCards + " " + s.nav__position}>
      <p className={s.nav__filterTitle}>Show packs cards</p>
      <div className={s.nav__filterButtonsWrapper}>
        <button
          onClick={() => handleChangeFilter(userId)}
          className={s.nav__filterButton + ' ' + (userId === user_id && s.nav__filterButton_active)}
        >
          My
        </button>
        <button
          onClick={() => handleChangeFilter('')}
          className={s.nav__filterButton + ' ' + (userId !== user_id && s.nav__filterButton_active)}
        >
          All
        </button>
      </div>
    </div>
  )
}