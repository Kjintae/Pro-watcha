import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';


// 각 요청마다 액션타입을 세 개 선언해야되는데, 같은작업이 반복된다.
// 이와 같은 경우 액션타입을 한꺼번에 만드는 함수를 선언하는 방법

export const createRequestActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`; 
    const FAILURE = `${type}_FAILURE`; 
    return [type, SUCCESS, FAILURE];
}

export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`; 
    const FAILURE = `${type}_FAILURE`;
    
    return function*(action) {
        yield put(startLoading(type)); // 로딩시작
        try {
            const response = yield call(request, action.payload);
            yield put({
                type: SUCCESS,
                payload: response.data,
            });
        } catch(e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
        yield put(finishLoading(type)); // 로딩끝.
    }
}