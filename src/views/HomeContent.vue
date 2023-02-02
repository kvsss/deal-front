<template>
  <div class="homeContent">
    <div class="box_center box_shadow ">
      <!-- 走马灯   -->
      <el-carousel height="250px" style="    width: 640px; margin: 0 auto">
        <el-carousel-item v-for="item in 4">
          <img :src="logo">
        </el-carousel-item>
      </el-carousel>
    </div>
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