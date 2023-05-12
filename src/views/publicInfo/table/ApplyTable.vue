<template>

  <div>

    <el-dialog
        v-model="editDialogVisible"
        title="修改闲置物品"
        align-center
        style=""
    >
      <el-form :model="form.goods" label-width=" 120px " style=" margin: 0 auto; width: 650px;">
        <el-form-item>
          <ul>
            <li>
              <h4> 物品标题</h4>
            </li>
            <li>
              <el-input
                  class="input_size "
                  v-model="form.goods.goodsTitle"
                  name="goodsTitle"
                  type="text"
                  id="goodsTitle"
                  placeholder="闲置信息"
              />
            </li>
          </ul>
        </el-form-item>
        <el-form-item>
          <ul>
            <li>
              <h4> 详细情况</h4>
            </li>
            <li>
              <el-input
                  class="input_size "
                  v-model="form.goods.goodsContent"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  type="textarea"
                  placeholder="详细情况"
              />
            </li>
          </ul>
        </el-form-item>

        <!--   封面     -->
        <el-form-item>
          <div>
            <div style="display: block;width:178px;height: 221px" class="fl">
              <ul>
                <li>
                  <h4> 封面</h4>
                </li>
                <li>
                  <el-upload
                      class="avatar-uploader"
                      :action="baseUrl + '/front/resource/uploadImage'"
                      :show-file-list="false"
                      :headers="getToken"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                  >
                    <img
                        :src="form.goods.picUrl ? imgBaseUrl + form.goods.picUrl : picUpload"
                        class="avatar" alt=""/>
                  </el-upload>
                </li>
              </ul>
            </div>

            <div style="display: block; margin-left: 20px" class="fr">
              <ul>
                <li>
                  <h4> 成色</h4>
                  <el-input-number
                      v-model="form.goods.oldDegree"
                      class="mx-4"
                      :min="1"
                      :max="10"
                  />
                </li>
                <li style="margin-top:30px">
                  <h4> 购买时间</h4>
                  <el-date-picker
                      v-model="form.goods.buyTime"
                      type="date"
                      placeholder="购买时间"
                      size="default"
                  />
                </li>
              </ul>
            </div>
          </div>

        </el-form-item>

        <el-form-item>
          <ul style="display:inline-block">
            <li>
              <h4> 价格</h4>
            </li>
            <li>
              <el-input
                  class="input_size "
                  v-model="form.goods.price"
                  name="price"
                  type="text"
                  placeholder="请输入价格"
              >
              </el-input>
            </li>
          </ul>

        </el-form-item>

        <el-form-item>
          <ul>
            <li>
              <h4> 分类</h4>
            </li>
            <li>
              <el-select v-model="form.goods.categoryId" class="m-2" placeholder="请选择" @change="categoryChange">
                <el-option
                    v-for="item in goodsCategory"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
              </el-select>
            </li>
          </ul>
        </el-form-item>

        <el-form-item>
            <span class="dialog-footer">
              <el-button @click="editDialogVisible = false">取消</el-button>
              <el-button color="#626aef" style="margin-left: 300px" class="publish" type="primary" @click="saveGoods">
                发布
              </el-button>
            </span>
        </el-form-item>
      </el-form>
    </el-dialog>


    <ul>

      <li>
        <el-radio-group v-model="choose" class="ml-4" @change="change">
          <el-radio label="1" size="large">上架申请</el-radio>
          <el-radio label="2" size="large">不同意的上架申请</el-radio>
        </el-radio-group>
      </li>


      <li class="itemsList"
          v-for="(item, index) in dataList"
          :key="index">
        <div>
          <!--          @click="goodsDetail(item.goodsId)-->
          <div class=" card2  cf  ">
            <el-row :gutter="3">
              <el-col :span="4">
                <!--     图片      -->
                <a @click="goodsDetail(item.goodsId)" href="javascript:void(0) ">

                  <img
                      class="items_img"
                      :src="`${imgBaseUrl}` + `${item.picUrl}`"
                      :alt="item.goodsTitle"/>
                </a>
              </el-col>
              <el-col :span="6" :offset="1">
                <!--     类容       -->
                <div class="items_txt">
                  <p>
                    <a href="javascript:void(0)">{{ item.goodsTitle }}</a>
                  </p>
                  <p class="intro" style=" ">
                    <a
                        href="javascript:void(0)"
                        v-html="item.goodsContent"
                    ></a>
                  </p>

                  <p class="">
                    {{ item.oldDegree }}成新
                  </p>

                  <!--                  <div style="margin-top:35px">-->
                  <span class="price">
                      ¥{{ item.price }}
                    </span>
                  <!--                  </div>-->
                </div>

              </el-col>

              <el-col :span="7">
                <ul class="gray_color">
                  <li>
                    创建时间: {{ item.createTime }}
                  </li>
                  <li>
                    更新时间: {{ item.updateTime }}
                  </li>
                  <li>
                    商品购买时间: {{ item.buyTime }}
                  </li>
                  <li>
                    类别:{{ item.categoryName }}
                  </li>
                </ul>

              </el-col>
              <el-col :span="2" :offset="3">
                <ul>
                  <!--                  <li>
                                      <el-button class="margin_top_25" type="success" @click="edit(item.goodsId,index)"> 编辑</el-button>
                                    </li>-->
                  <div v-if="choose === '1'">
                    <li>
                      <el-button class="margin_top_25" type="success" @click="agree(item.goodsId)"> 同意上架</el-button>
                    </li>

                    <li>
                      <el-button class="margin_top_25" type="success" @click="disagree(item.goodsId)"> 不同意上架</el-button>
                    </li>
                  </div>
                </ul>

              </el-col>
            </el-row>

          </div>

        </div>

      </li>

    </ul>


  </div>


