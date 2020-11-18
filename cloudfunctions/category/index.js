
const cloudbase = require('@cloudbase/node-sdk');

const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV,
})

// 1. 获取数据库引用
var db = app.database();

exports.main = async (event) => {
    var data = event.data
    switch (event.action) {
        case "getCategory": {
            return getCategory(data)
        }
        case "updateCategory": {
            return updateCategory(data)
        }
        case "deleteCategory": {
            return deleteCategory(data)
        }
        case "addCategory": {
            return addCategory(data)
        }
        default: {
            return "false";
        }
    }
}




// // return res;
async function getCategory(data) {
    // 2. 构造查询语句
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("category").where({})
        // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
        // .where({
        // })
        // get() 方法会触发网络请求，往数据库取数据
        // .skip(data.pageNum)
        // // 
        // .limit(data.pageSize)
        .get().then(res => {
            return res
        })
    return {
        res
    }

}

async function updateCategory(data) {
    // 2. 构造查询语句
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("category")
        // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
        .doc("2c9645925f833bc20013b40219fa65a7")
        .update({
            [data.name]: data.value
        });

    return {
        res, data
    }
}
async function deleteCategory(data) {
    // 2. 构造查询语句
    let id = data.id
    const res = await db
        .collection("category")
        .doc(id)
        .remove();
    return {
        res
    }
}

async function deleteCategoryMore(data) {
    // 2. 构造查询语句
    const res = await db
        .collection("category")
        .where(data)
        .remove();
    return {
        res
    }
}


async function addCategory(data) {
    data.createTime = db.serverDate()
    // 2. 构造查询语句
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("category")
        // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
        // get() 方法会触发网络请求，往数据库取数据
        .add(data).then()
    return res;

}