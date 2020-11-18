

import fetch from './fetch'
//获取产品
export const getProduct = (that, data) => fetch(that, "product", "getProduct", data)
export const getProductOne = (that, data) => fetch(that, "product", "getProductOne", data)
export const addProduct = (that, data) => fetch(that, "product", "addProduct", data)
export const deleteProduct = (that, data) => fetch(that, "product", "deleteProduct", data)
export const deleteProductMore = (that, data) => fetch(that, "product", "deleteProductMore", data)
export const updateProduct = (that, data) => fetch(that, "product", "updateProduct", data)
export const test = (that) => fetch(that, "image", "test")

//获取新闻资讯
export const getNew = (that, data) => fetch(that, "new", "getNew", data)
export const getNewOne = (that, data) => fetch(that, "new", "getNewOne", data)
export const addNew = (that, data) => fetch(that, "new", "addNew", data)
export const deleteNew = (that, data) => fetch(that, "new", "deleteNew", data)
export const deleteNewMore = (that, data) => fetch(that, "new", "deleteNewMore", data)
export const updateNew = (that, data) => fetch(that, "new", "updateNew", data)
//获取工程案例
export const getEng = (that, data) => fetch(that, "engineering", "getEng", data)
export const getEngOne = (that, data) => fetch(that, "engineering", "getEngOne", data)
export const addEng = (that, data) => fetch(that, "engineering", "addEng", data)
export const deleteEng = (that, data) => fetch(that, "engineering", "deleteEng", data)
export const deleteEngMore = (that, data) => fetch(that, "engineering", "deleteEngMore", data)
export const updateEng = (that, data) => fetch(that, "engineering", "updateEng", data)


//产品类别  //工程类别 
export const updateCategory = (that, data) => fetch(that, "category", "updateCategory", data)
export const getCategory = (that, data) => fetch(that, "category", "getCategory", data)

//首页banner
export const deleteBanner = (that, data) => fetch(that, "index", "deleteBanner", data)
export const getBanner = (that, data) => fetch(that, "index", "getBanner", data)
export const addBanner = (that, data) => fetch(that, "index", "addBanner", data)
export const updateBanner = (that, data) => fetch(that, "index", "updateBanner", data)

//页尾
export const deleteFooterCategory = (that, data) => fetch(that, "index", "deleteFooterCategory", data)
export const getFooterCategory = (that, data) => fetch(that, "index", "getFooterCategory", data)
export const addFooterCategory = (that, data) => fetch(that, "index", "addFooterCategory", data)
export const updateFooterCategory = (that, data) => fetch(that, "index", "updateFooterCategory", data)

//公司信息
export const deleteCompany = (that, data) => fetch(that, "company", "deleteCompany", data)
export const getCompany = (that, data) => fetch(that, "company", "getCompany", data)
export const addCompany = (that, data) => fetch(that, "company", "addCompany", data)
export const updateCompany = (that, data) => fetch(that, "company", "updateCompany", data)