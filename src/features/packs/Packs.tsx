import React, {useState} from "react"
import s from 'features/packs/styles.module.css'
import {Title} from "features/packs/title/Title"
import {Nav} from "features/packs/nav/Nav"
import {Table} from "features/packs/table/Table"
import {CreatePackForm} from "features/packs/forms/CreatePackForm"

export const Packs = () => {

  const [openCreateModal, setOpenCreateModal] = useState(false)


  return (
    <div className={s.packsWrapper}>
      {openCreateModal && <CreatePackForm setOpenCreateModal={setOpenCreateModal} />}
        <div className={s.packs}>
          <Title setOpenCreateModal={setOpenCreateModal} />
          <Nav />
          <Table />
        </div>
    </div>
  )
}