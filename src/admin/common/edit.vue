
    <template>
  <div>
    <a-form-model :form="form" :model="dataOne" ref="ruleForm" :rules="rules">
      <a-form-model-item
        v-bind="formItemLayout"
        ref="name"
        prop="name"
        label="产品名称"
        has-feedback
      >
        <a-input
          v-model="dataOne.name"
          @blur="
            () => {
              $refs.name.onFieldBlur();
            }
          "
          placeholder="请填写您的产品名称"
        />
      </a-form-model-item>
      <a-form-model-item
        v-if="showPrice"
        v-bind="formItemLayout"
        ref="price"
        prop="price"
        label="价格"
        has-feedback
      >
        <a-input
          v-model="dataOne.price"
          placeholder="请填写您的产品价格"
          prefix="￥"
          type="number"
        />
      </a-form-model-item>
      <a-form-model-item
        v-bind="formItemLayout"
        ref="description"
        prop="description"
        label="产品简介"
        has-feedback
      >
        <a-input
          v-model="dataOne.description"
          placeholder="请填写您的产品价格"
        />
      </a-form-model-item>
      <a-form-model-item v-bind="formItemLayout" label="产品内容" ref="content">
        <vue-editor v-model="content" />
      </a-form-model-item>
      <a-form-model-item
        v-bind="formItemLayout"
        label="产品类别"
        ref="category"
        prop="category"
        v-if="showCategory"
      >
        <a-row type="flex">
          <a-col flex="auto">
            <a-select
              default-value="{ key: 0, title: '哈哈' }"
              label-in-value
              v-model="dataOne.category"
              placeholder="请选择您的产品类别"
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
      </a-form-model-item>
      <a-form-model-item v-bind="formItemLayout" label="产品图片" has-feedback>
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
      </a-form-model-item>
      <a-form-model-item v-bind="tailFormItemLayout">
        <a-button type="primary" @click="onSubmit"> 确认 </a-button>
      </a-form-model-item>
    </a-form-model>
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
import { uploadImg } from "@/service/uploadImg";
import EDrawer from "../common/Drawer";

export default {
  components: {
    EDrawer,
    VueEditor,
    Quill,
  },
  mounted() {},
  created() {
    console.log(this.dataOne);
  },
  computed: {
    dataOne() {
      return this.data;
    },
    categoryData() {
      return this.category;
    },
    showPrice() {
      if (this.type == "Eng") {
        return false;
      } else {
        return true;
      }
    },
    content: {
      get: function () {
        return this.data.content;
      },
      set: function () {},
    },
  },
  props: {
    id: String,
    category: Array,
    data: Object,
    type: String,
    showCategory: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
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
      rules: {
        name: [
          {
            required: true,
            message: "产品名称不能为空!",
            whitespace: true,
          },
          {
            min: 1,
            max: 10,
            message: "Length should be 0 to 10",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "价格不能不为空!",
            whitespace: true,
          },
          {
            min: 1,
            max: 10,
            message: "Length should be 0 to 10",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "产品简介不能不为空!",
            whitespace: true,
          },
        ],
        content: [{ required: true, message: "产品内容不能为空" }],
        category: [
          {
            required: true,
            message: "请选择您的产品类别!",
            trigger: "change",
          },
        ],
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    showDrawer() {
      console.log("D");
      this.$refs.EDrawer.showDrawer();
    },
    // 上传阻止action
    beforeUpload() {
      return false;
    },
    //确认提交事件
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        console.log(valid);
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSubmit(e) {
      // this.$openNotificationWithIcon(this,"dskljfdl")
      console.log(e);
      let productImg = [];
      e.preventDefault();
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          console.log(values);
          let fileList = this.fileList;
          for (let index = 0; index < fileList.length; index++) {
            await uploadImg(fileList[index]).then((res) => {
              console.log(res);
              productImg.push(res.fileID);
            });
          }
          // let content = this.$dataOne.content;
          // let name = values.name;
          // let price = values.price;
          // let description = values.description;
          // let category = values.category.label;
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

.delDiv {
  width: 100%;
  height: 100px;
  background: red;
}
</style>