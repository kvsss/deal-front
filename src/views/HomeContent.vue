<template>
  <div class="homeContent">
    <!-- 走马灯   -->
    <div class="box_center box_shadow ">
      <el-carousel height="250px" style="    width: 640px; margin: 0 auto">
        <el-carousel-item v-for="item in 4">
          <img :src="logo">
        </el-carousel-item>
      </el-carousel>
    </div>

<!--
    <GoodsCard title="热门推荐" :dataLst="hotRecommend"></GoodsCard>

    <GoodsCard title="精品推荐" :dataLst="goodRecommend"></GoodsCard>
-->

    <GoodsCard title="点击最多" :dataList="visitRecommend"></GoodsCard>

    <GoodsCard title="最新发布" :dataList="newRecommend"></GoodsCard>

  </div>
</template>

<script>
import logo from "@/assets/images/logo.png";
import GoodsVisitRank from "@/views/goods/GoodsVisitRank";
import GoodsNewestRank from "@/views/goods/GoodsNewestRank";
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive, toRefs} from "vue";
import {listHomeGoods, listNewestRankGoods, listVisitRankGoods} from "@/api/home";
import GoodsCard from "@/components/home/GoodsCard";

export default {
  name: "HomeContent",
  components: {GoodsCard, GoodsNewestRank, GoodsVisitRank},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      // 轮播图
      sliderContent: [],
      // 顶部栏
      topGoods1: [],
      //本周强推
      weekcommend: [],


      // 热门推荐
      hotRecommend: [],
      // 精品推荐
      goodRecommend: [],
      // 点击推荐
      visitRecommend: [],
      // 新出推荐
      newRecommend: [],
      imgBaseUrl: process.env.VUE_APP_BASE_IMG_URL,
    });


    onMounted(async () => {
      const {data} = await listHomeGoods();
      const visitData = await listVisitRankGoods()
      const newData = await listNewestRankGoods()
      state.visitRecommend = visitData.data.data
      state.newRecommend = newData.data.data
      // 热门推荐 和精品推荐，写死，
      await data.data.forEach((goods) => {
        if (goods.type == 0) {
          // 轮播图
          // state.sliderContent[state.sliderContent.length] = goods;
        }
        if (goods.type == 1) {
          // 顶部栏
          // state.topGoods1[state.topGoods1.length] = goods;
        }
        if (goods.type == 2) {
          //本周强推
          // state.weekcommend[state.weekcommend.length] = goods;
        }
        if (goods.type == 3) {
          //热门推荐
          state.hotRecommend[state.hotRecommend.length] = goods;
        }
        if (goods.type == 4) {
          //精品推荐
          state.goodRecommend[state.goodRecommend.length] = goods;
        }
      });
    });

    return {
      ...toRefs(state),
      // goodsDetail,
      logo
    }
  }

}
</script>

<style scoped>

</style>