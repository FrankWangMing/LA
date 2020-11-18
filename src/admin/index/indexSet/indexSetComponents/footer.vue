<template>
  <div class="">
    <a-tabs
      v-model="activeKey"
      @change="paneChange"
      type="editable-card"
      @edit="onEdit"
    >
      <a-tab-pane
        v-for="pane in panes"
        :key="pane.key"
        :tab="pane.title"
        :closable="pane.closable"
      >
        <a-transfer
          :data-source="pane.arr"
          :key="pane.key"
          show-search
          :filter-option="filterOption"
          :target-keys="targetKeys"
          :render="(pane) => pane.title"
          @change="transferChange"
          @search="transferSearch"
          :operations="['添加', '删除']"
          :list-style="{
            width: 'auto',
            minHeight: '500px',
          }"
        >
          <template
            slot="children"
            slot-scope="{
              props: { direction, filteredItems, selectedKeys },
              on: { itemSelectAll, itemSelect },
            }"
          >
            <a-table
              :row-selection="
                getRowSelection({
                  selectedKeys,
                  itemSelectAll,
                  itemSelect,
                })
              "
              :columns="direction === 'left' ? leftColumns : rightColumns"
              :data-source="filteredItems"
              size="small"
              bordered
            >
              <template
                v-for="col in ['name', 'category', 'href']"
                :slot="col"
                slot-scope="text, record"
              >
                <div :key="col">
                  <a-input
                    v-if="record.editable && col == 'name'"
                    style="margin: -5px 0"
                    :value="text"
                    @change="
                      (e) => handleChange(e.target.value, record.key, col)
                    "
                  />
                  <template v-else> {{ text }} </template>
                </div>
              </template>
              <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                  <span v-if="record.editable">
                    <a @click="() => save(record.key)">保存</a>
                    <a-popconfirm
                      title="确认取消?"
                      @confirm="() => cancel(record.key)"
                    >
                      <a>取消</a>
                    </a-popconfirm>
                  </span>
                  <span v-else>
                    <a
                      :disabled="editingKey !== ''"
                      @click="() => edit(record.key)"
                      >编辑</a
                    >
                    <a-popconfirm
                      title="确认删除?"
                      @confirm="() => del(record.key)"
                    >
                      <a style="color: red" :disabled="editingKey !== ''"
                        >删除</a
                      ></a-popconfirm
                    >
                  </span>
                </div>
              </template>
            </a-table>
            <a-button
              v-show="direction === 'left'"
              class="editable-add-btn"
              @click="handleAddCategoryItem"
            >
              新增
            </a-button>
            <a-button
              style="margin: 0 5px"
              v-show="direction === 'left'"
              class="editable-add-btn"
              @click="handleAddCategoryItemforMongodb"
            >
              从数据库中导入
            </a-button>
          </template></a-transfer
        >
        <template>
          <div style="margin: 10px 0">
            <strong>是否在页尾展示：</strong>
            <a-switch
              :checked="pane.showInHome"
              checked-children="展示"
              un-checked-children="隐藏"
              @change="switchChange"
            />
          </div>
          <div style="margin: 10px 0">
            <strong>页尾分类名称：</strong>
            <a-input
              style="width: 100px"
              :value="pane.title"
              @change="(e) => titleNameChange(e.target.value)"
            />
          </div>
          <div style="margin: 10px 0">
            <a-button type="primary" @click="updateFooter(pane)">确认</a-button>
          </div>
        </template>
      </a-tab-pane>
    </a-tabs>
    <a-modal
      title="Title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div style="display: flex; margin: 40px 0">
        <a-select
          default-value="数据"
          style="width: 250px"
          @change="selectMongoCategoryChangeTitle"
        >
          <a-select-option key="item">数据 </a-select-option>

          <a-select-option key="category">类别</a-select-option></a-select
        >
        <a-select
          :default-value="mongodbCategory[0].name"
          style="width: 250px"
          @change="selectMongoCategoryChange"
        >
          <a-select-option
            v-for="item in mongodbCategory"
            :key="item.type"
            :disabled="item.disabled"
            >{{ item.name }}
          </a-select-option></a-select
        >
      </div>
    </a-modal>
  </div>
