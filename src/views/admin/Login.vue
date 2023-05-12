<template>
  <div class="register" style="margin-top:240px">
    <div class=" box_center  box_shadow"
         style="text-align:center">

      <h3 style="margin-bottom:10px">
        长沙大学二手交易网站后台
      </h3>
      <el-form :model="form" label-width=" 120px " style="margin: 0 auto; width: 650px;">
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
          <el-button class="admin_login_btn" @click="loginUser"> 登录</el-button>
        </el-form-item>

      </el-form>
    </div>

  </div>
</template>

<script>
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {onMounted, reactive, toRefs} from "vue";
import {ElMessage} from "element-plus";
import {getRole, removeNickName, removeToken, setNickName, setRole, setToken, setUid} from "@/utils/auth";
import {login} from "@/api/user";
import emitter from "@/utils/mitter";
import router from "@/router";
import {adminLogin} from "@/api/admin";

export default {
  // 登录
  name: "Login",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      form: {
        username: "",
        password: "",
      }
    });

    // 已进入就触发
    onMounted(async () => {
      const role = getRole();
      if (role === "1") {
/*        console.log("login")
        console.log(role)*/
        await router.push('/admin/user')
      }
    });


    // 校验
    const check = () => {
      if (!state.form.username) {
        ElMessage.error("密码不能为空");
        return false;
      }
      if (!/^1[3-9]\d{9}$/.test(state.form.username)) {
        ElMessage.error("手机号格式不正确！");
        return false;
      }
      if (!state.form.password) {
        ElMessage.error("密码不能为空！");
        return false;
      }

      return true;
    }


    const loginUser = async () => {
      if (!check()) {
        return
      }
      try {
        const {data} = await adminLogin(state.form);
        if (!data.ok) {
          return;
        }
        console.log(data.ok)
        setToken(data.data.token);
        setUid(data.data.uid);
        setNickName(data.data.nickName);
        setRole(data.data.role);
        await router.push({path: "/admin/user"});
        // 提交事件
        // emitter.$emit("login", null);
      } catch (error) {
        // 网络异常
        console.log(error)
      }
    }
    return {
      ...toRefs(state),
      loginUser
    }
  }
}
</script>

<style scoped>

</style>