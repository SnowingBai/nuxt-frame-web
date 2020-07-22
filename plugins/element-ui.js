import Vue from 'vue'
import { Button, Select, Message, Radio } from 'element-ui'
import '@/assets/scss/element-variables.scss'

Vue.use(Button)
Vue.use(Select)
Vue.use(Radio)
Vue.prototype.$message = Message
