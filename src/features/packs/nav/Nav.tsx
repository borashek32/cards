import React, {useState} from "react"
import noFilters from 'assets/img/noFilters.svg'
import s from 'features/packs/nav/styles.module.css'
import {SearchField} from "common/components/SearchField/SearchField"
import Range from "common/components/Range/Range"

export const Nav = () => {

  // filter my - all
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(100);

  const change = (event: Event, value: number | number[]) => {
    if (Number.isInteger(value)) {
      setValue1(value as number)
    } else if (Array.isArray(value)) {
      setValue1(value[0])
      setValue2(value[1])
    }
  };

  return (
    <div className={s.nav}>
      <SearchField label={"Search"} addedClass={s.nav__position}/>
      <div className={s.nav__showPackCards + " " + s.nav__position}>
        <p className={s.nav__filterTitle}>Show packs cards</p>
        <div className={s.nav__filterButtonsWrapper}>
          <button className={s.nav__filterButton}>My</button>
          <button className={s.nav__filterButton + ' ' + s.nav__filterButton_active}>All</button>
        </div>
      </div>
      <div className={s.nav__numberOfCards + " " + s.nav__position}>
        <p className={s.nav__filterTitle}>Number of cards</p>
        <div className={s.nav__rangeWrapper}>
          <input readOnly={true} type="number" className={s.nav__rangeInput}/>
          <Range value={[value1, value2]} onChange={change}/>
          <input readOnly={true} type="number" className={s.nav__rangeInput}/>
        </div>
      </div>
      <div className={s.nav__buttonWrapper}>
        <button className={s.nav__buttonNoFilters}>
          <img src={noFilters} alt="no filter img"/>
        </button>
      </div>
    </div>
  )
}