import React, {FC, useState} from "react"
import s from 'features/packs/table/styles.module.css'
import a from 'features/packs/table/styles.module.css'
import {Card} from "features/cards/table/Card"
import {CardType} from "features/cards/cards.types"
import downIcon from "assets/img/down.svg"
import {useAppDispatch} from "common/hooks"
import {cardsActions} from "features/cards/cards.slice"


type Props = {
  cardsPack_id?: string
  cards: CardType[]
  isOwner: boolean
}

export const CardsTable: FC<Props> = ({
                                        cardsPack_id,
                                        cards,
                                        isOwner
}) => {

  const dispatch = useAppDispatch()
  const [sort, setSort] = useState<'0grade' | '1grade'>('0grade')

  // sort
  const handleChangeSort = () => {
    if (sort === "0grade") {
      setSort("1grade")
    } else {
      setSort("0grade")
    }
    dispatch(cardsActions.setParams({ params: { sortCards: sort } }))
  }

  return (
    <div className={s.container}>
      <div>
        <table className={s.table} style={{marginTop: "38px"}}>
          <thead className={s.table__head}>
          <tr className={s.table__tr}>
            <td className={s.table__colName}>
              Question
            </td>
            <td className={s.table__colName}>
              Answer
            </td>
            <td className={s.table__colName}>
              Updated At
            </td>
            <td
              className={s.table__colName}
              onClick={handleChangeSort}
              style={{display: "flex", alignItems: "center", gap: "5px", cursor: "pointer"}}
            >
              <p>Grade</p>
              <img
                src={downIcon}
                className={sort === "1grade" ? a.arrowRevert : ''}
              />
            </td>
            <td className={s.table__colName}>
              Actions
            </td>
          </tr>
          </thead>

          <tbody>
          {cards?.map((card) => <Card
            isOwner={isOwner}
            cardsPack_id={cardsPack_id}
            key={card?._id}
            card={card}
          />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}