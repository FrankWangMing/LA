
    <template>
  <Edit
    type="Product"
    label="产品"
    :id="id"
    showCategory
    v-model="ProductData"
    :data="ProductData"
    :category="categoryData"
  />
</template>

<script>
import { getProductOne } from "@/service/getData";
import Edit from "../common/edit";

export default {
  components: {
    Edit,
  },
  computed: {
    categoryData() {
      return this.$store.state.productTabList;
    },
  },
  mounted() {},
  created() {
    console.log(this.id);
    if (this.id) {
      getProductOne(this, { value: { _id: this.id } }).then((res) => {
        this.productOne = res.result.res.data[0];
        this.content = this.productOne.content;
      });
    }
    this.$store.dispatch("getProductTabList", this);
    // .getters.getProductData()
  },
  props: ["id"],
  data() {
    return {
      productOne: {},
    };
  },
  beforeCreate() {},

  //生命周期 - 挂载完成（可以访问DOM元素）
  activated() {},
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