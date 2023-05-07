import React, {useEffect, useState} from "react"
import {useSearchParams} from 'react-router-dom'
import axios from "axios"
import {LinearProgress} from "@mui/material"
import {useAppSelector} from "common/hooks"
import s from 'features/packs/table/styles.module.css'
import Sort from "common/components/Sort/Sort"
import CustomPagination from "common/components/Pagination/CustomPagination"
import teacher from 'assets/img/teacher.svg'
import pencil from 'assets/img/pencil.svg'
import bin from 'assets/img/bin.svg'


type TechType = {
  id: number
  tech: string
  developer: string
}

type ParamsType = {
  sort: string
  page: number
  count: number
}

const getTechs = (params: ParamsType) => {
  return axios
    .get<{ techs: TechType[], totalCount: number }>(
      'https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test3',
      {params}
    )
    .catch((e) => {
      // alert(e.response?.data?.errorText || e.message)
    })
}

export const Table = () => {

  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(4)
  const [idLoading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(100)
  const [searchParams, setSearchParams] = useSearchParams(`?page=1&count=4`)
  const [techs, setTechs] = useState<TechType[]>([])
  const isLoading = useAppSelector((state) => state.app.isLoading)

  const sendQuery = (params: ParamsType) => {
    setLoading(true)

    // setTimeout(() => {
    getTechs(params)
      .then((res) => {
        // делает студент
        setLoading(false)
        // сохранить пришедшие данные
        if (res) {
          setTechs(res.data.techs)
          setTotalCount(res.data.totalCount)
        }
        //
      })
    // }, 600)
  }

  const onChangePagination = (newPage: number, newCount: number) => {
    // делает студент
    setPage(newPage)
    setCount(newCount)
    setSearchParams({page: page.toString(), count: count.toString()})
    sendQuery({page: newPage, count: newCount, sort})
    //
  }

  const onChangeSort = (newSort: string) => {
    // делает студент
    setPage(1)
    setSort(newSort)
    // setSearchParams(`?sort=${newSort}`)
    sendQuery({page, count, sort: newSort})
    setSearchParams({page: page.toString(), count: count.toString()})
    //
  }

  useEffect(() => {
    const params = Object.fromEntries(searchParams)
    sendQuery({page: +params.page, count: +params.count, sort})
    setPage(+params.page || 1)
    setCount(+params.count || 4)
  }, [searchParams, sort])

  const mappedTechs = techs.map(t => (
    <tr key={t.id} className={s.table__tr}>
      <td className={s.table__colValue}>
        {t.tech}
      </td>
      <td className={s.table__colValue_actions}>
        {t.developer}
      </td>
      <td className={s.table__colValue_actions}>
        {t.developer}
      </td>
      <td className={s.table__colValue_actions}>
        {t.developer}
      </td>
      <td className={s.table__colValue_actions}>
        {t.developer}
      </td>
      <td className={s.table__colValue_actions}>
        {t.developer}
      </td>
      <td className={s.table__colValue_actions}>
        <img src={teacher} alt="teacher"/>
        <img src={pencil} alt="pencil"/>
        <img src={bin} alt="bin"/>
      </td>
    </tr>
  ))


  return (
    <div className={s.container}>
      {isLoading && <div style={{paddingTop: "60px", marginBottom: "-60px"}}><LinearProgress/></div>}

      <table className={s.table} style={{marginTop: "38px"}}>
        <thead className={s.table__head}>
        <tr>
          <td className={s.table__colName}>
            Name
          </td>
          <td className={s.table__colName}>
            Cards
          </td>
          <td className={s.table__colName}>
            Last Updated
            <Sort sort={sort} value={'developer'} onChange={onChangeSort}/>
          </td>
          <td className={s.table__colName}>
            Created By
          </td>
          <td className={s.table__colName}>
            Cards
          </td>
          <td className={s.table__colName}>
            Actions
          </td>
        </tr>
        </thead>

        <tbody>{mappedTechs}</tbody>
      </table>

      <CustomPagination
        page={page}
        itemsCountForPage={count}
        totalCount={totalCount}
        onChange={onChangePagination}
      />
    </div>
  )
}