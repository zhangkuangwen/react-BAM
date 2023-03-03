import request from "./request"
let api="http://192.168.38.88:3000/"
export default {
    queryUserlist:(params:any)=>request.post(api+"userControl/queryUserlist",params),
    addUserInfo:(params:any)=>request.post(api+"userControl/addUserInfo",params),
    delectUserInfo:(params:any)=>request.post(api+"userControl/delectUserInfo",params),
    updatetUserInfo:(params:any)=>request.post(api+"userControl/updatetUserInfo",params),
}