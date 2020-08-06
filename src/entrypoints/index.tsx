import React from 'react'
import { hydrate } from 'react-dom'
import NewComp from '../pages/index'

hydrate(<NewComp message='Hello' name='Anshuman' />, document.getElementById('react-root'))
