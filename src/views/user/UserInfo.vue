<template>
  <!-- 个人信息修改编辑框  -->
  <el-dialog
      v-model="editDialogVisible"
      title="用户信息修改窗口"
      align-center
      style=""
  >
    <el-form :model="form" label-width=" 120px " style=" margin: 0 auto; width: 650px;">

      <!-- 用户名     -->
      <el-form-item>
        <ul>
          <li>
            <h4> 用户名</h4>
          </li>
          <li>
            <el-input
                class="input_size "
                v-model="form.nickName"
                name="nickName"
                type="text"
                :placeholder="form.nickName"
            />
          </li>
        </ul>
      </el-form-item>

      <!--  性别    -->
      <el-form-item>
        <ul>
          <li>
            <h4> 性别</h4>
          </li>
          <li>
            <div class="">
              <el-radio-group v-model="form.userSex" class="ml-4">
                <el-radio label="0" size="large">男</el-radio>
                <el-radio label="1" size="large">女</el-radio>
              </el-radio-group>
            </div>
          </li>
        </ul>
      </el-form-item>


      <el-form-item>
            <span class="dialog-footer">
              <el-button @click="editDialogVisible = false">取消</el-button>
              <el-button color="#626aef" class="purchase" style="margin-left: 260px" type="primary" @click="commit">
                修改
              </el-button>
            </span>
      </el-form-item>

    </el-form>
  </el-dialog>


  <ul class="userInfo">
    <li class="padding_10">
      <span class="user_span ">
        我的头像
      </span>
      <el-button class="user_info_edit_btn" style="margin-right: 60px" @click="editDialogVisible = true" type="primary">
        修改信息
      </el-button>

      <el-upload
          class="avatar-uploader"
          :action="baseUrl + '/front/resource/uploadImage'"
          :show-file-list="false"
          :headers="token"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">

        <img
            :src="userPhoto ? imgBaseUrl + userPhoto : man"
            class="avatar" alt=""/>
      </el-upload>
    </li>

    <li class="padding_10">
      <span class="user_span ">我的昵称</span>
      <a id="my_name" class="gray_color">{{ nickName }} </a>
    </li>

    <li class="padding_10">
      <span class="user_span ">我的性别</span>
      <a id="my_sex" class="gray_color"> {{ userSex }} </a>
    </li>
  </ul>
</template>

<script>
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive, toRefs} from "vue";
import man from "@/assets/images/man.png";

import {ElMessage} from "element-plus";
import {getUserInfo, updateUserInfo} from "@/api/user";
import {getToken, getUid} from "@/utils/auth";

export default {
  name: "UserInfo",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      userPhoto: "",
      nickName: "",
      userSex: "",
      editDialogVisible: false,
      form: {
        nickName: "",
        userSex: "0",
      },
      token: {
        Authorization: getToken()
      },
      baseUrl: process.env.VUE_APP_BASE_API_URL,
      imgBaseUrl: process.env.VUE_APP_BASE_IMG_URL,
    });

    onMounted(async () => {
      try {
        const {data} = await getUserInfo(getUid());
        if (!data.ok) {
          return;
        }
        state.userPhoto = data.data.userPhoto;
        state.nickName = data.data.nickName;

        switch (data.data.userSex) {
          case undefined:
            state.userSex = "未设置"
            break;
          case "0":
            state.userSex = "男"
            break;
          case "1":
            state.userSex = "女"
            break;
          default:
            state.userSex = "未设置"
            break;
        }
      } catch (error) {
        console.log(error)
      }
    });

    const beforeAvatarUpload = (rawFile) => {
      if (rawFile.type !== "image/jpeg") {
        ElMessage.error("必须上传 JPG 格式的图片!");
        return false;
      } else if (rawFile.size / 1024 / 1024 > 5) {
        ElMessage.error("图片大小最多 5MB!");
        return false;
      }
      return true;
    };
    // 先上传,然后更新数据
    const handleAvatarSuccess = (response, uploadFile) => {
      console.log(uploadFile)
      console.log(response.data)
      state.userPhoto = response.data;
      try {
        updateUserInfo({
          uid: getUid(),
          userPhoto: state.userPhoto,
        });
      } catch (error) {
        console.log(error)
      }
    };

    // 提交修改
    const commit = () => {
      // 对nickName
      if (state.form.nickName === "" || state.form.nickName === null) {
        ElMessage.error("昵称不能为空!");
        return false;
      }

      try {
        updateUserInfo({
          uid: getUid(),
          nickName: state.form.nickName,
          userSex: state.form.userSex,
        });
      } catch (error) {
        console.log(error)
      }
      // 重置
      state.editDialogVisible = false;
      state.nickName = state.form.nickName;
      state.userSex = state.form.userSex === "0" ? "男" : "女";
      state.form.nickName = "";
      state.form.nickName = "0";
    }

    return {
      ...toRefs(state),
      man,
      beforeAvatarUpload,
      handleAvatarSuccess,
      commit,
    };
  }
}
</script>

<style scoped>

</style>