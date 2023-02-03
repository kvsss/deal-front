<template>
  <div class="navbar">
    <!--    <h1>-->
    <!--      aca-->
    <!--    </h1>-->
    <div class="mainNav" id="mainNav">
      <div class="box_center cf">
        <ul class="nav" id="navModule">
          <li>
            <router-link :to="{ name: 'homeContent' }">首页</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'homeContent' }"> 其他</router-link>
          </li>
          <!--<li class=""><a href="/pay/index.html">充值</a></li>-->
          <li><a @click="goGoods" href="javascript:void(0)">发布专区</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {useRoute, useRouter} from "vue-router";
import {getToken} from "@/utils/auth";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const goGoods = async () => {
      // 没有就跳转到登录页
      if (!getToken()) {
        router.push({
          name: "login",
        });
        return;
      }
      router.push({
        name: "publicInfo",
      });

 /*     let routeUrl = router.resolve({
        name: "goodsList",
      });
      window.open(routeUrl.href, "_blank");*/
    };
    return {
      goGoods,
    };
  }
}
</script>

<style scoped>

</style>