<template>
  <a-drawer
    title="新增产品种类"
    :width="720"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <div>
      <a-tree
        v-model="checkedKeys"
        class="draggable-tree"
        :checkable="checkable"
        draggable
        blockNode
        selectable
        :tree-data="gData"
        @select="onSelect"
        @dragenter="onDragEnter"
        @drop="onDrop"
      >
      </a-tree>
      <a-row type="flex">
        <a-col flex="auto">
          <a-input-search
            placeholder="请填写您的产品类别名字"
            @search="addCategory"
            v-model="addCategoryValue"
            :value="addCategoryValue"
          >
            <a-button slot="enterButton" icon="edit"> 新增类别 </a-button>
          </a-input-search>
        </a-col>
        <a-col flex="100px">
          <a-button
            v-if="checkable"
            icon="delete"
            type="danger"
            @click="deleteCategory"
          >
            确认删除
          </a-button>
          <a-button
            v-else
            icon="delete"
            type="danger"
            @click="() => (checkable = !checkable)"
            >删除类别</a-button
          >
        </a-col>
      </a-row>
      <a-alert
        v-if="tvisible"
        closable
        :after-close="handleClose"
        style="margin: 5px 0"
        :message="'新增类别不能' + `${tvisibleText}` + '!'"
        type="warning"
        show-icon
      />
    </div>
    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button :style="{ marginRight: '8px' }" @click="onClose">
        取消
      </a-button>
      <a-button type="primary" @click="updateCategoryDrawer">
        确认修改
      </a-button>
    </div>
  </a-drawer>
</template>
<script>
import { updateCategory, getCategory } from "@/service/getData";
export default {
  data() {
    return {
      checkable: false,
      addCategoryValue: "",
      visible: false,
      tvisible: false,
      checkedKeys: [],
      tvisibleText: "",
    };
  },

  computed: {
    gData: {
      set(value) {
        console.log(value);
        if (this.type == "Eng") {
          console.log("ENG");
          this.$store.commit("setCategory", { engineering: value });
          console.log(this.$store.state);
        }
        if (this.type == "Product") {
          console.log("PRO");
          this.$store.commit("setCategory", { product: value });
        }
      },
      get() {
        console.log(this.categoryData);
        return this.categoryData;
      },
    },
  },
  props: ["categoryData", "type"],
  //监听属性 类似于data概念
  //监控data中的数据变化
  watch: {
    //监听新增分类提示打开或者关闭
    tvisible(val) {
      if (val == true) {
        setTimeout(() => {
          this.handleClose();
        }, 1000);
      }
    },
    checkedKeys(val) {
      console.log("onCheck", val);
    },
  },
  //方法集合
  methods: {
    deleteCategory() {
      console.log("Delete");
      console.log(this.checkedKeys);
      let checkedKeys = this.checkedKeys;
      this.checkedKeys = [];
      this.gData = this.gData.filter((val) => {
        return checkedKeys.indexOf(val.key) == -1;
      });
      this.checkable = false;
      // this.gData = this.gData.filter((val) => {
      //   return this.checkedKeys.indexOf(val) == -1;
      // });
      // this.gData = [];
    },
    handleClose() {
      this.tvisible = false;
    },
    showDrawer() {
      this.visible = true;
    },
    async onClose() {
      await getCategory(this).then((res) => {
        console.log(res);
        let result = res.result.res.data[0];
        if (this.type == "Eng") {
          result = result.engineering;
        }
        if (this.type == "Product") {
          result = result.product;
        }
        var arr = [];
        console.log("数据库的");
        console.log(arr);
        for (let index = 0, len = result.length; index < len; index++) {
          arr.push(result[index].key);
        }
        let _aaa = this.gData.filter((item) => {
          return arr.indexOf(item.key) == -1;
        });
        //没有差集说明没有修改
        if (_aaa.length == 0) {
          this.visible = false;
        } else {
          console.log("False");
        }
      });
    },
    onSelect(e) {
      console.log(e);
      console.log("ONSELECT");
    },
    onDragEnter(info) {
      console.log("onDragEnter");
      console.log(info);
      // expandedKeys 需要受控时设置
      // this.expandedKeys = info.expandedKeys
    },
    onDrop(info) {
      console.log(info);
      console.log(info.dropPosition);
      const dropKey = info.node.eventKey;
      const dragKey = info.dragNode.eventKey;
      const dropPos = info.node.pos.split("-");
      const dropPosition =
        info.dropPosition - Number(dropPos[dropPos.length - 1]);
      if (dropPosition === 0) return;
      console.log(dropPosition);
      const loop = (data, key, callback) => {
        data.forEach((item, index, arr) => {
          if (item.key === key) {
            return callback(item, index, arr);
          }
        });
      };
      const data = [...this.gData];

      // Find dragObject
      let dragObj;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });
      if (info.dropToGap) {
        let ar;
        let i;
        loop(data, dropKey, (item, index, arr) => {
          ar = arr;
          i = index;
        });
        if (dropPosition === -1) {
          ar.splice(i, 0, dragObj);
        } else {
          ar.splice(i + 1, 0, dragObj);
        }
      }
      this.gData = data;
      console.log(this.gData);
    },

    addCategory(e) {
      if (e.match(/^[ ]*$/) || e == undefined) {
        this.tvisibleText = "为空";
        this.tvisible = true;
        return;
      }
      let arr = this.gData.map((item) => item.title);
      if (arr.indexOf(e) != -1) {
        this.tvisibleText = "重复";
        this.tvisible = true;
        return;
      }

      let data = {
        title: e,
        key: String(Date.parse(new Date())),
      };
      this.gData.push(data);
      this.$data.addCategoryValue = "";
    },
    updateCategoryDrawer() {
      var name;
      console.log(this.type);
      if (this.type == "Eng") {
        name = "engineering";
      }
      if (this.type == "Product") {
        name = "product";
      }
      updateCategory(this, {
        name: name,
        value: this.gData,
      }).then((res) => {
        console.log(res);
        if (res.result.res.updated != 0) {
          this.onClose();
          this.$store.commit("setCategory", { [name]: res.result.data.value });
        }
        this.checkable = false;
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.$message("JKLJLK");
    // this.$message.info("This is a normal message");
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  activated() {},
  beforeCreate() {
    //生命周期 - 创建之前
  },
  beforeMount() {
    //生命周期 - 挂载之前
  },
  beforeUpdate() {
    //生命周期 - 更新之前
  },
  updated() {
    //生命周期 - 更新之后
  },
  beforeDestroy() {
    //生命周期 - 销毁之前
  },
  destroyed() {
    //生命周期 - 销毁完成
  },
};
</script>
<style scoped>
</style>