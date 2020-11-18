export default {
    //分类
    setCategory(state, category) {
        if (state.productTabList) state.productTabList = category.product;
        if (state.newTabList) state.newTabList = category.new;
        if (state.engineeringTabList) state.engineeringTabList = category.engineering;
    },
    //产品
    setProductData(state, productData) {
        state.productData = productData
    },
    //新闻
    setNewData(state, newData) {
        state.newData = newData
    },
    //工程
    setEngData(state, engineeringData) {
        state.engineeringData = engineeringData
    },
    //登录状态
    setloginState(state, loginState) {
        state.loginState = loginState
    },
    //首页banner
    setBanner(state, data) {
        state.bannerData = data
    }


}