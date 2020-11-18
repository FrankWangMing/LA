
const cloudbase = require('@cloudbase/node-sdk');

const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV,
})

// 1. 获取数据库引用
var db = app.database();

exports.main = async (event) => {
    var data = event.data
    switch (event.action) {
        case "getCompany": {
            return getCompany(data)
        }
        case "updateCompany": {
            return updateCompany(data)
        }
        case "deleteCompany": {
            return deleteCompany(data)
        }
        case "addCompany": {
            return addCompany(data)
        }
        default: {
            return "false";
        }
    }
}




// return res;
async function getCompany(data) {
    // 2. 构造查询语句
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("company").where(data.value)
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


async function updateCompany(data) {
    const id = data.value._id
    delete data.value._id
    // 2. 构造查询语句
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("company")
        // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
        .doc(id)
        // get() 方法会触发网络请求，往数据库取数据
        .update(data.value)

    return {
        res
    }
}
async function deleteCompany(data) {
    // 2. 构造查询语句
    let id = data.id
    const res = await db
        .collection("company")
        .doc(id)
        .remove();
    return {
        res
    }
}




async function addCompany(data) {
    // 2. 构造查询语句
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("company")
        // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
        // get() 方法会触发网络请求，往数据库取数据
        .add(data)
    return res;

}