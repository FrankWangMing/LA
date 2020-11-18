<template>
  <div class="home">
    <div class="custom-slick-arrow" v-if="banner.length > 0">
      <div @click="goPrev" class="changeCarousel">
        <a-icon type="left-circle" :style="{ fontSize: '35px' }" />
      </div>
      <div @click="goNext" class="changeCarousel">
        <a-icon type="right-circle" :style="{ fontSize: '35px' }" />
      </div>
    </div>
    <a-carousel ref="banner" arrows class="minWid" style="positon: relative">
      <div v-for="item in banner" :key="item.id" class="BannerDiv">
        <div class="BannerItem" @click="goBaner(item)">
          <img :src="item.bannerImg" class="bannerImg" />
        </div>
      </div>
    </a-carousel>
    <div class="contentDiv">
      <Header title="产品中心" showMore />
      <div class="productDiv">
        <div class="productDiv_left">
          <img
            width="100%"
            src="https://7465-test-7gt6pjtm08c62d22-1254102259.tcb.qcloud.la/banner/d9ea4cfd5f94746a00209dd808e2af7a"
          />
          <div class="productDiv_left_bottom"></div>
        </div>
        <div class="productDiv_right">
          <div class="productDiv_right_top">
            <img
              width="100%"
              src="https://7465-test-7gt6pjtm08c62d22-1254102259.tcb.qcloud.la/banner/d9ea4cfd5f94746a00209dd808e2af7a"
            />
            <div class="productDiv_right_top_bottom">12312</div>
          </div>
          <div class="productDiv_right_top">
            <img
              width="100%"
              src="https://7465-test-7gt6pjtm08c62d22-1254102259.tcb.qcloud.la/banner/d9ea4cfd5f94746a00209dd808e2af7a"
            />
            <div class="productDiv_right_top_bottom">12312</div>
          </div>
        </div>
      </div>
      <a-list
        :grid="{ gutter: 16, column: 3 }"
        :data-source="productList.slice(0, 3)"
        :loading="loading"
      >
        <a-list-item slot="renderItem" slot-scope="item" @click="goProduct">
          <a-card hoverable style="maxwidth: 340px">
            <img slot="cover" alt="example" :src="item.coverImg" />
            <a-card-meta :title="item.name">
              <template slot="description"> {{ item.description }}</template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
    <div class="contentDiv">
      <Header title="工程案例" showMore />
      <div></div>
      <a-list
        :grid="{ gutter: 16, column: 3 }"
        :data-source="EngineeringCase.slice(0, 6)"
      >
        <a-list-item slot="renderItem" slot-scope="item" @click="goEng">
          <a-card hoverable style="maxwidth: 340px">
            <img slot="cover" alt="example" :src="item.coverImg" />
            <a-card-meta :title="item.name">
              <template slot="description">{{ item.description }}</template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
    <div class="contentDiv">
      <Header title="新闻资讯" showMore />
      <New :data="News" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import New from "./componet/new";
import Header from "@/components/header/Header.vue";
export default {
  name: "Home",
  components: {
    Header,
    New,
  },
  computed: {},
  created() {
    this.$store.dispatch("getProductData", this).then((res) => {
      console.log(res);
      this.productList = res;
      this.loading = false;
    });
    this.$store.dispatch("getEngData", this).then((res) => {
      console.log(res);
      this.EngineeringCase = res;
      this.engloading = false;
    });
    this.$store.dispatch("getNewData", this).then((res) => {
      console.log(res);
      this.News = res;
    });
    this.$store.dispatch("getBannerData", this).then((res) => {
      console.log(res);
      this.banner = res;
    });
  },
  mounted() {},
  methods: {
    goPrev() {
      this.$refs.banner.prev();
      console.log("goPrev");
    },
    goNext() {
      this.$refs.banner.next();
      console.log("goNext");
    },
    goBaner(item) {
      console.log(item);
      console.log("goBaner");
      switch (item.type) {
        case "outer":
          console.log("outer");
          break;
        case "product":
          this.$router.push("Product/" + item.target);
          break;
        case "new":
          console.log("outer");
          break;
        case "eng":
          this.$router.push("EngineeringCase/" + item.target);
          break;
      }
    },
    goEng(e) {
      console.log(e);
      this.$router.push("EngineeringCase/54545");
    },
    callback(e) {
      console.log(e);
    },
    goProduct(e) {
      console.log(e);
    },
  },
  data() {
    return {
      banner: [],
      loading: true,
      productList: [],
      EngineeringCase: [],
      News: [],
    };
  },
  // async created() {
  //   try {
  //     const res = await this.$cloudbase.callFunction({
  //       name: "vue-echo",
  //       data: {
  //         foo: "bar",
  //       },
  //     });
  //     console.log(res);
  //   } catch (res) {
  //     console.log(res);
  //   }
  // },
};
</script>
<style scoped>
/* For demo */
.home {
  overflow: hidden;
}
.ant-carousel >>> .slick-slide {
  overflow: hidden;
  margin: 10px 0;
  width: 1400px;
}

.custom-slick-arrow {
  top: 50%;
  transform: translate(-50%, 0);
  position: absolute;
  display: flex;
  width: 1400px;
  justify-content: space-between;
  left: 50%;
  z-index: 999;
  cursor: pointer;
  padding: 0 50px;
}
.changeCarousel {
  font-size: 25px;
  opacity: 0.5;
  z-index: 999;
  transition: 0.3s all;
  background: #696969;
  display: flex;
  border-radius: 90px;
  color: white;
}
.changeCarousel:hover {
  opacity: 1;
  z-index: 999;
  transform: scale(1.5);
  color: white;
}

.BannerDiv {
  display: flex;
  margin: 0 auto;
  max-height: 80vw;
}
.bannerImg {
  width: 1400px;
  max-width: 1400px;
}
.BannerItem {
  display: flex;
  width: 100%;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
}

.productDiv {
  width: 100%;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.productDiv_left {
  width: 68%;
  position: relative;
}
.productDiv_left:hover {
  cursor: pointer;
}
.productDiv_left:hover .productDiv_left_bottom {
  background: #1890ff;
  height: 60px;
  /* opacity: 0.4; */
}
.productDiv_left_bottom {
  width: 100%;
  height: 0;
  position: absolute;
  bottom: 0;
  transition: 0.3s all;
}
.productDiv_right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 0 0 1%;
  width: 33%;
}
.productDiv_right_bottom {
  height: 0px;
  position: absolute;
}
.productDiv_right_top {
  overflow: hidden;
  width: 100%;
  position: relative;
}
.productDiv_right_top:hover {
  cursor: pointer;
}
.productDiv_right_top_bottom {
  width: 100%;
  height: 0;
  position: absolute;
  bottom: 0;
  transition: 0.3s all;
}
.productDiv_right_top:hover .productDiv_right_top_bottom {
  background: #1890ff;
  height: 60px;
  z-index: 0;
  color: white;

  /* opacity: 0.4; */
}
/* .ant-tabs >>> .ant-list-item .ant-card-cover {
  width: 400px;
  transition: all 0.3s;
}
.ant-tabs >>> .ant-list-item:hover .ant-card-cover {
  width: 600px;
} */
</style>
