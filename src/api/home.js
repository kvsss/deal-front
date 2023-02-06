import request from "@/utils/request";

export function listHomeGoods() {
    return request.get('/front/home/goods');
}