</template>
<script>
import SecondSelect from "../../../common/SecondSelect";
const leftTableColumns = [
  {
    dataIndex: "title",
    title: "标题",
    width: "25%",
    scopedSlots: { customRender: "name" },
  },
  {
    dataIndex: "category",
    title: "分类",
    width: "25%",
    scopedSlots: { customRender: "category" },
  },
  {
    dataIndex: "href",
    title: "目标地址",
    width: "20%",
    scopedSlots: { customRender: "href" },
  },
  {
    dataIndex: "operation",
    title: "操作",
    width: "20%",
    scopedSlots: { customRender: "operation" },
  },
];
const rightTableColumns = [
  {
    dataIndex: "title",
    title: "标题",
  },
  {
    dataIndex: "href",
    title: "目标地址",
  },
];
import { setValueKey } from "@/service/util";
import getIndex from "lodash";
import {
  getFooterCategory,
  deleteFooterCategory,
  updateFooterCategory,
  addFooterCategory,
} from "@/service/getData";
import difference from "lodash/difference";
export default {
  data() {
    return {
      confirmLoading: false,
      visible: false, //从数据库中导入的提示框
      leftColumns: leftTableColumns,
      rightColumns: rightTableColumns,
      activeKey: "",
      panes: [],
      newTabIndex: 0,
      mockData: [],
      editingKey: "",
      mongodbCategory: [
        { type: "Product", name: "产品" },
        { type: "New", name: "新闻", disabled: false },
        { type: "Eng", name: "工程案例" },
        { type: "Company", name: "公司简介", disabled: true },
      ],
      selectMongoCategoryType: "Product",
      selectMongoCategoryTitleType: "item",
    };
  },
  mounted() {
    this.getMock();
  },

  created() {
    getFooterCategory(this, {}).then((res) => {
      let result = res.result.res.data;
      console.log(result);
      this.panes = result;
      this.activeKey = this.panes[0].key;
    });
    // deleteFooterCategory(this, {});
  },
  components: {
    SecondSelect,
  },
  computed: {
    targetKeys: {
      set() {},
      get() {
        console.log(this.activeKey);
        if (this.activeKey != "") {
          let targetKeysArr = [];
          var target = this.getTarget(this.activeKey);
          target.arr &&
            target.arr.map((item) => {
              if (item.show == true) {
                targetKeysArr.push(item.key);
              }
            });
          console.log(targetKeysArr);
          return targetKeysArr;
        }
      },
    },
    cacheData: {
      set() {},
      get() {
        return this.getTarget(this.activeKey)["arr"].map((item) => ({
          ...item,
        }));
      },
    },
  },
  methods: {
    selectMongoCategoryChangeTitle(e) {
      this.selectMongoCategoryTitleType = e;
      console.log(e);
      if (e == "category") {
        console.log(this.mongodbCategory);
        this.mongodbCategory[1].disabled = true;
        this.mongodbCategory[3].disabled = false;
      } else {
        this.mongodbCategory[1].disabled = false;
        this.mongodbCategory[3].disabled = true;
      }
    },
    selectMongoCategoryChange(e) {
      this.selectMongoCategoryType = e;
    },
    //更新修改
    async updateFooter(value) {
      updateFooterCategory(this, { value }).then((res) => {
        console.log(res);
      });
    },
    titleNameChange(value) {
      // console.log(value);
      var target = this.getTarget(this.activeKey);
      console.log(target);
      target.title = value;
      console.log(target.title);
      // this.setTarget(this.activeKey, target);
    },
    switchChange(value) {
      console.log(value);
      var target = this.getTarget(this.activeKey);
      console.log(target);
      target.showInHome = value;
      // this.setTarget(this.activeKey, target);
    },
    getTarget(key) {
      return [...this.panes].filter((item) => key == item.key)[0];
    },
    setTarget(key, value) {
      var panes = [...this.panes];
      var index = getIndex.findIndex(panes, { key: key });
      this.$set(this.panes[index], "arr", value);
    },
    paneChange(activeKey) {
      console.log(activeKey);
      // this.activeKey = activeKey;
      // console.log(this.panes);
      // console.log([...this.panes]);
    },
    handleChange(value, key, column) {
      console.log(value);
      console.log(key);
      console.log(column);
      let newData = [...this.getTarget(this.activeKey)["arr"]];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        if (column == "name") column = "title";
        target[column] = value;
        this.setTarget(this.activeKey, newData);
      }
    },
    del(key) {
      console.log(key);
      let newData = this.getTarget(this.activeKey)["arr"];
      newData = newData.filter((item) => key !== item.key);
      this.setTarget(this.activeKey, newData);
    },
    edit(key) {
      console.log(key);
      const newData = [...this.getTarget(this.activeKey)["arr"]];
      const target = newData.filter((item) => key === item.key)[0];
      console.log(target);
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.setTarget(this.activeKey, newData);
      }
    },
    save(key) {
      let newData = [...this.getTarget(this.activeKey)["arr"]];
      const newCacheData = [...this.cacheData];
      const target = newData.filter((item) => key === item.key)[0];
      const targetCache = newCacheData.filter((item) => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
        console.log(newCacheData);
        this.setTarget(this.activeKey, newCacheData);
        this.setTarget(this.activeKey, newData);
      }
      this.editingKey = "";
    },
    cancel(key) {
      let newData = [...this.getTarget(this.activeKey)["arr"]];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
        );
        delete target.editable;
        this.setTarget(this.activeKey, newData);
      }
    },
    showModal() {
      console.log("F");
    },
    async handleOk() {
      let type = this.selectMongoCategoryType;
      let titleType = this.selectMongoCategoryTitleType;
      let arr = [];
      if (titleType == "category") {
        await this.$store
          .dispatch("get" + type + "TabList", this)
          .then((res) => {
            res.map((item) => {
              item.href = item.key;
              item.name = item.title;
              item.category = titleType + "#" + type;
            });
            arr = res;
          });
      } else {
        await this.$store.dispatch("get" + type + "Data", this).then((res) => {
          res.map((item) => {
            item.href = item._id;
            item.category = titleType + "#" + type;
          });
          arr = res;
        });
      }
      for (let iterator of arr) {
        let target = this.getTarget(this.activeKey);
        let index = getIndex.findIndex(target.arr, { title: iterator.name });
        console.log(index);
        if (index == -1) {
          // handleChange
          this.handleAddCategoryItem(
            iterator.name,
            iterator.category,
            iterator.href
          );
        }
      }
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    handleAddCategoryItemforMongodb() {
      this.visible = true;
    },
    //添加分类title
    handleAddCategoryItem() {
      console.log("KJ");
      let title = "";
      var category = "";
      var href = "";
      if ([...arguments].length > 2) {
        title = arguments[0];
        category = arguments[1];
        href = arguments[2];
      }
      let target = this.getTarget(this.activeKey);
      let newData = target.arr || [];
      newData.push({
        title: title,
        category: category,
        key: setValueKey("foot"),
        href: href,
        show: false,
      });
      console.log(newData);
      this.setTarget(this.activeKey, newData);
    },
    getRowSelection({ selectedKeys, itemSelectAll, itemSelect }) {
      return {
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, selectedKeys)
            : difference(selectedKeys, treeSelectedKeys);
          itemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          itemSelect(key, selected);
        },
        selectedRowKeys: selectedKeys,
      };
    },
    callback(key) {
      console.log(key);
    },
    async onEdit(targetKey, action) {
      console.log(targetKey, action);
      if (action == "remove") {
        console.log(targetKey);
        let target = await this.getTarget(targetKey);
        console.log(target._id);
        await deleteFooterCategory(this, { id: target._id }).then((res) => {
          console.log(res);
        });
      }
      this[action](targetKey);
    },
    //新增tab
    async add() {
      console.log("ADD TAB");
      var panes = this.panes;
      // const activeKey = `newTab${this.newTabIndex++}`;
      const tabKey = setValueKey();
      var data = {
        title: "New Tab",
        key: tabKey,
        showInHome: true,
      };
      await addFooterCategory(this, data).then((res) => {
        console.log(res);
        data._id = res.result.id;
      });
      panes.push(data);
      // this.activeKey = tabKey;
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
    getMock() {
      // for (let i = 0; i < 20; i++) {
      //   const data = {
      //     key: i.toString(),
      //     title: `content${i + 1}`,
      //     description: `description of content${i + 1}`,
      //     chosen: Math.random() * 2 > 1,
      //   };
      //   if (data.chosen) {
      //     targetKeys.push(data.key);
      //   }
      //   mockData.push(data);
      // }
      this.$store.dispatch("getProductTabList", this).then((res) => {
        console.log(res);
        this.mockData = res;
      });
    },
    //搜索功能
    filterOption(inputValue, option) {
      console.log(option);
      return option.title.indexOf(inputValue) > -1;
    },
    //穿梭功能
    transferChange(targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys);
      this.targetKeys = targetKeys;
      for (const iterator of moveKeys) {
        console.log(iterator);
        var target = this.getTarget(this.activeKey);
        target.arr.map((item) => {
          if (item.key == iterator) {
            item.show = !item.show;
          }
        });
        // console.log(target);
        console.log(this.panes);
      }
    },
    //搜索
    transferSearch(dir, value) {
      console.log("search:", dir, value);
    },
  },
};
</script>
<style scoped>
.ant-table {
  height: 300px;
}
.editable-row-operations a {
  margin-right: 8px;
}
</style>