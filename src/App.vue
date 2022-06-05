<template>
    <div id="app">
        <h1 v-upper="msg"></h1>
        <Header></Header>
        <!-- 路由组件出口的地方 -->
        <router-view></router-view>
        <!-- 在home search、detail、addcartsuccess显示，在login register隐藏 -->
        <Footer v-show="$route.meta.show"></Footer>
    </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
    name: "App",
    data() {
        return {
            msg: 'test'
        }
    },
    components: {
        Header,
        Footer,
    },
    mounted() {
        // 派发一个action，通知vuex发请求，获取数据，存储于仓库中
        this.$store.dispatch("categoryList");
    },
};
</script>

<style>
</style>
