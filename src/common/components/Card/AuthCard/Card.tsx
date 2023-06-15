import s from 'common/components/Card/AuthCard/styles.module.css'
import {FC, ReactNode} from "react"
import React from 'react'


type PropsType = {
  children: ReactNode
  id: string
}

export const Card: FC<PropsType> = ({children, id}) => {

  const heightStyles = s.card + ' ' + (id === 'cards-Login' || id === 'cards-registration'
    ? s.card500
      : id === "cards-forgot-password"
      ? s.card400 : '')

  return (
    <div className={s.cardWrapper}>
      <div className={heightStyles} id={id}>
        {children}
      </div>
    </div>
  )
}