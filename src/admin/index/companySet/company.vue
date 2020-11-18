<template>
  <div>
    <div :style="{ marginBottom: '16px' }">
      <a-button @click="add">新增 </a-button>
    </div>
    <a-tabs v-model="activeKey" hide-add type="editable-card" @edit="onEdit">
      <a-tab-pane key="1" tab="公司简介" :closable="false">
        <!-- <Map /> -->
        <a-descriptions title="公司信息">
          <a-descriptions-item label="标题">
            <a-input :value="company.title"></a-input>
          </a-descriptions-item>
          <a-descriptions-item label="Telephone">
            <div>
              <a-textarea
                v-model="company.value"
                placeholder="Controlled autosize"
                :auto-size="{ minRows: 3, maxRows: 5 }"
              />
            </div>
          </a-descriptions-item>
          <a-descriptions-item label="Live">
            Hangzhou, Zhejiang
          </a-descriptions-item>
          <a-descriptions-item label="Remark"> empty </a-descriptions-item>
          <a-descriptions-item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </a-descriptions-item>
        </a-descriptions>
      </a-tab-pane>
      <a-tab-pane key="2" tab="联系我们" :closable="false">
        <!-- <Map /> -->
        <a-descriptions title="联系我们">
          <a-descriptions-item label="UserName">
            Zhou Maomao
          </a-descriptions-item>
          <a-descriptions-item label="Telephone">
            1810000000
          </a-descriptions-item>
          <a-descriptions-item label="Live">
            Hangzhou, Zhejiang
          </a-descriptions-item>
          <a-descriptions-item label="Remark"> empty </a-descriptions-item>
          <a-descriptions-item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </a-descriptions-item>
        </a-descriptions>
      </a-tab-pane>
      <!-- <a-tab-pane key="2" tab="关于公司" :closable="false">
        <Map />
        <div style="margin: 10px 0">
          <strong>页尾分类名称：</strong>
          <a-input
            style="width: 100px"
            :value="123"
            @change="(e) => titleNameChange(e.target.value)"
          />
        </div>
      </a-tab-pane> -->
      <a-tab-pane
        v-for="pane in panes"
        :key="pane.key"
        :tab="pane.title"
        :closable="pane.closable"
      >
        {{ pane.content }}
        <div style="margin: 10px 0">
          <strong>页尾分类名称：</strong>
          <a-input
            style="width: 100px"
            :value="pane.title"
            @change="(e) => titleNameChange(e.target.value)"
          />
        </div>
      </a-tab-pane>
    </a-tabs>
    <div style="margin: 10px 0">
      <a-button type="primary" @click="update()">确认</a-button>
    </div>
  </div>
</template>
<script>
// import CKeditor from "@/admin/common/Ckeditor/Ckeditor";
import Map from "@/components/Map";
import { addCompany, updateCompany, getCompany } from "@/service/getData";
import { setValueKey } from "@/service/util";
import getIndex from "lodash";
export default {
  components: {
    Map,
  },
  data() {
    return {
      panes: [],
      activeKey: "",
      newTabIndex: 0,
      company: {
        title: "公司名字",
        value: "KDSFJLK",
      },
    };
  },
  created() {
    getCompany(this).then((res) => {
      console.log(res);
      this.panes = res.result.res.data;
      this.activeKey = this.panes[0].key;
    });
  },
  methods: {
    getTarget() {
      let key = this.activeKey;
      let index = getIndex.findIndex(this.panes, { key });
      return this.panes[index];
    },
    titleNameChange(e) {
      console.log(e);
      let target = this.getTarget();
      console.log(target);
      target.title = e;
    },
    callback(key) {
      console.log(key);
    },
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    add() {
      const panes = this.panes;
      const activeKey = setValueKey("company");
      let data = {
        title: `New Tab ${activeKey}`,
        content: `Content of new Tab ${activeKey}`,
        key: activeKey,
      };
      addCompany(this, data).then((res) => {
        console.log(res);
        if (res.requestId != false) panes.push(data);
      });
      this.panes = panes;
      this.activeKey = activeKey;
    },
    remove(targetKey) {
      let activeKey = this.activeKey;
      let lastIndex;
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.panes.filter((pane) => pane.key !== targetKey);
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key;
        } else {
          activeKey = panes[0].key;
        }
      }
      this.panes = panes;
      this.activeKey = activeKey;
    },
    update() {
      var target = this.getTarget();
      const id = target._id;
      updateCompany(this, {
        id,
        value: target,
      }).then((res) => {
        console.log(res);
        // this.$store.commit("setCategory", { [name]: res.result.data.value });
      });
    },
  },
};
</script>
<style scoped>
</style>