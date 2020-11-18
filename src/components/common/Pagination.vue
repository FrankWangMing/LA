<template>
  <a-pagination
    v-model="current"
    :defaultPageSize="defaultPageSize"
    :total="total"
    @change="onChange"
  />
</template>
<script>
export default {
  props: {
    defaultPageSize: Number,
  },
  data() {
    return {
      current: 1,
      total:100,
    };
  },
  methods: {
    onChange(current) {
      this.current = current;
    },
  },
};
</script>
