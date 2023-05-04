<template>
  <div>
    <GoodsCard title="长大平台" :data-list="dataList"></GoodsCard>

  </div>
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {listPlatformGoods} from "@/api/home";
import GoodsCard from "@/components/home/GoodsCard";

export default {
  name: "PlatformGoods",
  components: {GoodsCard},
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      dataList: [],

    });


    // 挂载触发
    onMounted(async () => {
      try {
        const {data} = await listPlatformGoods();
        state.dataList = data.data;
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    });


    return {
      ...toRefs(state),

    }
  }
}
</script>

<style scoped>

</style>