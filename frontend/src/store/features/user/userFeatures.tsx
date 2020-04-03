import { createSlice, createAction } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null
    },
    reducers: {
        cacheToken(state, action) {
            state.token = action.payload
        }
    }
})

export const login = createAction<any>('user/login')
export const logout = createAction<any>('user/logout')

export const { cacheToken } = userSlice.actions

export default userSlice.reducer