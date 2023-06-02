import React, {FC} from "react"
import {Card} from "common/components/Card/AuthCard/Card"
import styles from "features/auth/profile/styles.module.css"
import Button from "common/components/Button/Button"
import {TextField} from "@mui/material"
import i from "common/components/Input/styles.module.css"
import s from "features/packs/forms/styles.module.css"
import {useAppDispatch} from "common/hooks"
import {SubmitHandler, useForm} from "react-hook-form"
import {toast} from "react-toastify"
import {Footer} from "common/components/Footer/Footer"
import closeImg from 'assets/img/close.svg'
import {LeftTitle} from "common/components/Title/LeftTitle/LeftTitle"
import {cardsThunks} from "features/cards/cards.slice"
import {CardType} from "features/cards/cards.types"


type Props = {
  setEditMode: (editMode: boolean) => void
  c: CardType
}
type FormDataType = {
  card: CardType
}

export const UpdateCardForm: FC<Props> = ({setEditMode, c}) => {

  const dispatch = useAppDispatch()
  const {register, formState: {errors}, handleSubmit} = useForm<FormDataType>({mode: "onChange"})

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    dispatch(cardsThunks.updateCard({...c, question: data.card.question, answer: data.card.answer}))
      .unwrap()
      .then(() => {
        toast.success("Card was updated successfully")
      })
    setEditMode(false)
  }


  return (
    <div className={s.background}>
      <Card id={'cards-profile'}>
        <div className={s.closeImgWrapper}>
          <img src={closeImg} alt="close image" className={s.closeImg} onClick={() => setEditMode(false)}/>
        </div>
        <LeftTitle title={"Add New Card"}/>
        <div className={styles.profile__wrapper}>
          <form onSubmit={handleSubmit(onSubmit)} action="#" autoComplete={'off'} style={{width: "350px"}}>
            <p className={i.inputLabel}>Question</p>
            <TextField
              fullWidth={true}
              variant={"standard"}
              autoComplete="off"
              className={i.input}
              {...(register("card.question", {
                required: "Question field is required",
                minLength: {
                  value: 3,
                  message: "Min length of card question field is 3 symbols"
                }
              }))}
              defaultValue={c.question}
              type="text"
            />
            {errors.card?.question && <span className={i.error}>{errors.card.question.message}</span>}

            <p className={i.inputLabel}>Answer</p>
            <TextField
              fullWidth={true}
              variant={"standard"}
              autoComplete="off"
              className={i.input}
              {...(register("card.answer", {
                required: "Answer field is required",
                minLength: {
                  value: 3,
                  message: "Min length of card answer field is 3 symbols"
                }
              }))}
              defaultValue={c.answer}
              type="text"
            />
            {errors.card?.answer && <span className={i.error}>{errors.card.answer.message}</span>}

            <Footer>
              <Button name={"Update"} xType={"default"}/>
            </Footer>
          </form>
        </div>
      </Card>
    </div>
  )
}