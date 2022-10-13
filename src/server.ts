import app from './express-app'

const port = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
  require('./webpack-express')
}

app.get('/test1', (req, res) => {
  res.status(200).send('1234')
})

app.listen(port, function listenHandler () {
  console.info(`Running on ${port}`)
})
