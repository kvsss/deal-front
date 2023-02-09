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


export function addVisitCount(params) {
    return request.post('/front/goods/visit', params);
}

export function listNewestComments(params) {
    return request.get('/front/goods/comment/newest_list',{ params });
}
