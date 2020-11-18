<template>
  <div class="contentDiv" style="margin: 30px auto">
    <a-list
      item-layout="vertical"
      size="large"
      :data-source="listData"
      bordered
    >
      <a-list-item
        slot="renderItem"
        key="item.title"
        slot-scope="item"
        style="background: white"
        @click="goNew(item._id)"
        class="newList"
      >
        <a-list-item-meta :description="item.description">
          <strong slot="title">{{ item.name }}</strong>
        </a-list-item-meta>
        {{ item.content }}
        <template v-for="{ type, text } in actions" slot="actions">
          <span :key="type">
            <a-icon :type="type" style="margin-right: 8px" />
            {{ text }}
          </span>
        </template>
        <img slot="extra" width="272" alt="logo" :src="item.coverImg" />
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
export default {
  methods: {
    goNew(id) {
      this.$router.push("/new/" + id);
    },
  },
  created() {
    this.$store.dispatch("getNewData", this).then((res) => {
      this.listData = res;
      console.log(res);
      // this.EngData = EngData;
      // this.loading = false;
    });
  },
  data() {
    return {
      listData: [],
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 6,
      },
      actions: [
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "200" },
      ],
    };
  },
};
</script>
<style scoped>
.newList:hover {
  background: rebeccapurple;
  color: red;
  cursor: pointer;
}
</style>
