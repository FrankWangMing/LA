<template>
  <a-menu
    v-model="current"
    mode="horizontal"
    :selectedKeys="current"
  >
    <a-menu-item
      v-for="item in navData"
      :key="item.page"
      :style="{ fontSize: '16px' }"
    >
      <router-link :to="item.page">
        <a-icon :type="item.icon" :style="{ fontSize: '20px' }" />
        {{ item.name }}
      </router-link>
    </a-menu-item>
    <!-- <a-sub-menu v-for="item in navData" :key="item.name">
        <span slot="title" :style="{fontSize:'16px'}">
          <a-icon :type="item.icon"  :style="{fontSize:'20px'}"/>
          {{item.name}}
      </span>-->
    <!-- <a-menu-item key="setting:1">Option 1</a-menu-item>
        <a-menu-item key="setting:2">Option 2</a-menu-item>
        <a-menu-item key="setting:3">Option 3</a-menu-item>
      <a-menu-item key="setting:4">Option 4</a-menu-item>-->
    <!-- </a-sub-menu> -->
  </a-menu>
</template>
<script>
import { navData } from "@/service/tempData";
import "@/router/index";
export default {
  data() {
    return {
      navData,
    };
  },
  computed: {
    current: {
      get() {
        // return this.$route.path;
        return [this.$route.path];
      },
      set() {},
      // return store.state.navSelect;
    },
  },
  created() {},
  methods: {},
};
</script>
