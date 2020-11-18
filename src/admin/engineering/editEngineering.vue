<template>
  <Edit
    type="Eng"
    label="工程案例"
    :id="id"
    showCategory
    v-model="EngData"
    :data="EngData"
    :category="categoryData"
  />
</template>
<script>
import { getEngOne } from "@/service/getData";
import Edit from "../common/edit";
export default {
  props: ["id"],
  data() {
    return {
      EngData: {},
    };
  },
  components: {
    Edit,
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
  created() {
    console.log(this.id);
    if (this.id) {
      getEngOne(this, { value: { _id: this.id } }).then((res) => {
        this.EngData = res.result.res.data[0];
        console.log(this.EngData);
      });
    }
    this.$store.dispatch("getEngTabList", this);
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