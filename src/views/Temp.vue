<template>

  <button @click='editDialogVisible = true'> 点击</button>
  <!-- 修改用户的对话框 -->
  <el-dialog title='修改用户' :visible.sync='editDialogVisible' width='50%' @close='publishDialogClosed' append-to-body>
    <!--      <el-form :model='editForm' :rules='editFormRules' ref='editFormRef' label-width='70px'>
            <el-form-item label='账号' prop='username'>
              <el-input v-model='editForm.username' disabled></el-input>
            </el-form-item>

            <el-form-item label='用户名' prop='name'>
              <el-input v-model='editForm.name'></el-input>
            </el-form-item>

            <el-form-item label='密码' prop='password'>
              <el-input type="password" v-model='editForm.password'></el-input>
            </el-form-item>

            <el-form-item label='手机' prop='phone'>
              <el-input v-model='editForm.phone'></el-input>
            </el-form-item>

          </el-form>-->
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <h1>1</h1>
    <span slot='footer' class='dialog-footer'>
        <el-button @click='editDialogVisible = false'>取 消</el-button>
        <el-button type='primary' @click='publishDialogClosed'>确 定</el-button>
      </span>
  </el-dialog>

</template>


<script>
import {reactive, toRefs} from "vue";
import {getNickName, getToken} from "@/utils/auth";

export default {
  name: "temp",
  setup() {
    const state = reactive({
      keyword: "",
      nickName: getNickName(),
      token: getToken(),
      editDialogVisible: false,
    });

    const publishDialogClosed = () => {

    }
    return {
      ...toRefs(state),
      publishDialogClosed,
    }
  }
}
</script>

<style scoped>

</style>
