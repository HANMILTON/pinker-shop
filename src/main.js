// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueQuillEditor from 'vue-quill-editor'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'babel-polyfill'
Vue.use(ElementUI)
Vue.config.productionTip = false
// Vue.component('VueQuillEditor',VueQuillEditor)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // VueAsyncData,
  template: '<App/>',
  components: { App }
})
