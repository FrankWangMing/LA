<template>
  <div>
    <List
      label="资讯"
      pageType="New"
      v-model="data"
      :data="data"
      @handleinfiniteonload="handleinfiniteonload"
      @delete="deletedata"
      @edit="editdata"
    />
  </div>
</template> 
<script>
import { getNew, deleteNew } from "@/service/getData";

import adminSearch from "../common/search";
import List from "../common/list";

export default {
  components: {
    adminSearch,
    List,
  },
  filter: {},
  data() {
    return {
      categoryData: [],
      data: [],
      loading: false,
      busy: false,
      pageNum: 0,
    };
  },
  filters: {
    createTime(value) {
      value = value.replace("T", " ").substr(0, 16);
      return value;
    },
  },
  created() {},
  mounted() {
    // test(this).then((res) => {
    //   console.log(res);
    // });
    // for (let i = 0; i < 100; i++) {
    //   await addNew(this, {
    //     content: i,
    //     name: "产品test2",
    //     price: "12",
    //   });
    // }
    // deleteNewMore(this, {
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
      deleteNew(this, { id }).then((res) => {
        if (res.result.res.deleted == 1) {
          this.data.splice(index, 1);
        }
      });
    },
    editdata(data) {
      let id = data._id;
      this.$router.push("/admin/editNew/" + id);
    },
    //下拉加载不使用全局变量 怕坑
    getData(callback) {
      getNew(this, {
        pageNum: this.data.length,
        pageSize: 20,
        value: {},
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
    searchdata(data) {
      console.log(data);
      console.log("searchdata");
      getNew(this, { name: data.name, pageNum: 0, pageSize: 50 }).then(
        (res) => {
          console.log(res);
        }
      );
    },
    confirm(e, index) {
      this.delNew(e, index);
    },
    cancel(e) {
      console.log(e);
      // this.$message.error("Click on No");
    },
    delNew(data, index) {
      let id = data._id;
      deleteNew(this, { id }).then((res) => {
        if (res.result.res.deleted == 1) {
          this.data.splice(index, 1);
        }
      });
    },
    editNew() {
      console.log("editNew");
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
    // searchdata(data) {
    //   console.log(data);
    //   console.log("searchdata");
    //   getNew(this, { name: data.name, pageNum: 0, pageSize: 50 }).then(
    //     (res) => {
    //       console.log(res);
    //     }
    //   );
    // },
  },
};
</script>
<style>
.demo-loadmore-list {
  min-height: 350px;
}
</style>
