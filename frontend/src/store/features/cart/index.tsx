import { createSlice, createAction } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
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
        }
    }
})

export const reducer = slice.reducer
export const { addCartItem, clearCart, removeFromCart } = slice.actions