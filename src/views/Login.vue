<template>
  <div class="register">
    <div class=" box_center  box_shadow"
         style="text-align:center">

      <h3>
        登录
      </h3>
      <el-form :model="form" label-width=" 120px " style="margin: 0 auto; width: 700px;">
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
          <el-button class="login_btn" @click="loginUser"> 登录</el-button>
        </el-form-item>

      </el-form>
    </div>

  </div>
</template>

<script>
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {onMounted, reactive, toRefs} from "vue";
import {ElMessage} from "element-plus";
import {removeNickName, removeToken, setNickName, setToken, setUid} from "@/utils/auth";
import {login} from "@/api/user";
import emitter from "@/utils/mitter";
import router from "@/router";

export default {
  // 登录
  // eslint-disable-next-line vue/multi-word-component-names
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

      // date:后端返回的所以全部数据
      // await 是语法糖,相当于then 把response返回
      // 这里的data是 AxiosResponse<T,D>.data: T  ,即返回数据

      // *
      //  * export interface AxiosResponse<T = any, D = any>  {
      //  *   data: T;
      //  *   status: number;
      //  *   statusText: string;
      //  *   headers: AxiosResponseHeaders;
      //  *   config: AxiosRequestConfig<D>;
      //  *   request?: any;
      //  * }
      //  * @type {AxiosResponse<any>}
      // 返回 await login(state.form) 中的data部分
      // 这个部分也是    axios.interceptors.response.use 中的返回值  哪里返回了就是AxiosResponse
      // {data}  就是 返回的所有数据

      try {
        const {data} = await login(state.form);
        if (!data.ok) {
          return;
        }
        console.log(data.ok)
        setToken(data.data.token);
        setUid(data.data.uid);
        setNickName(data.data.nickName);
        await router.push({path: "/home"});
        // 提交事件
        emitter.$emit("login", null);
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