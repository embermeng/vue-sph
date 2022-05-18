<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委托 -->
      <div @mouseleave="removeIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <div class="all-sort-list2">
              <!-- 利用事件委派+编程式导航实现路由的跳转与传递参数 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                v-bind:key="c1.categoryId"
                @mouseenter="changeIndex(index)"
                :class="currentIndex === index ? 'cur' : ''"
                @click="goSearch"
              >
                <h3>
                  <a
                    v-bind:data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级三级分类 -->
                <div
                  class="item-list clearfix"
                  v-bind:style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          v-bind:data-categoryName="c2.categoryName"
                          :data-category2Id="c1.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            v-bind:data-categoryName="c3.categoryName"
                            :data-category3Id="c1.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 把lodash全部功能函数引入
// 最好按需加载
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪个以及分类
      currentIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕，向服务器发请求
  mounted() {
    // 如果不是Home路由组件，将TypeNav隐藏
    if (!this.$route.path.includes("home")) {
      this.show = false;
    } else {
      this.show = true;
    }
  },
  computed: {
    ...mapState({
      // 对象写法右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      // 注入一个参数state，即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    // throttle回调函数别用箭头函数，可能出现this问题
    changeIndex: throttle(function (index) {
      // 正常情况（用户慢慢操作）：鼠标进入，每一个一级分类都会触发鼠标进入事件
      /* 
        非正常情况（用户操作很快）：本身全部一级分类都应该触发鼠标进入事件，但是经过测试，只有部分触发。
        就是由于用户行为过快，导致浏览器反应不过来。
        如果当前回调函数中有一些大量业务，有可能出现卡顿现象
      */
      this.currentIndex = index;
    }, 50),
    // 一级分类鼠标移出的事件回调
    removeIndex() {
      this.currentIndex = -1;
      // 除了Home路由组件外，当鼠标离开的时候，让商品分类隐藏
      if (!this.$route.path.includes("home")) {
        this.show = false;
      }
    },
    // 进行路由跳转的方法
    goSearch(event) {
      // 最好的解决方案：编程式导航+事件委派
      /* 
        利用事件委派存在一些问题：
          1.如何确定点击一定是a标签
          2.如何获取参数（1,2,3级产品的名字、id）
      */
      // 问题1：在子节点中的a标签，加上自定义属性data-categoryName
      // 获取到当前触发这个事件的节点
      let el = event.target;
      // 节点有一个dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } = el.dataset;
      // 如果标签身上拥有categoryname，一定是a标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 判断：如果路由跳转的时候，带有params参数，也要传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        location.query = query;
        // 路由跳转
        this.$router.push(location);
      }
    },
    // 当鼠标移入的时候，让商品分类列表进行展示
    enterShow() {
      this.show = true;
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画开始状态
    .sort-enter,
    .sort-leave-to {
      // height: 0px;
      opacity: 0;
    }
    // 过渡动画结束状态
    .sort-enter-to,
    .sort-leave {
      // height: 461px;
      opacity: 1;
    }
    // 定义动画时间、速率
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.2s linear;
    }
  }
}
</style>