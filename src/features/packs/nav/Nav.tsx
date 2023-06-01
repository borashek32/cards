import React, {FC} from "react"
import noFilters from 'assets/img/noFilters.svg'
import s from 'features/packs/nav/styles.module.css'
import {Filters} from "./filters/Filters"
import {SearchPacks} from "features/packs/nav/filters/SearchPacks"


type Props = {
  authorizedUserId?: string
}

export const Nav: FC<Props> = ({authorizedUserId}) => {


  return (
    <div className={s.nav}>
      <SearchPacks />

      <Filters authorizedUserId={authorizedUserId}/>

      <div className={s.nav__buttonWrapper}>
        <button className={s.nav__buttonNoFilters}>
          <img src={noFilters} alt="no filter img"/>
        </button>
      </div>
    </div>
  )
}