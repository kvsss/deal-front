import axios from 'axios'
import router from '@/router'
import {ElMessage} from 'element-plus'
import {getToken, removeToken, removeNickName} from '@/utils/auth'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json'


// 请求发送前的拦截器
axios.interceptors.request.use(config => {
    // 给头部添加token
    config.headers['Authorization'] = getToken()
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})


// 返回结果拦截
axios.interceptors.response.use(res => {
    /*
        console.log(res)
        console.log(res.data)*/

    if (typeof res.data !== 'object') {
        // ElMessage.error('服务端异常！')
        // return Promise.reject(res)
    }
    if (res.data.code !== "00000") {
        if (res.data.message) {
            // ElMessage.error(res.data.message)
        }
        // 登录已过期
        if (res.data.code === 'A0230') {
            // 移除 token
            removeToken();
            removeNickName();
            router.push({path: '/login'})
        }
    }

    // 只返回数据
    return res
}, error => {
    // 请求发送失败
    ElMessage.error('网络异常！')
    Promise.reject(error)
})

export default axios