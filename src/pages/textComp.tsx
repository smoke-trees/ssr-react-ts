import React from 'react'
export default function TextComp (): JSX.Element {
  const [state, setState] = React.useState(1)

  return (
    <div>
      <h1>Page {state}</h1>
      <button onClick={() => setState(state + 1)}>Press</button>
    </div>

  )
}
