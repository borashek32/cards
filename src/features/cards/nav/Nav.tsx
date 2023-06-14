import React, {FC, useCallback} from "react"
import s from 'features/packs/nav/styles.module.css'
import {SubmitHandler} from "react-hook-form"
import {debounce} from "lodash"
import {useAppDispatch} from "common/hooks"
import {Search} from "common/components/Search/Search"
import {cardsActions} from "features/cards/cards.slice"
import noFilters from "assets/img/noFilters.svg"
import {useSelector} from "react-redux"
import {selectSearchCardAnswer, selectSearchCardQuestion} from "features/cards/cards.selectors"


type FormDataType = {
  searchFormValue: string
}

export const Nav: FC = () => {

  const dispatch = useAppDispatch()
  const question = useSelector(selectSearchCardQuestion)
  const answer = useSelector(selectSearchCardAnswer)
  console.log(question, answer)

  // to search cards by question
  const onSubmitQuestion: SubmitHandler<FormDataType> = useCallback(debounce((data: FormDataType) => {
    dispatch(cardsActions.setParams({ params: { cardQuestion: data.searchFormValue } }))
  }, 300), [])

  // to search cards by answer
  const onSubmitAnswer: SubmitHandler<FormDataType> = useCallback(debounce((data: FormDataType) => {
    dispatch(cardsActions.setParams({ params: { cardAnswer: data.searchFormValue } }))
  }, 300), [])

  // to reset search filters
  const resetFilters = () => {
    dispatch(cardsActions.setParams({
      params: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 5,
        sortCards: 0,
        page: 1,
        pageCount: 4
      }
    }))
  }


  return (
    <div className={s.nav}>
      <Search
        searchValue={question}
        onSubmit={onSubmitQuestion}
        title={"Search cards by question"}
      />
      <Search
        searchValue={answer}
        onSubmit={onSubmitAnswer}
        title={"Search cards by answer"}
      />

      <div className={s.nav__buttonWrapper}>
        <button
          onClick={resetFilters}
          className={s.nav__buttonNoFilters}
        >
          <img src={noFilters} alt="no filter img"/>
        </button>
      </div>
    </div>
  )
}