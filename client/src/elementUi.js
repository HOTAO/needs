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
  popover,
  pagination,
  checkboxGroup,
  checkbox,
  dialog,
  scrollbar
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
Vue.use(pagination)
Vue.use(checkboxGroup)
Vue.use(checkbox)
Vue.use(dialog)
Vue.use(scrollbar)

Vue.prototype.$notify = notification
