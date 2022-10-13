import webpack, { Configuration } from 'webpack'
import middleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import configs from '../webpack.config'
import app from './express-app'
const config = configs[0]

const compiler = webpack(config as unknown as Configuration)

app.use(
  middleware(compiler, {
    serverSideRender: true,
    writeToDisk: true,

    publicPath: `${config.output.publicPath}`
  })
)

app.use(hotMiddleware(compiler, {
}))
