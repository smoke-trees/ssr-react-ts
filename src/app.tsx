import express from 'express'
import path from 'path'
import React from 'react'
import Index from './pages/index'
import { RenderReact } from './utils/RenderReact'

// Server var
const app = express()

// View engine setup
app.set('views', path.join(__dirname, 'static', 'views'))
app.set('view engine', 'ejs')

// Middleware
app.use('/public', express.static(path.join(__dirname, 'static', 'public')))

// Routes
app.get('/', (req, res) => {
  // const reactComp = renderToString(<Index message='Hello' name='Anshuman' />)
  // res.status(200).render('index', { reactComp: reactComp })
  RenderReact(
    req,
    res,
    <Index message='Hello' name='Anshuman' />,
    'index',
    {
      charset: 'UTF-8',
      lang: 'en_US',
      seo: {
        metadata: {
          title: 'title',
          description: 'description'
        }
      },
      url: req.url
    }
  )
})

export default app
