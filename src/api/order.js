import request from "@/utils/request";


// 取消交易
export function cancelOrder(orderId) {
    return request.put(`/front/order/cancel/${orderId}`);
}

// 完成交易
export function finishOrder(orderId) {
    return request.put(`/front/order/finish/${orderId}`);
}

// 修改订单信息
export function updateOrderInfo(orderInfo) {
    return request.put('/front/order/update', orderInfo);
}

