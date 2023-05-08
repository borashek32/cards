import React from 'react'
import s from 'common/errors/404/styles.module.css'
import error404 from 'common/errors/404/404.svg'

const Error404 = () => {
  return (
    <div className={s.wrapper}>
      <img src={error404} alt={'404'} className={s.error404}/>
    </div>
  )
}

export default Error404
