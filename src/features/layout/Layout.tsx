import React, {FC, ReactNode} from 'react'
import s from 'features/layout/styles.module.css'
import {UpdatePackForm} from "features/packs/forms/UpdatePackForm"
import {selectEditPackMode, selectPack} from "features/packs/packs.selectors"
import {useSelector} from "react-redux"

type PropsType = {
  children: ReactNode
}

export const Layout: FC<PropsType> = ({children}) => {

  const editMode = useSelector(selectEditPackMode)
  const p = useSelector(selectPack)

  return (
    <div className={s.layout}>
      <div className={s.layoutContainer}>
        {editMode && <UpdatePackForm p={p} />}
        {children}
      </div>
    </div>
  )
}
