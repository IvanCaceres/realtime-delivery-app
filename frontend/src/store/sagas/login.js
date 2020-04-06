import { take, call, put, cancelled, takeEvery } from 'redux-saga/effects'
import { login, logout, submitRegisterForm } from './../../providers/Api'
import { login as loginActionCreator, logout as logoutActionCreator, setUser } from './../features/user/userFeatures'
import { setRegisterSubmitOutcomeAction, submitRegisterFormAction } from './../features/system'

function* authorize({ payload }) {
    try {
        if (!payload) {
            payload = {}
        }
        let { loginData, history } = payload
        if (!loginData) {
            loginData = {}
        }
        const { username, password } = loginData
        const authResp = yield call(login, username, password)
        // let token = authResp.data.access_token
        // yield localStorage.setItem('token', token);
        if (history) {
            history.push('/')
        }
        yield put(setUser(authResp.data))
        // return token
    } catch (error) {
        console.error(error)
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

function* submitRegisterFormSaga({ payload }) {
    try {
        const res = yield call(submitRegisterForm, payload)
        let success = true
        yield put(setRegisterSubmitOutcomeAction({ success }))
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
            errors.push('Error submitting registration form.')
        }
        yield put(setRegisterSubmitOutcomeAction({ errors }))
    }
}


// export function* checkToken() {
//     const token = yield localStorage.getItem('token');
//     yield put(cacheToken(token))
// }

export function* watchSubmitRegisterForm() {
    yield takeEvery(submitRegisterFormAction.toString(), submitRegisterFormSaga)
}

export default function* watchLogin() {
    yield takeEvery(loginActionCreator.toString(), authorize)
}

export function* watchLogout() {
    yield takeEvery(logoutActionCreator.toString(), logoutSaga)
}