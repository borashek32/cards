import React, {useEffect, useState} from "react"
import s from 'features/packs/styles.module.css'
import {Title} from "features/packs/title/Title"
import {Nav} from "features/packs/nav/Nav"
import {PacksTable} from "features/packs/table/PacksTable"
import {CreatePackForm} from "features/packs/forms/CreatePackForm"
import {BackLink} from "common/components/BackLink/BackLink"
import {packsThunks} from "features/packs/packs.slice"
import {useSelector} from "react-redux"
import {
  selectAuthorizedUserId,
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPacks,
  selectPage,
  selectPageCount,
  selectSearchValue
} from "features/packs/packs.selectors"
import {useAppDispatch} from "common/hooks"
import {CustomPagination} from "common/pagination/CustimPagination"


export const Packs = () => {

  const dispatch = useAppDispatch()
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const cardPacks = useSelector(selectPacks)
  const authorizedUserId = useSelector(selectAuthorizedUserId)
  const pageCount = useSelector(selectPageCount) ?? 4
  const page = useSelector(selectPage)
  const minCardsCount = useSelector(selectMinCardsCount)
  const maxCardsCount = useSelector(selectMaxCardsCount)
  const searchValue = useSelector(selectSearchValue)

  // fetch all packs with params
  useEffect(() => {
    dispatch(packsThunks.fetchPacks())
  }, [
    dispatch,
    authorizedUserId,
    page,
    pageCount,
    minCardsCount,
    maxCardsCount,
    searchValue
  ])

  return (
    <div className={s.packsWrapper}>
      <BackLink backPath={'/profile'} backText={'Back to Profile'} />
      {openCreateModal &&
        <CreatePackForm setOpenCreateModal={setOpenCreateModal}/>}
      <div className={s.packs}>
        <Title
          name={"Packs"}
          buttonName={"Add new pack"}
          setOpenCreateModal={setOpenCreateModal}
        />

        <Nav authorizedUserId={authorizedUserId}/>

        <PacksTable packsToRender={cardPacks}/>

        <CustomPagination />
      </div>
    </div>
  )
}