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

export function goodsOrder(params) {
    return request.post('/front/user/goodsOrder', params);
}

//获得用户的上架商品
export function getPublicGoods(params) {
    return request.get('/front/user/publicInfo', {params});
}

// 获得下架商品
export function getOffGoods(params) {
    return request.get('/front/user/offInfo', {params});
}

// 获得卖出商品
export function getSellGoods(params) {
    return request.get('/front/user/sellInfo', {params});
}

// 获得买到商品
export function getBuyGoods(params) {
    return request.get('/front/user/buyInfo', {params});
}

// 获得申请中商品
export function getApplyGoods(params) {
    return request.get('/front/user/applyInfo', {params});
}

// 获得平台中上将中商品
export function getPlatformGoods(params) {
    return request.get('/front/user/goodsInfo', {params});
}

// 获得平台订单
export function getPlatformOrder(params) {
    return request.get('/front/user/platformOrder', {params});
}





