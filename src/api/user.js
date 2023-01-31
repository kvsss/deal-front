import request from '../utils/request'

export function register(params) {
    return request.post('/front/user/register', params);
}

export function login(params) {
    return request.post('/front/user/login', params)
}

export function getUserInfo(uid) {
    return request.get(`/front/user/userInfo/${uid}`);
}


export function updateUserInfo(userInfo) {
    return request.put('/front/user/updateUserInfo', userInfo);
}
