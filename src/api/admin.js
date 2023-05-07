import request from '../utils/request'

// 获得所用用户信息
export function getAllUserInfo(params) {
    return request.get('/behind/admin/userInfo', {params});
}

// 获得所有商品信息
export function getAllGoodsInfo(params) {
    return request.get('/behind/admin/goodsInfo', {params});
}

// 获得所有商品类别信息
export function getAllCategoryInfo(params) {
    return request.get('/behind/admin/categoryInfo', {params});
}

// 获得所有订单信息
export function getAllOrderInfo(params) {
    return request.get('/behind/admin/orderInfo', {params});
}

// 添加商品类型
export function addCategory(params) {
    return request.post('/behind/admin/category', params);
}

// 修改商品类型
export function updateCategory(params) {
    return request.put('/behind/admin/category', params);
}

// 删除商品类型
export function deleteCategory(uid, id) {
    return request.delete(`/behind/admin/category/${uid}/${id}`);
}

// 管理员下架商品
export function adminOffGoods(uid, id) {
    return request.put(`/behind/admin/goods/${uid}/${id}`);
}

// 管理员删除商品
export function adminDeleteGoods(uid, id) {
    return request.delete(`/behind/admin/goods/${uid}/${id}`);
}

// 禁用用户
export function disableUser(id, uid) {
    return request.put(`/behind/admin/user/${id}/${uid}`);
}

// 开启平台账号用户
export function enableUser(id, uid) {
    return request.put(`/behind/admin/platform/${id}/${uid}`);
}

// 删除用户
export function deleteUser(id, uid) {
    return request.delete(`/behind/admin/user/${id}/${uid}`);
}



// 管理员登录
export function adminLogin(params) {
    return request.post('/behind/admin/login', params);
}