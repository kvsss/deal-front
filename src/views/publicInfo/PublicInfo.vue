<template>
  <div class="goodsList box_center box_shadow">
    <el-row style="padding:10px">
      <el-col :span="4">
        <el-menu
            default-active="1"
            @open="handleOpen"
            @close="handleClose">
          <template v-for="li in tableInfo">
<!--            <div v-if="li.show">-->
              <el-menu-item :index="li.index" @click="change(li.index)">
                <el-icon>
                  <component :is="li.icon"/>
                </el-icon>
                <span>{{ li.title }}</span>
              </el-menu-item>
<!--            </div>-->
          </template>
        </el-menu>
      </el-col>


      <el-col :span="20">
        <div style="min-height:400px ;margin-left:10px">
          <ul>

            <li class="cf">
              <div>
                <el-input v-model="keyword" placeholder="搜索" style="width:400px;margin-left: 400px"></el-input>
                <el-button @click="onSearch">搜索</el-button>
              </div>
            </li>

            <li class="cf">
              <!--      组件信息        -->
              <component :is="indexComponent" :dataList="dataList"/>
            </li>

            <li>
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
            </li>

          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>


import GoodsBuy from "@/views/publicInfo/GoodsBuy";
import GoodsSell from "@/views/publicInfo/GoodsSell";
import GoodsPublish from "@/views/publicInfo/GoodsPublish";


import BuyTable from "@/views/publicInfo/table/BuyTable";
import PublicTable from "@/views/publicInfo/table/PublicTable";
import SellTable from "@/views/publicInfo/table/SellTable";
import OutTable from "@/views/publicInfo/table/OutTable";
import ApplyTable from "@/views/publicInfo/table/ApplyTable";
import OnApplyTable from "@/views/publicInfo/table/OnApplyTable";
import PlatformOrderTable from "@/views/publicInfo/table/PlatformOrderTable";


import {onMounted, reactive, toRefs} from "vue";
import SvgIcon from "@/components/common/SvgIcon";
import {listCategory, searchGoods} from "@/api/goods";
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
import {getRole, getUid} from "@/utils/auth";
import emitter from "@/utils/mitter";

export default {
  name: "GoodsList",
  components: {
    SvgIcon,
    GoodsBuy,
    GoodsSell,
    GoodsPublish,

    BuyTable,
    PublicTable,
    SellTable,
    OutTable,
    ApplyTable,
    OnApplyTable,
    PlatformOrderTable,
  },
  setup() {
    let role = getRole();
    const state = reactive({
      userPhoto: "",
      nickName: "",
      baseUrl: process.env.VUE_APP_BASE_API_URL,
      imgBaseUrl: process.env.VUE_APP_BASE_IMG_URL,
      activeIndex: '1',
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

      indexComponent: 'PublicTable',
      dataList: [],
      role: getRole(),
      // 主键
      tableInfo: [
        {
          index: '1',
          title: "我发布的",
          icon: "ArrowUpBold",
          isActive: true,
          component: 'PublicTable',
          show: role === '3'
        }, {
          index: '2',
          title: "我下架的",
          icon: "SortDown",
          isActive: false,
          component: 'OutTable',
          show: role === '3'
        }, {
          index: '3',
          title: "我卖出的",
          icon: "Handbag",
          isActive: false,
          component: 'SellTable',
          show: role === '3'
        }, {
          index: '4',
          title: "我买到的",
          icon: "ShoppingBag",
          isActive: false,
          component: 'BuyTable',
          show: role === '3'
        }, {
          index: '5',
          title: "申请",
          icon: "platform",
          isActive: false,
          component: 'ApplyTable',
          show: role === '2'
        }, {
          index: '6',
          title: "上架中",
          icon: "ArrowUpBold",
          isActive: false,
          component: 'OnApplyTable',
          show: role === '2'
        }, {
          index: '7',
          title: "订单",
          icon: "ArrowUpBold",
          isActive: false,
          component: 'PlatformOrderTable',
          show: role === '2'
        }/*{
          index: '5',
          title: "待发货",
          icon: "setting",
          isActive: false,
          component: 'BuyTable',
        }, {
          index: '6',
          title: "待收货",
          icon: "setting",
          isActive: false,
          component: 'BuyTable',
        }*/],

      selectInfo: {
        index: "1",
      }
    });

    // 切换
    const change = async (index) => {
      if (index === state.activeIndex) {
        return;
      }
      // 重置搜索条件
      state.searchCondition.extra = null;
      state.searchCondition.keyword = "";

      // 切换component
      state.indexComponent = state.tableInfo[parseInt(index) - 1].component;

      // 切换
      state.tableInfo[parseInt(index) - 1].isActive = true;
      state.tableInfo[parseInt(state.activeIndex) - 1].isActive = false;
      state.activeIndex = index;

      // 跳转处理  查询处理 重置分页
      state.searchCondition.pageNum = null;
      state.searchCondition.pageSize = null;
      await search();
    }

    const handleOpen = () => {
      console.log('打开')
    }

    const handleClose = () => {
      console.log('关闭')
    }

    onMounted(async () => {

      // console.log(state.indexComponent)
      // 加载目录
      try {
        await search()
      } catch (e) {
        console.log(e)
      }
    });


    // 异步调用
    const search = async () => {
      let data;
      try {
        // 判断
        switch (state.activeIndex) {
          case "1":
            data = (await getPublicGoods(state.searchCondition)).data
            break;
          case "2":
            data = (await getOffGoods(state.searchCondition)).data
            break;
          case "3":
            data = (await getSellGoods(state.searchCondition)).data
            break;
          case "4":
            data = (await getBuyGoods(state.searchCondition)).data
            break;
          case "5":
            data = (await getApplyGoods(state.searchCondition)).data
            break;
          case "6":
            data = (await getPlatformGoods(state.searchCondition)).data
            break;
          case "7":
            data = (await getPlatformOrder(state.searchCondition)).data
            break;
          default:
            ElMessage.error('处理异常！')
            return;
        }
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


    const handleCurrentChange = async (pageNum) => {
      console.log(pageNum)
      state.searchCondition.pageNum = pageNum;
      await search();
    }

    emitter.$on('refresh', async () => {
      // 调用属性事件
      await search();

    })


    emitter.$on("change", async (label) => {
      // console.log(label)
      // 这里为辅助标签查询
      state.searchCondition.extra = label;
      // label
      // 调用属性事件
      await search();
    })

    // 搜索
    const onSearch = async () => {
      // 添加条件
      state.searchCondition.keyword = state.keyword;
      await search();
    }

    return {
      ...toRefs(state),
      handleOpen,
      handleClose,
      change,
      handleCurrentChange,
      onSearch,
    }
  }
}
</script>

<style scoped>

</style>