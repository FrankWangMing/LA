<template>
  <div class="bannerDiv">
    <a-card
      v-for="(item, index) in banner"
      v-model="banner"
      :key="item._id"
      hoverable
      class="bannerItem"
    >
      <img
        slot="cover"
        width="300px"
        height="200px"
        alt="example"
        :src="item.bannerImg"
      />
      <a-card-meta title="Europe Street beat" style="height: 106px">
        <template slot="description">
          {{ shoWbannerType(item.type) }}
        </template>
      </a-card-meta>
      <template slot="actions" class="ant-card-actions">
        <a-popconfirm
          title="是否确认删除?"
          ok-text="是"
          cancel-text="否"
          @confirm="confirm(item, index)"
          @cancel="cancel"
        >
          <a-icon key="delete" type="delete" />
        </a-popconfirm>
        <a-icon key="edit" type="edit" />
      </template>
    </a-card>
    <a-card hoverable style="width: 300px" v-if="banner.length < 7">
      <div slot="cover">
        <a-upload
          v-if="!imgUrl"
          :style="{
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            width: '300px',
          }"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          accept=".jpg,.png"
          list-type="picture-card"
          @change="handleChange"
        >
          <div>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">点击上传</div>
          </div>
        </a-upload>
        <img width="300px" height="200px" :src="imgUrl" v-if="imgUrl" />
      </div>
      <a-card-meta>
        <template slot="description">
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
          <div class="marginTop">
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
          </div>
          <div class="marginTop">
            <a-button type="primary" @click="addBanner">确认</a-button>
          </div>
        </template>
      </a-card-meta>
    </a-card>
    <a-modal
      title="截图"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div style="height: 300px">
        <VueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :centerBox="option.centerBox"
          :infoTrue="option.infoTrue"
          :fixedBox="option.fixedBox"
        ></VueCropper>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { VueCropper } from "vue-cropper";
import { addBanner, deleteBanner } from "@/service/getData";
import { uploadImg } from "@/service/uploadImg";
import { setValueKey } from "@/service/util";
import SecondSelect from "../../../common/SecondSelect";

function getBase64(img, callback) {
  let reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
function getImgUrl(urlData, fileName, callback) {
  let arr = urlData.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let bytes = atob(arr[1]); // 解码base64
  let n = bytes.length;
  let ia = new Uint8Array(n);
  while (n--) {
    ia[n] = bytes.charCodeAt(n);
  }
  return callback(new File([ia], fileName, { type: mime }));
}
export default {
  data() {
    return {
      upimgUrl: {},
      bannerTypeValue: "product",
      bannerCategory: [
        { type: "product", name: "产品" },
        { type: "new", name: "新闻" },
        { type: "eng", name: "工程案例" },
        { type: "outer", name: "外链" },
      ],
      bannerTargetList: {},
      bannerTarget: "",
      loading: false,
      visible: false,
      confirmLoading: false,
      imgUrl: "",
      option: {
        img: "",
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 250, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [9, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
    };
  },
  components: {
    VueCropper,
    SecondSelect,
  },
  //监听属性 类似于data概念
  computed: {
    banner() {
      return this.$store.state.bannerData;
    },
    showOuter() {
      if (this.bannerTypeValue == "outer") {
        return true;
      } else {
        return false;
      }
    },
    // banner目标
    bannerTargetLi() {
      return this.bannerTargetList[this.bannerTypeValue];
    },
    // banner类型
    bannerType() {
      for (const iterator of this.bannerCategory) {
        if (iterator.type == this.bannerTypeValue) {
          return iterator;
        }
      }
      // console.log(this.bannerTypeValue);
      // return this.bannerCategory[this.bannerTypeValue];
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getBannerData() {
      this.$store.dispatch("getBannerData", this);
    },
    shoWbannerType(value) {
      console.log(value);
      for (const iterator of this.bannerCategory) {
        if (iterator.type == value) {
          return iterator.name;
        }
      }
    },
    cancel() {
      console.log("Cancel");
    },
    //删除banner
    confirm(item, index) {
      console.log(item, index);
      deleteBanner(this, { id: item._id }).then((res) => {
        console.log(res);
        if (res.result.res.deleted != 0) {
          this.banner.splice(index, 1);
        }
      });
    },

    async addBanner() {
      console.log("D");
      let type = this.bannerTypeValue;
      let target = this.bannerTarget;
      let bannerImg = [];
      await uploadImg(
        { name: "banner/" + target, originFileObj: this.upimgUrl },
        this
      ).then((res) => {
        console.log(res);
        bannerImg.push(res.fileID);
      });
      let data = {
        type,
        target,
        bannerImg,
      };
      await addBanner(this, data).then((res) => {
        if (res.result.id) {
          this.getBannerData();
        }
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    selectTargetFocus() {
      console.log("FOCUS");
    },
    selectTargetBlur() {
      console.log("blur");
    },
    //选择banner 类别
    selectBannerChange(e) {
      console.log(e);
      this.bannerTypeValue = e;
    },
    handleChange(info) {
      this.loading = true;
      console.log(info);
      // console.log(fileList);
      // this.fileList = fileList;
      getBase64(info.file, (imageUrl) => {
        this.option.img = imageUrl;
      });
      this.$nextTick(() => {
        this.visible = true;
      });
    },
    beforeUpload() {
      return false;
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      // this.confirmLoading = true;
      // setTimeout(() => {
      //   this.visible = false;
      //   this.confirmLoading = false;
      // }, 2500);
      //截图事件
      this.$refs.cropper.getCropData((data) => {
        this.imgUrl = data;
        getImgUrl(data, setValueKey("img"), (res) => {
          console.log(res);
          this.upimgUrl = res;
        });
        // var fileName = 'goods' + this.fileinfo.uid
      });

      this.$nextTick(() => {
        this.visible = false;
      });
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.visible = false;
    },

    //banner目标选择
    selectTargetChange(e) {
      console.log(e);
      this.bannerTarget = e;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getBannerData();
    // getBanner(this, {}).then((res) => {
    //   console.log(res);

    //   this.banner = res.result.res.data;

    //   console.log(this.banner);
    // });
    this.$store.getters.getBannerTargetList(this).then((res) => {
      this.bannerTargetList = res;
    });
    // this.$store.getters.getBannerTargetList()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.ant-card >>> .ant-card-cover {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
.ant-card {
  height: 400px;
  margin: 5px;
}
.bannerDiv {
  display: flex;
  flex-wrap: wrap;
}
.bannerItem {
  width: 300px;
  margin: 5px;
  height: 400px;
}
.marginTop {
  margin: 5px 0;
}
</style>