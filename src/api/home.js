import request from "@/utils/request";

export function listHomeGoods() {
    return request.get('/front/home/goods');
}


export function listVisitRankGoods() {
    return request.get('/front/home/visit_rank');
}

export function listNewestRankGoods() {
    return request.get('/front/home/newest_rank');
}


// 列出平台商品
export function listPlatformGoods() {
    return request.get('/front/home/platform_goods');
}