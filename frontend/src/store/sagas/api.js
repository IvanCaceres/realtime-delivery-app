import { push } from 'connected-react-router'
import { call, put, takeEvery } from 'redux-saga/effects'
import { submitCategoryFormAction, setSubmitCategoryFormOutcome, getCategoryAction, setCategoryAction, setCategoriesAction } from './../features/category'
import {
    getHomeContent,
    getCategory,
    getProduct,
    getProductOption,
    getReferralCode,
    submitCategoryForm,
    getFeatured,
    submitFeaturedForm,
    deleteFeatured,
    submitProductForm,
    submitProductOptionForm,
    submitReferralCodeForm,
    submitOrder,
    getOrder,
    getAdminOrders,
    submitAdminOrderEdit
} from './../../providers/Api'
import { submitProductAction, setSubmitProductOutcomeAction, getProductAction, setProductAction, setProductsAction } from '../features/product'
import { setFeaturedAction, setFeaturedItemsAction, setSubmitFeaturedOutcomeAction, submitFeaturedAction, getFeaturedAction, deleteFeaturedAction } from './../features/featured'
import { submitProductOptionAction, setSubmitProductOptionOutcomeAction, getProductOptionAction, setProductOptionAction, setProductOptionsAction } from '../features/productOption'
import { setReferralCodesAction, setSubmitReferralCodeFormOutcomeAction, submitReferralCodeFormAction, getReferralCodeAction } from './../features/referralCode'
import {
    setHomeFeaturedAction,
    getHomeContentAction,
    setHomeProductsAction
} from './../features/system'
import { submitOrderAction, setSubmitOrderOutcomeAction } from '../features/cart'

import { getOrderAction, setOrderAction, setOrdersAction, getAdminOrdersAction, setAdminOrderAction, setSubmitAdminOrderEditOutcomeAction, submitAdminOrderEditFormAction } from '../features/order'


// get home content
function* getHomeContentSaga({ payload }) {
    try {
        const res = yield call(getHomeContent)
        if (res.data) {
            if (res.data.featured) {
                yield put(setHomeFeaturedAction(res.data.featured))
            }
            if (res.data.products) {
                yield put(setHomeProductsAction(res.data.products))
            }
        }
    } catch (error) {
        console.error(error)
    }
}

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

function* deleteFeaturedSaga({ payload }) {
    try {
        console.log('deleting featured saga')
        const res = yield call(deleteFeatured, payload)
        let success = true
        yield put(push('/admin/featured/view'))
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
            errors.push('Error deleting featured item.')
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

// order
function* getOrdersAdminSaga({ payload }) {
    if (!payload) {
        let payload = {}
    }
    try {
        const { id } = payload
        const res = yield call(getAdminOrders, id)
        if (id) {
            yield put(setAdminOrderAction(res.data))
        } else {
            yield put(setOrdersAction(res.data))
        }
    } catch (error) {
        console.error(error)
    }
}

function* getOrderSaga({ payload }) {
    try {
        const res = yield call(getOrder)
        yield put(setOrderAction(res.data))
    } catch (error) {
        console.error(error)
    }
}

function* submitAdminOrderEditSaga({ payload }) {
    try {
        const res = yield call(submitAdminOrderEdit, payload)
        let success = true
        // if (res.data) {
        // success = res.data
        // yield put(setProductAction(res.data))
        // }
        yield put(setSubmitAdminOrderEditOutcomeAction({ success }))
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
        yield put(setSubmitAdminOrderEditOutcomeAction({ errors }))
    }
}

function* submitOrderSaga({ payload }) {
    try {
        const res = yield call(submitOrder, payload)
        let success = true
        // if (res.data) {
        // success = res.data
        // yield put(setProductAction(res.data))
        // }
        yield put(setSubmitOrderOutcomeAction({ success }))
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
        yield put(setSubmitOrderOutcomeAction({ errors }))
    }
}

// watchers
export function* watchGetHomeContent() {
    yield takeEvery(getHomeContentAction.toString(), getHomeContentSaga)
}

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

export function* watchGetOrder() {
    yield takeEvery(getOrderAction.toString(), getOrderSaga)
}

export function* watchGetOrdersAdmin() {
    yield takeEvery(getAdminOrdersAction.toString(), getOrdersAdminSaga)
}

export function* watchSubmitAdminOrderEdit() {
    yield takeEvery(submitAdminOrderEditFormAction.toString(), submitAdminOrderEditSaga)
}


export function* watchSubmitOrder() {
    yield takeEvery(submitOrderAction.toString(), submitOrderSaga)
}

export function* watchSubmitReferralCodeForm() {
    yield takeEvery(submitReferralCodeFormAction.toString(), submitReferralCodeFormSaga)
}

export function* watchSubmitCategoryForm() {
    yield takeEvery(submitCategoryFormAction.toString(), submitCategoryFormSaga)
}

export function* watchDeleteFeaturedItem() {
    yield takeEvery(deleteFeaturedAction.toString(), deleteFeaturedSaga)
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