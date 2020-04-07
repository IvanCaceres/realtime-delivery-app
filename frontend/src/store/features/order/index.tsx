import { createSlice, createAction } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        success: null,
        error: null
    },
    reducers: {
        setOrder(state, action) {
            state.order = action.payload
        },
        clearOrderUpdateOutcome(state) {
            state.success = null
            state.error = null
        },
        setOrderUpdateOutcome(state, action) {
            const { success, errors } = action.payload
            if (success) {
                state.success = success
            } else {
                state.success = null
            }

            if (errors) {
                state.error = errors
            } else {
                state.error = null
            }
        }
    }
})

export const reducer = slice.reducer
export const { setOrderUpdateOutcome: setOrderUpdateOutcomeAction, clearOrderUpdateOutcome: clearOrderUpdateOutcomeAction, setOrder: setOrderAction } = slice.actions
// export const orderUpdateAction = createAction<any>('order/update')
export const getOrderAction = createAction<any>('order/get')