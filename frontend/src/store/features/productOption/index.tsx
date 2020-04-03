import { createSlice, createAction } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'productOption',
    initialState: {
        productOption: null,
        submitSuccess: null,
        submitError: null,
    },
    reducers: {
        setProductOption(state, action) {
            state.productOption = action.payload
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
export const { setSubmitOutcome: setSubmitProductOptionOutcomeAction, clearSubmitOutcome: clearSubmitProductOptionOutcomeAction, setProductOption: setProductOptionAction } = slice.actions
export const getProductOptionAction = createAction<any>('productOption/get')
export const submitProductOptionAction = createAction<any>('productOption/submitForm')