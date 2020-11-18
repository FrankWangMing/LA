<template>
  <div>
    <a-page-header :title="title" :sub-title="subTitle">
      <template slot="extra">
        <span v-show="showMore" style="cursor: pointer" @click="goPage(title)"
          >更多 <a-icon type="right"
        /></span>
      </template>
    </a-page-header>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    subTitle: String,
    showMore: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goPage(e) {
      console.log(e);
      if (e == "产品中心") {
        this.$router.push("ProductCenter");
      } else if (e == "工程案例") {
        this.$router.push("EngineeringCase");
      } else if (e == "新闻资讯") {
        this.$router.push("News");
      }
    },
  },
  data() {
    return {};
  },
};
</script>
