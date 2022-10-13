import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NewComp from './pages'

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import

export function App (): JSX.Element {
  return (
    <>
      <Routes>
        <Route path='/test' element={<NewComp message='hello' name='123' />} />
      </Routes>
    </>
  )
}
