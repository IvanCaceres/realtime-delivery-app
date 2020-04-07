import { createSlice, createAction } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        submitSuccess: null,
        submitError: null
    },
    reducers: {
        addCartItem(state: any, action: any) {
            state.cart = [...state.cart, action.payload]
            // state.cart.push(action.payload)
        },
        clearCart(state) {
            state.cart = []
        },
        removeFromCart(state: any, action: any) {
            state.cart = state.cart.filter((item: any) => {
                if (item.id === action.payload.id) {
                    return false
                }
                return true
            })
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
export const { addCartItem, clearCart, removeFromCart, clearSubmitOutcome: clearSubmitOrderOutcomeAction, setSubmitOutcome: setSubmitOrderOutcomeAction } = slice.actions
export const submitOrderAction = createAction<any>('cart/submitOrder')