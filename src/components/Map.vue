
<template>
  <div id="map">
    <h3 class="title">{{ msg }}</h3>
    <div class="amap-wrapper">
        <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "vue-amap欢迎您！",
    };
  },
};
</script>

<style scroped>
.amap-wrapper {
  width: 500px;
  height: 500px;
}
</style>