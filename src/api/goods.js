import request from '../utils/request'

export function searchGoods(params) {
    return request.get('/front/search/goods', {params});
}

export function listCategory() {
    return request.get('/front/goods/category/list');
}

export function getGoodsById(goodsId) {
    return request.get(`/front/goods/${goodsId}`);
}

// 获得卖家信息
export function getSeller(goodsId) {
    return request.get(`/front/user/seller/${goodsId}`);
}


export function addVisitCount(params) {
    return request.post('/front/goods/visit', params);
}

export function listNewestComments(params) {
    return request.get('/front/goods/comment/newest_list', {params});
}


// 修改商品
export function updateGoodsInfo(goodsInfo) {
    return request.put('/front/goods/update', goodsInfo);
}

// 删除商品
export function deleteGoods(goodsId) {
    return request.delete(`/front/goods/delete/${goodsId}`);
}

// 下架商品
export function offGoods(goodsId) {
    return request.put(`/front/goods/offGoods/${goodsId}`);
}

// 上架商品
export function onGoods(goodsId) {
    return request.put(`/front/goods/onGoods/${goodsId}`);
}

// 同意上架
export function agreeOnGoods(uid, goodsId) {
    return request.put(`/front/goods/agreeOnGoods/${uid}/${goodsId}`);
}

// 拒绝上架
export function refuseOnGoods(uid, goodsId) {
    return request.put(`/front/goods/refuseOnGoods/${uid}/${goodsId}`);
}

// 平台商品下架
export function platformOffGoods(uid, goodsId) {
    return request.put(`/front/goods/platformOffGoods/${uid}/${goodsId}`);
}

