import Vue from "vue";
import App from "./App.vue";
import Cloudbase from "@cloudbase/vue-provider";
import config from "../cloudbaserc";
import router from './router';
import 'ant-design-vue/dist/antd.css';
import store from './store';
import './Vue.Antd.config';
// import './plugin/tips'
import VueAMap from 'vue-amap'
import CKEditor from '@ckeditor/ckeditor5-vue';

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)

Vue.config.productionTip = false;


Vue.use(CKEditor)
Vue.use(Cloudbase, {
  env: config.envId,
});

Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key: "ce2c4d48c35e3a3d3e5df178db2ce283",
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
