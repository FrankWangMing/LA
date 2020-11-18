<template>
  <a-config-provider :locale="locale">
    <div
      id="app"
      :key="locale ? locale.locale : 'en'"
      class="locale-components"
    >
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script>
import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import moment from "moment";

moment.locale("zh-cn");

export default {
  components: {},
  data() {
    return {
      locale: zhCN,
      enUS,
      zhCN,
      isLoginSuccess: false,
    };
  },
  async created() {
    this.envId = this.$cloudbase.config.env;
    // 以匿名登录为例
    try {
      const auth = this.$cloudbase.auth({ persistence: "local" });
      if (!auth.hasLoginState()) {
        await auth.anonymousAuthProvider().signIn();
      }
      console.log("用户id", auth.hasLoginState().user.uid);
      this.isLoginSuccss = true;
    } catch (e) {
      if (e.message.includes("100007")) {
        this.isLoginSuccss = false;
      }
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
.contentDiv {
  width: 1400px;
  min-width: 1400px;
  margin: 5px auto;
}
.minWid {
  min-width: 1400px;
}
.centerDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>

