// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import animated from 'animate.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
//全局接口
axios.defaults.baseURL='http://127.0.0.1:3000'
Vue.use(VueAxios,axios)
Vue.use(animated)
Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
