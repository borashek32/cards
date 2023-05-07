import s from "features/packs/title/styles.module.css"
import Button from "common/components/Button/Button"
import React from "react"

export const Title = () => {

  return (
    <div className={s.pack__titleWrapper}>
      <h1 className={s.pack__title}>Packs</h1>
      <div>
        <Button  name={"Add Packs"} xType={"default"} />
      </div>
    </div>
  )
}