</template>

<script>
import {reactive, toRefs, watch} from "vue";
import router from "@/router";
import {agreeOnGoods, deleteGoods, listCategory, onGoods, refuseOnGoods, updateGoodsInfo} from "@/api/goods";
import {ElMessage} from "element-plus";
import emitter from "@/utils/mitter";
import {getNickName, getToken, getUid} from "@/utils/auth";
import {publishGoods} from "@/api/user";

export default {
  name: "ApplyTable",
  props: {
    dataList: {
      type: Array,
      required: true,
    }
  },


  setup(props) {
    const state = reactive({
      baseUrl: process.env.VUE_APP_BASE_API_URL,
      imgBaseUrl: process.env.VUE_APP_BASE_IMG_URL,
      editDialogVisible: false,
      indexGoodsId: -1,
      goodsCategory: [],
      choose: '1',
      getToken: {
        Authorization: getToken()
      },
      form: {
        goods: {
          uid: getUid(),
          nickName: getNickName(),
          goodsTitle: '',
          goodsContent: '',
          picUrl: '',
          price: '',
          categoryId: null,
          categoryName: '',
          oldDegree: '',
          buyTime: '',
        },
      }
    });


    watch(() => props.dataList, (newVal, oldVal) => {
      /*      console.log('newVal', newVal)
            console.log('oldVal', oldVal)*/
    })


    const goodsDetail = (goodsId) => {
      router.push({path: `/goods/${goodsId}`});
    };

    // 编辑
    const edit = async (goodsId, index) => {
      try {

        await loadCategoryList()

        // 获得基本新你想
        let goods = props.dataList[index];

        // 将goods 赋值给form中的goods
        state.form.goods.goodsTitle = goods.goodsTitle
        state.form.goods.goodsContent = goods.goodsContent
        state.form.goods.picUrl = goods.picUrl
        state.form.goods.price = goods.price
        state.form.goods.categoryId = goods.categoryId
        state.form.goods.categoryName = goods.categoryName
        state.form.goods.oldDegree = Number(goods.oldDegree)
        state.form.goods.buyTime = goods.buyTime
        state.form.goods.goodsId = goods.goodsId


        // 显示数据
        state.editDialogVisible = true
        state.indexGoodsId = goodsId;
      } catch (e) {
        console.log(e)
      }

    }

    // 同意上架
    const agree = async (goodsId) => {
      try {
        const {data} = await agreeOnGoods(state.form.goods.uid, goodsId)
        if (!data.ok) {
          return;
        }
      } catch (e) {
        console.log(e)
      }
      emitter.$emit("refresh", null)
      ElMessage.success('操作成功！')
    }

    // 不通过
    const disagree = async (goodsId) => {
      try {
        const {data} = await refuseOnGoods(state.form.goods.uid, goodsId)
        if (!data.ok) {
          return;
        }
      } catch (e) {
        // 网络异常
        console.log(e)
      }

      // 添加刷新事件
      emitter.$emit("refresh", null)
      ElMessage.success('操作成功！')
    }


    // 校验
    const check = () => {
      // console.log("sate=========", state.form.goods)
      if (!state.form.goods.goodsTitle) {
        ElMessage.error("标题不能为空！");
        return false;
      }
      if (!state.form.goods.picUrl) {
        ElMessage.error("封面不能为空！");
        return false;
      }
      if (!state.form.goods.goodsContent) {
        ElMessage.error("内容不能为空！");
        return false;
      }

      if (!state.form.goods.price) {
        ElMessage.error("价格不能为空！");
        return false;
      }

      if (!state.form.goods.categoryId) {
        ElMessage.error("分类不能为空！");
        return false;
      }
      return true;
    }

    const saveGoods = async () => {
      // 发消息
      if (!check()) {
        return;
      }
      console.log("发布")
      try {
        // 完善form中的数据
        state.form.goods.uid = getUid();
        state.form.goods.nickName = getNickName();
        console.log(state.form.goods.buyTime)
        // 清除小时-分钟-秒
        /*        state.form.goods.buyTime.setHours(0);
                state.form.goods.buyTime.setMinutes(0);
                state.form.goods.buyTime.setSeconds(0);*/

        const {data} = await updateGoodsInfo(state.form.goods)
        if (!data.ok) {
          return;
        }

      } catch (e) {
        console.log(e)
      }

      // 重置
      state.editDialogVisible = false
      // 添加刷新事件
      emitter.$emit("refresh", null)
      ElMessage.success('操作成功！')
    }


    // 加载分类信息
    const loadCategoryList = async () => {
      try {
        const {data} = await listCategory();
        state.form.goods.categoryId = data.data[0].id
        state.form.goods.categoryName = data.data[0].name
        state.goodsCategory = data.data
      } catch (e) {
        console.log(e)
      }
    }

    // 分类改变
    const categoryChange = (val) => {
      state.goodsCategory.forEach((category) => {
        if (category.id === val) {
          state.form.goods.categoryName = category.name
        }
      });
    }

    const beforeAvatarUpload = (rawFile) => {
      if (rawFile.type !== "image/jpeg") {
        ElMessage.error("必须上传 JPG 格式的图片!");
        return false;
      } else if (rawFile.size / 1024 / 1024 > 5) {
        ElMessage.error("图片大小最多 5MB!");
        return false;
      }
      return true;
    }
    const handleAvatarSuccess = (response, uploadFile) => {
      // console.log(response.data)
      // 处理
      state.form.goods.picUrl = response.data;
    }

    const change = (label) => {
      // 触发事件
      // 添加刷新事件
      emitter.$emit("change", label)
      // console.log(state.choose)
    }

    return {
      ...toRefs(state),
      goodsDetail,
      edit,
      saveGoods,
      categoryChange,
      beforeAvatarUpload,
      handleAvatarSuccess,
      change,
      agree,
      disagree,
    }
  }
}
</script>

<style scoped>

</style>