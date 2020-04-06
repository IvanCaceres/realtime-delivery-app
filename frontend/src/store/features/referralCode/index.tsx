import { createSlice, createAction } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'referralCode',
    initialState: {
        referralCodes: null,
        submitSuccess: null,
        submitError: null,
    },
    reducers: {
        setReferralCodes(state, action) {
            state.referralCodes = action.payload
        },
        clearSubmitOutcome(state) {
            state.submitSuccess = null
            state.submitError = null
        },
        setSubmitOutcome(state, action) {
            const { success, errors } = action.payload
            if (success) {
                state.submitSuccess = success
            } else {
                state.submitSuccess = null
            }

            if (errors) {
                state.submitError = errors
            } else {
                state.submitError = null
            }
        }
    }
})

export const reducer = slice.reducer
export const { setSubmitOutcome: setSubmitReferralCodeFormOutcomeAction, clearSubmitOutcome: clearSubmitReferralCodeFormOutcomeAction, setReferralCodes: setReferralCodesAction } = slice.actions
export const getReferralCodeAction = createAction<any>('referralCode/get')
export const submitReferralCodeFormAction = createAction<any>('referralCode/submitForm')