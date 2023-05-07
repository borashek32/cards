import React from "react"
import noFilters from 'assets/img/noFilters.svg'
import search from '/assets/img/search.svg'
import s from 'features/packs/nav/styles.module.css'
import {Input} from "common/components/Input/Input"

export const Nav = () => {

  return (
    <div className={s.nav}>
      <div className={s.nav__search}>
        <p className={s.nav__searchTitle}>Search</p>
        <Input placeholder={"Provide your text"} type={"text"} />
      </div>
      <div className={s.nav__ShowPackCards}>

      </div>
      <div className={s.nav__numberOfCards}>

      </div>
      <div className={s.nav__buttonWrapper}>
        <button className={s.nav__buttonNoFilters}>
          <img src={noFilters} alt="no filter img"/>
        </button>
      </div>
    </div>
  )
}