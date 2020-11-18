
const cloudbase = require('@cloudbase/node-sdk')
const fs = require("fs");

const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV,
})


exports.main = async (event) => {
    if (!event) return false;
    var path = event.path
    switch (path) {
        case "/getImage": {
            return getImage(data)
        }
        case "/deleteImage": {
            return deleteImage(data)
        }
        case "/uploadImage": {
            return uploadImage(event)
        }
        default: {
            return event.path;
        }
    }
}

// // return res;
async function getImage(data) {
    const result = await app.getTempFileURL({
        fileList: ['cloud://test-28farb/a.png']
    })

    result.fileList.forEach(item => {
        console.log(item.tempFileURL) // 打印文件访问链接
    })

}

async function deleteImage(data) {
    const result = await app.deleteFile({
        fileList: ['HHOeahVQ0fRTDsums4GVgMCsF6CE3wb7kmIkZbX+yilTJE4NPSQQW5EYks']
    })

    result.fileList.forEach(item => {
        if (item.code === 'SUCCESS') {
            // 文件删除成功
        }
    })
}



async function uploadImage(data) {

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
    // app.uploadFile({
    //     cloudPath: "path/test.jpg",
    //     fileContent: fs.createReadStream(data.image)
    // }).then((res) => {
    //     // 返回文件 ID
    //     return {
    //         res
    //     }
    // });
}

