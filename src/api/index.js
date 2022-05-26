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

// 获取搜索模块数据 /api/list post
/*
    参数：
    {
        "category3Id": "61",
        "categoryName": "手机",
        "keyword": "小米",
        "order": "1:desc",
        "pageNo": 1,
        "pageSize": 10,
        "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
        "trademark": "4:小米"
    }
*/
export const reqGetSearchInfo = (arg) => {
    return requests({
        url: '/list',
        method: 'POST',
        data: arg
    })
}

// 获取详情页数据
export const reqProDetail = (proId) => {
    return requests({
        url: `/item/${proId}`,
        method: 'GET'
    })
}

// 将产品添加到购物车中，或更新某个产品个数
// /api/cart/addToCart/{ skuId }/{ skuNum } POST
export const reqAddOrUpdateCart = (id, count) => {
    return requests({
        url: `/cart/addToCart/${id}/${count}`,
        method: 'POST'
    })
}