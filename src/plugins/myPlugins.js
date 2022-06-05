// Vue插件一定暴露一个对象
let myPlugins = {};

myPlugins.install = function (Vue, options){
    Vue.directive(options.name, (el, params) => {
        el.innerHTML = params.value.toUpperCase()
    })
}

export default myPlugins
