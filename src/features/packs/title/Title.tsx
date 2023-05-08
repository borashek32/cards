import s from "features/packs/title/styles.module.css"
import Button from "common/components/Button/Button"
import React from "react"
import {useAppDispatch} from "common/hooks"
import {packsThunks} from "features/packs/packs.slice"
import {toast} from "react-toastify"

export const Title = () => {

  const dispatch = useAppDispatch()

  const createPack = () => {
    const pack = {
      cardsPack: {name: "new name", deckCover: "url", private: false}
    }

    dispatch(packsThunks.createPack(pack))
      .unwrap()
      .then(() => {
        toast.success("New pack added successfully")
      })
      .catch((err) => {
        toast.error(err.e.response.data.error)
      })
  }

  return (
    <div className={s.pack__titleWrapper}>
      <h1 className={s.pack__title}>Packs</h1>
      <div>
        <Button name={"Add New Pack"} xType={"default"} onClick={createPack} />
      </div>
    </div>
  )
}