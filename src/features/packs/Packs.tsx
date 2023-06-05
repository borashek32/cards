import React, {ChangeEvent, useEffect, useState} from "react"
import s from 'features/packs/styles.module.css'
import {Title} from "features/packs/title/Title"
import {Nav} from "features/packs/nav/Nav"
import {PacksTable} from "features/packs/table/PacksTable"
import {CreatePackForm} from "features/packs/forms/CreatePackForm"
import {BackLink} from "common/components/BackLink/BackLink"
import {packsActions, packsThunks} from "features/packs/packs.slice"
import {useSelector} from "react-redux"
import {
  selectCardPacksTotalCount,
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPacks,
  selectPage,
  selectPageCount,
  selectSearchValue
} from "features/packs/packs.selectors"
import {useAppDispatch} from "common/hooks"
import {CustomPagination} from "common/components/pagination/CustomPagination"
import {SelectChangeEvent} from "@mui/material"
import {selectAuthorizedUserId} from "features/auth/auth.selectors"
import {FilterValueType} from "features/packs/packs.types"


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
  const cardPacksTotalCount = useSelector(selectCardPacksTotalCount)

  // My | All
  const [filter, setFilter] = useState<FilterValueType>("All")

  const handleChangeFilter = (filter: FilterValueType) => {
    if (filter === "My") {
      dispatch(packsActions.setParams({ params: { user_id: authorizedUserId } }))
    } else {
      dispatch(packsActions.setParams({ params: { user_id: '' } }))
    }
  }

  // pagination
  const handleChangePacksPerPage = (event: SelectChangeEvent) => {
    dispatch(packsActions.setParams({params: {pageCount: Number(event.target.value)}}))
  }

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    dispatch(packsActions.setParams({params: {page: newPage}}))
  }

  // fetch all packs with params
  useEffect(() => {
    dispatch(packsThunks.fetchPacks())
  }, [page, pageCount, minCardsCount, maxCardsCount, searchValue, filter])


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

        <Nav
          handleChangeFilter={handleChangeFilter}
          setFilter={setFilter}
          filter={filter}
        />

        <PacksTable
          authorizedUserId={authorizedUserId}
          packsToRender={cardPacks}
        />

        <CustomPagination
          handleChangePage={handleChangePage}
          handleChangePacksPerPage={handleChangePacksPerPage}
          pageCount={pageCount}
          page={page}
          itemsTotalCount={cardPacksTotalCount}
        />
      </div>
    </div>
  )
}