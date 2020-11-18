<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider
      v-model="collapsed"
      collapsible
      class="layoutSider"
      style="min-height: 100vh"
    >
      <a-affix :offset-top="20">
        <template>
          <div class="logo" />
          <a-menu
            theme="dark"
            mode="inline"
            v-model="current"
            :selectKey="current"
            :open-keys="openKeys"
            @openChange="onOpenChange"
          >
            <a-menu-item key="/admin">
              <router-link to="/admin" />
              <a-icon type="pie-chart" />
              <span>数据看板</span>
            </a-menu-item>
            <a-menu-item key="/testaaa">
              <router-link to="/testaaa" />
              <a-icon type="pie-chart" />
              <span>测试页面</span>
            </a-menu-item>
            <a-sub-menu v-for="item in menu" :key="item.path">
              <span slot="title">
                <a-icon :type="item.icon" />
                <span>{{ item.title }}</span>
              </span>
              <a-menu-item v-for="item in item.subMenu" :key="item.path">
                <router-link :to="item.path" />
                <span>{{ item.subTitle }}</span>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </template>
      </a-affix>
    </a-layout-sider>
    <a-layout>
      <a-affix :offset-top="0">
        <a-layout-header class="layoutHeader">
          <div :style="{ 'flex-grow': 1 }">
            <a-icon
              style="fontsize: 22px"
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
            />
          </div>
          <a-avatar
            :hidden="!email"
            shape="square"
            size="large"
            :style="{ width: '200px', verticalAlign: 'middle' }"
            >{{ email }}
          </a-avatar>
        </a-layout-header>
      </a-affix>
      <a-layout-content style="margin: 0 16px 0">
        <a-breadcrumb style="margin: 16px 0"></a-breadcrumb>
        <div
          :style="{
            padding: '24px',
            background: '#fff',
            minHeight: '760px',
            height: 'auto',
            zindex: 10,
          }"
        >
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center"
        >Copyright © 2005 - 2020 Haoran. All Rights Reserved. 浩然路安
        版权所有</a-layout-footer
      >
    </a-layout>
  </a-layout>
</template>

<script>
import { auth } from "@/service/auth";
export default {
  name: "admin",
  data() {
    return {
      email: "",
      rootSubmenuKeys: ["adminIndex", "product", "news", "engineering"],
      collapsed: false,
      menu: [
        // {
        //   title: "首页管理",
        //   path: "index",
        // subMenu: [
        //   {
        //     subTitle: "工程列表",
        //     path: "/admin/index",
        //   },
        //   {
        //     subTitle: "新增工程",
        //     path: "/admin/addEngineering",
        //   },
        // ],
        // },
        {
          title: "管理设置",
          path: "index",
          icon: "deployment-unit",
          subMenu: [
            {
              subTitle: "首页设置",
              path: "/admin/index",
            },
            {
              subTitle: "联系模块",
              path: "/admin/chat",
            },
            {
              subTitle: "安全设置",
              path: "/admin/user",
            },
          ],
        },
        {
          title: "产品管理",
          path: "product",
          icon: "deployment-unit",
          subMenu: [
            {
              subTitle: "产品列表",
              path: "/admin/product",
            },
            {
              subTitle: "新增产品",
              path: "/admin/addProduct",
            },
          ],
        },
        {
          title: "资讯管理",
          path: "news",
          icon: "fire",
          subMenu: [
            {
              subTitle: "资讯列表",
              path: "/admin/news",
            },
            {
              subTitle: "新增资讯",
              path: "/admin/addnews",
            },
          ],
        },
        {
          title: "工程管理",
          path: "engineering",
          icon: "tool",
          subMenu: [
            {
              subTitle: "工程列表",
              path: "/admin/engineering",
            },
            {
              subTitle: "新增工程",
              path: "/admin/addEngineering",
            },
          ],
        },
      ],
      openKeys: [],
    };
  },

  computed: {
    current: {
      get() {
        return [this.$route.path];
      },
      set(e) {
        console.log(e);
      },
    },
    // openKeys: {
    //   get() {
    //     // var path = this.$route.path;
    //     // switch (path) {
    //     //   case "/admin/product":
    //     //     console.log("DD");
    //     // }
    //     return ['product']
    //   },
    //   set(e) {
    //     console.log(e);
    //   },
    // },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onOpenChange(openKeys) {
      console.log(openKeys);
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(auth);
    const user = auth.currentUser;
    if (user) {
      console.log(user);
      this.email = user.email;
      console.log(this.email);
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  activated() {},
  beforeCreate() {
    //生命周期 - 创建之前
  },
  beforeMount() {
    //生命周期 - 挂载之前
  },
  beforeUpdate() {
    //生命周期 - 更新之前
  },
  updated() {
    //生命周期 - 更新之后
  },
  beforeDestroy() {
    //生命周期 - 销毁之前
  },
  destroyed() {
    //生命周期 - 销毁完成
  },
};
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.layoutHeader {
  display: flex;
  align-items: center;
  top: 0;
  background: #fff;
  width: 100%;
  z-index: 100;
}
.layoutSider {
}
</style>