<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row>
        <el-col :span="8">

          <el-input placeholder="请输入内容" v-model="searchCondition.keyword" clearable @clear="getInfoList">
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="success" @click="getInfoList">搜索</el-button>
        </el-col>

        <el-col :span="8">
          <el-radio-group v-model="choose" class="ml-4" @change="change">
            <el-radio label="1" size="large">上架中</el-radio>
            <el-radio label="2" size="large">已成交</el-radio>
            <el-radio label="3" size="large">成交中</el-radio>
            <el-radio label="4" size="large">已取消</el-radio>
            <el-radio label="5" size="large">下架的</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="dataList" border stripe style="margin-top: 20px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品封面地址" prop="picUrl">
          <template #default="scope">
            <a href="javascript:void(0)">
              <img
                  style="width:80px;height:80px"
                  class="items_img"
                  :src="`${imgBaseUrl}` + `${scope.row.picUrl}`"
                  onerror="this.src='default.gif';this.onerror=null"
              />
            </a>

          </template>
        </el-table-column>


        <el-table-column label="商品id" prop="goodsId"></el-table-column>

        <el-table-column label="商品名" prop="goodsTitle"></el-table-column>
        <el-table-column label="用户ID" prop="uid"></el-table-column>
        <el-table-column label="用户名" prop="nickName"></el-table-column>

        <el-table-column label="标题" prop="goodsTitle"></el-table-column>
        <el-table-column label="商品类别" prop="categoryName"></el-table-column>

        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="购买时间" prop="buyTime"></el-table-column>
        <el-table-column label="新旧程度(1-10成新)" prop="oldDegree"></el-table-column>

        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>

        <el-table-column label="0:自己发布,1:平台发布" prop="extra">
          <template #default="scope">
            <span v-if="scope.row.extra === '0'">个人发布</span>
            <span v-else-if="scope.row.extra === '1'">平台发布</span>
            <span v-else-if="scope.row.extra === null">未设置</span>
          </template>

        </el-table-column>

        <el-table-column v-if="choose === '1'" label=" 操作" width="180px">
          <template #default="scope">
            <el-button type="danger"
                       @click='offGoods(scope.row.goodsId)'> 下架
            </el-button>

            <el-button type="danger"
                       @click='removeGoods(scope.row.goodsId)'> 删除
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
import {adminDeleteGoods, adminOffGoods, getAllGoodsInfo, getAllUserInfo} from "@/api/admin";
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
  name: "Goods",
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      imgBaseUrl: process.env.VUE_APP_BASE_IMG_URL,
      // 分页相关
      backgroud: true,
      total: 0,
      pageSize: 6,
      keyword: "",

      choose: "1",
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
        data = (await getAllGoodsInfo(state.searchCondition)).data
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

    // 下架商品
    const offGoods = async (id) => {
      try {
        const {data} = await adminOffGoods(state.searchCondition.uid, id);
        if (data.ok) {
          ElMessage.success("下架成功")
          await getInfoList();
        }
      } catch (e) {
        console.log(e)
      }
    }

    const removeGoods = async () => {
      try {
        const {data} = await adminDeleteGoods(state.searchCondition.uid, id);
        if (data.ok) {
          ElMessage.success("删除成功")
          await getInfoList();
        }
      } catch (e) {
        console.log(e)
      }
    }

    const change = async (label) => {
      state.searchCondition.pageNum = null;
      state.searchCondition.pageSize = null;
      state.searchCondition.extra = label;
      await search();
    }


    return {
      ...toRefs(state),
      handleCurrentChange,
      getInfoList,
      offGoods,
      change,
      removeGoods,
    }
  }
}
</script>

<style scoped>

</style>