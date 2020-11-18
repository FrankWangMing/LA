//第一步，引入 Web SDK，
import tcb from "@cloudbase/js-sdk";
import cloudbaserc from '../../cloudbaserc.json'
//第二步，初始化
const app = tcb.init({
    env: cloudbaserc.envId
});

const uploadImg = async (data) => {
    console.log(data)
    // await login();
    const res = app.uploadFile({
        // 云存储的路径
        cloudPath: data.name,
        // 需要上传的文件，File 类型
        filePath: data.originFileObj
    }).then((res) => {
        // 返回文件 ID
        console.log(res.fileID);
        return res;
    });
    return new Promise((resolve) => {
        resolve(res, data)
    });

}
export {
    uploadImg
}