import React, {FC, useCallback} from "react"
import s from 'features/packs/nav/styles.module.css'
import {SubmitHandler} from "react-hook-form"
import {debounce} from "lodash"
import {useAppDispatch} from "common/hooks"
import {Search} from "common/components/Search/Search"
import {cardsActions} from "features/cards/cards.slice"


type Props = {
  authorizedUserId?: string
}

type FormDataType = {
  searchFormValue: string
}

export const Nav: FC<Props> = ({authorizedUserId}) => {

  const dispatch = useAppDispatch()

  // to search cards by question
  const onSubmitQuestion: SubmitHandler<FormDataType> = useCallback(debounce((data: FormDataType) => {
    dispatch(cardsActions.setParams({params: {cardQuestion: data.searchFormValue}}))
  }, 300), [])

  // to search cards by answer
  const onSubmitAnswer: SubmitHandler<FormDataType> = useCallback(debounce((data: FormDataType) => {
    dispatch(cardsActions.setParams({params: {cardAnswer: data.searchFormValue}}))
  }, 300), [])


  return (
    <div className={s.nav}>
      <Search
        onSubmit={onSubmitQuestion}
        title={"Search cards by question"}
      />
      <Search
        onSubmit={onSubmitAnswer}
        title={"Search cards by answer"}
      />
    </div>
  )
}