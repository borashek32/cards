import s from "features/packs/title/styles.module.css"
import Button from "common/components/Button/Button"
import React, {FC} from "react"


type PropsType = {
  setOpenCreateModal: (openCreateModal: boolean) => void
}

export const Title: FC<PropsType> = ({setOpenCreateModal}) => {

  return (
    <div className={s.pack__titleWrapper}>
      <h1 className={s.pack__title}>Packs</h1>
      <div>
        <Button name={"Add New Pack"} xType={"default"} onClick={() => setOpenCreateModal(true)} />
      </div>
    </div>
  )
}