import s from "common/components/SearchField/styles.module.css"
import {Input} from "common/components/Input/Input"
import React, {FC} from "react"


type PropsType = {
  label: string
  addedClass?: string
  searchValue: string
  onChange: (searchValue: string) => void
}

export const SearchField: FC<PropsType> = ({
                                             label,
                                             addedClass,
                                             searchValue,
                                             onChange
}) => {

  console.log(searchValue)

  return (
    <div className={s.searchWrapper + " " + addedClass}>
      <p className={s.searchLabel}>{label}</p>
      <Input
        value={searchValue}
        onChange={onChange}
        placeholder={"Provide your text"}
        type={"text"}
        extraClass={s.searchInput}
      />
    </div>
  )
}