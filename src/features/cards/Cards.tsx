import React, {ChangeEvent, useEffect, useState} from "react"
import s from 'features/packs/styles.module.css'
import t from "features/packs/title/styles.module.css"
import {Nav} from "features/cards/nav/Nav"
import {CreateCardForm} from "features/cards/forms/CreateCardForm"
import {useParams} from "react-router-dom"
import {CardsTable} from "features/cards/table/CardsTable"
import {BackLink} from "common/components/BackLink/BackLink"
import {useSelector} from "react-redux"
import {
  selectCards,
  selectCardsPackName, selectCardsParams,
  selectPackCardsCount,
  selectPackUserId,
  selectPage,
  selectPageCount
} from "features/cards/cards.selectors"
import Button from "common/components/Button/Button"
import {cardsActions, cardsThunks} from "features/cards/cards.slice"
import {toast} from "react-toastify"
import {useAppDispatch} from "common/hooks"
import {selectAuthorizedUserId} from "features/auth/auth.selectors"
import {CustomPagination} from "common/components/Pagination/CustomPagination"
import {SelectChangeEvent} from "@mui/material"
import {DropDownMenu} from "features/cards/dropDownMenu/DropDownMenu"
import {packsActions} from "features/packs/packs.slice"


export const Cards = () => {

  const dispatch = useAppDispatch()
  const {cardsPack_id} = useParams()
  const [openCreateModal, setOpenCreateModal] = useState(false)

  const cardsParams = useSelector(selectCardsParams)

  // selectors for cards page
  const cards = useSelector(selectCards)
  const packName = useSelector(selectCardsPackName)

  // selectors for pagination
  const page = useSelector(selectPage)
  const pageCount = useSelector(selectPageCount) ?? 4
  const cardsPackTotalCount = useSelector(selectPackCardsCount)

  // these are used to determine if authorized user is owner or not
  const packUserId = useSelector(selectPackUserId)
  const authorizedUserId = useSelector(selectAuthorizedUserId)
  const isOwner = authorizedUserId === packUserId

  // Pagination
  const handleChangePacksPerPage = (event: SelectChangeEvent) => {
    dispatch(cardsActions.setParams({ params: { pageCount: Number(event.target.value) } }))
  }

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    dispatch(cardsActions.setParams({ params: { page: newPage } }))
  }

  useEffect(() => {
    cardsPack_id && dispatch(packsActions.setSelectedPack({ _id: cardsPack_id }))
    dispatch(cardsThunks.getCards({_id: cardsPack_id}))
      .unwrap()
      .then((res) => {
        if (res.cardsPage.cardsTotalCount > 0) {
          toast.success("Cards loaded successfully")
        }
      })
  }, [cardsParams])

  return (
    <div className={s.packsWrapper}>
      <BackLink backPath={'/packs'} backText={'Back to Packs List'}/>
      {openCreateModal &&
        <CreateCardForm
          cardsPack_id={cardsPack_id}
          setOpenCreateModal={setOpenCreateModal}
        />}

      <div className={s.packs}>
        <div className={t.pack__titleWrapper}>
          <div className={t.pack__titleTextWrapper}>

            <h1 className={t.pack__title}>{packName}</h1>

            {isOwner && <div className={t.pack__titleIconWrapper}>
              <DropDownMenu />
            </div>}
          </div>

          {cards && cards.length > 0 && <div>
            <Button name={"Add new card"} xType={"default"} onClick={() => setOpenCreateModal(true)}/>
          </div>}
        </div>

        {cards.length > 0
          ? <div>
            <Nav />
            <CardsTable
              isOwner={isOwner}
              cards={cards}
              cardsPack_id={cardsPack_id}
            />
            <CustomPagination
              handleChangePage={handleChangePage}
              handleChangePacksPerPage={handleChangePacksPerPage}
              itemsTotalCount={cardsPackTotalCount}
              pageCount={pageCount}
              page={page}
            />
          </div>
          : <div className={s.emptyPackWrapper}>
            {isOwner
              ? <>
                <p className={s.addCardDesc}>
                  This pack is empty. Click add new card to fill this pack
                </p>
                <div className={s.buttonEmptyPackWrapper}>
                  <Button name={"Add new card"} xType={"default"} onClick={() => setOpenCreateModal(true)}/>
                </div>
              </>
              :
              <p className={s.addCardDesc}>
                This pack is empty
              </p>
            }
          </div>
        }
      </div>
    </div>
  )
}