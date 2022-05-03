// 对API进行统一管理
import requests from "./request";

// 三级联动接口
export const reqCategoryList = () => {
    //  发请求，返回结果是Promise对象
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}