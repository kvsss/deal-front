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

export function publishGoods(params) {
    return request.post('/front/user/goods', params);
}

export function comment(params) {
    return request.post('/front/user/comment', params);
}

export function deleteComment(id, uid) {
    return request.delete(`/front/user/comment/${id}/${uid}`);
}

export function updateComment(id, uid, content) {
    return request.putForm(`/front/user/comment/${id}/${uid}`, content);
}
