import React, {FC, ReactNode} from 'react'
import {Header} from 'features/header/Header'
import s from 'features/layout/styles.module.css'

type PropsType = {
  children: ReactNode
}

export const Layout: FC<PropsType> = ({children}) => {

  return (
    <>
      <Header/>
      <div className={s.layout}>
        {children}
      </div>
    </>
  )
}
