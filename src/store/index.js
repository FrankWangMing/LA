import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  //匿名登录
  loginState: false,
  // 分类数据
  productTabList: [],
  newTabList: [],
  engineeringTabList: [],

  //产品 工程 新闻数据
  productData: [],
  engineeringData: [],
  newData: [],

  //banner
  bannerData: [],
  //后台分类
  drawerCategory: []
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})
