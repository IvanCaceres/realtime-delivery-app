import { take, call, put, cancelled, takeEvery } from 'redux-saga/effects'
import { login, logout } from './../../providers/Api'
import { cacheToken } from './../features/user/userFeatures'
import { login as loginActionCreator, logout as logoutActionCreator } from './../features/user/userFeatures'

function* authorize({ payload }) {
    try {
        const { username, password } = payload
        const authResp = yield call(login, username, password)
        // let token = authResp.data.access_token
        // yield localStorage.setItem('token', token);
        // yield put(cacheToken(token))
        // history.push('/admin')
        // yield call(login.storeItem, { token })
        // return token
    } catch (error) {
        yield put({ type: 'LOGIN_ERROR', error })
    } finally {
        if (yield cancelled()) {
            // ... put special cancellation handling code here
        }
    }
}

function* logoutSaga({ payload }) {
    try {
        const authResp = yield call(logout, { token: payload.token })
        yield localStorage.removeItem('token');
        payload.history.push('/')
    } catch (error) {
        yield put({ type: 'LOGOUT_ERROR', error })
    } finally {
        if (yield cancelled()) {
            // ... put special cancellation handling code here
        }
    }
}

export function* checkToken() {
    const token = yield localStorage.getItem('token');
    yield put(cacheToken(token))
}

export default function* watchLogin() {
    yield takeEvery(loginActionCreator.toString(), authorize)
}

export function* watchLogout() {
    yield takeEvery(logoutActionCreator.toString(), logoutSaga)
}