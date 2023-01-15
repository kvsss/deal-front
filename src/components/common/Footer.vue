<template>
  <div class="footer">
    <div class="box_center cf">
      <div class="copyright">
        <ul>
          <li class="menu">
            <a href="/?to=mobile">手机站</a><i class="line">|</i
          ><a href="/">网站首页</a><i class="line">|</i
          ><a href="/about/default.html">关于我们</a><i class="line">|</i
          ><a href="/about/contact.html">联系我们</a><i class="line">|</i
          ><a href="javascript:void(0)" @click="goFeedback">反馈留言</a><i class="line">|</i><a href="/author/index.html">作家专区</a
          ><i class="line">|</i><a href="/mobile/fiction_house.apk">客户端</a>
          </li>
          <li>
            Copyright (C) https://github.com/kvsss/deal All rights
            reserved&nbsp;&nbsp;校园二手交易平台
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import {useRouter} from 'vue-router'
import {getToken} from '@/utils/auth.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Footer",
  setup() {
    // 获得路由
    const router = useRouter();
    const goFeedback = () => {
      if (!getToken()) {
        // 没有token
        router.push({name: 'login'})
      } else {
        // 跳转到页面
        router.push({name: 'feedback'})
      }
    }

    return {
      goFeedback
    }
  }
}
</script>

<style scoped>

</style>