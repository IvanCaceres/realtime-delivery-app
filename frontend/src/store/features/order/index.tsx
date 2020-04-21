import { createSlice, createAction } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'order',
    initialState: {
        adminOrder: null,
        order: null,
        orders: null,
        success: null,
        error: null,
        adminSubmitSuccess: null,
        adminSubmitError: null
    },
    reducers: {
        setOrder(state, action) {
            state.order = action.payload
        },
        clearOrder(state, action) {
            state.order = null
        },
        setOrders(state, action) {
            state.orders = action.payload
        },
        setAdminOrder(state, action) {
            state.adminOrder = action.payload
        },
        clearOrderUpdateOutcome(state) {
            state.success = null
            state.error = null
        },
        clearSubmitAdminOrderEditOutcome(state) {
            state.adminSubmitSuccess = null
            state.adminSubmitError = null
        },
        setSubmitAdminOrderEditOutcome(state, action) {
            const { success, errors } = action.payload
            if (success) {
                state.adminSubmitSuccess = success
            } else {
                state.adminSubmitSuccess = null
            }

            if (errors) {
                state.adminSubmitError = errors
            } else {
                state.adminSubmitError = null
            }
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
        },

    }
})

export const reducer = slice.reducer
export const {
    setOrderUpdateOutcome: setOrderUpdateOutcomeAction,
    clearOrder: clearOrderAction,
    clearOrderUpdateOutcome: clearOrderUpdateOutcomeAction,
    setOrder: setOrderAction,
    setOrders: setOrdersAction,
    setAdminOrder: setAdminOrderAction,
    clearSubmitAdminOrderEditOutcome: clearSubmitAdminOrderEditOutcomeAction,
    setSubmitAdminOrderEditOutcome: setSubmitAdminOrderEditOutcomeAction
} = slice.actions

export const getOrderAction = createAction<any>('order/get')
export const getAdminOrdersAction = createAction<any>('order/getAdmin')
export const submitAdminOrderEditFormAction = createAction<any>('order/admin/edit')