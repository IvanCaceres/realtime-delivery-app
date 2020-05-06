import { createSlice, createAction } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'featured',
    initialState: {
        featured: null,
        featuredItems: null,
        submitSuccess: null,
        submitError: null,
    },
    reducers: {
        setFeatured(state, action) {
            state.featured = action.payload
        },
        setFeaturedItems(state, action) {
            state.featuredItems = action.payload
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
export const { setSubmitOutcome: setSubmitFeaturedOutcomeAction, clearSubmitOutcome: clearSubmitFeaturedOutcomeAction, setFeatured: setFeaturedAction, setFeaturedItems: setFeaturedItemsAction } = slice.actions
export const getFeaturedAction = createAction<any>('featured/get')
export const submitFeaturedAction = createAction<any>('featured/submitForm')
export const deleteFeaturedAction = createAction<any>('featured/delete')