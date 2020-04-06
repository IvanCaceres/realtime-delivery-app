import { call, put, takeEvery } from 'redux-saga/effects'
import { submitCategoryFormAction, setSubmitCategoryFormOutcome, getCategoryAction, setCategoryAction, setCategoriesAction } from './../features/category'
import {
    getCategory,
    getProduct,
    getProductOption,
    getReferralCode,
    submitCategoryForm,
    getFeatured,
    submitFeaturedForm,
    submitProductForm,
    submitProductOptionForm,
    submitReferralCodeForm
} from './../../providers/Api'
import { submitProductAction, setSubmitProductOutcomeAction, getProductAction, setProductAction, setProductsAction } from '../features/product'
import { setFeaturedAction, setFeaturedItemsAction, setSubmitFeaturedOutcomeAction, submitFeaturedAction, getFeaturedAction } from './../features/featured'
import { submitProductOptionAction, setSubmitProductOptionOutcomeAction, getProductOptionAction, setProductOptionAction, setProductOptionsAction } from '../features/productOption'
import { setReferralCodesAction, setSubmitReferralCodeFormOutcomeAction, submitReferralCodeFormAction, getReferralCodeAction } from './../features/referralCode'

// category
function* getCategorySaga({ payload }) {
    try {
        const { id, queryParams } = payload
        const res = yield call(getCategory, id, queryParams)
        if (id) {
            yield put(setCategoryAction(res.data))
        } else {
            yield put(setCategoriesAction(res.data))
        }
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
            yield put(setCategoryAction(res.data))
        }
        yield put(setSubmitCategoryFormOutcome({ success }))
    } catch (error) {
        console.error(error)
        // grab all error messages
        let errors = []
        if (error.response.data) {
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

// productOption
function* getProductOptionSaga({ payload }) {
    try {
        const { id, queryParams } = payload
        const res = yield call(getProductOption, id, queryParams)
        if (id) {
            yield put(setProductOptionAction(res.data))
        } else {
            yield put(setProductOptionsAction(res.data))
        }
    } catch (error) {
        console.error(error)
    }
}

function* submitProductOptionSaga({ payload }) {
    try {
        const { name, id } = payload
        const res = yield call(submitProductOptionForm, name, id)
        let success = true
        if (res.data) {
            success = res.data
            yield put(setProductOptionAction(res.data))
        }
        yield put(setSubmitProductOptionOutcomeAction({ success }))
    } catch (error) {
        console.error(error)
        // grab all error messages
        let errors = []
        if (error.response.data) {
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
            errors.push('Error submitting product option form.')
        }
        yield put(setSubmitProductOptionOutcomeAction({ errors }))
    }
}

// featured item
function* getFeaturedSaga({ payload }) {
    try {
        const { id, queryParams } = payload
        const res = yield call(getFeatured, id, queryParams)
        if (id) {
            yield put(setFeaturedAction(res.data))
        } else {
            yield put(setFeaturedItemsAction(res.data))
        }
    } catch (error) {
        console.error(error)
    }
}

function* submitFeaturedSaga({ payload }) {
    try {
        const res = yield call(submitFeaturedForm, payload)
        let success = true
        if (res.data) {
            success = res.data
            yield put(setFeaturedAction(res.data))
        }
        yield put(setSubmitFeaturedOutcomeAction({ success }))
    } catch (error) {
        console.error(error)
        // grab all error messages
        let errors = []
        if (error.response.data) {
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
            errors.push('Error submitting product form.')
        }
        yield put(setSubmitFeaturedOutcomeAction({ errors }))
    }
}


// product
function* getProductSaga({ payload }) {
    try {
        const { id, queryParams } = payload
        const res = yield call(getProduct, id, queryParams)
        if (id) {
            yield put(setProductAction(res.data))
        } else {
            yield put(setProductsAction(res.data))
        }
    } catch (error) {
        console.error(error)
    }
}

function* submitProductSaga({ payload }) {
    try {
        const res = yield call(submitProductForm, payload)
        let success = true
        if (res.data) {
            success = res.data
            yield put(setProductAction(res.data))
        }
        yield put(setSubmitProductOutcomeAction({ success }))
    } catch (error) {
        console.error(error)
        // grab all error messages
        let errors = []
        if (error.response.data) {
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
            errors.push('Error submitting product form.')
        }
        yield put(setSubmitProductOutcomeAction({ errors }))
    }
}

// referral code
function* getReferralCodeSaga({ payload }) {
    try {
        const { queryParams } = payload
        const res = yield call(getReferralCode, queryParams)

        yield put(setReferralCodesAction(res.data))
    } catch (error) {
        console.error(error)
    }
}

function* submitReferralCodeFormSaga({ payload }) {
    try {
        const { quantity } = payload
        const res = yield call(submitReferralCodeForm, quantity)
        let success = true
        if (res.data) {
            success = res.data
            // yield put(setReferralCodeAction(res.data))
        }
        yield put(setSubmitReferralCodeFormOutcomeAction({ success }))
    } catch (error) {
        console.error(error)
        // grab all error messages
        let errors = []
        if (error.response.data) {
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
            errors.push('Error submitting referral code form.')
        }
        yield put(setSubmitReferralCodeFormOutcomeAction({ errors }))
    }
}

// watchers
export function* watchGetCategory() {
    yield takeEvery(getCategoryAction.toString(), getCategorySaga)
}

export function* watchGetFeatured() {
    yield takeEvery(getFeaturedAction.toString(), getFeaturedSaga)
}

export function* watchGetProduct() {
    yield takeEvery(getProductAction.toString(), getProductSaga)
}

export function* watchGetProductOption() {
    yield takeEvery(getProductOptionAction.toString(), getProductOptionSaga)
}

export function* watchGetReferralCode() {
    yield takeEvery(getReferralCodeAction.toString(), getReferralCodeSaga)
}

export function* watchSubmitReferralCodeForm() {
    yield takeEvery(submitReferralCodeFormAction.toString(), submitReferralCodeFormSaga)
}

export function* watchSubmitCategoryForm() {
    yield takeEvery(submitCategoryFormAction.toString(), submitCategoryFormSaga)
}

export function* watchSubmitFeaturedForm() {
    yield takeEvery(submitFeaturedAction.toString(), submitFeaturedSaga)
}

export function* watchSubmitProductForm() {
    yield takeEvery(submitProductAction.toString(), submitProductSaga)
}

export function* watchSubmitProductOptionForm() {
    yield takeEvery(submitProductOptionAction.toString(), submitProductOptionSaga)
}