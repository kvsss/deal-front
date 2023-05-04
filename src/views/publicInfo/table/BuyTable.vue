<template>

  <div>
    <!-- 模态窗口   -->
        <el-dialog
            v-model="editDialogVisible"
            title="修改信息"
            align-center
            style=""
        >
          <el-form :model="form.info" label-width=" 120px " style=" margin: 0 auto; width: 650px;">

            <el-form-item>
              <ul>
                <li>
                  <h4> 联系方式</h4>
                </li>
                <li>
                  <el-input
                      class="input_size "
                      v-model="form.info.buyerPhone"
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
                  <h4> 收货地址</h4>
                </li>
                <li>
                  <el-input
                      class="input_size "
                      v-model="form.info.buyerAddress"
                      type="text"
                      placeholder="详细情况"
                  />
                </li>
              </ul>
            </el-form-item>


            <el-form-item>
                <span class="dialog-footer">
                  <el-button @click="editDialogVisible = false">取消</el-button>
                  <el-button color="#626aef"    style="margin-left: 200px;"
                             class="publish" type="primary" @click="save">
                    发布
                  </el-button>
                </span>
            </el-form-item>
          </el-form>
        </el-dialog>


    <ul>
      <li>
        <el-radio-group v-model="choose" class="ml-4" @change="change">
          <el-radio label="1" size="large">已买到</el-radio>
          <el-radio label="2" size="large">待收货</el-radio>
          <el-radio label="3" size="large">已取消</el-radio>
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
              <el-col :span="5" :offset="1">
                <!--     类容       -->
                <div class="items_txt">
                  <ul>
                    <li style="margin-top:20px">
<!--                      {{item.extra}}-->
                      <div v-if="item.extra === '1' ">
                        <el-icon>
                          <PriceTag/>
                        </el-icon>
                        平台发布
                      </div>
                    </li>
                    <li><a href="javascript:void(0)">{{ item.goodsTitle }}</a>
                    </li>
                    <li><a
                        href="javascript:void(0)"
                        v-html="item.goodsContent"
                    ></a></li>
                    <li> {{ item.oldDegree }}成新
                    </li>
                    <li>                  <span class="price">
                      ¥{{ item.price }}
                    </span></li>
                  </ul>
                </div>

              </el-col>

              <el-col :span="9">
                <ul>
                  <li class="gray_color">
                    收货地址: {{ item.buyerAddress }} <br/>
                    收货人: {{ item.buyerName }} <br/>
                    买家联系方式: {{ item.buyerPhone }}<br/>
                    卖家联系方式: {{ item.sellerPhone }}<br/>
                    下单时间: {{ item.createTime }}<br/>
                    最后更新时间: {{ item.updateTime }}<br/>
                  </li>
                </ul>
              </el-col>

              <el-col :span="5">
                <div style="margin-top:0px">
                  <!--                  <el-button type="success" @click="edit(item.goodsId)"> 编辑</el-button>
                                    <el-button type="success" @click="remove(item.goodsId)"> 删除</el-button>
                                    <el-button type="success" @click="off(item.goodsId)"> 下架</el-button>-->

                  <div v-if="choose === '2'">
                    <ul>
                      <li>
                        <el-button class="margin_top_25" type="success" @click="edit(item.orderId,index)"> 修改信息</el-button>
                      </li>

                      <li>
                        <el-button class="margin_top_25" type="success" @click="cancel(item.orderId)"> 取消交易</el-button>
                      </li>

                      <li>
                        <el-button class="margin_top_25" type="success" @click="finish(item.orderId)"> 完成交易</el-button>
                      </li>
                    </ul>
                  </div>

                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </li>
    </ul>


  </div>


</template>

<script>
import {onMounted, reactive, toRefs, watch} from "vue";
import router from "@/router";
import {deleteGoods, offGoods, onGoods} from "@/api/goods";
import {ElMessage} from "element-plus";
import emitter from "@/utils/mitter";
import {cancelOrder, finishOrder, updateOrderInfo} from "@/api/order";

export default {
  name: "BuyTable",
  props: {
    dataList: {
      type: Array,
      required: true,
    }
  },


  setup(props) {
    const state = reactive({
      imgBaseUrl: process.env.VUE_APP_BASE_IMG_URL,
      choose: '1',
      editDialogVisible: false,
      form: {
        info: {
          orderId: '',
          buyerAddress: '',
          buyerPhone: '',
        }
      }
    });

    onMounted(() => {
      // state.choose = '1';
      console.log("进入")
    })


    watch(() => props.dataList, (newVal, oldVal) => {
      /*      console.log('newVal', newVal)
            console.log('oldVal', oldVal)*/
    })


    const goodsDetail = (goodsId) => {
      router.push({path: `/goods/${goodsId}`});
    };


    // 选择
    const change = (label) => {
      // 触发事件
      // 添加刷新事件
      emitter.$emit("change", label)
      // console.log(state.choose)
    }

    // 编辑
    const edit = (goodsId,index) => {
      // 属性绑定
      state.form.info.orderId = props.dataList[index].orderId
      state.form.info.buyerAddress = props.dataList[index].buyerAddress
      state.form.info.buyerPhone = props.dataList[index].buyerPhone

      state.editDialogVisible = true;
    }


    // 取消交易
    const cancel = async (orderId) => {
      try {
        const {data} = await cancelOrder(orderId)
        if (!data.ok) {
          return;
        }

      } catch (e) {
        console.log(e)
      }
      // 添加刷新事件
      emitter.$emit("refresh", null)
      ElMessage.success('操作成功！')
    };

    // 完成交易
    const finish = async (orderId) => {
      try {
        const {data} = await finishOrder(orderId)
        if (!data.ok) {
          return;
        }
      } catch (e) {
        console.log(e)
      }
      // 添加刷新事件
      emitter.$emit("refresh", null)
      ElMessage.success('操作成功！')
    };

    const save = async () => {
      try {
        const {data} = await updateOrderInfo(state.form.info)
        if (!data.ok) {
          return;
        }
      } catch (e) {
        console.log(e)
      }
      state.editDialogVisible = false;
      // 添加刷新事件
      emitter.$emit("refresh", null)
      ElMessage.success('操作成功！')
    }

    return {
      ...toRefs(state),
      goodsDetail,
      change,
      edit,
      cancel,
      finish,
      save,
    }
  }
}
</script>

<style scoped>

</style>