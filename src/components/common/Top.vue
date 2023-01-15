<template>
  <div class="top">
    <!--    <div class="box_center cf">
          <router-link :to="{ name: 'home' }" class="logo fl"
                       style="width: 198px; float: left; padding: 23px 130px 0 0; display: block ;float: left">
            &lt;!&ndash;        <img :src="logo" alt="小说精品屋"/>&ndash;&gt;
          </router-link>

          <div class="searchBar fl">
            <div class="search cf">
              <input
                  v-model="keyword"
                  type="text"
                  placeholder="书名、作者、关键字"
                  class="s_int"
                  v-on:keyup.enter="searchByK"
              />
              <label class="search_btn" id="btnSearch" @click="searchByK()"
              ><i class="icon"></i
              ></label>
            </div>
          </div>

          <div class="bookShelf fr" id="headerUserInfo">
            &lt;!&ndash;
            <a class="sj_link" href="/user/favorites.html">我的书架</a>&ndash;&gt;
            <span v-if="!token" class="user_link"
            >&lt;!&ndash;<i class="line mr20">|</i
              >&ndash;&gt;
              <router-link :to="{ name: 'login' }" class="mr15">登录</router-link>
              <router-link :to="{ name: 'register' }" class="mr15"
              >注册</router-link
              >
            </span>
            <span v-if="token" class="user_link"
            >&lt;!&ndash;<i class="line mr20">|</i
              >&ndash;&gt;<router-link :to="{name:'userSetup'}" class="mr15">{{ nickName }}</router-link>
              <a @click="logout" href="javascript:void(0)">退出</a></span
            >
          </div>
        </div>-->

    <el-row :gutter="20">

      <!-- logo -->
      <el-col :span="8">
        <router-link :to="{ name: 'home' }" class="logo fl">
          <el-image :src="logo" fit="contain" alt="二手交易平台"/>
        </router-link>
      </el-col>

      <!-- 搜索框-->
      <el-col :span="8">

        <el-row style=" display: flex;flex-wrap: wrap;">
          <el-col :span="18">
            <el-input v-model="keyword" placeholder="物品名,关键字"/>
          </el-col>

          <el-col :span="2">
            <el-button icon="Search" circle/>
          </el-col>
        </el-row>
      </el-col>
      <!--登录状态栏-->
      <el-col :span="8">
        第三个
      </el-col>
    </el-row>


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