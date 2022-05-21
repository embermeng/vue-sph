// 对API进行统一管理
import requests from "./request";
import mockRequest from './mockAjax'

// 三级联动接口
export const reqCategoryList = () => {
    //  发请求，返回结果是Promise对象
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

// 获取banner（Home首页轮播图）
export const reqGetBannerList = () => {
    return mockRequest.get('/banner')
}

// 获取floor数据
export const reqFloorList = () => {
    return mockRequest.get('/floor')
}