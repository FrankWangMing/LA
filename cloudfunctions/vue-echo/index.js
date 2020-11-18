// const cloud = require("@cloudbase/node-sdk");

// exports.main = async (event, context) => {
//   const app = cloud.init({
//     env: cloud.SYMBOL_CURRENT_ENV,
//   });



//   // todo
//   // your code here
//   return {
//     event,
//   };
// };


const cloudbase = require('@cloudbase/node-sdk')

const app = cloudbase.init({
  env: "test-7gt6pjtm08c62d22",
})

// 1. 获取数据库引用
var db = app.database();

exports.main = async (event, context) => {
  // 2. 构造查询语句
  const res = await db
    // collection() 方法获取一个集合的引用
    .collection("product")
    // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
    .where({
    })
    // get() 方法会触发网络请求，往数据库取数据
    .get()

  return {
    res
  }
}

