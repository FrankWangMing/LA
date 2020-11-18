<template>
  <div>
    <div>
      banner类别
      <a-select
        :default-value="bannerType.name"
        style="width: 250px"
        @change="selectBannerChange"
      >
        <a-select-option v-for="item in bannerCategory" :key="item.type"
          >{{ item.name }}
        </a-select-option>
      </a-select>
    </div>
    <slot name="select2" class="marginTop">
      跳转地
      <a-input
        v-if="showOuter"
        default-value=""
        placeholder="https://www.baidu.com"
        style="width: 250px"
      />
      <a-select
        v-if="!showOuter"
        show-search
        placeholder="Select a person"
        option-filter-prop="children"
        :filter-option="filterOption"
        @focus="selectTargetFocus"
        @blur="selectTargetBlur"
        style="width: 250px"
        @change="selectTargetChange"
      >
        <a-select-option v-for="item in bannerTargetLi" :key="item._id">
          {{ item.name }}
        </a-select-option>
      </a-select>
    </slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerCategory: [
        { type: "product", name: "产品" },
        { type: "new", name: "新闻" },
        { type: "eng", name: "工程案例" },
        { type: "outer", name: "外链" },
      ],
    };
  },
  props: {
    Searchwidth: String,
    placeholder: String,
  },
  computed: {},
  methods: {
    selectBannerChange(e) {
      console.log(e);
      this.bannerTypeValue = e;
    },
    showOuter() {
      if (this.bannerTypeValue == "outer") {
        return true;
      } else {
        return false;
      }
    },
    bannerType() {
      for (const iterator of this.bannerCategory) {
        if (iterator.type == this.bannerTypeValue) {
          return iterator;
        }
      }
      // console.log(this.bannerTypeValue);
      // return this.bannerCategory[this.bannerTypeValue];
    },
    onSearch(value) {
      console.log(value);
    },
  },
};
</script>
<style scoped>
.marginTop {
  margin: 5px 0;
}
</style>
