<template>
  <div class="newDIv">
    <div
      :style="{
        width: '25%',
        background: 'red',
        overflow: ' hidden',
      }"
    >
      <!-- <img :src="data[0].coverImg" /> -->
    </div>
    <div
      :style="{
        width: '45%',
        background: 'red',
        overflow: ' hidden',
      }"
    >
      <!-- <img :src="data[1].coverImg" /> -->
    </div>
    <div
      :style="{
        width: '25%',
        background: 'red',
        overflow: ' hidden',
      }"
    >
      <!-- <img :src="data[2].coverImg" /> -->
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
  props: {
    data: Array,
  },
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
.newDIv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 700px;
}
</style>