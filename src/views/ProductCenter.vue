<template>
  <div>
    <img
      class="minWid"
      src="https://www.dahuatech.com/upload/2017/11/23/151141843118ec4i0.jpg"
      width="100%"
    />
    <div class="contentDiv">
      <div class="searchDiv">
        <Search Searchwidth="600" placeholder="请输入产品名字" />
      </div>
      <a-tabs default-active-key="title1" @change="change">
        <a-tab-pane
          :tab="item.title"
          v-for="item in productTabList"
          :key="item.title"
        >
          <a-list
            :grid="{ gutter: 16, column: 3 }"
            :loading="loading"
            :data-source="item.listData"
            :style="{ minHeight: '500px' }"
          >
            <a-list-item
              class="productOne"
              slot="renderItem"
              slot-scope="item"
              @click="goProduct(item)"
              style="cursor: pointer"
            >
              <a-card :bordered="false">
                <div style="width: 100%; height: 100%; overflow: hidden">
                  <img
                    :src="item.coverImg"
                    align="middle"
                    width="100%"
                    height="100%"
                  />
                </div>
                <a-card-meta :title="item.name" style="padding: 20px 24px">
                  <!-- <img slot="avatar" :src="item.coverImg" width="50px" height="50px" /> -->
                  <template style="direction: rtl">
                    <div slot="description">
                      {{ item.description }}
                    </div>
                    <div slot="avatar" style="display: inline-block">
                      <span style="fontSize:16px,color:#eee">价格</span
                      >{{ item.price }}
                    </div>
                  </template>
                </a-card-meta>
              </a-card>
            </a-list-item>
          </a-list>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
// import { productData } from "@/service/tempData";
import Paginationn from "@/components/common/Pagination.vue";
import Search from "@/components/common/Search.vue";

export default {
  name: "ProductCenter",
  methods: {
    change(e) {
      console.log(e);
    },
    goProduct(e) {
      let productId = e._id;
      console.log(e);
      this.$router.push("/product/" + productId);
    },
  },
  components: {
    Paginationn,
    Search,
  },
  mounted() {},
  created() {
    this.$store.dispatch("getProductTabList", this).then((res) => {
      var productTabList = res;
      this.$store.dispatch("getProductData", this).then((res) => {
        var productData = res;
        console.log(productData);
        for (const key of productTabList) {
          key.listData = [];
          for (const iterator of productData) {
            if (key.key == iterator.category.key) {
              key.listData.push(iterator);
            }
          }
        }
        console.log(productTabList);
        this.productTabList = productTabList;
        this.loading = false;
      });
    });

    //  this.$store.dispatch("getProductTabList", this).then((res) => {
    //     this.productTabList = res;
    //   });
    //   this.$store.dispatch("getProductData", this).then((res) => {
    //     this.productData = res;
    //     this.loading = false;
    //   });
    // getProduct(this, {
    //   pageNum: this.$data.productData.length,
    //   pageSize: 50,
    //   field: { description: false },
    // }).then((res) => {
    //   console.log(res);
    //   this.productData = res.result.res.data;
    //   this.loading = false;
    // });
  },
  computed: {},
  data() {
    return {
      loading: true,
      productData: [],
      productTabList: [],
      tabList: [
        {
          title: "title1",
          id: "1",
          listData: [
            {
              imgUrl:
                "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg",
            },
            {
              imgUrl:
                "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg",
            },
            {
              imgUrl:
                "http://img.daimg.com/uploads/allimg/200824/1-200R41313390-L.jpg",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style scoped>
.searchDiv {
  display: flex;
  flex-direction: row-reverse;
  padding: 20px 0;
}
.ant-card >>> .ant-card-body {
  padding: 0;
  opacity: 1;
}
.ant-card >>> .ant-card-meta {
  display: flex;
  direction: rtl;
}
.ant-card >>> .ant-card-meta-detail {
  flex-grow: 1;
}
.ant-card >>> .ant-card-meta-avatar {
  width: 100px;
  color: red;
  font-size: 20px;
}
.productOne img {
  transition: 0.5s all;
}
.productOne img:hover {
  transform: scale(1.3);
}
</style>
