<template>
  <div>
    <div class="backVideo">
      <video
        width="100%"
        loop
        autoplay
        muted
        src="http://1254102259.vod2.myqcloud.com/e2aa83c1vodcq1254102259/617b8ffe5285890808883864159/Un8dTYh7nRoA.mp4"
      ></video>
    </div>
    <div class="loginDIV">
      <a-form
        class="login"
        id="components-form-demo-normal-login"
        :form="form"
        @submit="handleSubmit"
      >
        <a-form-item
          :validate-status="emailError() ? 'error' : ''"
          :help="emailError() || ''"
        >
          <a-input
            v-decorator="[
              'email',
              {
                rules: [{ required: true, message: '请输入你的邮箱!' }],
              },
            ]"
            type="email"
            placeholder="邮箱"
          >
            <a-icon
              slot="prefix"
              type="mail"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item
          :validate-status="passwordError() ? 'error' : ''"
          :help="passwordError() || ''"
        >
          <a-input
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入你的密码!' }],
              },
            ]"
            type="password"
            placeholder="密码"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              },
            ]"
          >
            记住我
          </a-checkbox>
          <a class="login-form-forgot" @click="forgetPass"> 忘记密码 </a>
        </a-form-item>
        <a-form-item>
          <a-button
            class="login-form-button"
            type="primary"
            html-type="submit"
            :disabled="hasErrors(form.getFieldsError())"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import cloudbase from "@cloudbase/js-sdk";
import cloudbaserc from "../../cloudbaserc.json";
const app = cloudbase.init({
  env: cloudbaserc.envId,
});
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
export default {
  data() {
    return {
      hasErrors,
    };
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
    // 设置一个观察者
    app.auth().onLoginStateChanged((loginState) => {
      console.log(loginState);
      if (loginState) {
        console.log("登录成功");
        // 此时用户已经登录
        this.$store.commit("setloginState", loginState);
        this.$router.push("/admin");
      } else {
        this.$store.commit("setloginState", loginState);
        console.log("登录失败");
        console.log("密码错误");
        // 没有登录
      }
    });
    // this.envId = this.$cloudbase.config.env;
    // // 以匿名登录为例
    // try {
    //   const auth = this.$cloudbase.auth({ persistence: "local" });
    //   if (!auth.hasLoginState()) {
    //     await auth.anonymousAuthProvider().signIn();
    //   }
    //   console.log("用户id", auth.hasLoginState().user.uid);
    //   this.isLoginSuccss = true;
    // } catch (e) {
    //   if (e.message.includes("100007")) {
    //     this.isLoginSuccss = false;
    //   }
    // }
  },
  //方法集合
  methods: {
    forgetPass() {
      console.log("FORGET");
    },
    emailError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("email") && getFieldError("email");
    },
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.login(values.email, values.password);
        }
      });
    },
    login(email, password) {
      // signUpWithEmailAndPassword
      app
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((loginState) => {
          console.log(loginState);
          // 登录成功
        });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
.loginDIV {
  background: #ffffff;
  z-index: 16;
  position: absolute;
  right: 10px;
  transform: translate(-50%, -50%);
  top: 50%;
  background: rgb(255, 255, 255);
  border-radius: 5px;
}
.login {
  display: flex;
  flex-direction: column;
  z-index: 10;
  max-width: 500px;
  width: 400px;
  background: #ffffff;
  padding: 30px 40px 20px;
  border-radius: 5px;
}
.backVideo {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  overflow: hidden;
}
#components-form-demo-normal-login .login-form {
  max-width: 400px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.ant-form-item {
  margin-bottom: 5px;
}
</style>