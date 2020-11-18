
const cloudbase = require('@cloudbase/node-sdk')

const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV,
})

// 1. 获取数据库引用
var db = app.database();

exports.main = async (event) => {
    var data = event.data
    switch (event.action) {
        case "getEng": {
            return getEng(data)
        }
        case "getEngOne": {
            return getEngOne(data)
        }

        case "updateEng": {
            return updateEng(data)
        }
        case "deleteEng": {
            return deleteEng(data)
        }
        case "addEng": {
            return addEng(data)
        }
        case "deleteEngMore": {
            return deleteEngMore(data)
        }

        default: {
            return "false";
        }
    }
}




// // return res;
async function getEng(data) {
    // 2. 构造查询语句
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("engineering").where({})
        // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
        // .where({
        // })
        // get() 方法会触发网络请求，往数据库取数据
        .skip(data.pageNum)
        .limit(data.pageSize)
        .field(data.field)
        .get().then(res => {
            return res
        })
    for (item of res.data) {
        if (item.image && item.image.length != 0) {
            item.image = await app
                .getTempFileURL({
                    fileList: [item.image[0]]
                }).then(res => {
                    return res.fileList;
                })
            item.coverImg = item.image[0].tempFileURL
        } else {
            item.coverImg = "https://icweiliimg6.pstatp.com/weili/l/918168032601702407.webp"
        }
    }
    return {
        res
    }

}
async function getEngOne(data) {
    // 2. 构造查询语句
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("engineering").where(data.value)
        // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
        // .where({
        // })
        // get() 方法会触发网络请求，往数据库取数据
        .get().then(res => {
            return res
        })
    // res.[0].image
    for (item of res.data) {
        if (item.image && item.image.length != 0) {
            item.image = await app
                .getTempFileURL({
                    fileList: item.image
                }).then(res => {
                    return res.fileList;
                })
        }
    }
    return {
        res
    }
}
async function updateEng(data) {
    // 2. 构造查询语句
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("engineering")
        // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
        .where({
        })
        // get() 方法会触发网络请求，往数据库取数据
        .get()

    return {
        res
    }
}
async function deleteEng(data) {
    // 2. 构造查询语句
    let id = data.id
    const res = await db
        .collection("engineering")
        .doc(id)
        .remove();
    return {
        res
    }
}

async function deleteEngMore(data) {
    // 2. 构造查询语句
    const res = await db
        .collection("engineering")
        .where(data)
        .remove();
    return {
        res
    }
}


async function addEng(data) {
    data.createTime = db.serverDate()
    // 2. 构造查询语句
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("engineering")
        // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
        // get() 方法会触发网络请求，往数据库取数据
        .add(data).then()
    return res;

}