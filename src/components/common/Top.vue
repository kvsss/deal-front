<template>


  <div class="top cf">
    <!-- 模态窗口   -->
    <el-dialog
        v-model="editDialogVisible"
        title="发布闲置物品"
        align-center
        style=""
    >


      <el-form :model="form.goods" label-width=" 120px " style=" margin: 0 auto; width: 650px;">
        <el-form-item>
          <ul>
            <li>
              <h4> 物品标题</h4>
            </li>
            <li>
              <el-input
                  class="input_size "
                  v-model="form.goods.goodsTitle"
                  name="goodsTitle"
                  type="text"
                  id="goodsTitle"
                  placeholder="闲置信息"
              />
            </li>
          </ul>
        </el-form-item>
        <el-form-item>
          <ul>
            <li>
              <h4> 详细情况</h4>
            </li>
            <li>
              <el-input
                  class="input_size "
                  v-model="form.goods.goodsContent"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  type="textarea"
                  placeholder="详细情况"
              />
            </li>
          </ul>
        </el-form-item>

        <el-form-item>
          <ul>
            <li>
              <h4> 封面</h4>
            </li>
            <li>
              <el-upload
                  class="avatar-uploader"
                  :action="baseUrl + '/front/resource/uploadImage'"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                <img
                    :src="form.goods.picUrl ? imgBaseUrl + form.goods.picUrl : picUpload"
                    class="avatar" alt=""/>
              </el-upload>
            </li>
          </ul>
        </el-form-item>

        <el-form-item>
          <ul>
            <li>
              <h4> 价格</h4>
            </li>
            <li>
              <el-input
                  class="input_size "
                  v-model="form.goods.price"
                  name="price"
                  type="text"
                  placeholder="请输入价格"
              >
              </el-input>
            </li>
          </ul>
        </el-form-item>

        <el-form-item>
          <ul>
            <li>
              <h4> 分类</h4>
            </li>
            <li>
              <el-select v-model="form.goods.categoryId" class="m-2" placeholder="请选择" @change="categoryChange">
                <el-option
                    v-for="item in goodsCategory"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
              </el-select>
            </li>
          </ul>
        </el-form-item>

        <el-form-item>
            <span class="dialog-footer">
              <el-button @click="editDialogVisible = false">取消</el-button>
              <el-button color="#626aef" class="publish" type="primary" @click="saveGoods">
                发布
              </el-button>
            </span>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--  创建一个盒子,设置它的长度，不设置宽度
      这是一个行内元素，在设置margin: o auto 达到左右居中的效果
      -->

    <!--
    行内元素布局
    先将块元素转为行内元素
    -->
    <!--
      cf :clear float 是清除浮动
      -->
    <div class="box_center cf">
      <!--   logo   -->
      <div class="logo fl">
        <router-link :to="{ name: 'homeContent' }">
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

      <div style="float: left;margin-left: 145px;margin-top: 10px;">
        <button class="publish_btn" @click="publish">
          <ul style="padding-left:0">
            <li style="text-align:center;">
              <svg-icon name="publish"></svg-icon>
            </li>
            <li><span> 发布 </span>
            </li>
          </ul>
        </button>
      </div>


      <!--登录状态栏-->
      <div class="goodsShelf fr ">
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
import {getCurrentInstance, nextTick, onMounted, onUnmounted, reactive, toRefs} from "vue";
import {useRouter, useRoute} from "vue-router";
import {getToken, getNickName, removeToken, removeNickName, removeUid, getUid} from "@/utils/auth";
import emitter from "@/utils/mitter";
import {ElMessage} from "element-plus";
import picUpload from "@/assets/images/pic_upload.png";
import {Properties as rawFile} from "svg-sprite-loader/examples/custom-runtime-generator/build/main";
import {publishGoods} from "@/api/user";
import {listCategory} from "@/api/goods";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Top",
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    // 获得响应式对象
    /*    {
          id: 1,
              name: '修仙'
        }, {
          id: 2,
              name: '修侠'
        }*/
    const state = reactive({
      keyword: "",
      nickName: getNickName(),
      token: getToken(),
      editDialogVisible: false,
      baseUrl: process.env.VUE_APP_BASE_API_URL,
      imgBaseUrl: process.env.VUE_APP_BASE_IMG_URL,
      goodsCategory: [],
      userPhoto: '',
      form: {
        goods: {
          uid: getUid(),
          nickName: getNickName(),
          goodsTitle: '',
          goodsContent: '',
          picUrl: '',
          price: '',
          categoryId: null,
          categoryName: '',
        },
      }
    })
    // state.nickName = getNickName();
    // state.token = getToken();
    state.keyword = route.query.key;
    const searchByK = async () => {
      // 这个函数是异步的
      // 页面还没有来的及跳转就用可能直接出发了$emit事件
      // 所以改成同步
      await router.push({path: "/goodsClass", query: {key: state.keyword}});

      emitter.$emit("search", state.keyword);
    };

    // 登录事件
    emitter.$on('login', () => {
      state.token = getToken();
      state.nickName = getNickName();
    })
    // 注册事件
    emitter.$on('register', () => {
      state.token = getToken();
      state.nickName = getNickName();
    })

    const logout = () => {
      removeToken();
      removeNickName();
      removeUid();
      state.nickName = "";
      state.token = "";

      router.push({path: "/home"});
    }
    const publish = () => {
      // 先登录
      if (!getToken()) {
        router.push({path: "/login"});
        return;
      }
      // 加载数据
      loadCategoryList()
      state.editDialogVisible = true;
      // 打开一个模态窗
    }

    const publishDialogClosed = () => {

    }

    const beforeAvatarUpload = (rawFile) => {
      if (rawFile.type !== "image/jpeg") {
        ElMessage.error("必须上传 JPG 格式的图片!");
        return false;
      } else if (rawFile.size / 1024 / 1024 > 5) {
        ElMessage.error("图片大小最多 5MB!");
        return false;
      }
      return true;
    }
    const handleAvatarSuccess = (response, uploadFile) => {
      // console.log(response.data)
      // 处理
      state.form.goods.picUrl = response.data;
    }

    const categoryChange = (val) => {
      state.goodsCategory.forEach((category) => {
        if (category.id === val) {
          state.form.goods.categoryName = category.name
        }
      });
    }

    // 校验
    const check = () => {
      // console.log("sate=========", state.form.goods)
      if (!state.form.goods.goodsTitle) {
        ElMessage.error("标题不能为空！");
        return false;
      }
      if (!state.form.goods.picUrl) {
        ElMessage.error("封面不能为空！");
        return false;
      }
      if (!state.form.goods.goodsContent) {
        ElMessage.error("内容不能为空！");
        return false;
      }

      if (!state.form.goods.price) {
        ElMessage.error("价格不能为空！");
        return false;
      }

      if (!state.form.goods.categoryId) {
        ElMessage.error("分类不能为空！");
        return false;
      }
      return true;
    }

    const saveGoods = async () => {
      // 发消息
      if (!check()) {
        return;
      }

      try {
        state.form.goods.uid = getUid();
        state.form.goods.nickName = getNickName();
        await publishGoods(state.form.goods)
        ElMessage.success("发布成功!")
      } catch (e) {
        console.log(e)
      }

      // 重置
      state.editDialogVisible = false

      state.form.goods.goodsTitle = ''
      state.form.goods.goodsContent = ''
      state.form.goods.picUrl = ''
      state.form.goods.price = ''
      state.form.goods.categoryId = null
      state.form.goods.categoryName = ''
    }

    // 加载分类信息
    const loadCategoryList = async () => {
      try {
        const {data} = await listCategory();
        state.form.goods.categoryId = data.data[0].id
        state.form.goods.categoryName = data.data[0].name
        state.goodsCategory = data.data
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(() => {
      // loadCategoryList()
    })


    onUnmounted
    (() => {
      // 事件卸载
      emitter.$off("search");
      emitter.$off("loginRefresh");
    })

    return {
      // toRefs(state) 转变为普通对象，但是基础属性为转变为ref对象
      //  ... : 又将普通对象转变为响应式对象
      //  ...toRefs(state): 结果就是响应式 的 ref对象
      ...toRefs(state),
      logo,
      searchByK,
      picUpload,
      logout,
      publish,
      publishDialogClosed,
      beforeAvatarUpload,
      handleAvatarSuccess,
      categoryChange,
      saveGoods,
    }
  }
}
</script>

<style scoped>
.publish {
  margin-left: 275px;
  color: #fff;
  background-color: rgb(255, 80, 0);
  border-color: rgb(255, 80, 0);
}
</style>