import React, { ReactElement, useState } from 'react'

import './index.css'
import './index1.scss'
import lina from '../assets/lina.jpg'

interface Message {
  message: string;
  name: string;
}

const NewComp: React.FC<Message> = ({ message, name }) => {
  const [count, setCount] = useState(1)
  const incrementCount = async () => {
    setCount(count + 1)
  }
  const decrementCount = () => {
    setCount(count - 1)
  }
  return (
    <div>
      <h1>{message}, {name}! Count : {count}</h1>
      <button onClick={incrementCount}> Press Me!</button>
      <button onClick={decrementCount}>Don&apos;t Press Me!</button>
      <br />
      <img src={lina} />
    </div>
  ) as ReactElement
}

export default NewComp
