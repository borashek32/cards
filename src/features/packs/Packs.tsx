import React, {useEffect} from "react"
import s from 'features/packs/styles.module.css'
import {Title} from "features/packs/title/Title"
import {Nav} from "features/packs/nav/Nav"
import {Table} from "features/packs/table/Table"
import {useSelector} from "react-redux"
import {selectIsLoggedIn} from "features/auth/auth.selectors"
import {useNavigate} from "react-router-dom"

export const Packs = () => {

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  console.log('packs ', isLoggedIn)
  !isLoggedIn && navigate('/login')


  return (
    <div className={s.pack}>
      <Title />
      <Nav />
      <Table />
    </div>
  )
}