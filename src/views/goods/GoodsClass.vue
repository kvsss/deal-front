<template>
  <div class="goodsClass " id="goodsSearch">
    <div class="search box_center box_shadow">
      <div class="search_list">

        <!--  分类/时间/排序时间      -->
        <ul>
          <li class="search_li">
            <label class="search_label"> 商品类别:</label>
            <el-radio-group v-model="search.categoryId" fill="#FFF" @change="changeCategory">
              <el-radio label="不限">不限</el-radio>
              <template v-for="(item, index)  in goodsCategory">
                <el-radio :label="item.id">{{ item.name }}</el-radio>
              </template>
            </el-radio-group>
          </li>

          <li class="search_li">


            <label class="search_label">上架时间:</label>
            <el-radio-group v-model="search.publishTimeMin" fill="#FFF" @change="changeDay">
              <el-radio label="不限">不限</el-radio>
              <el-radio label="3">三日内</el-radio>
              <el-radio label="7">七日内</el-radio>
              <el-radio label="15">半月内</el-radio>
              <el-radio label="30">一月内</el-radio>
            </el-radio-group>
          </li>

          <li class="search_li">
            <label class="search_label">排序方式:</label>
            <el-radio-group v-model="search.sort" fill="#FFF" @change="changeSort">
              <el-radio label="不限">不限</el-radio>
              <el-radio label="create_time">上架时间</el-radio>
              <el-radio label="visit_count">点击量</el-radio>
              <el-radio label="comment_count">评论量</el-radio>
              <el-radio label="old_degree">成色</el-radio>
            </el-radio-group>
          </li>

          <li class="search_li">
            <label class="search_label">发布方式:</label>
            <el-radio-group v-model="search.scene" fill="#FFF" @change="changeScene">
              <el-radio label="不限">不限</el-radio>
              <el-radio label="1">个人</el-radio>
              <el-radio label="2">长大平台</el-radio>

            </el-radio-group>
          </li>

        </ul>
      </div>
    </div>


    <div class="search_show box_center box_shadow">
      <GoodsCard title="搜索结果" :dataList="goods"></GoodsCard>

      <div style="margin-left:400px">
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

  </div>
</template>

<script>
import {getCurrentInstance, onMounted, reactive, toRefs} from "vue";
import {useRoute, useRouter} from "vue-router";
import mitt from "mitt";
import emitter from "@/utils/mitter";
import {listCategory, searchGoods} from "@/api/goods";
import GoodsCard from "@/components/home/GoodsCard";
import {addDay, dateFormat} from "@/utils";
import {getToken, getUid} from "@/utils/auth";

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
      pageSize: 6,
      imgBaseUrl: process.env.VUE_APP_BASE_IMG_URL,
      workDirectionOn: 0,
      categoryOn: 0,
      goodsStatusOn: null,
      wordCountOn: null,
      updateTimeOn: null,
      sortOn: null,
      radio: "不限",
      search: {
        categoryId: "不限",
        publishTimeMin: "不限",
        sort: "不限",
        scene: "不限",
      }
    });


    emitter.$on('search', (key) => {
      searchByK(key)
    })

    onMounted(async () => {
      // 加载目录
      try {
        const {data} = await listCategory();
        state.goodsCategory = data.data
        await search();
      } catch (e) {
        console.log(e)
      }
      // 加载数据
    });

    const changeCategory = (categoryId) => {
      console.log(categoryId)
      state.searchCondition.categoryId = categoryId;
      search();
    }

    const changeDay = (day) => {
      if (day !== null && day === "不限") {
        state.searchCondition.publishTimeMin = null
      } else {
        state.searchCondition.publishTimeMin = dateFormat(
            "YYYY-mm-dd",
            addDay(-day)
        );
      }
      search();
    }

    const changeSort = (sort) => {
      state.searchCondition.sort = sort;
      search();
    }

    const changeScene = (scene) => {
      console.log(scene)
      state.searchCondition.scene = scene;
      console.log(state.searchCondition.scene = scene)

      search();
    }


    // 查找函数
    const searchByK = (key) => {
      state.searchCondition = {
        keyword: key
      };
      search();
    }

    const checkAndSetCondition = () => {
      if (state.searchCondition.categoryId !== null && state.searchCondition.categoryId === "不限") {
        state.searchCondition.categoryId = null
      }

      if (state.searchCondition.publishTimeMin !== null && state.searchCondition.publishTimeMin === "不限") {
        state.searchCondition.publishTimeMin = null
      }

      if (state.searchCondition.sort !== null && state.searchCondition.sort === "不限") {
        state.searchCondition.sort = null
      }
    }

    const handleCurrentChange = (pageNum) => {
      state.searchCondition.pageNum = pageNum;
      search();
    }

    // 异步调用
    const search = async () => {
      // 函数调用
      // const {data} = await searchBooks(state.searchCondition);
      checkAndSetCondition()
      try {
        console.log(state.searchCondition)
        const {data} = await searchGoods(state.searchCondition)
        if (!data.ok) {
          return;
        }
        // 数值绑定
        state.goods = data.data.list;
        state.searchCondition.pageNum = data.data.pageNum;
        state.searchCondition.pageSize = data.data.pageSize;
        state.total = Number(data.data.total);
        console.log(state.total)
      } catch (error) {
        console.log(error)
      }
    }


    return {
      ...toRefs(state),
      changeCategory,
      changeDay,
      changeSort,
      handleCurrentChange,
      changeScene,
    }


  }

}


</script>

<style scoped>

</style>