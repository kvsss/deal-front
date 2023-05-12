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
            <router-link :to="{ name: 'platformGoods' }"> 长大发布</router-link>
          </li>
          <!--<li class=""><a href="/pay/index.html">充值</a></li>-->
          <li>  <a @click="goGoods" href="javascript:void(0)">发布专区</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {useRoute, useRouter} from "vue-router";
import {getRole, getToken} from "@/utils/auth";
import {reactive, toRefs} from "vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      role: getRole(),
    })

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
      ...toRefs(state),
      goGoods,
    };
  }
}
</script>

<style scoped>

</style>