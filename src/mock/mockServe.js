// 先引入mockjs模块
import Mock from 'mockjs'
// 把JSON数据引入
import banner from './banner.json'
import floor from './floors.json'

// mock数据: 第一个参数：请求地址，第二个参数：请求数据
Mock.mock('/mock/banner',{code: 200, data: banner}) // 模拟首页大轮播图数据
Mock.mock('/mock/floor', {code: 200, data: floor})