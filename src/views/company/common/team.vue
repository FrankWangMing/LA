<template>
  <a-space align="center">
    <div class="getDIv" style="margin: 20px 0">
      <a-icon type="team" :style="{ 'font-size': '68px' }" />
      <span>
        <strong :style="{ 'font-size': '25px' }"> 招贤纳士 </strong>
      </span>
    </div>
  </a-space>
</template>
<script>
export default {
  components: {},
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
.getDIv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 300px;
  background: white;
  transition: 0.3s all;
}
.getDIv:hover {
  box-shadow: 0 0 5px 10px #dcdcdc;
  cursor: pointer;
}

.getDIv:hover strong {
  color: #1890ff;
}
</style>