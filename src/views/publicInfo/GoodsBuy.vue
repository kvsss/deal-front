<template>
  买

</template>

<script>
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {reactive, ref, toRefs} from "vue";
import no_comment from "@/assets/images/no_comment.png";
import man from "@/assets/images/man.png";

export default {
  name: "GoodsBuy",
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({

    });



    return {
      ...toRefs(state),

    }
  }
}
</script>

<style scoped>
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>