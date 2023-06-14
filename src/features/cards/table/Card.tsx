import React, {FC, useState} from "react"
import s from "features/packs/table/styles.module.css"
import pencil from "assets/img/pencil.svg"
import bin from "assets/img/bin.svg"
import {NavLink, useParams} from "react-router-dom"
import {CardGradeType, CardType} from "features/cards/cards.types"
import {DeleteCardForm} from "features/cards/forms/DeleteCardForm"
import {UpdateCardForm} from "features/cards/forms/UpdateCardForm"
import {StarRating} from "common/components/StarRating/StarRating"
import teacher from "assets/img/teacher.svg"
import {useAppDispatch} from "common/hooks"
import {learnActions} from "features/learn/learn.slice"
import {useSelector} from "react-redux"
import {selectPack} from "features/packs/packs.selectors"
import {selectPackName} from "features/learn/learn.selectors"
import {cardsThunks} from "features/cards/cards.slice"


type Props = {
  card: CardType
  key: string
  cardsPack_id?: string
  isOwner: boolean
}

export const Card: FC<Props> = ({
                                  card,
                                  cardsPack_id,
                                  isOwner
}) => {

  const dispatch = useAppDispatch()

  const packName = useSelector(selectPackName)

  const [editMode, setEditMode] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  // to handle the case where `card` is undefined or `c.created` is missing
  if (!card || !card.created) {
    return null
  }

  const createdDate = new Date(card.created)
  const updatedDate = new Date(card.updated)


  // handle star rating
  const handleRating = (value: CardGradeType) => {
    handleChangeStarRating(card.cardsPack_id, card._id, value)
  }

  const handleChangeStarRating = (cardsPack_id: string, card_id: string, value: CardGradeType) => {
    cardsPack_id && dispatch(cardsThunks.updateCardGrade({ cardsPack_id: cardsPack_id, card_id: card_id, grade: value }))
  }

  const setCardData = () => {
    dispatch(learnActions.setCardData({ data: {
        cardsPack_id: cardsPack_id || '',
        packName: packName,
        question: card.question,
        answer: card.answer
      }
    }))
  }

  return (
    <tr key={card._id} className={s.table__tr}>
      <td className={s.table__colValue}>
        <NavLink
          to={`/learn/${card._id}`}
          onClick={setCardData}
          className={s.table__link}
        >
          {card.question}
        </NavLink>
      </td>
      <td className={s.table__colValue}>
        {card.answer}
      </td>
      <td className={s.table__colValue}>
        {card.updated ? updatedDate.toLocaleString() : createdDate.toLocaleString()}
      </td>
      <td className={s.table__colValue}>
        <StarRating value={card.grade} handleStarRating={handleRating} />
      </td>
      <td className={s.table__colValue_actions}>
      {isOwner &&
        <div className={s.table__colValue_actionsWrapper + ' '
          + (isOwner && s.table__colValue_actionsWrapper_center)}>
          <>
            <img onClick={() => setEditMode(true)} src={pencil} alt="pencil"/>
            {editMode && <UpdateCardForm
              c={card}
              setEditMode={setEditMode}
            />}

            <img onClick={() => setDeleteModal(true)} src={bin} alt="bin"/>
            {deleteModal && <DeleteCardForm
              cardsPack_id={cardsPack_id}
              c={card}
              setDeleteModal={setDeleteModal}
            />}
          </>
        </div>}

        <NavLink
          to={`/learn/${card._id}`}
          onClick={setCardData}
        >
          <img
            src={teacher}
            alt="teacher"
            className={s.table__imgLearn}
          />
        </NavLink>
      </td>
    </tr>
  )
}