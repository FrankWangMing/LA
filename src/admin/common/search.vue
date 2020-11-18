<template>
  <div id="components-form-demo-advanced-search">
    <a-form
      class="ant-advanced-search-form"
      :form="form"
      @submit="handleSearch"
    >
      <a-row :gutter="24" type="flex" justify="space-around" align="middle">
        <a-col v-for="i in filedList" :key="i.label" :span="8">
          <a-form-item
            :label="`${i.label}`"
            :style="{
              width: '100%',
              'mix-width': '400px',
              display: 'flex',
              'justify-content': 'center',
            }"
          >
            <a-input
              v-if="i.type == 'input'"
              v-decorator="[
                `${i.id}`,
                {
                  rules: [
                    {
                      required: false,
                      message: '请输入' + `${i.label}`,
                    },
                  ],
                },
              ]"
              :placeholder="'请输入' + `${i.label}`"
            />
            <a-select
              v-decorator="[
                `${i.id}`,
                {
                  rules: [
                    {
                      required: false,
                      message: '请输入' + `${i.label}`,
                    },
                  ],
                },
              ]"
              :placeholder="'请选择' + `${i.label}`"
              :style="{ width: '200px ', 'mix-width': '200px' }"
              v-if="i.type == 'select'"
              @change="handleSelectChange"
            >
              <a-select-option v-for="item in categoryData" :key="item.title">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit"> 搜索 </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            重置
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
export default {
  props: {
    pageType: String,
    category: Array,
  },
  data() {
    return {
      expand: false,
      form: this.$form.createForm(this, { name: "advanced_search" }),
      filedList: [
        { label: "名字", id: "name", type: "input" },
        { label: "类别", id: "category", type: "select" },
        { label: "内容", id: "description", type: "input" },
      ],
    };
  },
  computed: {
    categoryData() {
      return this.category;
    },
  },
  mounted() {},
  methods: {
    handleSelectChange() {},
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log("error", error);
        console.log("Received values of form: ", values);
        switch (this.pageType) {
          case "product":
            this.$emit("searchdata", values);
            break;
          case "eng":
            console.log("ENG");
            break;
        }
      });
    },

    handleReset() {
      this.form.resetFields();
    },
  },
};
</script>
<style scoped>
.ant-advanced-search-form {
  padding: 10px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
  /* padding: 10px; */
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
</style>