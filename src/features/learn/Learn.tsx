import React, {useEffect} from "react"
import s from './styles.module.css'
import {LearnCardForm} from "features/learn/forms/LearnCardForm"
import {BackLink} from "common/components/BackLink/BackLink"
import {useSelector} from "react-redux"
import {selectPackId, selectPackName} from "features/learn/learn.selectors"
import {useNavigate} from "react-router-dom"


export const Learn = () => {

  const navigate = useNavigate()
  const packId = useSelector(selectPackId)
  const packName = useSelector(selectPackName)

  useEffect(() => {
    if (!packId) return navigate('/packs')
  }, [])

  return (
    <div className={s.learn__background}>
      <BackLink backPath={`/cards/${packId}`} backText={'Back to Cards list'} />
      <h1 className={s.learn__title}>{packName}</h1>
      <LearnCardForm />
    </div>
  )
}