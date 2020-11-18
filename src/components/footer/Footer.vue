<template>
  <div class="FooterDiv">
    <div>
      <a-row
        :style="{ width: '1400px', margin: '0 auto' }"
        type="flex"
        justify="space-around"
      >
        <a-col>
          <a-list :grid="{ gutter: 0, column: 4 }" :data-source="data">
            <a-list-item
              slot="renderItem"
              slot-scope="item"
              :style="{ width: '200px' }"
            >
              <strong :style="{ fontSize: '19px' }">{{ item.title }}</strong>
              <a-list
                item-layout="vertical"
                :data-source="item.arr"
                :style="{ paddingTop: '10px' }"
              >
                <a-list-item
                  slot="renderItem"
                  slot-scope="item"
                  class="footItem"
                >
                  <span @click="go(item)">{{ item.title }}</span></a-list-item
                >
              </a-list>
            </a-list-item>
          </a-list>
        </a-col>
        <a-col>
          <div :style="{ display: 'flex', flexDirection: 'column' }">
            <strong :style="{ marginBottom: '10px' }">官方微信</strong>
            <img
              width="140px"
              src="http://www.zzlajt.com/imageRepository/251444d8-0ba2-46b8-866e-76d81dcb9978.jpg"
            />
          </div>
        </a-col>
      </a-row>
      <a-layout-footer style="text-align: center"
        >Copyright © 2005 - 2020 Haoran. All Rights Reserved. 浩然路安 版权所有
        <router-link to="/admin"><a>管理员入口 </a></router-link>
      </a-layout-footer>
    </div>
  </div>
</template>
<script>
import { getFooterCategory } from "@/service/getData";
export default {
  data() {
    return {
      data: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    go(e) {
      console.log(e);
      let page = e.category.split("#")[1];
      let id = e.href;
      console.log(page);
      // this.$router.push("/product/" + id);
      this.$router.replace("/new/" + id);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    getFooterCategory(this, {}).then((res) => {
      let result = res.result.res.data;
      console.log(result);
      result = result.filter((item) => item.showInHome == true);
      console.log("1", result);
      for (const iterator of result) {
        iterator.arr =
          iterator.arr && iterator.arr.filter((aitem) => aitem.show == true);
      }
      // result.map((item) => {
      //   console.log(item);
      //   item.arr = item.arr.map((aitem) => {
      //     console.log(aitem);

      //     aitem.show = true;
      //   });
      // });
      this.data = result;
      // console.log(result);
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
.FooterDiv {
  margin: 100px auto 50px;
  width: 100%;
  height: 200px;
  /* background: #1f2024; */
}
.footItem > span:hover {
  color: #1890FF;
  cursor: pointer;
  width: auto;
}
.ant-list-split .ant-list-item {
  border: none;
}
.ant-list-item {
  padding: 5px 0;
}
</style>