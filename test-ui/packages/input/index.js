// 导入组件，组件必须声明 name
import gInput from './src/input.vue'

// 为组件提供 install 安装方法，供按需引入
gInput.install = function (Vue) {
  Vue.component(gInput.name, gInput)
}

// 默认导出组件
export default gInput
