import React from "react"
import s from 'features/packs/styles.module.css'
import {Title} from "features/packs/title/Title"
import {Nav} from "features/packs/nav/Nav"
import {Table} from "features/packs/table/Table"

export const Packs = () => {


  return (
    <div className={s.pack}>
      <Title />
      <Nav />
      <Table />
    </div>
  )
}