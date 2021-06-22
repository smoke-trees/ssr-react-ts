import { renderFile } from 'ejs'
import Express from 'express'
import { ReactElement } from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { RenderOptions } from '../renderTypes'
import path from 'path'

export async function RenderReact (req: Express.Request, res: Express.Response,
  node: ReactElement, entryPointName: string,
  renderOptions: Omit<RenderOptions, 'reactComponent'>): Promise<void> {
  try {
    const renderedHead = await renderFile(
      path.resolve(__dirname, '..', 'static', 'views', `${entryPointName}.ejs`),
      renderOptions
    )
    res.set('Content-Type', 'text/html')
    res.write(renderedHead)
    const reactStream = renderToNodeStream(node)
    reactStream.pipe(res, { end: false })
    reactStream.on('end', async () => {
      const renderedFooter = await renderFile(
        path.resolve(__dirname, '..', 'static', 'views', 'footer.ejs'),
        renderOptions
      )
      res.write(renderedFooter)
      res.end()
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('<h1>Error</h1>')
  }
}
