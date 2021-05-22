import app from './app'

const port = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
  require('./webpack-express')
}

app.listen(port, function listenHandler () {
  console.info(`Running on ${port}`)
})
