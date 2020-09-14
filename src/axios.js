/*
* axios前后拦截
* */

import axios  from 'axios'
import ELement from 'element-ui'

axios.defaults.baseURL="http://127.0.0.1:9056"

//前置拦截
axios.interceptors.request.use(config =>{
    //发请求前做操作 比如head设置
    return config
}),

//后置拦截
axios.interceptors.response.use(response =>{
    var res = response.data;
    if(response.data.code==200){
        return response;
    }else{
        ELement.Message.error('账号密码输入错误,请重新输入',{ duration : 2*1000 });
    }
    //控制台返回错误 停止执行业务代码
    return Promise.reject(response.data.msg);
},
    error => {
        if(error.response.data){
            error.message = error.response.data.msg;
        }

        if(error.response.status === 401){
            store.commit("REMOVE_INFO");
            router.push("/login");
        }
        ELement.Message.error(error.message,{ duration : 2*1000});

        return Promise.reject(error.message);

    }

)
