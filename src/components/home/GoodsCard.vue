<template>
  <!--  热门推荐  + 点击榜单   -->
  <div class="box_center box_shadow margin_top_25 cf">
    <div class="left_box">
      <div class="title">
        {{ title }}
      </div>
      <div class="recommend cf" id="hotRecommend">
        <div
            class="itemsList"
            v-for="(item, index) in dataLst"
            :key="index">

          <div class=" card  cf"  @click="goodsDetail(item.goodsId)" >
            <!--     图片      -->
            <a href="javascript:void(0)" >
              <img
                  class="items_img"
                  :src="`${imgBaseUrl}` + `${item.picUrl}`"
                  onerror="this.src='default.gif';this.onerror=null"
                  :alt="item.goodsTitle"/>
            </a>
            <!--     类容       -->
            <div class="items_txt">
              <p>
                <a href="javascript:void(0)" >{{ item.goodsTitle }}</a>
              </p>
              <p class="author">
                <a href="javascript:void(0)">商家：{{ item.nickName }}</a>
              </p>
              <p class="intro"
                 style=" ">
                <a
                    href="javascript:void(0)"
                    v-html="item.goodsContent"
                ></a>
              </p>
              <div style="margin-top:45px">
                  <span class="price">
                    ¥{{ item.price }}
                  </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right_box">
      <!--      <GoodsVisitRank/>-->
    </div>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import logo from "@/assets/images/logo.png";
import {useRoute, useRouter} from "vue-router/dist/vue-router";

export default {
  name: "GoodsCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    dataLst: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      imgBaseUrl: process.env.VUE_APP_BASE_IMG_URL,
    });

    const goodsDetail = (goodsId) => {
      router.push({path: `/goods/${goodsId}`});
    };

    return {
      ...toRefs(state),
      goodsDetail,
    }
  }
}
</script>

<style scoped>

</style>