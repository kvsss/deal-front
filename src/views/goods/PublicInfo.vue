<template>
  <div class="goodsList box_center box_shadow">

    <el-row style="padding:10px">
      <el-col :span="4">
        <el-menu
            default-active="1"
            @open="handleOpen"
            @close="handleClose">
          <template v-for="li in tableInfo">
            <el-menu-item :index="li.index" @click="change(li.index)">
              <el-icon>
                <component :is="li.icon"/>
              </el-icon>
              <span>{{ li.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>

      <el-col :span="20">
        <div style="min-height:400px ;margin-left:10px">
          <ul>
            <template v-for="li in tableInfo">
              <li v-if="li.isActive">
                <component :is="li.component"/>
              </li>
            </template>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserInfo from "@/views/user/UserInfo";
import OtherSet from "@/views/user/OtherSet";
import {reactive, toRefs} from "vue";
import SvgIcon from "@/components/common/SvgIcon";

export default {
  name: "GoodsList",
  components: {
    SvgIcon,
    UserInfo,
    OtherSet
  },
  setup() {
    const state = reactive({
      userPhoto: "",
      nickName: "",
      baseUrl: process.env.VUE_APP_BASE_API_URL,
      imgBaseUrl: process.env.VUE_APP_BASE_IMG_URL,
      activeIndex: '1',
      tableInfo: [{
        index: '1',
        title: "我发布的",
        icon: "user",
        isActive: true,
        component: 'UserInfo',
      }, {
        index: '2',
        title: "我卖出的",
        icon: "setting",
        isActive: false,
        component: 'OtherSet',
      }, {
        index: '3',
        title: "我买到的",
        icon: "setting",
        isActive: false,
        component: 'OtherSet',
      },],

      selectInfo: {
        index: "1",
      }
    });

    // 切换
    const change = (index) => {
      if (index === state.activeIndex) {
        return;
      }
      state.tableInfo[parseInt(index) - 1].isActive = true;
      state.tableInfo[parseInt(state.activeIndex) - 1].isActive = false;
      state.activeIndex = index;
    }

    const handleOpen = () => {
      console.log('打开')
    }

    const handleClose = () => {
      console.log('关闭')
    }
    return {
      ...toRefs(state),
      handleOpen,
      handleClose,
      change,
    }
  }
}
</script>

<style scoped>

</style>