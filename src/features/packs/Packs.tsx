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
  selectParams,
  selectSearchValue
} from "features/packs/packs.selectors"
import {useAppDispatch} from "common/hooks"
import {CustomPagination} from "common/components/Pagination/CustomPagination"
import {SelectChangeEvent} from "@mui/material"


export const Packs = () => {

  const dispatch = useAppDispatch()
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const cardPacks = useSelector(selectPacks)
  const pageCount = useSelector(selectPageCount) ?? 4
  const page = useSelector(selectPage)
  const cardPacksTotalCount = useSelector(selectCardPacksTotalCount)
  const params = useSelector(selectParams)

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
  }, [params])

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

        <Nav />

        <PacksTable packsToRender={cardPacks}/>

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