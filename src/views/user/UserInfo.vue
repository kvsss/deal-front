<template>
  <ul class="userInfo">
    <li class="padding_10">
      <span class="user_span ">
        我的头像
      </span>
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
      <a id="my_name">{{ nickName }} </a>
    </li>

    <li class="padding_10">
      <span class="user_span ">我的性别</span>
      <a id="my_sex"> {{ userSex }} </a>
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
          case 0:
            state.userSex = "男"
            break;
          case 1:
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
    return {
      ...toRefs(state),
      man,
      beforeAvatarUpload,
      handleAvatarSuccess,
    };
  }
}
</script>

<style scoped>

</style>