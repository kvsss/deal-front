<template>
  <div class="home">
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-main>
<!--        <HomeContent/>-->
      </el-main>
      <el-footer>
<!--        <Footer/>-->
      </el-footer>
    </el-container>
  </div>

</template>

<script>
import HomeContent from "@/views/HomeContent";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  // eslint-disable-next-line vue/no-unused-components
  components: {Footer, Header, HomeContent}
}
</script>

<style scoped>

</style>