<template>
  <div class="header header_box_shadow">
    <Top/>
    <Navbar/>
  </div>

</template>

<script>
import Navbar from "@/components/common/Navbar";
import Top from "@/components/common/Top";

export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  components: {Navbar, Top}
}
</script>

<style scoped>

</style>