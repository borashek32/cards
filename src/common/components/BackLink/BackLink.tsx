import React, {FC} from "react"
import s from './styles.module.css'
import {NavLink} from "react-router-dom"
import back from 'assets/img/back.svg'
import {useAppDispatch} from "common/hooks"
import {cardsActions} from "features/cards/cards.slice"


type Props = {
  backPath: string
  backText: string
}

export const BackLink: FC<Props> = ({backPath, backText}) => {

  const dispatch = useAppDispatch()

  const resetCardsFilters = () => {
    if (backText === "Back to Packs List") dispatch(cardsActions.setParams({params: {
        cardAnswer: '',
        cardQuestion: '',
        min: 0,
        max: 5,
        sortCards: '0grade',
        page: 1,
        pageCount: 4,
      }}))
  }

  return (
    <div className={s.linkWrapper}>
      <NavLink onClick={resetCardsFilters} to={backPath} className={s.link}>
        <img src={back} alt="back" className={s.linkImg}/>
        <p className={s.linkText}>{backText}</p>
      </NavLink>
    </div>
  )
}