<template>
  <div>

    <!--  添加  -->
    <el-dialog
        v-model="addDialogVisible"
        title="添加商品类型"
        align-center
    >
      <el-form :model="form.goods" label-width=" 120px " style=" margin: 0 auto; width: 650px;">
        <el-form-item>
          <ul>
            <li>
              <h4> 商品类型</h4>
            </li>
            <li>
              <el-input
                  class="input_size "
                  v-model="form.name"
                  name="goodsTitle"
                  type="text"
                  id="goodsTitle"
                  placeholder="商品类型"
              />
            </li>
          </ul>
        </el-form-item>

        <el-form-item>
            <span class="dialog-footer">
              <el-button @click="addDialogVisible = false">取消</el-button>
              <el-button color="#626aef" style="margin-left: 280px" class="publish" type="primary" @click="save">
                添加
              </el-button>
            </span>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--  修改  -->
    <el-dialog
        v-model="showEditDialogVisible"
        title="修改商品类型"
        align-center
    >
      <el-form :model="form.goods" label-width=" 120px " style=" margin: 0 auto; width: 650px;">
        <el-form-item>
          <ul>
            <li>
              <h4> 商品类型</h4>
            </li>
            <li>
              <el-input
                  class="input_size "
                  v-model="editform.name"
                  name="goodsTitle"
                  type="text"
              />
            </li>
          </ul>
        </el-form-item>

        <el-form-item>
            <span class="dialog-footer">
              <el-button @click="showEditDialogVisible = false">取消</el-button>
              <el-button color="#626aef" style="margin-left: 280px" class="publish" type="primary" @click="update">
                修改
              </el-button>
            </span>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 修改 -->


    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row>
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
          <el-button type="primary" @click="addDialogVisible = true">添加商品类型</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="dataList" border stripe style="margin-top: 20px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品类型" prop="name"></el-table-column>

        <el-table-column label=" 操作" width="240px">


          <template #default="scope">
            <el-button type="primary"
                       @click='showEditDialog(scope.row.id,scope.$index)'>编辑
            </el-button>

            <el-button type="danger"
                       @click='remove(scope.row.id)'> 删除
            </el-button>
          </template>

        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <!--    <el-pagination @size-change="changeSize" @current-change="changeCurrent"
                         :current-page="queryInfo.pageNum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>-->

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
import {getRole, getUid} from "@/utils/auth";
import {addCategory, deleteCategory, getAllCategoryInfo, getAllUserInfo, updateCategory} from "@/api/admin";
import {
  getApplyGoods,
  getBuyGoods,
  getOffGoods,
  getPlatformGoods,
  getPlatformOrder,
  getPublicGoods,
  getSellGoods
} from "@/api/user";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "GoodsType",
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      // 分页相关
      backgroud: true,
      total: 0,
      pageSize: 6,
      keyword: "",
      searchCondition: {
        uid: getUid(),
        keyword: "",
        extra: ""
        /*        pageNum: null,
                pageSize: null,*/
      },
      form: {
        uid: getUid(),
        name: "",
      },

      editform: {
        uid: getUid(),
        id: null,
        name: "",
      },
      addDialogVisible: false,
      showEditDialogVisible: false,

      dataList: [],
    });


    onMounted(async () => {
      const role = getRole();
      if (!(role === "1")) {
        // console.log(role)
        await router.push('/adminLogin')
        return
      }
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
        data = (await getAllCategoryInfo(state.searchCondition)).data
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

    const save = async () => {
      try {
        const {data} = await addCategory(state.form)
        if (data.ok) {
          ElMessage.success("添加成功")
          await getInfoList();
          state.addDialogVisible = false;
        }
      } catch (e) {
        console.log(e)
      }
    }


    const remove = async (id) => {
      ElMessageBox.confirm('此操作将永久删除该商品类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const {data} = await deleteCategory(state.form.uid, id)
          if (data.ok) {
            ElMessage.success("删除成功")
            await getInfoList();
          }
        } catch (e) {
          console.log(e)
        }
      })
          .catch(() => {
            // 用户点击取消
            ElMessage.info('已取消')
          })
    }

    const showEditDialog = (id, index) => {
      state.editform.id = id;
      state.editform.name = state.dataList[index].name;
      state.showEditDialogVisible = true;
      /*      console.log(id)
            console.log(index)*/
    }

    const update = async () => {
      try {
        const {data} = await updateCategory(state.editform)
        if (data.ok) {
          ElMessage.success("修改成功")
          await getInfoList();
          state.showEditDialogVisible = false;
        }
      } catch (e) {
        console.log(e)
      }
    }

    return {
      ...toRefs(state),
      handleCurrentChange,
      getInfoList,
      save,
      remove,
      showEditDialog,
      update,
    }
  }
}
</script>

<style scoped>

</style>