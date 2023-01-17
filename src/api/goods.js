import request from '../utils/request'

export function searchGoods(params) {
    return request.get('/front/search/goods', { params });
}