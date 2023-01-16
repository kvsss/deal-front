<template>
  <div class="homeContent" >
    <div> 内容</div>


    <el-carousel height="250px" style="    width: 640px; margin: 0 auto" >
      <el-carousel-item v-for="item in 4" >
        <img :src="logo">
      </el-carousel-item>
    </el-carousel>
    <!--  显示子路由信息 -->
    <router-view></router-view>
  </div>
</template>

<script>
import logo from "@/assets/images/logo.png";

export default {
  name: "HomeContent",
  setup() {
    return {
      logo
    }
  }

}
</script>

<style scoped>

</style>