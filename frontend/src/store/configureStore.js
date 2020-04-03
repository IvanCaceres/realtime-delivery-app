import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'
import userReducer from './features/user/userFeatures'
import { categoryReducer } from './features/category'
import watchLoginSaga, { checkToken, watchLogout } from './sagas/login'
import { watchSubmitCategoryForm, watchGetCategory } from './sagas/api'

const reducer = combineReducers({
    user: userReducer,
    category: categoryReducer
})

export default function* rootSaga() {
    // yield checkToken()
    yield fork(watchLoginSaga)
    yield fork(watchLogout)
    yield fork(watchGetCategory)
    yield fork(watchSubmitCategoryForm)
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