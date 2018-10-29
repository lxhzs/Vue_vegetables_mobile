// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { ConfirmPlugin } from 'vux';
Vue.use(ConfirmPlugin);

import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo)

var FastClick = require('fastclick');
FastClick.attach(document.body);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
