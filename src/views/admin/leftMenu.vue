<template>
  <div >
<!--    <el-menu
        @close="handleClose"
        @open="handleOpen"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        text-color="#FBFBFB"
        width="200px"
        router
    >
      <el-submenu index="1">
        <template slot="title" style="padding-left: 0">
          <i class="el-icon-user"></i>
          <span>系统管理</span>
        </template>
        &lt;!&ndash;        <el-menu-item v-if="authMap.has('用户管理')" index="/user"><i class="el-icon-user-solid"></i>用户管理</el-menu-item>&ndash;&gt;
        <el-menu-item index="/user"><i class="el-icon-user-solid"></i>用户管理</el-menu-item>
        <el-menu-item index="/goods"><i class="el-icon-menu"></i>货号管理</el-menu-item>
        <el-menu-item><i class="el-icon-menu"></i>类型管理</el-menu-item>
        &lt;!&ndash;        <el-menu-item index="/store"><i class="el-icon-menu"></i>仓库管理</el-menu-item>&ndash;&gt;
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>库存管理</span>
        </template>
        <el-menu-item index="/outBill"><i class="el-icon-menu"></i>出库管理</el-menu-item>
        <el-menu-item index="/inBill"><i class="el-icon-menu"></i>入库管理</el-menu-item>
      </el-submenu>

    </el-menu>-->
    <div>
      <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          router
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/admin/user">用户</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/admin/goodsType">商品类型</el-menu-item>
          <el-menu-item index="/admin/goods">商品</el-menu-item>
          <el-menu-item index="/admin/goodsOrder">订单</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon><location /></el-icon>
            <span>统计界面</span>
          </template>
          <el-menu-item index="/admin/summarization">统计</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>

</template>

<script>
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {reactive, toRefs} from "vue";

export default {
  name: "LeftMenu",
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      authMap: new Map(),
    });

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