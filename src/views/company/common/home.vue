<template>
  <div style="margin: 20px 0" class="companyDiv">
    <div
      class="companyDivLeft"
      style="width: 50%; padding: 20px 40px 20px 20px"
    >
      <span :style="{ fontSize: '50px' }">浙江大华技术股份有限公司</span>
      <div
        :style="{
          padding: '20px 0',
          'text-indent': '2em',
          fontSize: '18px',
        }"
      >
        浙江大华技术股份有限公司，是全球领先的以视频为核心的智慧物联解决方案提供商和运营服务商，以技术创新为基础，提供端到端的视频监控解决方案、系统及服务，为城市运营、企业管理、个人消费者生活创造价值。
      </div>
    </div>
    <div class="jieshao" style="width: 50%; overflow: hidden">
      <img
        src="https://www.dahuatech.com/upload/2018/12/27/15458781334019eqmbc.jpg"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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