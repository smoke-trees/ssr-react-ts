import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
// import NewComp from './pages'
// import NewComp2 from './pages/index2'
import manifest from './static/public/manifest.json'

const NewComp = React.lazy(() => import('./pages'))
const NewComp2 = React.lazy(() => import('./pages/index2'))

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
console.log(manifest)

export function App (): JSX.Element {
  return (
    <>
      <html>
        <head>
          <script defer src='/public/js/vendor.js' />
        </head>
        <body>
          <Suspense fallback={<div>Loading</div>}>
            <Routes>
              <Route path='/test' element={<NewComp message='hello' name='123' />} />
              <Route path='/' element={<NewComp2 message='hello' name='123' />} />
            </Routes>
          </Suspense>
        </body>
      </html>
    </>
  )
}
