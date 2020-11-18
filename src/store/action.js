import { getProduct, getNew, getCategory, getEng, getBanner } from "../service/getData";
import cloudbaserc from '../../cloudbaserc.json'
import tcb from "@cloudbase/js-sdk";
//第二步，初始化
const app = tcb.init({
    env: cloudbaserc.envId
});

export default {
    async getBannerData(state, that) {
        console.log(state)
        let bannerData = state.state.bannerData
        console.log(bannerData)
        if (bannerData.length == 0 || bannerData == undefined) {
            await getBanner(that).then((res) => {
                console.log(res)
                that.$store.commit("setBanner", res.result.res.data);
                bannerData = res.result.res.data
            });
        }
        return bannerData;
    },

    async getEngTabList(state, that) {
        console.log(state)
        let engineeringTabList = state.state.engineeringTabList
        if (engineeringTabList.length == 0 || engineeringTabList == undefined) {
            await getCategory(that).then((res) => {
                console.log(res)
                that.$store.commit("setCategory", res.result.res.data[0]);
                engineeringTabList = res.result.res.data[0].engineering;
            });
        }
        return engineeringTabList;
    },
    async getProductTabList(state, that) {
        console.log(state)
        let productTabList = state.state.productTabList
        if (productTabList.length == 0 || productTabList == undefined) {
            await getCategory(that).then((res) => {
                console.log(res)
                that.$store.commit("setCategory", res.result.res.data[0]);
                productTabList = res.result.res.data[0].product;
            });
        }
        return productTabList;

    },
    async getProductData(state, that) {
        // let that = this
        let productData = state.state.productData
        if (productData.length == 0) {
            await getProduct(that, {
                pageNum: 0,
                pageSize: 20,
                field: { content: false },
            }).then((res) => {
                that.$store.commit("setProductData", res.result.res.data);
                productData = res.result.res.data;
            });
        }
        return productData
    },
    async getEngData(state, that) {
        // let that = this
        let engineeringData = state.state.engineeringData
        if (engineeringData.length == 0) {
            await getEng(that, {
                pageNum: 0,
                pageSize: 20,
                field: { content: false },
            }).then((res) => {
                that.$store.commit("setEngData", res.result.res.data);
                engineeringData = res.result.res.data;
            });
        }
        return engineeringData
    },
    async getNewData(state, that) {
        // let that = this
        let newData = state.state.newData
        if (newData.length == 0) {
            await getNew(that, {
                pageNum: 0,
                pageSize: 20,
                field: { content: false },
            }).then((res) => {
                that.$store.commit("setNewData", res.result.res.data);
                newData = res.result.res.data;
            });
        }
        return newData
    },
    async login(state, that) {
        console.log(state)
        let loginState = state.state.loginState
        if (loginState == false) {
            const auth = app.auth();
            await auth.anonymousAuthProvider().signIn();
            // 匿名登录成功检测登录状态isAnonymous字段为true
            const loginStates = await auth.getLoginState();
            console.log(loginStates.isAnonymousAuth); // true
            loginState = loginStates.isAnonymousAuth;
            that.$store.commit("setloginState", loginState.isAnonymousAuth);
        }
        return loginState;
    }



}