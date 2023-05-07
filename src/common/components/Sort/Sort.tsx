import React from 'react'
import noneI from 'common/components/Sort/none.png'
import upI from 'common/components/Sort/up.png'
import downI from 'common/components/Sort/down.png'
import s from 'common/components/Sort/styles.module.css'

// добавить в проект иконки и импортировать
const downIcon = downI
const upIcon = upI
const noneIcon = noneI

export type SuperSortPropsType = {
  id?: string
  sort: string
  value: string
  onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
  // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
  if (sort === '') return down
  if (sort === down) return up
  if (sort === up) return '' // исправить
  else return down
}


const Sort: React.FC<SuperSortPropsType> = (
  {
    sort,
    value,
    onChange,
    id = 'hw15'
  }
) => {

  const up = '0' + value
  const down = '1' + value

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up))
  }

  const icon = sort === down
    ? downIcon
    : sort === up
      ? upIcon
      : noneIcon

  return (
    <span
      id={id + '-sort-' + value}
      onClick={onChangeCallback}
    >
      <img
        id={id + '-icon-' + sort}
        src={icon}
        className={s.icon}
      />
    </span>
  )
}

export default Sort
