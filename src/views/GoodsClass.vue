<template>
  <div class="goodsClass " id="goodsSearch">
    <div class="search box_center box_shadow">
      <div class="search_list">

        <!--  分类/时间/排序时间      -->
        <ul >
          <li class="search_li">
           <label class="search_label"> 商品类别:</label>
            <el-radio-group v-model="radio" fill="#FFF" >
              <el-radio label="不限">不限</el-radio>
              <el-radio :label="6">Option B</el-radio>
              <el-radio :label="9">Option C</el-radio>
            </el-radio-group>
          </li>

          <li class="search_li">


            <label class="search_label">上架时间:</label>
            <el-radio-group v-model="radio" fill="#FFF" >
              <el-radio label="不限">不限</el-radio>
              <el-radio :label="6">Option B</el-radio>
              <el-radio :label="9">Option C</el-radio>
            </el-radio-group>
          </li>

          <li class="search_li">
            <label class="search_label">排序方式:</label>
            <el-radio-group v-model="radio" fill="#FFF" >
              <el-radio label="不限">不限</el-radio>
              <el-radio :label="6">Option B</el-radio>
              <el-radio :label="9">Option C</el-radio>
            </el-radio-group>
          </li>

        </ul>
      </div>
    </div>


    <div class="search_show box_center box_shadow">
      <GoodsCard title="搜索结果" :dataLst="goods"></GoodsCard>
    </div>

  </div>
</template>

<script>
import {getCurrentInstance, onMounted, reactive, toRefs} from "vue";
import {useRoute, useRouter} from "vue-router";
import mitt from "mitt";
import emitter from "@/utils/mitter";
import {searchGoods} from "@/api/goods";
import GoodsCard from "@/components/home/GoodsCard";

export default {
  name: "GoodsClass",
  components: {GoodsCard},
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      goodsCategory: [],
      goods: [],
      searchCondition: {},
      backgroud: true,
      total: 0,
      pageSize: 10,
      imgBaseUrl: process.env.VUE_APP_BASE_IMG_URL,
      workDirectionOn: 0,
      categoryOn: 0,
      goodsStatusOn: null,
      wordCountOn: null,
      updateTimeOn: null,
      sortOn: null,
      radio: "不限",
    });


    emitter.$on('search', (key) => {
      searchByK(key)
    })

    // 查找函数
    const searchByK = (key) => {
      state.searchCondition = {keyword: key};
      search();
    }

    // 异步调用
    const search = async () => {
      // 函数调用
      // const {data} = await searchBooks(state.searchCondition);

      try {
        const {data} = await searchGoods(state.searchCondition)
        if (!data.ok) {
          return;
        }
        // 数值绑定
        state.goods = data.data.list;
        state.searchCondition.pageNum = data.data.pageNum;
        state.searchCondition.pageSize = data.data.pageSize;
        state.total = Number(data.total);
      } catch (error) {
        console.log(error)
      }
    }


    return {
      ...toRefs(state),
    }


  }

}


</script>

<style scoped>

</style>