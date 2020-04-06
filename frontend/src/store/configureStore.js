import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'
import userReducer from './features/user/userFeatures'
import { categoryReducer } from './features/category'
import { reducer as productReducer } from './features/product'
import { reducer as featuredReducer } from './features/featured'
import { reducer as productOptionReducer } from './features/productOption'
import { reducer as referralCodeReducer } from './features/referralCode'
import { systemReducer } from './features/system'
import watchLoginSaga, { checkToken, watchLogout, watchSubmitRegisterForm } from './sagas/login'
import {
    watchSubmitCategoryForm,
    watchGetFeatured,
    watchGetCategory,
    watchGetProduct,
    watchGetProductOption,
    watchSubmitFeaturedForm,
    watchSubmitProductForm,
    watchSubmitProductOptionForm,
    watchSubmitReferralCodeForm,
    watchGetReferralCode
} from './sagas/api'

const reducer = combineReducers({
    user: userReducer,
    category: categoryReducer,
    featured: featuredReducer,
    product: productReducer,
    productOption: productOptionReducer,
    referralCode: referralCodeReducer,
    system: systemReducer
})

export default function* rootSaga() {
    // yield checkToken()
    yield fork(watchLoginSaga)
    yield fork(watchLogout)
    yield fork(watchGetCategory)
    yield fork(watchGetFeatured)
    yield fork(watchGetProduct)
    yield fork(watchGetProductOption)
    yield fork(watchGetReferralCode)
    yield fork(watchSubmitCategoryForm)
    yield fork(watchSubmitFeaturedForm)
    yield fork(watchSubmitProductForm)
    yield fork(watchSubmitProductOptionForm)
    yield fork(watchSubmitReferralCodeForm)
    yield fork(watchSubmitRegisterForm)
}

const sagaMiddleware = createSagaMiddleware()
const middleware = [...getDefaultMiddleware(), sagaMiddleware]

export const store = configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
})

sagaMiddleware.run(rootSaga)

// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middleware
// - The Redux DevTools Extension is disabled for production
// - The middleware, batch, and devtools enhancers were automatically composed together