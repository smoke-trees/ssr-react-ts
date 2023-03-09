import React, { ReactElement, Suspense, useState } from 'react'
import lina from '../assets/lina.jpg'
import './index.css'
import './index2.scss'

const TextComp = React.lazy(() => import('./textComp'))

interface Message {
  message: string;
  name: string;
}

const NewComp2: React.FC<Message> = ({ message, name }) => {
  const [count, setCount] = useState(1)
  const incrementCount = async () => {
    setCount(count + 43 + 1)
  }
  const decrementCount = () => {
    setCount(count - 1)
  }
  return (
    <div>
      <h1>Page 2 {message}, {name}! Fuck you Counts: {count}</h1>
      <button onClick={incrementCount}>Press Me! 123</button>
      <button onClick={decrementCount}>Don&apos;t Press Me!</button>
      <br />
      <Suspense>
        <TextComp />
      </Suspense>
      <img src={lina} />
    </div>
  ) as ReactElement
}

export default NewComp2
