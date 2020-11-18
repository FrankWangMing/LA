<template>
  <div class="contentDiv">
    <!-- 锚点 -->
    <a-anchor class="anchorDiv" :offsetTop="200">
      <a-anchor-link href="#productDescription" title="产品概述" />
      <a-anchor-link href="#jishucanshu" title="技术参数" />
    </a-anchor>
    <div>
      <div class="custom-slick-arrow" v-if="productOne.image">
        <div @click="goPrev" class="changeCarousel">
          <a-icon type="left-circle" :style="{ fontSize: '35px' }" />
        </div>
        <div @click="goNext" class="changeCarousel">
          <a-icon type="right-circle" :style="{ fontSize: '35px' }" />
        </div>
      </div>
      <a-carousel
        :after-change="onChange"
        ref="banner"
        arrows
        style="positon: relative"
      >
        <div v-for="item in productOne.image" :key="item.id" class="BannerDiv">
          <div class="BannerItem">
            <img :src="item.tempFileURL" style="height: 600px" />
          </div>
        </div>
      </a-carousel>

      <!-- 商品的基本信息 -->
      <div>
        <Header title="产品概述" id="productDescription" />
        <div>
          <a-descriptions>
            <a-descriptions-item label="产品名字">
              {{ productOne.description }}
            </a-descriptions-item>
            <a-descriptions-item label="产品价格">
              1810000000
            </a-descriptions-item>
            <a-descriptions-item label="Live">
              Hangzhou, Zhejiang
            </a-descriptions-item>
            <a-descriptions-item label="Remark"> empty </a-descriptions-item>
            <a-descriptions-item label="Address">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </a-descriptions-item>
          </a-descriptions>
        </div>
        <Header title="技术参数" id="jishucanshu" />
      </div>
      <!-- 商品的富文本 -->
      <div v-html="productOne.content" id="richHtml"></div>
      <a-divider>产品</a-divider>
    </div>
  </div>
</template>
<script>
import { getProductOne } from "@/service/getData";
import Header from "@/components/header/Header.vue";

export default {
  name: "Product",
  props: ["id"],
  components: {
    Header,
  },
  data() {
    return {
      productOne: {},
      top: 64,
      img: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goPrev() {
      this.$refs.banner.prev();
      console.log("goPrev");
    },
    goNext() {
      this.$refs.banner.next();
      console.log("goNext");
    },
    change(e) {
      console.log(e);
    },
    onChange(a, b, c) {
      console.log(a, b, c);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    getProductOne(this, { value: { _id: this.id } }).then((res) => {
      let productOne = res.result.res.data[0];
      const regex = new RegExp("<img", "gi");
      productOne.content = productOne.content.replace(
        regex,
        `<img style="max-width: 100%; height: auto"`
      );
      this.productOne = productOne;
      console.log(this.productOne);
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
.ant-carousel >>> .slick-slide {
  overflow: hidden;
}

.custom-slick-arrow {
  top: 40%;
  transform: translate(-50%, 0);
  position: absolute;
  display: flex;
  width: 80%;
  max-width: 1400px;
  justify-content: space-between;
  left: 50%;
  z-index: 999;
  cursor: pointer;
}
.changeCarousel {
  font-size: 25px;
  opacity: 0.5;
  z-index: 999;
}
.changeCarousel:hover {
  opacity: 1;
  z-index: 999;
}

.BannerDiv {
  display: flex;
  margin: 0 auto;
  height: 600px;
}
.BannerItem {
  display: flex;
  width: 100%;
  justify-content: center;
}
/* 锚点 */
.anchorDiv {
  position: absolute;
  top: 300px;
  left: 20px;
  background: inherit;
}
.anchorDiv >>> .ant-anchor-wrapper {
  background: inherit;
}
/* 富文本 */
#richHtml {
  width: 100%;
}
</style>