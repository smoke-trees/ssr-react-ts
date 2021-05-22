import React from 'react'
import { renderToString } from 'react-dom/server'
import Index from './pages/index'
import express from 'express'
import path from 'path'

// Server var
const app = express()

// View engine setup
app.set('views', path.join(__dirname, 'static', 'views'))
app.set('view engine', 'ejs')

// Middleware
app.use('/public', express.static(path.join(__dirname, 'static', 'public')))

// Routes
app.get('/', (req, res) => {
  const reactComp = renderToString(<Index message='Hello' name='Anshuman' />)
  res.status(200).render('index', { reactComp: reactComp })
})

export default app
