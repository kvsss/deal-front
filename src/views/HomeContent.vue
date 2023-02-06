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

    <!--  热门推荐  + 点击榜单   -->
    <div class="box_center box_shadow margin_top_25 cf">
      <div class="left_box">
        <div class="title">
          <h2 class="on">热门推荐</h2>
        </div>

        <div class="recommend" id="hotRecommend">
          <div
              class="itemsList"
              v-for="(item, index) in hotRecommend"
              :key="index">


            <div class=" card  cf">
              <!--     图片      -->
              <a href="javascript:void(0)" @click="goodsDetail(item.goodsId)">
                <img
                    class="items_img"
                    :src="`${imgBaseUrl}` + `${item.picUrl}`"
                    onerror="this.src='default.gif';this.onerror=null"
                    :alt="item.goodsTitle"/>
              </a>
              <!--     类容       -->
              <div class="items_txt" >
                <p>
                  <a href="javascript:void(0)" @click="goodsDetail(item.goodsId)">{{ item.goodsTitle }}</a>
                </p>
                <p class="author">
                  <a href="javascript:void(0)">商家：{{ item.nickName }}</a>
                </p>
                <p class="intro"
                   style=" ">
                  <a
                      href="javascript:void(0)" @click="goodsDetail(item.goodsId)"
                      v-html="item.goodsContent"
                  ></a>
                </p>
                <div style="margin-top:45px">
                  <span  class="price">
                    ¥{{ item.price }}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="right_box">
        <GoodsVisitRank/>
      </div>
    </div>

    <!-- 精品推荐  +  新出榜单   -->
    <!--    <div class="box_center box_shadow margin_top_25">-->
    <!--      <div class="left_box">-->
    <!--        <div class="title">-->
    <!--          <h2 class="on">精品推荐</h2>-->
    <!--        </div>-->
    <!--        <div class="recommend" id="goodRecommend">-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="right_box">-->
    <!--        <GoodsNewestRank/>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import logo from "@/assets/images/logo.png";
import GoodsVisitRank from "@/views/goods/GoodsVisitRank";
import GoodsNewestRank from "@/views/goods/GoodsNewestRank";
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive, toRefs} from "vue";
import {listHomeGoods} from "@/api/home";

export default {
  name: "HomeContent",
  components: {GoodsNewestRank, GoodsVisitRank},
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
      imgBaseUrl: process.env.VUE_APP_BASE_IMG_URL,
    });


    onMounted(async () => {
      const {data} = await listHomeGoods();


      await data.data.forEach((goods) => {
        if (goods.type == 0) {
          // 轮播图
          state.sliderContent[state.sliderContent.length] = goods;
        }
        if (goods.type == 1) {
          // 顶部栏
          state.topGoods1[state.topGoods1.length] = goods;
        }
        if (goods.type == 2) {
          //本周强推
          state.weekcommend[state.weekcommend.length] = goods;
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


    const goodsDetail = (goodsId) => {
      router.push({path: `/goods/${goodsId}`});
    };


    return {
      ...toRefs(state),
      goodsDetail,
      logo
    }
  }

}
</script>

<style scoped>

</style>