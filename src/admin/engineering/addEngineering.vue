<template>
  <div class="">
    <Add
      type="Eng"
      label="工程案例"
      :category="categoryData"
      v-model="categoryData"
      showCategory
    />
  </div>
</template>
<script>
import Add from "../common/add";
export default {
  data() {
    return {
      // categoryData: [],
    };
  },
  components: {
    Add,
  },
  created() {
    this.$store.dispatch("getEngTabList", this);
  },
  //监听属性 类似于data概念
  computed: {
    categoryData() {
      return this.$store.state.engineeringTabList;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
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