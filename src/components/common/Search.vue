<template>
  <a-input-search
    :placeholder="placeholder"
    :style="{width:Searchwidth+'px'}"
    enter-button
    @search="onSearch"
  />
</template>

<script>
export default {
  data() {
    return {
      // Searchwidth:'100px'
    };
  },
  props: {
    Searchwidth: String,
    placeholder: String,
  },
  computed: {},
  methods: {
    onSearch(value) {
      console.log(value);
    },
  },
};
</script>
