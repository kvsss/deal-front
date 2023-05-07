<template>

</template>

<script>
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {reactive, toRefs} from "vue";

export default {
  name: "Summarization",
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

</style>