<template>
  <div class="goods">
    <div class="goods_top box_center box_shadow cf">
      <!--     图片      -->
      <a href="javascript:void(0)">
        <img
            class="goods_img"
            :src="`${imgBaseUrl}` + `${goods.picUrl}`"
            :alt="goods.goodsTitle"/>
      </a>
      <!--     类容       -->
      <div class="goods_txt">
        <p>
          <span href="javascript:void(0)">{{ goods.goodsTitle }}</span>
        </p>
        <p class="author">
          <span href="javascript:void(0)">商家：{{ goods.nickName }}</span>
        </p>
        <p class="intro"
           style=" ">
          <span
              href="javascript:void(0)"
              v-html="goods.goodsContent"
          ></span>
        </p>
        <div style="margin-top:45px">
            <span class="goods_price">
              ¥{{ goods.price }}
            </span>
        </div>
        <div style="margin-top:45px">
          <button @click="buy" class="buy_btn">立即购买</button>
        </div>

      </div>
    </div>


    <div class="goods_bottom box_center box_shadow cf">
      <div class="pad20">
        <div class="bookComment">

          <!--  评论头部  -->
          <div class="book_tit">
            <div style="padding-top: 20px">
              <h3 style=" display: inline;margin-left: 20px;">
                评论区
              </h3>
              <span id="bookCommentTotal" display="block;float:left">
             ({{ newestComments.commentTotal }}条)</span>
            </div>
          </div>

          <!--  评论没有,显示图片  -->
          <div
              v-if="newestComments.commentTotal == 0"
              class="no_comment"
              id="noCommentPanel">

            <img :src="no_comment" alt=""/>
            <span class="block">暂无评论</span>
          </div>

          <!--  评论有，显示内容-->
          <div
              v-if="newestComments.commentTotal > 0"
              class="commentBar"
              id="commentPanel">

            <div
                class="comment_list cf"
                v-for="(item, index) in newestComments.comments"
                :key="index">
              <div style="margin-bottom:10px">
                <div class="user_heads fl" vals="389">
                  <img
                      :src="
                                  item.commentUserPhoto
                                    ? imgBaseUrl + item.commentUserPhoto
                                    : man
                                "
                      class="user_head"
                      alt=""
                  /><span class="user_level1" style="display: none"
                >见习</span
                >
                </div>
                <ul class="pl_bar fl">
                  <li class="name">
                    <span> {{ item.commentUser }}</span>
                    <span class="time " style="padding-left:20px">{{ item.commentTime }}</span>
                  </li>

                  <li class="dec" v-html="item.commentContent"></li>
                  <li class="other cf">
                                <span class="fr" v-if="item.commentUserId == uid"
                                ><a
                                    href="javascript:void(0);"
                                    @click="
                                      updateUserComment(item.id, item.commentContent)
                                    "
                                    class="zan"
                                >修改</a
                                >
                                  |
                                  <a
                                      href="javascript:void(0);"
                                      @click="deleteUserComment(item.id)"
                                      class="zan"
                                  >删除</a
                                  ></span
                                >
                  </li>
                </ul>
              </div>

            </div>
          </div>

          <el-dialog
              v-model="dialogUpdateCommentFormVisible"
              title="评论修改"
          >
            <el-form>
              <el-form-item label="评论内容">
                <el-input type="textarea" v-model="updateComment"/>
              </el-form-item>
            </el-form>
            <template #footer>
                            <span class="dialog-footer">
                              <el-button @click="dialogUpdateCommentFormVisible = false"
                              >取消</el-button
                              >
                              <el-button type="primary" @click="goUpdateComment()"
                              >确定</el-button
                              >
                            </span>
            </template>
          </el-dialog>

          <!--无评论时此处隐藏-->
          <div class="more_bar" id="moreCommentPanel" style="display: none">
            <a href="/book/comment-1431636283466297344.html"
            >查看全部评论&gt;</a
            >
          </div>

          <div class="reply_bar" id="reply_bar">
            <div class="tit cf">
              <h3 class="fl font16">发表评论</h3>

              <span class="fr black9" style="display: none"
              >请先 <a class="orange" href="/user/login.html">登录</a
              ><em class="ml10 mr10">|</em
              ><a class="orange" href="/user/register.html">注册</a></span>
            </div>

            <div style="width: 1100px;margin: 0 auto">
              <el-input
                  style="width: 1100px; margin: 0 auto"
                  v-model="commentContent"
                  maxlength="1000"
                  placeholder="我来说两句..."
                  show-word-limit
                  :autosize="{ minRows: 4, maxRows: 4 }"
                  type="textarea"/>
            </div>

            <div class="reply_btn">
              <button style="float: right;margin-top: 20px;margin-right: 40px;" class="comment_btn fr"
                      @click="userComment">
                发表
              </button>
            </div>
          </div>


        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive, toRefs} from "vue";
