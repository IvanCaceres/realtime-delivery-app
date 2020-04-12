import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { logout as logoutApi } from './../../../providers/Api'

export const logoutThunk = createAsyncThunk('user/logoutThunk', async () => {
    try {
        // call logout api request
        const response = await logoutApi()
        return
    } catch (err) {
        if (err) {
            throw err
        }
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(logoutThunk.fulfilled, (state) => {
            state.user = null
        })
    }
})

export const login = createAction<any>('user/login')
export const logout = createAction<any>('user/logout')

export const { setUser } = userSlice.actions

export default userSlice.reducer