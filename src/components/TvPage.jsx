import React from 'react'
import Page from './partials/Page'

const TvPage = () => {
  return (
    <>
        <Page title={'tv shows'} type={'tv'} category={"airing_today"} uniqueCategoriesList={['airing_today', 'on_the_air', 'popular', 'top_rated']}/>
    </>
  )
}

export default TvPage