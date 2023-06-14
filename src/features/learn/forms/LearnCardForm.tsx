import React, {useState} from "react"
import {Card} from "common/components/Card/AuthCard/Card"
import Button from "common/components/Button/Button"
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material"
import l from "./../styles.module.css"
import {useSelector} from "react-redux"
import {selectCardAnswer, selectCardQuestion} from "features/learn/learn.selectors"


export const LearnCardForm = () => {

  const question = useSelector(selectCardQuestion)
  const answer = useSelector(selectCardAnswer)

  const [rateYourself, setRateYourself] = useState(false)

  const handleRateYourself = () => {
    setRateYourself(!rateYourself)
  }

  return (
    <Card id={'cards-profile'}>
      <div className={l.learn__wrapper}>
        <div>
          <p className={l.learn__questionAnswer}>
            Question:
            <span className={l.learn__questionAnswerFromCard}>{' ' + question}</span>
          </p>
          <p className={l.learn__triesQuantity}>Количество попыток ответов на вопрос: {10}</p>
        </div>
        {!rateYourself &&
          <Button name={"Show answer"} xType={"default"} onClick={handleRateYourself}/>}

        {rateYourself &&
          <div className={l.learn__answerWrapper}>
          <p className={l.learn__question} style={{marginBottom: '15px'}}>
            Answer:
            <span className={l.learn__questionAnswerFromCard}>{' ' + answer}</span>
          </p>
          <div className={l.learn__rate}>
            <p className={l.learn__questionAnswerFromCard}>Rate yourself:</p>
            <form>
              <FormGroup>
                <FormControlLabel control={<Checkbox/>} label="Did not know"/>
                <FormControlLabel control={<Checkbox/>} label="Forgot"/>
                <FormControlLabel control={<Checkbox/>} label="A lot of thought"/>
                <FormControlLabel control={<Checkbox/>} label="Confused"/>
                <FormControlLabel control={<Checkbox defaultChecked/>} label="Knew the answer"/>
              </FormGroup>
            </form>
          </div>
          <Button name={"Next"} xType={"default"}/>
        </div>}
      </div>
    </Card>
  )
}