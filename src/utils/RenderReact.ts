import { renderFile } from 'ejs'
import Express from 'express'
import path from 'path'
import { ReactElement } from 'react'
import { renderToNodeStream, renderToString } from 'react-dom/server'
import { backendLogger } from '../log/log'
import { RenderOptions } from '../renderTypes'

export async function RenderReactStream (req: Express.Request, res: Express.Response,
  node: ReactElement,
  renderOptions: Omit<RenderOptions, 'reactComponent'>, entryPointName = 'header'): Promise<void> {
  try {
    // const renderedHead = await renderFile(
    //   path.resolve(__dirname, '..', 'static', 'views', `${entryPointName}.ejs`),
    //   renderOptions
    // )
    res.set('Content-Type', 'text/html')
    res.set('X-Powered-By', 'SmokeTrees Digital, LLP')

    // res.write(renderedHead)
    const reactStream = renderToNodeStream(
      node
    )
    reactStream.on('error', (error) => {
      backendLogger.error(error)
      res.end()
    })
    reactStream.pipe(res, { end: false })
    reactStream.on('end', async () => {
      // const renderedFooter = await renderFile(
      //   path.resolve(__dirname, '..', 'static', 'views', 'footer.ejs'),
      //   renderOptions
      // )
      // res.write(renderedFooter)
      res.end()
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('<h1>Error</h1>')
  }
}

export async function RenderReactString (req: Express.Request, res: Express.Response,
  node: ReactElement,
  renderOptions: Omit<RenderOptions, 'reactComponent'>, entryPointName = 'header'): Promise<void> {
  try {
    const renderedHead = await renderFile(
      path.resolve(__dirname, '..', 'static', 'views', `${entryPointName}.ejs`),
      renderOptions
    )
    const reactRendered = renderToString(
      node
    )

    const renderedFooter = await renderFile(
      path.resolve(__dirname, '..', 'static', 'views', 'footer.ejs'),
      renderOptions
    )
    res.status(200).send(renderedHead + reactRendered + renderedFooter)
  } catch (error) {
    console.log(error)
    res.status(500).send('<h1>Error</h1>')
  }
}
