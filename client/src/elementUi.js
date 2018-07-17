import Vue from 'vue'
import {
  Form,
  FormItem,
  Select,
  Option,
  Input,
  Button,
  table,
  tableColumn,
  notification,
  popover
} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(Button)
Vue.use(table)
Vue.use(tableColumn)
Vue.use(popover)

Vue.prototype.$notify = notification
