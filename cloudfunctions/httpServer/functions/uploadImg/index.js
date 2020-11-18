
const cloudbase = require('@cloudbase/node-sdk')
const fs = require("fs");

const app = cloudbase.init({
    env: "test-7gt6pjtm08c62d22",
})

exports.main = async function (event) {
    return true;
    const result = app.uploadFile({
        cloudPath: "path/test.jpg",
        fileContent: fs.createReadStream("test.jpg")
    }).then((res) => {
        // 返回文件 ID
        console.log(res.fileID);
        return res;
    });
    return {
        result
    }
};