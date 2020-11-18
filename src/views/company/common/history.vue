<template>
  <div style="margin: 20px 0">
    <a-timeline mode="alternate">
      <a-timeline-item>创立公司 2015-09-01</a-timeline-item>
      <a-timeline-item color="green"> 大事1 2015-09-01 </a-timeline-item>
      <a-timeline-item>
        <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px" />
        大事2
      </a-timeline-item>
      <a-timeline-item color="red">
        Network problems being solved 2015-09-01
      </a-timeline-item>
      <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
      <a-timeline-item>
        <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px" />
        Technical testing 2015-09-01
      </a-timeline-item>
    </a-timeline>
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