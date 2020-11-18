<template>
  <div>
    <adminSearch
      pageType="Eng"
      @searchdata="searchdata"
      :category="categoryData"
      v-model="categoryData"
    ></adminSearch>
    <List
      label="工程案例"
      pageType="Eng"
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
import { getEng, deleteEng } from "@/service/getData";
// import { deleteEngMore } from "@/service/getData";
// deleteEngMore
import adminSearch from "../common/search";
import List from "../common/list";
export default {
  directives: { infiniteScroll },
  components: {
    RecycleScroller,
    adminSearch,
    List,
  },
  data() {
    return {
      categoryData: [],
      data: [],
      loading: false,
      busy: false,
      pageNum: 0,
    };
  },
  created() {
    this.$store.dispatch("getEngTabList", this).then((res) => {
      console.log(res);
      this.categoryData = res;
    });
  },
  mounted() {
    // test(this).then((res) => {
    //   console.log(res);
    // });
    // for (let i = 0; i < 100; i++) {
    //   await addEng(this, {
    //     content: i,
    //     name: "产品test2",
    //     price: "12",
    //   });
    // }
    // deleteEngMore(this, {
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
      deleteEng(this, { id }).then((res) => {
        if (res.result.res.deleted == 1) {
          this.data.splice(index, 1);
        }
      });
    },
    editdata(data) {
      let id = data._id;
      this.$router.push("/admin/editEng/" + id);
    },
    //下拉加载不使用全局变量 怕坑
    getData(callback) {
      getEng(this, {
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
    scrollGetMore() {
      console.log("SCROLL");
    },
    searchdata(data) {
      console.log(data);
      console.log("searchdata");
      getEng(this, { name: data.name, pageNum: 0, pageSize: 50 }).then(
        (res) => {
          console.log(res);
        }
      );
    },
    confirm(e, index) {
      this.delEng(e, index);
    },
    cancel(e) {
      console.log(e);
      // this.$message.error("Click on No");
    },
    delEng(data, index) {
      let id = data._id;
      deleteEng(this, { id }).then((res) => {
        if (res.result.res.deleted == 1) {
          this.data.splice(index, 1);
        }
      });
    },
    editEng() {
      console.log("editEng");
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
.demo-loadmore-list {
  min-height: 350px;
}
</style>
