import { getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'
import userReducer from './features/user/userFeatures'
import { categoryReducer } from './features/category'
import { reducer as productReducer } from './features/product'
import { reducer as featuredReducer } from './features/featured'
import { reducer as productOptionReducer } from './features/productOption'
import { reducer as referralCodeReducer } from './features/referralCode'
import { reducer as cartReducer } from './features/cart'
import { reducer as orderReducer } from './features/order'
import { systemReducer } from './features/system'
import watchLoginSaga, { checkToken, watchLogout, watchSubmitRegisterForm } from './sagas/login'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import {
    watchSubmitCategoryForm,
    watchGetFeatured,
    watchGetCategory,
    watchDeleteCategory,
    watchGetProduct,
    watchGetProductOption,
    watchSubmitFeaturedForm,
    watchDeleteFeaturedItem,
    watchSubmitProductForm,
    watchDeleteProduct,
    watchSubmitProductOptionForm,
    watchSubmitReferralCodeForm,
    watchGetReferralCode,
    watchGetHomeContent,
    watchSubmitOrder,
    watchGetOrder,
    watchGetOrdersAdmin,
    watchSubmitAdminOrderEdit
} from './sagas/api'

export const history = createBrowserHistory()

const createRootReducer = (history) => combineReducers({
    user: userReducer,
    category: categoryReducer,
    featured: featuredReducer,
    product: productReducer,
    productOption: productOptionReducer,
    referralCode: referralCodeReducer,
    system: systemReducer,
    cart: cartReducer,
    order: orderReducer,
    router: connectRouter(history)
})

export default function* rootSaga() {
    // yield checkToken()
    yield fork(watchLoginSaga)
    yield fork(watchLogout)
    yield fork(watchGetHomeContent)
    yield fork(watchGetCategory)
    yield fork(watchDeleteCategory)
    yield fork(watchGetFeatured)
    yield fork(watchGetProduct)
    yield fork(watchGetProductOption)
    yield fork(watchGetReferralCode)
    yield fork(watchGetOrder)
    yield fork(watchGetOrdersAdmin)
    yield fork(watchSubmitAdminOrderEdit)
    yield fork(watchSubmitCategoryForm)
    yield fork(watchDeleteFeaturedItem)
    yield fork(watchSubmitFeaturedForm)
    yield fork(watchSubmitProductForm)
    yield fork(watchDeleteProduct)
    yield fork(watchSubmitProductOptionForm)
    yield fork(watchSubmitReferralCodeForm)
    yield fork(watchSubmitRegisterForm)
    yield fork(watchSubmitOrder)
}

const sagaMiddleware = createSagaMiddleware()
const middleware = [routerMiddleware(history), ...getDefaultMiddleware(), sagaMiddleware]

function configureStore(preloadedState) {
    const createdStore = createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        compose(
            applyMiddleware(
                ...middleware
            ),
        ),
    )
    return createdStore
}

export const store = configureStore()

sagaMiddleware.run(rootSaga)

// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middleware
// - The Redux DevTools Extension is disabled for production
// - The middleware, batch, and devtools enhancers were automatically composed together