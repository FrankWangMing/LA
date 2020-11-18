<template>
  <div class="contentDiv">
    <a-tabs default-active-key="title1" @change="callback">
      <a-tab-pane
        :tab="item.title"
        v-for="item in EngTabList"
        :key="item.title"
      >
        <a-list :grid="{ gutter: 16, column: 4 }" :data-source="item.listData">
          <a-list-item
            slot="renderItem"
            slot-scope="item"
            @click="goEng(item._id)"
          >
            <a-card hoverable>
              <img slot="cover" alt="example" :src="item.coverImg" />
              <a-card-meta :title="item.name">
                <template slot="description">{{ item.description }}</template>
              </a-card-meta>
            </a-card>
          </a-list-item>
        </a-list>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
// import { EngineeringCase } from "@/service/tempData";

export default {
  name: "EngineeringCase",
  computed: {
    // tabList() {
    //   return EngineeringCase;
    // },
    // listData() {
    //   return EngineeringCase;
    // },
  },

  components: {},
  created() {
    this.$store.dispatch("getEngTabList", this).then((res) => {
      var EngTabList = res;
      this.$store.dispatch("getEngData", this).then((res) => {
        var EngData = res;
        console.log(res);
        // this.EngData = EngData;
        // this.loading = false;
        for (const key of EngTabList) {
          key.listData = [];
          for (const iterator of EngData) {
            if (key.key == iterator.category.key) {
              key.listData.push(iterator);
            }
          }
        }
        this.EngTabList = EngTabList;
        console.log(this.EngTabList);
      });
    });
  },
  methods: {
    callback() {},
    change() {},
    goEng(e) {
      console.log(e);
      // this.$router.push("EngineeringCase/54545");
    },
  },
  data() {
    return {
      loading: true,
      EngData: [],
      EngTabList: [],
    };
  },
};
</script>
<style scoped>
</style>
