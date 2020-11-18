<template>
  <a-space align="center">
    <div
      style="
        margin: 20px 0;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <TreeChart :json="data" />
    </div>
  </a-space>
</template>
<script>
import TreeChart from "vue-tree-chart";
export default {
  data() {
    return {
      data: {
        name: "root",
        image_url: "https://i.loli.net/2020/11/17/KW1YFDgJs8Z2VHT.png",
        children: [
          {
            name: "children1",
            image_url: "https://i.loli.net/2020/11/17/XV4Fk7pSjIgQKPw.png",
          },
          {
            name: "children2",
            image_url: "https://i.loli.net/2020/11/17/XV4Fk7pSjIgQKPw.png",
            mate: {
              name: "mate",
              image_url: "https://i.loli.net/2020/11/17/XV4Fk7pSjIgQKPw.png",
            },
            children: [
              {
                name: "grandchild",
                image_url: "https://i.loli.net/2020/11/17/KW1YFDgJs8Z2VHT.png",
              },
              {
                name: "grandchild2",
                image_url: "https://i.loli.net/2020/11/17/XV4Fk7pSjIgQKPw.png",
              },
              {
                name: "grandchild3",
                image_url: "https://i.loli.net/2020/11/17/XV4Fk7pSjIgQKPw.png",
              },
            ],
          },
          {
            name: "children3",
            image_url: "https://i.loli.net/2020/11/17/KW1YFDgJs8Z2VHT.png",
          },
        ],
      },
    };
  },
  components: {
    TreeChart,
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