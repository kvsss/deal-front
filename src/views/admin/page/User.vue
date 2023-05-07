<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="searchCondition.keyword" clearable @clear="getInfoList">
          </el-input>
        </el-col>

        <el-col :span="8">
          <el-button type="success" @click="getInfoList">搜索</el-button>
        </el-col>
        <el-col :span="4">
          <!--  点击添加按钮
          将addDialogVisible设置为true,打开模态框
          -->
          <!--          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>-->
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="dataList" border stripe style="margin-top: 20px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="账号名" prop="userName"></el-table-column>
        <el-table-column label="名称" prop="nickName"></el-table-column>

        <el-table-column label="用户性别" prop="userSex">
          <template #default="scope">
            <span v-if="scope.row.userSex === '0'">男</span>
            <span v-else-if="scope.row.userSex === '1'">女</span>
            <span v-else-if="scope.row.userSex === null">未设置</span>
          </template>
        </el-table-column>

        <el-table-column label="用户状态" prop="status">
          <template #default="scope">
            <span v-if="scope.row.status === '0'">正常</span>
            <span v-else-if="scope.row.userSex === null">未设置</span>
          </template>
        </el-table-column>

        <el-table-column label="禁用账户" prop="status">
          <template #default="scope">
            <el-switch v-model="scope.row.status"
                       active-value="1"
                       inactive-value="0"
                       @click="changeUsable(scope.row.uid,scope.row.status)"/>
          </template>
        </el-table-column>


        <el-table-column label="开启平台账户" prop="role">
          <template #default="scope">
            <el-switch v-model="scope.row.role"
                       active-value="2"
                       inactive-value="3"
                       @click="changePlatform(scope.row.uid,scope.row.role)"/>
          </template>
        </el-table-column>


        <el-table-column label=" 操作" width="180px">
          <template #default="scope">

            <el-button type="danger"
                       @click='removeUser(scope.row.uid)'> 删除
            </el-button>

          </template>
        </el-table-column>
      </el-table>


      <!--   分页插件  -->
      <div class="search_show box_page box_shadow">
        <!--  改变分页结果     -->
        <div style="margin-left:400px; ">
          <el-pagination
              small
              layout="prev, pager, next ,jumper"
              :background="backgroud"
              :page-size="pageSize"
              :total="total"
              class="mt-4"
              @current-change="handleCurrentChange"
          />
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {onMounted, reactive, toRefs} from "vue";
import {getUid} from "@/utils/auth";
import {deleteUser, disableUser, enableUser, getAllUserInfo} from "@/api/admin";
import {
  getApplyGoods,
  getBuyGoods,
  getOffGoods,
  getPlatformGoods,
  getPlatformOrder,
  getPublicGoods,
  getSellGoods
} from "@/api/user";
import {ElMessage} from "element-plus";

export default {
  name: "User",
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      // 分页相关
      backgroud: true,
      total: 0,
      pageSize: 6,
      keyword: "",
      // 按钮
      usable: false,

      searchCondition: {
        uid: getUid(),
        keyword: "",
        extra: ""
        /*        pageNum: null,
                pageSize: null,*/
      },
      dataList: [],
    });


    onMounted(async () => {
      console.log("进入")
      await search();
    });

    const handleCurrentChange = async (pageNum) => {
      console.log(pageNum)
      state.searchCondition.pageNum = pageNum;
      await search();
    }


    const search = async () => {
      let data;
      try {
        data = (await getAllUserInfo(state.searchCondition)).data
      } catch (e) {
        console.log(e)
      }
      if (!data.ok) {
        return;
      }

      state.dataList = data.data.list;
      state.searchCondition.pageNum = data.data.pageNum;
      state.searchCondition.pageSize = data.data.pageSize;
      state.total = Number(data.data.total);
    }

    const getInfoList = async () => {
      await search();
    }

    const changeUsable = async (uid, status) => {
      try {
        const {data} = await disableUser(state.searchCondition.uid, uid);
        if (data.ok) {
          ElMessage.success("成功")
          await getInfoList();
        }
      } catch (e) {
        console.log(e)
      }
      await getInfoList();
    }

    const changePlatform = async (uid, role) => {
      try {
        const {data} = await enableUser(state.searchCondition.uid, uid);
        if (data.ok) {
          ElMessage.success("成功")
        }
      } catch (e) {
        console.log(e)
      }
      await getInfoList();
    }

    const removeUser = async (uid) => {
      try {
        const {data} = await deleteUser(state.searchCondition.uid, uid);
        if (data.ok) {
          ElMessage.success("成功")
        }
      } catch (e) {
        console.log(e)
      }
      await getInfoList();
    }

    return {
      ...toRefs(state),
      handleCurrentChange,
      getInfoList,
      changeUsable,
      changePlatform,
      removeUser,
    }
  }
}
</script>

<style scoped>

</style>