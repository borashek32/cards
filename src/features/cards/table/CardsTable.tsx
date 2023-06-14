import React, {FC} from "react"
import s from 'features/packs/table/styles.module.css'
import {Card} from "features/cards/table/Card"
import {CardType} from "features/cards/cards.types"


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
              {/*add sort here*/}
              Updated At
            </td>
            <td className={s.table__colName}>
              Grade
            </td>
            {isOwner && <td className={s.table__colName}>
              Actions
            </td>}
          </tr>
          </thead>

          <tbody>
          {cards?.map((card) => <Card
            // handleStarRating={handleStarRating}
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