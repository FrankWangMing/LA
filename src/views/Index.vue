<template>
  <div id="index">
    <a-layout id="components-layout-demo-fixed">
      <a-layout-header
        :style="{
          position: 'fixed',
          zIndex: 9999,
          width: '100%',
          background: 'white',
          align: 'center',
        }"
        class="minWid"
      >
        <a-row type="flex" align="bottom">
          <div
            class="logo"
            style="
              background: url(https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=3339202615,3879308162&fm=85&app=92&f=PNG?w=121&h=75&s=67B06C6CF98ECD74462BAF0F020060DD);
            "
          />
          <Nav />
        </a-row>
      </a-layout-header>
      <a-layout-content :style="{ padding: '0', marginTop: '64px' }">
        <div :style="{ padding: '0px', minHeight: '1000px' }">
          <router-view />
        </div>
      </a-layout-content>
      <Footer />
      <a-back-top />
    </a-layout>
  </div>
</template>

<script>
import Nav from "@/components/nav/Nav.vue";
import Footer from "@/components/footer/Footer.vue";

export default {
  components: {
    Nav,
    Footer,
  },
  data() {
    return {};
  },
};
</script>

<style>
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>