import {getUid} from "@/utils/auth";
import {addVisitCount, getGoodsById, listNewestComments} from "@/api/goods";
import no_comment from "@/assets/images/no_comment.png";
import man from "@/assets/images/man.png";
import {ElMessage} from "element-plus";
import {comment, deleteComment, updateComment} from "@/api/user";

export default {
  name: "Goods",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      uid: getUid(),
      goods: {},
      books: [],
      chapterAbout: {},
      commentContent: "",
      newestComments: {},
      imgBaseUrl: process.env.VUE_APP_BASE_IMG_URL,
      dialogUpdateCommentFormVisible: false,
      commentId: "",
      updateComment: "",
    });


    onMounted(() => {
      const goodsId = route.params.id;
      loadBook(goodsId);
      loadNewestComments(goodsId);
    })


    const loadBook = async (goodsId) => {
      try {
        const {data} = await getGoodsById(goodsId);
        state.goods = data.data;
        // 添加访问量
        await addVisitCount(goodsId)
      } catch (e) {
        console.log(e)
      }
    }

    const loadNewestComments = async (goodsId) => {
      try {
        const {data} = await listNewestComments({goodsId: goodsId});
        state.newestComments = data.data;
      } catch (e) {
        console.log(e)
      }
    }

    const buy = () => {
      const goodsId = route.params.id;
      console.log(goodsId)
    }

    const userComment = async () => {
      if (!getUid()) {
        ElMessage.success("请先登录")
        await router.push({
          path: "/login"
        })
        return;
      }

      if (!state.commentContent) {
        ElMessage.error("用户评论不能为空！");
        return;
      }
      try {
        const {data} = await comment({
          userId: getUid(),
          goodsId: state.goods.goodsId,
          commentContent: state.commentContent,
        });

        if (!data.ok) {
          return;
        }
        state.commentContent = "";
        // 重新加载
        await loadNewestComments(state.goods.goodsId);
        ElMessage.success("评论成功！");
      } catch (e) {
        console.log(e)
      }
    }

    // 修改
    const updateUserComment = (id, comment) => {
      state.dialogUpdateCommentFormVisible = true;
      // 传递
      state.updateComment = comment;
      state.commentId = id;
    }

    // 修改
    const goUpdateComment = async () => {
      state.dialogUpdateCommentFormVisible = false;
      try {
        const {data} = await updateComment(state.commentId, getUid(), {content: state.updateComment});
        console.log(data)
        if (!data.ok) {
          return;
        }

        ElMessage.success("修改成功!")
        loadNewestComments(state.goods.goodsId);
      } catch (e) {
        console.log(e)
      }
    }

    // 删除
    const deleteUserComment = async (id) => {
      try {
        const {data} = await deleteComment(id, getUid());
        if (!data.ok) {
          return;
        }
        ElMessage.success("删除成功!")
        loadNewestComments(state.goods.goodsId);
      } catch (e) {
        console.log(e)
      }
    }

    return {
      ...toRefs(state),
      buy,
      no_comment,
      man,
      userComment,
      updateUserComment,
      deleteUserComment,
      goUpdateComment,
    }
  }


}
</script>

<style scoped>

</style>