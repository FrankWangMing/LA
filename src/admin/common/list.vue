<template>
  <a-list :style="{ margin: '5px 0' }" size="large" :data-source="data">
    <RecycleScroller
      v-infinite-scroll="handleInfiniteOnLoad"
      style="height: 600px"
      :items="data"
      :item-size="200"
      key-field
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
    >
      <a-list-item slot-scope="{ item, index }">
        <div>
          <a-row type="flex">
            <a-col flex="500px">
              <a-descriptions :title="item.name">
                <a-descriptions-item :label="`${label}` + '简介'" :style="{}">
                  {{ item.description }}
                </a-descriptions-item>
                <a-descriptions-item
                  :label="`${label}` + '类别'"
                  v-if="pageType == 'Eng'"
                >
                  {{ item.category.label }}
                </a-descriptions-item>
                <a-descriptions-item label="创建时间">
                  {{ item.createTime | createTime }}
                </a-descriptions-item>
              </a-descriptions>
            </a-col>
            <a-col flex="auto">
              <div :style="{ margin: '50px 0 ' }">
                <a-button @click="editData(item)" :style="{ margin: '0 5px' }">
                  编辑
                </a-button>
                <a-popconfirm
                  title="是否确认删除?"
                  ok-text="是"
                  cancel-text="否"
                  @confirm="confirm(item, index)"
                  @cancel="cancel"
                >
                  <a-button type="danger" :style="{ margin: '0 5px' }">
                    删除
                  </a-button>
                </a-popconfirm>
              </div>
            </a-col>
            <a-col flex="272px">
              <div
                :style="{
                  height: '160px',
                  overflow: 'hidden',
                  margin: '0 5px',
                }"
              >
                <img width="272" alt="logo" :src="item.coverImg" />
              </div>
            </a-col>
          </a-row>
        </div>
        <!-- <div>content</div> -->
      </a-list-item>
    </RecycleScroller>
    <a-spin v-if="loading" class="demo-loading" />
  </a-list>
</template>
<script>
import infiniteScroll from "vue-infinite-scroll";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { RecycleScroller } from "vue-virtual-scroller";
// import { deleteProductMore } from "@/service/getData";
// deleteProductMore
import adminSearch from "../common/search";
export default {
  props: ["pageType", "data", "label"],
  directives: { infiniteScroll },
  components: {
    RecycleScroller,
    adminSearch,
  },
  filters: {
    createTime(value) {
      value = value.replace("T", " ").substr(0, 16);
      return value;
    },
  },
  watch: {
    data(e) {
      console.log(e);
      this.loading = false;
    },
  },
  computed: {},
  data() {
    return {
      loading: true,
      busy: false,
      pageNum: 0,
    };
  },
  created() {},
  mounted() {},
  methods: {
    //删除数据
    confirm(e, index) {
      console.log(e, index);
      this.$emit("delete", e, index);
    },
    cancel(e) {
      console.log(e);
      console.log("quxiao");
    },
    editData(item) {
      console.log(item);
      this.$emit("edit", item);
    },
    handleInfiniteOnLoad() {
      this.loading = true;
      this.$emit("handleinfiniteonload");
    },
  },
};
</script>
<style scoped>
.ant-descriptions-row {
  display: flex;
  flex-direction: column;
}
.demo-loadmore-list {
  min-height: 350px;
}
</style>