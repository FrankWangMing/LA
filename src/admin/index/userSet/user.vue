<template>
  <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
    <a-form-model-item label="邮箱" prop="mail">
      <a-input v-model="email" type="mail" autocomplete="off" disabled />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码" prop="pass">
      <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="确认密码" prop="checkPass">
      <a-input
        v-model="ruleForm.checkPass"
        type="password"
        autocomplete="off"
      />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('ruleForm')">
        确认修改
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { auth } from "@/service/auth";
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      email: "",
      ruleForm: {
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  created() {
    const user = auth.currentUser;
    if (user) {
      this.email = user.email;
    }
    console.log(user.email);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        let password = this.ruleForm.checkPass;
        console.log(password);
        if (valid) {
          auth.currentUser.updatePassword(password).then((res) => {
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
