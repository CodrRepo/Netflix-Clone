import React from 'react'
import Page from './partials/Page'
import Search from './partials/Search'

const Person = () => {
  return (
    <>
    <div className='fixed left-[50%] -translate-x-[20%]'>

    <Search/>
    </div>
        <Page title={'People'} type={'person'} category={"popular"} uniqueCategoriesList={[]}/>
    </>
  )
}

export default Person