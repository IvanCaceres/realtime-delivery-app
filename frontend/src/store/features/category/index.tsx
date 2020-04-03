import { createSlice, createAction } from '@reduxjs/toolkit'

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: null,
        categories: null,
        submitCategoryFormSuccess: null,
        submitCategoryFormError: null,
    },
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload
        },
        setCategory(state, action) {
            state.category = action.payload
        },
        clearSubmitOutcome(state) {
            state.submitCategoryFormSuccess = null
            state.submitCategoryFormError = null
        },
        setSubmitCategoryFormOutcome(state, action) {
            const { success, errors } = action.payload
            if (success) {
                state.submitCategoryFormSuccess = success
            } else {
                state.submitCategoryFormSuccess = null
            }

            if (errors) {
                state.submitCategoryFormError = errors
            } else {
                state.submitCategoryFormError = null
            }
        }
    }
})

export const categoryReducer = categorySlice.reducer
export const { setSubmitCategoryFormOutcome, clearSubmitOutcome: clearSubmitOutcomeAction, setCategory: setCategoryAction, setCategories: setCategoriesAction } = categorySlice.actions
export const getCategoryAction = createAction<any>('category/get')
export const submitCategoryFormAction = createAction<any>('category/submitForm')