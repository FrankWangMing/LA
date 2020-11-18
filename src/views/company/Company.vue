<template>
  <div>
    <div>
      <img
        src="https://www.dahuatech.com/upload/2018/12/27/15458781334019eqmbc.jpg"
        width="100%"
        :style="{ 'min-width': '1400px' }"
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
      <template>
        <div style="margin: 40px 0">
          <strong id="home" :style="{ fontSize: '20px' }">公司简介</strong>
          <Home />
        </div>
      </template>
      <template>
        <div style="margin: 40px 0">
          <strong id="team" :style="{ fontSize: '20px' }">加入我们</strong>
          <Team />
        </div>
      </template>

      <template>
        <div style="margin: 40px 0">
          <strong id="phone" :style="{ fontSize: '20px' }">商务洽谈</strong>

          <Phone />
        </div>
      </template>

      <template>
        <div style="margin: 40px 0">
          <strong id="history" :style="{ fontSize: '20px' }">发展历程</strong>

          <History />
        </div>
      </template>

      <template>
        <div style="margin: 40px 0">
          <strong id="business" :style="{ fontSize: '20px' }">业务架构</strong>
          <Business />
        </div>
      </template>

      <template>
        <div style="margin: 40px 0">
          <strong id="address" :style="{ fontSize: '20px' }">办公地点</strong>
          <Address />
        </div>
      </template>
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
import History from "./common/history.vue";
import Business from "./common/business.vue";
import Address from "./common/address.vue";
import Home from "./common/home.vue";
import Team from "./common/team.vue";
import Phone from "./common/phone.vue";
// @ is an alias to /src
export default {
  name: "Company",
  components: {
    History,
    Business,
    Address,
    Home,
    Team,
    Phone,
  },
  data() {
    return {
      current: ["home"],
      DataList: [
        { title: "公司简介", id: 0, type: "home" },
        { title: "加入我们", id: 1, type: "team" },
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
      this.$router.replace("/Company/#" + e.key);
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
<style>
.companyDiv {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-self: center;
  width: 100%;
  margin: 40px 0;
}
.jieshao {
  overflow: hidden;
}
</style>
