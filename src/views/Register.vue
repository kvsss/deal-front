<template>
  <div class="register">
    <div class=" box_center box_shadow"
         style=" text-align:center">

      <h3 style="margin-bottom:10px">
        注册
      </h3>
      <el-form :model="form" label-width=" 120px " style="margin: 0 auto; width: 650px; ">
        <el-form-item>
          <el-input
              class="input_size "
              v-model="form.username"
              name="txtUName"
              type="text"
              id="txtUName"
              placeholder="请输入您的手机号码"
              prefix-icon="User"
          />
        </el-form-item>

        <el-form-item>
          <el-input
              class="input_size "
              v-model="form.password"
              name="txtPassword"
              type="password"
              placeholder="请输入密码：6-20位字母/数字"
              prefix-icon="Lock"
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input
              style="width:300px;height: 38px"
              v-model="form.velCode"
              name="TxtChkCode"
              type="text"
              maxlength="4"
              id="TxtChkCode"
              placeholder="请输入验证码"
              prefix-icon="Message"
          >
          </el-input>
          <!-- 验证图片-->
          <img
              style="cursor: pointer;  height: 38px;   float: right;"
              :src="imgVerifyCode"
              @click="loadImgVerifyCode"
          />
        </el-form-item>

        <el-form-item>
          <el-button class="register_btn" @click="registerUser"> 注册</el-button>
        </el-form-item>

      </el-form>


    </div>

  </div>
</template>

<script>
import {onMounted, reactive, toRefs} from "vue";
import {useRoute, useRouter} from "vue-router";
import {getImgVerifyCode} from "@/api/resource";
import {register} from "@/api/user";
import {ElMessage} from "element-plus";
import {setNickName, setToken, setUid} from "@/utils/auth";
import emitter from "@/utils/mitter";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",


  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      imgVerifyCode: "",
      form: {
        sessionId: "",
        username: "",
        password: "",
        velCode: "",
      }
    });

    // 已进入就触发
    onMounted(async () => {
      await loadImgVerifyCode();
    });

    // 加载验证码
    const loadImgVerifyCode = async () => {
      try {
        const {data} = await getImgVerifyCode();
        if (!data.ok) {
          return;
        }
        state.imgVerifyCode = "data:image/png;base64," + data.data.img;
        state.form.sessionId = data.data.sessionId;
      } catch (error) {
        console.log(error)
      }
    }

    // 校验
    const check = async () => {
      let flag = false;
      if (!state.form.username) {
        ElMessage.error("密码不能为空");
        flag = true;
      } else if (!/^1[3-9]\d{9}$/.test(state.form.username)) {
        ElMessage.error("手机号格式不正确！");
        flag = true;
      } else if (!state.form.password) {
        ElMessage.error("密码不能为空！");
        flag = true;
      } else if (!state.form.velCode) {
        ElMessage.error("验证码不能为空！");
        flag = true;
      } else if (!/^\d{4}/.test(state.form.velCode)) {
        ElMessage.error("验证码格式不正确！");
        flag = true;
      }

      if (flag) {
        // 刷新验证码
        await loadImgVerifyCode();
      }
      return !flag;
    }

    // 用户注册
    const registerUser = async () => {
      if (!await check()) {
        return
      }

      try {
        const {data} = await register(state.form);
        if (!data.ok) {
          // 验证错误,刷新验证码
          await loadImgVerifyCode();
          return;
        }
        setToken(data.data.token);
        setUid(data.data.uid);
        setNickName(state.form.username);
        await router.push({path: "/home"});
        // 事件
        emitter.$emit("register", null)
      } catch (error) {
        console.log(error)
        // 网络异常
      }
    }
    return {
      ...toRefs(state),
      loadImgVerifyCode,
      registerUser
    }
  }
}
</script>

<style scoped>

</style>