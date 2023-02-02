import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from '@/router'
import '@/assets/styles/base.css'
import '@/assets/styles/onself.css'
import '@/assets/styles/common.css'
import svgIcon from '@/components/common/SvgIcon.vue'
import "@/assets/icon/index"


// 全局导入
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus)

app.use(router)
// 全局引入
app.component('svg-icon', svgIcon)

app.mount('#app')