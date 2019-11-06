import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import  createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';


// 밑에있는 코드를 리펙토링
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
    'auth/REGISTER',
)

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
    'autu/LOGIN',
)



// const REGISTER = 'auth/REGISTER';
// const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
// const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

// const LOGIN = 'auth/LOGIN';
// const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
// const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export const changeField =  createAction(
    CHANGE_FIELD,
    ({ form, key, value }) =>({
        form, //signin, signup
        key, //email, passwrod, passwordConfirm
        value, //실제 바꾸려는값.
    }),
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form); //signup / signin

export const register = createAction(REGISTER, ({email, password}) => ({
    email,
    password,
}));

export const login = createAction(LOGIN, ({email, password}) => ({
    email,
    password,
}));

//사가생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);

}

const initialState = {
    register: {
        email: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        email: '',
        password: '',
    },
    auth: null,
    authError: null
};

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value }}) => 
            produce(state, draft => {
                draft[form][key] = value; // state.sign_up.username 을 바꾼다.
            }),
        [INITIALIZE_FORM]: (state, { payload: form}) =>({
            ...state,
            [form]: initialState[form],
            authError: null, // 폼 전환 시 회원 인증 초기화 
        }),
        // 회원가입 성공
        [REGISTER_SUCCESS]: (state, {payload: auth}) => ({
            ...state,
            authError: null,
            auth,
        }),
        // 회원가입 실패
        [REGISTER_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error,
        }),
        // 로그인 성공
        [LOGIN_SUCCESS]: (state, {payload: auth}) => ({
            ...state,
            authError: null,
            auth,
        }),
        // 로그인 실패
        [LOGIN_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error,
        }),
    },
    initialState,
);

export default auth;