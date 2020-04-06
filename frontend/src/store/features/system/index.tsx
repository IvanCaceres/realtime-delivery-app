import { createSlice, createAction } from '@reduxjs/toolkit'

const systemSlice = createSlice({
    name: 'system',
    initialState: {
        echo: null,
        registerSubmitSuccess: null,
        registerSubmitError: null,
    },
    reducers: {
        setEcho(state, action) {
            state.echo = action.payload
        },
        clearRegisterSubmitOutcome(state) {
            state.registerSubmitSuccess = null
            state.registerSubmitError = null
        },
        setRegisterSubmitOutcome(state, action) {
            const { success, errors } = action.payload
            if (success) {
                state.registerSubmitSuccess = success
            } else {
                state.registerSubmitSuccess = null
            }

            if (errors) {
                state.registerSubmitError = errors
            } else {
                state.registerSubmitError = null
            }
        }
    }
})

export const { setEcho, setRegisterSubmitOutcome: setRegisterSubmitOutcomeAction, clearRegisterSubmitOutcome: clearRegisterSubmitOutcomeAction } = systemSlice.actions
export const systemReducer = systemSlice.reducer
export const submitRegisterFormAction = createAction<any>('register/submitForm')