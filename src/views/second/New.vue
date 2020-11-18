<template>
  <div class="contentDiv">
    <Header :title="NewOne.name" />
    <span>{{ NewOne.description }}</span>
    <div v-html="NewOne.content"></div>
  </div>
</template>
<script>
import Header from "@/components/header/Header.vue";
import { getNewOne } from "@/service/getData";

export default {
  name: "New",
  props: ["id"],
  components: {
    Header,
  },
  data() {
    return {
      NewOne: {},
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    getNewOne(this, { value: { _id: this.id } }).then((res) => {
      console.log(res.result.res.data);
      let NewOne = res.result.res.data[0];
      const regex = new RegExp("<img", "gi");
      NewOne.content = NewOne.content.replace(
        regex,
        `<img style="max-width: 100%; height: auto"`
      );
      this.NewOne = NewOne;
    });
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