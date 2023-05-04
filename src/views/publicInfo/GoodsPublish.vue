<template>
  <div>
  </div>
</template>

<script>
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {reactive, toRefs} from "vue";
import {searchGoods} from "@/api/goods";

export default {
  name: "GoodsPublish",
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      backgroud: true,
      total: 0,
      pageSize: 6,
      searchCondition: {},
    });

    // 异步调用
    const search = async () => {
      // 函数调用
      // const {data} = await searchBooks(state.searchCondition);
      // checkAndSetCondition()
      /*      try {
              const {data} = await searchGoods(state.searchCondition)
              if (!data.ok) {
                return;
              }
              // 数值绑定
              state.goods = data.data.list;
              state.searchCondition.pageNum = data.data.pageNum;
              state.searchCondition.pageSize = data.data.pageSize;
              state.total = Number(data.data.total);
              console.log(total)
            } catch (error) {
              console.log(error)
            }*/
    }


    const handleCurrentChange = (pageNum) => {
      state.searchCondition.pageNum = pageNum;
      search();
    }

    return {
      ...toRefs(state),
      handleCurrentChange,
    }
  }
}
</script>

<style scoped>

</style>