import { call, put, takeEvery } from 'redux-saga/effects'
import { submitCategoryFormAction, setSubmitCategoryFormOutcome, getCategoryAction, setCategoryAction } from './../features/category'
import { getCategory, getProductOption, submitCategoryForm, submitProductOptionForm } from './../../providers/Api'
import { submitProductOptionAction, setSubmitProductOptionOutcomeAction, getProductOptionAction, setProductOptionAction } from '../features/productOption'

// category
function* getCategorySaga({ payload: id }) {
    try {
        const res = yield call(getCategory, id)
        yield put(setCategoryAction(res.data))
    } catch (error) {
        console.error(error)
    }
}

function* submitCategoryFormSaga({ payload }) {
    try {
        const { name, id } = payload
        const res = yield call(submitCategoryForm, name, id)
        let success = true
        if (res.data) {
            success = res.data
        }
        yield put(setSubmitCategoryFormOutcome({ success }))
    } catch (error) {
        console.error(error)
        // grab all error messages
        let errors = []
        if (error.response.data) {
            console.log(error.response)
            if (error.response.data.message) {
                errors.push(error.response.data.message)
            }
            if (error.response.data.errors) {
                // loop through errors object
                // loop through error messages for each field
                for (const fieldErrors of Object.values(error.response.data.errors)) {
                    errors.push(...fieldErrors)
                }
            }
        }

        if (errors.length === 0) {
            errors.push('Error submitting category form.')
        }
        yield put(setSubmitCategoryFormOutcome({ errors }))
    }
}

function* getProductOptionSaga({ payload: id }) {
    try {
        const res = yield call(getProductOption, id)
        yield put(setProductOptionAction(res.data))
    } catch (error) {
        console.error(error)
    }
}

// productOption
function* submitProductOptionSaga({ payload }) {
    try {
        const { name, id } = payload
        const res = yield call(submitProductOptionForm, name, id)
        let success = true
        if (res.data) {
            success = res.data
        }
        yield put(setSubmitProductOptionOutcomeAction({ success }))
    } catch (error) {
        console.error(error)
        // grab all error messages
        let errors = []
        if (error.response.data) {
            console.log(error.response)
            if (error.response.data.message) {
                errors.push(error.response.data.message)
            }
            if (error.response.data.errors) {
                // loop through errors object
                // loop through error messages for each field
                for (const fieldErrors of Object.values(error.response.data.errors)) {
                    errors.push(...fieldErrors)
                }
            }
        }

        if (errors.length === 0) {
            errors.push('Error submitting category form.')
        }
        yield put(setSubmitProductOptionOutcomeAction({ errors }))
    }
}


// watchers
export function* watchGetCategory() {
    yield takeEvery(getCategoryAction.toString(), getCategorySaga)
}

export function* watchGetProductOption() {
    yield takeEvery(getProductOptionAction.toString(), getProductOptionSaga)
}

export function* watchSubmitCategoryForm() {
    yield takeEvery(submitCategoryFormAction.toString(), submitCategoryFormSaga)
}

export function* watchSubmitProductOptionForm() {
    yield takeEvery(submitProductOptionAction.toString(), submitProductOptionSaga)
}