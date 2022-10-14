import compression from 'compression'
import express from 'express'
import path from 'path'
import React from 'react'
import { StaticRouter } from 'react-router-dom/server'
import { App } from './App'
import { RenderReactStream } from './utils/RenderReact'

// Server var
const app = express()

// View engine setup
app.set('views', path.join(__dirname, 'static', 'views'))
app.set('view engine', 'ejs')

console.log(app.get('views'))

// Middleware
app.use('/public', express.static(path.join(__dirname, 'static', 'public')))
app.use(compression({

}))

app.disable('x-powered-by')

// Routes
app.get('/test', (req, res) => {
  RenderReactStream(
    req,
    res,
    <StaticRouter location='/test'>
      <App />
    </StaticRouter>,
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
    },
    'index'
  )
})

app.get('/', (req, res) => {
  RenderReactStream(
    req,
    res,
    <StaticRouter location='/'>
      <App />
    </StaticRouter>,
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
    },
    'index2'
  )
})

export default app
