import React, { createContext } from 'react'

let defaultState: any = {
    echo: undefined
}

export const EchoContext = createContext(defaultState)
