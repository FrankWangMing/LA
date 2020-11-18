<template>
  <div class="">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="首页banner设置">
        <Banner />
      </a-tab-pane>
      <a-tab-pane key="2" tab="页尾设置">
        <Footer />
      </a-tab-pane>
      <a-tab-pane key="3" tab="首页logo设置">
        <!-- <logo /> -->
      </a-tab-pane>
      <a-tab-pane key="4" tab="首页logo设置">
        <!-- <logo /> -->
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import Banner from "./indexSetComponents/banner";
import Footer from "./indexSetComponents/footer";

export default {
  data() {
    return {};
  },
  components: {
    Banner,
    Footer,
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    callback(key) {
      console.log(key);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  activated() {},
  beforeCreate() {
    //生命周期 - 创建之前
  },
  beforeMount() {
    //生命周期 - 挂载之前
  },
  beforeUpdate() {
    //生命周期 - 更新之前
  },
  updated() {
    //生命周期 - 更新之后
  },
  beforeDestroy() {
    //生命周期 - 销毁之前
  },
  destroyed() {
    //生命周期 - 销毁完成
  },
};
</script>
<style scoped>
</style>