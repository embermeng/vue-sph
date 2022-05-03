<template>
  <div>
      我是搜索
      <h1>params参数：{{$route.params.keyword}}</h1>
      <h1>query参数：{{$route.query.keys}}</h1>
  </div>
</template>

<script>
export default {
    name: 'Search',
    // 路由组件可以传递props
    props: ['keyword', "keys"]
}
</script>

<style>

</style>