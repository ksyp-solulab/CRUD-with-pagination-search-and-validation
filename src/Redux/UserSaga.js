import {put, takeEvery} from 'redux-saga/effects'
import {getUsersSuccess} from "./userSlice"
function* workGetUsersFetch(){
    // we can call api from hear.
    // we can also call "getUsersSuccess reducer from hear so it save the loaded data"
    yield put(getUsersSuccess(" "));
}
function* userSaga(){
    yield takeEvery('User/getUsers',workGetUsersFetch);
}

export default userSaga;