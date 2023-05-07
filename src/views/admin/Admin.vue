<template>
  <div class="home">
    <!--    <el-container style="height:100%;width:100%;position:fixed;">
          &lt;!&ndash;      <el-header style="padding:0;">
          &lt;!&ndash;        <topMenu></topMenu>&ndash;&gt;
                </el-header>&ndash;&gt;
          <el-container style="height:calc(100% - 60px)">
            <el-aside style="background: rgb(84, 92, 100);" width="200px">

            </el-aside>
            <el-main>
              &lt;!&ndash;        <div style="border:1px solid red;">这里是主界面</div>&ndash;&gt;
              &lt;!&ndash;          <breadcrumb></breadcrumb>&ndash;&gt;

            </el-main>
          </el-container>
        </el-container>-->

    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          <LeftMenu></LeftMenu>
        </el-aside>
        <el-main>
          <router-view style="padding-top: 20px">
          </router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import LeftMenu from "@/views/admin/leftMenu";
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {onMounted, reactive, toRefs} from "vue";
import {getRole} from "@/utils/auth";

export default {
  name: "Admin",
  components: {LeftMenu},
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      authMap: new Map(),
    });


    onMounted(() => {
      const role = getRole();
      if (!(role === "1")) {
        router.push('/adminLogin')
      }
    })

    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    }

    return {
      ...toRefs(state),
      handleOpen,
      handleClose,
    }
  }
}
</script>

<style scoped>

</style>