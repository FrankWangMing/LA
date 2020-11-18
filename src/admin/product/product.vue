<template>
  <div>
    <adminSearch
      pageType="Product"
      @searchdata="searchdata"
      :category="categoryData"
      v-model="categoryData"
    ></adminSearch>
    <List
      label="产品"
      pageType="Product"
      v-model="data"
      :data="data"
      @handleinfiniteonload="handleinfiniteonload"
      @delete="deletedata"
      @edit="editdata"
    />
  </div>
</template> 
<script>
import infiniteScroll from "vue-infinite-scroll";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { RecycleScroller } from "vue-virtual-scroller";
import { getProduct, deleteProduct } from "@/service/getData";
// import { deleteProductMore } from "@/service/getData";
// deleteProductMore
import adminSearch from "../common/search";
import List from "../common/list";

export default {
  directives: { infiniteScroll },
  components: {
    RecycleScroller,
    adminSearch,
    List,
  },
  filters: {
    createTime(value) {
      value = value.replace("T", " ").substr(0, 16);
      return value;
    },
  },
  computed: {},
  data() {
    return {
      data: [],
      loading: false,
      busy: false,
      pageNum: 0,
      categoryData: [],
    };
  },
  created() {
    this.$store.dispatch("getProductTabList", this).then((res) => {
      console.log(res);
      this.categoryData = res;
      console.log(this.$data.categoryData);
    });
  },
  mounted() {
    // test(this).then((res) => {
    //   console.log(res);
    // });
    // for (let i = 0; i < 100; i++) {
    //   await addProduct(this, {
    //     content: i,
    //     name: "产品test2",
    //     price: "12",
    //   });
    // }
    // deleteProductMore(this, {
    //   name: "产品test2",
    // }).then((res) => {
    //   console.log("delete");
    //   console.log(res);
    // });
    // this.getData((res) => {
    //   this.loading = false;
    //   this.data = res;
    // });
  },
  methods: {
    deletedata(data, index) {
      let id = data._id;
      deleteProduct(this, { id }).then((res) => {
        if (res.result.res.deleted == 1) {
          this.data.splice(index, 1);
        }
      });
    },
    editdata(data) {
      let id = data._id;
      this.$router.push("/admin/editProduct/" + id);
    },

    searchdata(data) {
      console.log(data);
      console.log("searchdata");
      getProduct(this, { name: data.name, pageNum: 0, pageSize: 50 }).then(
        (res) => {
          console.log(res);
        }
      );
    },
    getData(callback) {
      getProduct(this, {
        pageNum: this.data.length,
        pageSize: 20,
        value: {},
        field: { content: false },
      }).then((res) => {
        console.log(res.result);
        if (res.result.res.data.length == 0) {
          console.log("到底了");
        }
        // if (res.result.res.data) callback(res.result.res.data);
        callback(res.result.res.data);
      });
    },
    handleinfiniteonload() {
      console.log("DD");
      const data = this.data;
      this.loading = true;
      if (data.length > 1000) {
        this.$message.warning("Infinite List loaded all");
        this.busy = true;
        this.loading = false;
        return;
      }
      this.getData((res) => {
        this.data = data.concat(res);
        // .map((item, index) => ({ ...item, index }));
        this.loading = false;
      });
    },
    confirm(e, index) {
      this.delProduct(e, index);
    },
    cancel(e) {
      console.log(e);
      // this.$message.error("Click on No");
    },
    scrollGetMore() {
      console.log("SCROLL");
    },
    delProduct(data, index) {
      let id = data._id;
      deleteProduct(this, { id }).then((res) => {
        if (res.result.res.deleted == 1) {
          this.data.splice(index, 1);
        }
      });
    },

    handleInfiniteOnLoad() {
      console.log("handleInfiniteOnLoad");
      const data = this.data;
      this.loading = true;
      if (data.length > 1000) {
        this.$message.warning("Infinite List loaded all");
        this.busy = true;
        this.loading = false;
        return;
      }
      this.getData((res) => {
        this.data = data.concat(res);
        // .map((item, index) => ({ ...item, index }));
        console.log(this.data.length);
        this.loading = false;
      });
    },
  },
};
</script>
<style>
.ant-descriptions-row {
  display: flex;
  flex-direction: column;
}
.demo-loadmore-list {
  min-height: 350px;
}
</style>
