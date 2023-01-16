<template>
  <div class="top">

    <!--  创建一个盒子,设置它的长度，不设置宽度
      这是一个行内元素，在设置margin: o auto 达到左右居中的效果
      -->

    <!--
    行内元素布局
    先将块元素转为行内元素
    -->

    <!--
      cf :是清除浮动
      -->
    <div class="box_center cf">
      <!--   logo   -->
      <div class="logo fl">
        <router-link :to="{ name: 'home' }">
          <el-image :src="logo" fit="contain" alt="二手交易平台"/>
        </router-link>
      </div>


      <!--   搜索栏目   -->
      <!--  search_layout 是辅助search_container 布局的,有些布局不好设置，只好再设置一个外层容器作为布局    -->
      <div class="search_layout">
        <div class="search_container">
          <!--输入框-->
          <input
              v-model="keyword"
              type="text"
              placeholder="物品名、关键字"
              v-on:keyup.enter="searchByK"
              class="search_input">
          <!-- 按钮 -->
          <button class="search_btn" @click="searchByK()"> 搜索</button>
        </div>
      </div>


      <!--登录状态栏-->
      <div class="bookShelf fr ">
        <span v-if="!token" class="user_link">
          <router-link :to="{ name: 'login' }" class="mr15 ">
           <span class="black"> 登录</span>
          </router-link>
          <router-link :to="{ name: 'register' }" class="mr15">
            <span class="black"> 注册</span>
          </router-link>
        </span>
        <span v-if="token" class="user_link">
          <router-link :to="{name:'userSetup'}" class="mr15">
             <span class="black">{{ nickName }}</span>
          </router-link>
          <a @click="logout" href="javascript:void(0)">
             <span class="black">退出</span>
          </a>
        </span>
      </div>
    </div>

  </div>
</template>

<script>


import logo from "@/assets/images/logo.png";
import {reactive, toRefs} from "vue";
import {useRouter, useRoute} from "vue-router";
import {getToken, getNickName, removeToken, removeNickName, removeUid} from "@/utils/auth";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Top",
  setup() {
    // 获得响应式对象
    const state = reactive({
      keyword: "",
      nickName: getNickName(),
      token: getToken(),
    });
    // state.nickName = getNickName();
    // state.token = getToken();
    const route = useRoute();
    const router = useRouter();

    state.keyword = route.query.key;

    const searchByK = () => {
      //
      router.push({path: "/goodsClass", query: {key: state.keyword}});
      // context.emit("eventSerch", state.keyword);
    };

    const logout = () => {
      removeToken();
      removeNickName();
      removeUid();
      state.nickName = "";
      state.token = "";
    }

    return {
      // toRefs(state) 转变为普通对象，但是基础属性为转变为ref对象
      //  ... : 又将普通对象转变为响应式对象
      //  ...toRefs(state): 结果就是响应式 的 ref对象
      ...toRefs(state),
      logo,
      searchByK,
      logout,
    }
  }
}
</script>

<style scoped>

</style>