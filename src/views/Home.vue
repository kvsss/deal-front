<template>
  <div >
    <Header></Header>
    <HomeContent></HomeContent>
    <Footer></Footer>
  </div>

</template>

<script>
import HomeContent from "@/views/HomeContent";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {Footer, Header, HomeContent}
}
</script>

<style scoped>

</style>