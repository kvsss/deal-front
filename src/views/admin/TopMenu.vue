<template>
  <div style="display:flex;flex-direction: row;justify-content: space-between;background:rgb(17,17,17);">
    <div style="height:60px;font-size: 18px;font-weight: bolder;color: gold;line-height: 60px;padding-left: 24px; ">
      {{ systemName }}

    </div>
    <div style="background: #7f7f7f">
      <!--      <el-menu default-active=""-->
      <!--               background-color="#545c64"-->
      <!--               class="el-menu-demo"-->
      <!--               mode="horizontal"-->
      <!--               text-color="#ffffff">-->
      <!--        <el-menu-item @click="toScreen">-->
      <!--          <i class="el-icon-s-platform"></i>大屏展示-->
      <!--        </el-menu-item>-->
      <!--        <el-menu-item>-->
      <!--          <el-dropdown trigger="click">-->
      <!--            <div style="height:100%;">-->
      <!--              <i class="el-icon-user"></i>-->
      <!--              <span style="color:#fff">        {{ name }}  </span>-->
      <!--              <i class="el-icon-caret-bottom"/>-->
      <!--            </div>-->
      <!--            <el-dropdown-menu>-->
      <!--              <el-dropdown-item @click.native="resetPass">-->
      <!--                <span style="display:block;">修改密码</span>-->
      <!--              </el-dropdown-item>-->
      <!--              <el-dropdown-item @click.native="logout">-->
      <!--                <span style="display:block;">退出系统</span>-->
      <!--              </el-dropdown-item>-->
      <!--            </el-dropdown-menu>-->
      <!--          </el-dropdown>-->
      <!--        </el-menu-item>-->
      <!--      </el-menu>-->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          管理员
          <el-icon class="el-icon--right">
            <arrow-down/>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click.native="editInfo">修改用户信息</el-dropdown-item>
            <el-dropdown-item @click.native="resetPass">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>


    <!-- 修改用户密码的对话框 -->
    <el-dialog v-model="editDialogVisible"
               title="用户密码修改窗口"
               align-center
               style="">

      <el-form :model='editForm' label-width='70px'>
        <el-form-item label='原密码' prop='password'>
          <el-input v-model='editForm.oldPassword'></el-input>
        </el-form-item>
        <el-form-item label='新密码' prop='password2'>
          <el-input v-model='editForm.newPassword'></el-input>
        </el-form-item>
      </el-form>
      <span slot='footer' class='dialog-footer'>
        <el-button @click='editDialogVisible = false' style="margin-left: 200px">取 消</el-button>
        <el-button type='primary' @click='sureResetPass' style="margin-left: 300px">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户信息的对话框 -->
    <el-dialog v-model="editDialogInfoVisible"
               title="用户信息修改窗口"
               align-center
               style="">
      <el-form :model='editInfoForm' :rules='editFormRules' ref='editFormRef' label-width='70px'>
        <el-form-item label='账号' prop='username'>
          <el-input v-model='user' disabled></el-input>
        </el-form-item>
        <el-form-item label='用户名' prop='name'>
          <el-input v-model='editInfoForm.nickName'></el-input>
        </el-form-item>

      </el-form>
      <span slot='footer' class='dialog-footer'>
        <el-button @click='editDialogInfoVisible = false' style="margin-left: 200px">取 消</el-button>
        <el-button type='primary' @click='sureEditInfo' style="margin-left: 300px">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {onMounted, reactive, toRefs} from "vue";
import {ElMessage} from "element-plus";
import {adminLogin, adminUpdateInfo, adminUpdatePassword} from "@/api/admin";
import {
  getNickName, getUid,
  removeNickName,
  removeRole,
  removeToken,
  removeUid,
  setNickName,
  setRole,
  setToken,
  setUid
} from "@/utils/auth";

export default {
  name: "TopMenu",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      systemName: '长沙大学二手交易平台后台',
      editForm: {
        oldPassword: '',
        newPassword: ''
      },
      editInfoForm: {},
      editFormRules: {},
      editDialogVisible: false,
      editDialogInfoVisible: false,
      user: getUid(),
      name: ''
    });

    // 已进入就触发
    onMounted(async () => {
    });


    const editDialogClosed = () => {

    };

    const logout = () => {
      removeToken();
      removeNickName();
      removeUid();
      removeRole();
      state.nickName = "";
      state.token = "";

      router.push({path: "/admin"});
    }

    const resetPass = () => {
      state.editDialogVisible = true

    };

    const editInfo = () => {
      state.editDialogInfoVisible = true
      state.editInfoForm.nickName = getNickName();
    }

    // 修改密码
    const sureResetPass = async () => {
      try {
        const {data} = await adminUpdatePassword(state.editForm);
        if (data.ok) {
          state.editDialogVisible = false;
          state.editForm.newPassword = "";
          state.editForm.oldPassword = "";
          ElMessage.success("修改成功");
        }
      } catch (e) {
        console.log(e)
      }
    };

    // 修改个人信息
    const sureEditInfo = async () => {
      try {
        const {data} = await adminUpdateInfo(state.editInfoForm);
        if (data.ok) {
          state.editDialogInfoVisible = false;
          ElMessage.success("修改成功,请重新登录");
        }
      } catch (e) {
        console.log(e)
      }
    };

    return {
      ...toRefs(state),
      resetPass,
      editDialogClosed,
      logout,
      editInfo,
      sureResetPass,
      sureEditInfo,
    }
  }
}
</script>

<style scoped>

</style>