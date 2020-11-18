
export default async (that, name = "", action = "", data = {}) => {  //name 云函数名字   data 传的值
    if (!action) {
        return "请填写action!"
    }
    if (!data.value && action.substr(0, 3) == "get") {
        data.value = {}
    }
    var datas = {}
    datas.action = action;
    datas.data = data
    const res = await that.$cloudbase.callFunction({
        name,
        data: datas,
    });
    return res;
    // return new Promise((resolve) => {
    //     resolve(res)
    // });
    // console.log(name)
    // try {

    // } catch (e) {
    //     console.error(e)
    // }

    // const cloudbase = require("@cloudbase/js-sdk");
    // console.log(cloudbase)
    // const app = cloudbase.init({
    //     env: "test-7gt6pjtm08c62d22"
    // });
    // console.log(app)
    // app.$cloudbase.callFunction({
    //     name: "vue-echo",
    //     data: {
    //         foo: "bar",
    //     },
    // });
    // await console.log("res")
    // return "res";
} 