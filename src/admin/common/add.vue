<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        v-bind="formItemLayout"
        :label="`${label}` + '名称'"
        has-feedback
      >
        <a-input
          v-decorator="[
            'name',
            {
              rules: [
                {
                  required: true,
                  message: `${label}` + '名称不能为空!',
                  whitespace: true,
                },
              ],
            },
          ]"
          :placeholder="'请填写您的' + `${label}` + '名称'"
        />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        :label="`${label}` + '简介'"
        has-feedback
      >
        <a-input
          v-decorator="[
            'description',
            {
              rules: [
                {
                  required: true,
                  message: `${label}` + '简介不能为空!',
                  whitespace: true,
                },
              ],
            },
          ]"
          :placeholder="'请填写您的' + `${label}` + '简介'"
        />
      </a-form-item>

      <a-form-item
        v-if="showCategory"
        v-bind="formItemLayout"
        :label="`${label}` + '类别'"
        prop="category"
      >
        <a-row type="flex">
          <a-col flex="auto">
            <a-select
              v-decorator="[
                'category',
                {
                  rules: [
                    {
                      required: true,
                      message: `${label}` + '类别不能为空',
                    },
                  ],
                },
              ]"
              label-in-value
              :placeholder="'请选择您的' + `${label}` + '类别'"
              :options="categoryData"
            >
            </a-select>
          </a-col>
          <a-col flex="10px">
            <a-button type="primary" icon="edit" @click="showDrawer">
              新增类别
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        :label="`${label}` + '图片'"
        has-feedback
      >
        <a-upload
          :before-upload="beforeUpload"
          accept=".jpg,.png"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">点击上传</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        :label="`${label}` + '内容'"
        has-feedback
      >
        <vue-editor v-model="content" />
        <!-- <CkEditor ref="CkEditor" /> -->
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" html-type="submit"> 确认 </a-button>
      </a-form-item>
    </a-form>
    <EDrawer
      ref="EDrawer"
      v-model="categoryData"
      :categoryData="categoryData"
      :type="type"
    />
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
// import CkEditor from "./Ckeditor/Ckeditor";
import { addNew, addEng, addProduct } from "@/service/getData";
import { uploadImg } from "@/service/uploadImg";
import EDrawer from "./Drawer";

export default {
  components: {
    VueEditor,
    Quill,
    // CkEditor,
    EDrawer,
  },
  computed: {
    categoryData() {
      return this.category;
    },
  },
  mounted() {},
  created() {},
  props: {
    id: String,
    type: String,
    label: String,
    category: Array,
    showCategory: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      content: "",
      expandedKeys: [],
      visible: false,
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 8 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 2 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
      previewVisible: false,
      previewImage: "",
      fileList: [
        // {
        //   uid: "-4",
        //   name: "image.png",
        //   status: "done",
        //   url:
        //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        // },
      ],
      // {
      //   uid: "-4",
      //   name: "image.png",
      //   status: "done",
      //   url:
      //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      // },
      // {
      //   uid: "-5",
      //   name: "image.png",
      //   status: "error",
      // },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    showDrawer() {
      this.$refs.EDrawer.showDrawer();
    },
    // 上传阻止action
    beforeUpload() {
      return false;
    },
    //确认提交事件
    handleSubmit(e) {
      e.preventDefault();
      let newImg = [];
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          let fileList = this.fileList;
          for (let index = 0; index < fileList.length; index++) {
            fileList[index].name = "product/" + fileList[index].name;
            console.log(fileList);
            await uploadImg(fileList[index], this).then((res) => {
              console.log(res);
              newImg.push(res.fileID);
            });
          }
          console.log(values);
          let content = this.$data.content;
          // let content = this.$refs.CkEditor.editorData;
          console.log(content);
          let name = values.name;
          let description = values.description;
          let data = {
            description,
            name: name,
            content,
          };
          console.log(values);
          if (this.type == "Eng") {
            data.category = values.category;
            data.image = newImg;
            await addEng(this, data).then((res) => {
              console.log(res);
            });
          }
          if (this.type == "Product") {
            data.category = values.category;
            data.image = newImg;
            await addProduct(this, data).then((res) => {
              console.log(res);
              if (res.requestId) {
                console.log("DD");
              }
            });
          } else {
            await addNew(this, data).then((res) => {
              console.log(res);
              if (res.requestId) {
                console.log("DD");
              }
            });
          }
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = [".com", ".org", ".net"].map(
          (domain) => `${value}${domain}`
        );
      }
      this.autoCompleteResult = autoCompleteResult;
    },

    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      console.log(fileList);
      this.fileList = fileList;
    },
    onDragEnter(info) {
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
      const data = [...this.categoryData];

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
      this.categoryData = data;
      console.log(this.categoryData);
    },
  },
};
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
</script>
<style scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>