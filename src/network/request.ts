import axios from 'axios'
const instance = axios.create({

})

// 返回请求队列
// instance.list = []

// 请求拦截
instance.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截
instance.interceptors.response.use(response => {
    return response.data
}, error => {
    return Promise.reject(error)
})

export default instance
