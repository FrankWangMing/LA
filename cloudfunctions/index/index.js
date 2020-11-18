
const cloudbase = require('@cloudbase/node-sdk');

const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV,
})

// 1. 获取数据库引用
var db = app.database();

exports.main = async (event) => {
    var data = event.data
    switch (event.action) {
        //首页banner
        case "getBanner": {
            return getBanner(data)
        }
        case "updateBanner": {
            return updateBanner(data)
        }
        case "deleteBanner": {
            return deleteBanner(data)
        }
        case "addBanner": {
            return addBanner(data)
        }
        //页尾分类
        case "deleteFooterCategory": {
            return deleteFooterCategory(data)
        }
        case "getFooterCategory": {
            return getFooterCategory(data)
        }
        case "addFooterCategory": {
            return addFooterCategory(data)
        }
        case "updateFooterCategory": {
            return updateFooterCategory(data)
        }
        default: {
            return "false";
        }
    }
}




async function getBanner(data) {
    // 2. 构造查询语句
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("banner").where({})
        // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
        // .where({
        // })
        // get() 方法会触发网络请求，往数据库取数据
        .get().then(res => {
            return res
        })
    // res.[0].image
    for (item of res.data) {
        if (item.bannerImg.length != 0) {
            item.bannerImg = await app
                .getTempFileURL({
                    fileList: item.bannerImg
                }).then(res => {
                    return res.fileList[0].tempFileURL;
                })
        }
    }
    return {
        res
    }
}


async function updateBanner(data) {
    // 2. 构造查询语句
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("banner")
        // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
        .where({
        })
        // get() 方法会触发网络请求，往数据库取数据
        .get()

    return {
        res
    }
}
async function deleteBanner(data) {
    // 2. 构造查询语句
    let id = data.id
    const res = await db
        .collection("banner")
        .doc(id)
        .remove();
    return {
        res
    }
}

async function addBanner(data) {
    // 2. 构造查询语句
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("banner")
        // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
        // get() 方法会触发网络请求，往数据库取数据
        .add(data)
    return res;

}


async function deleteFooterCategory(data) {
    let id = data.id
    // 2. 构造查询语句
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("footercategory")
        .doc(id)
        .remove();
    return { res };
}
async function getFooterCategory() {
    // 2. 构造查询语句
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("footercategory")
        // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
        // get() 方法会触发网络请求，往数据库取数据
        .where({}).get().then(res => {
            return res;
        })
    return { res };
}
async function addFooterCategory(data) {
    // 2. 构造查询语句
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("footercategory")
        // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
        // get() 方法会触发网络请求，往数据库取数据
        .add(data)
    return res;
}
async function updateFooterCategory(data) {
    // 2. 构造查询语句
    var id = data.value._id
    delete data.value._id
    const res = await db
        // collection() 方法获取一个集合的引用
        .collection("footercategory")
        .doc(id)
        // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
        // get() 方法会触发网络请求，往数据库取数据
        .set(data.value)
        .then(res => {
            return res
        })
    return { res };
}
