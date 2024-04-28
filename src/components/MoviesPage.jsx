import React from 'react'
import Page from './partials/Page'


const MoviesPage = () => {
  return (
    <>
        <Page title={'movies'} type={'movie'} category={"popular"} uniqueCategoriesList={['popular', 'now_playing', 'top_rated', 'upcoming']}/>
    </>
  )
}

export default MoviesPage