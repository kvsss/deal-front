<template>
  <div class="goodsClass">
    <h1>分类</h1>
  </div>
</template>

<script>
import {getCurrentInstance, onMounted, reactive} from "vue";
import {useRoute, useRouter} from "vue-router";
import mitt from "mitt";
import emitter from "@/utils/mitter";
import {searchGoods} from "@/api/goods";

export default {
  name: "GoodsClass",
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      goodsCategory: [],
      goods: [],
      searchCondition: {},
      backgroud: true,
      total: 0,
      pageSize: 10,
      imgBaseUrl: process.env.VUE_APP_BASE_IMG_URL,
      workDirectionOn: 0,
      categoryOn: 0,
      bookStatusOn: null,
      wordCountOn: null,
      updateTimeOn: null,
      sortOn: null
    });


    emitter.$on('search', (key) => {
      searchByK(key)
    })

    // 查找函数
    const searchByK = (key) => {
      state.searchCondition = {keyword: key};
      search();
    }

    // 异步调用
    const search = async () => {
      // 函数调用
      // const {data} = await searchBooks(state.searchCondition);
      const {data} = await searchGoods(state.searchCondition)

      // 数值绑定
      state.goods = data.list;
      state.searchCondition.pageNum = data.pageNum;
      state.searchCondition.pageSize = data.pageSize;
      state.total = Number(data.total);
    }


  }

}


</script>

<style scoped>

</style>