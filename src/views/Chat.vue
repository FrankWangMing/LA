<template>
  <div>
    <div>
      <img
        src="https://www.dahuatech.com/upload/2018/12/27/15458781334019eqmbc.jpg"
        width="100%"
      />
    </div>
    <a-affix :offset-top="64">
      <a-menu
        v-model="current"
        :open-keys="current"
        mode="horizontal"
        :style="{ padding: '0 200px' }"
        @select="select"
      >
        <a-menu-item v-for="item in DataList" :key="item.type">
          <span>{{ item.title }}</span>
        </a-menu-item>
      </a-menu>
      <a-anchor :offsetTop="150" @change="anchorChange" v-show="false">
        <a-anchor-link
          v-for="item in DataList"
          :key="item.type"
          :href="'#' + item.type"
          :title="item.title"
        />
      </a-anchor>
    </a-affix>
    <div class="contentDiv" :style="{ padding: '50px 0 10px' }">
      <strong id="home" :style="{ fontSize: '20px' }">公司简介</strong>
      <div class="companyDiv">
        <div
          class="companyDivLeft"
          style="width: 50%; padding: 20px 40px 20px 20px"
        >
          <span :style="{ fontSize: '50px' }">浙江大华技术股份有限公司</span>
          <div
            :style="{
              padding: '20px 0',
              'text-indent': '2em',
              fontSize: '18px',
            }"
          >
            浙江大华技术股份有限公司，是全球领先的以视频为核心的智慧物联解决方案提供商和运营服务商，以技术创新为基础，提供端到端的视频监控解决方案、系统及服务，为城市运营、企业管理、个人消费者生活创造价值。
          </div>
        </div>
        <div class="jieshao" style="width: 50%">
          <img
            src="https://www.dahuatech.com/upload/2018/12/27/15458781334019eqmbc.jpg"
          />
        </div>
      </div>
      <strong id="team" :style="{ fontSize: '20px' }">关于我们</strong>
      <div class="companyDiv">
        <div
          class="companyDivLeft"
          style="width: 50%; padding: 20px 40px 20px 20px"
        >
          <span :style="{ fontSize: '50px' }">浙江大华技术股份有限公司</span>
          <div
            :style="{
              padding: '20px 0',
              'text-indent': '2em',
              fontSize: '18px',
            }"
          >
            浙江大华技术股份有限公司，是全球领先的以视频为核心的智慧物联解决方案提供商和运营服务商，以技术创新为基础，提供端到端的视频监控解决方案、系统及服务，为城市运营、企业管理、个人消费者生活创造价值。
          </div>
        </div>
        <div class="jieshao" style="width: 50%">
          <img
            src="https://www.dahuatech.com/upload/2018/12/27/15458781334019eqmbc.jpg"
          />
        </div>
      </div>
      <strong id="phone" :style="{ fontSize: '20px' }">商务谈判</strong>
      <div class="companyDiv">
        <div
          class="companyDivLeft"
          style="width: 50%; padding: 20px 40px 20px 20px"
        >
          <span :style="{ fontSize: '50px' }">浙江大华技术股份有限公司</span>
          <div
            :style="{
              padding: '20px 0',
              'text-indent': '2em',
              fontSize: '18px',
            }"
          >
            浙江大华技术股份有限公司，是全球领先的以视频为核心的智慧物联解决方案提供商和运营服务商，以技术创新为基础，提供端到端的视频监控解决方案、系统及服务，为城市运营、企业管理、个人消费者生活创造价值。
          </div>
        </div>
        <div class="jieshao" style="width: 50%">
          <img
            src="https://www.dahuatech.com/upload/2018/12/27/15458781334019eqmbc.jpg"
          />
        </div>
      </div>
      <!-- <a-tabs default-active-key="1">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="home" />
            <span>公司简介</span>
          </span>

        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon type="team" />
            <span>加入我们</span>
          </span>
          Tab 1
        </a-tab-pane>
      </a-tabs> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Chat",
  components: {},
  data() {
    return {
      current: ["home"],
      DataList: [
        { title: "公司简介", id: 0, type: "home" },
        { title: "关于我们", id: 1, type: "team" },
        { title: "商务洽谈", id: 2, type: "phone" },
        { title: "发展历程", id: 3, type: "history" },
        { title: "业务架构", id: 4, type: "business" },
        { title: "公司地址", id: 5, type: "address" },
      ],
    };
  },
  created() {
    // this.$store.dispatch("getEngTabList", this).then((res) => {
    //   var EngTabList = res;
    //   this.$store.dispatch("getEngData", this).then((res) => {
    //     var EngData = res;
    //     console.log(res);
    //     // this.EngData = EngData;
    //     // this.loading = false;
    //     for (const key of EngTabList) {
    //       key.listData = [];
    //       for (const iterator of EngData) {
    //         if (key.key == iterator.category.key) {
    //           key.listData.push(iterator);
    //         }
    //       }
    //     }
    //     this.EngTabList = EngTabList;
    //     console.log(this.EngTabList);
    //   });
    // });
  },
  methods: {
    select(e) {
      console.log(e.key);
      this.$router.replace("/Chat/#" + e.key);
    },
    anchorChange(e) {
      console.log(this.current);
      let key = e.substr(1);
      // console.log(e.substr(1));
      this.current.pop();
      this.current.push(key);

      console.log(this.current);
    },
  },
};
</script>
<style scoped>
.companyDiv {
  display: flex;
  flex-direction: row;
  margin: 40px 0;
}
.jieshao {
  overflow: hidden;
}
</style>
