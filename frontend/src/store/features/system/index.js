import { createSlice, createAction } from '@reduxjs/toolkit'

const systemSlice = createSlice({
    name: 'system',
    initialState: {
        echo: null
    },
    reducers: {
        setEcho(state, action) {
            state.echo = action.payload
        }
    }
})

export const { setEcho } = systemSlice.actions
export const systemReducer = systemSlice.reducer