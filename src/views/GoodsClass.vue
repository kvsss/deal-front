<template>
  <div class="goodsClass">
    <div v-if="flag">
      <h1>分类</h1>
    </div>

    <button @click="click"> 点击</button>
  </div>
</template>

<script>
import {getCurrentInstance, onMounted, reactive, toRefs} from "vue";
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
      goodsStatusOn: null,
      wordCountOn: null,
      updateTimeOn: null,
      sortOn: null,
      flag: false,
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

      try {
        const {data} = await searchGoods(state.searchCondition)
        if (!data.ok) {
          return;
        }
        // 数值绑定
        state.goods = data.data.list;
        state.searchCondition.pageNum = data.data.pageNum;
        state.searchCondition.pageSize = data.data.pageSize;
        state.total = Number(data.total);
      } catch (error) {

      }
    }


    const click = () => {
      state.flag = !state.flag
      console.log(state.flag)
    }

    return {
      ...toRefs(state),
      click
    }


  }

}


</script>

<style scoped>

</style>