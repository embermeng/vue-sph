<template>
    <div class="pagination">
		{{pageNo}}
        <button @click="toPageNum(pageNo - 1)" :disabled="pageNo === 1">
            上一页
        </button>
        <button
            v-if="startAndEndPage.start > 1"
            @click="toPageNum(1)"
        >
            1
        </button>
        <button v-if="startAndEndPage.start - 1 > 1">···</button>

        <!-- 中间部分 -->
        <button
            v-for="(page, index) in startAndEndPage.end"
            :key="index"
            v-if="page > startAndEndPage.start - 1"
            @click="toPageNum(page)"
			:class="{active: pageNo == page}"
        >
            {{ page }}
        </button>

        <button v-if="startAndEndPage.end + 1 < totalPage">···</button>
        <button
            v-if="startAndEndPage.end < totalPage"
            @click="toPageNum(totalPage)"
        >
            {{ totalPage }}
        </button>
        <button :disabled="pageNo === totalPage" @click="toPageNum(pageNo + 1)">
            下一页
        </button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ["pageNo", "pageSize", "total", "continues"],
    computed: {
        // 总共多少页
        totalPage() {
            // 向上取整
            return Math.ceil(this.total / this.pageSize);
        },
        // 连续页码起始数字和结束数字
        startAndEndPage() {
            const { continues, pageNo, totalPage } = this;
            let start, end;
            if (continues >= totalPage) {
                // 不够5页
                start = 1;
                end = totalPage;
            } else {
                // 够5页
                start = pageNo - Math.floor(continues / 2);
                end = pageNo + Math.floor(continues / 2);
                // 如果start为0或负数
                if (start < 1) {
                    start = 1;
                    end = continues;
                }
                // 如果end大于总页码
                if (end > totalPage) {
                    end = totalPage;
                    start = totalPage - continues + 1;
                }
            }
            return { start, end };
        },
    },
    methods: {
        // 传给父组件上一页数
        toPageNum(num) {
            this.$emit("pageNum", num);
        },
    },
};
</script>

<style lang="less" scoped>
.pagination {
    & {
        text-align: center;
    }
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
