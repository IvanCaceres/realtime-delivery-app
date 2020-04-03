import { createSlice, createAction } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'product',
    initialState: {
        product: null,
        products: [],
        submitSuccess: null,
        submitError: null,
    },
    reducers: {
        setProduct(state, action) {
            state.product = action.payload
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
export const { setSubmitOutcome: setSubmitProductOutcomeAction, clearSubmitOutcome: clearSubmitProductOutcomeAction, setProduct: setProductAction } = slice.actions
export const getProductAction = createAction<any>('product/get')
export const submitProductAction = createAction<any>('product/submitForm')