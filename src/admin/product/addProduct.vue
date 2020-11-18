<template>
  <div>
    <Add
      type="Product"
      label="产品"
      showCategory
      :category="categoryData"
      v-model="categoryData"
    />
  </div>
</template>

<script>
import Add from "../common/add";

export default {
  components: {
    Add,
  },
  //监听属性 类似于data概念
  computed: {
    categoryData() {
      return this.$store.state.productTabList;
    },
  },
  data() {
    return {};
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$store.dispatch("getProductTabList", this);
  },
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