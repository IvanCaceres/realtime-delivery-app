import { createSlice, createAction } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setUser(state, action) {
            console.log('setting user', action.payload)
            state.user = action.payload
        }
    }
})

export const login = createAction<any>('user/login')
export const logout = createAction<any>('user/logout')

export const { setUser } = userSlice.actions

export default userSlice.reducer