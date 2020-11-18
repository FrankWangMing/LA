export default {
    //获取banner的目标选项
    getBannerTargetList: (state) => async (th) => {
        let productData = state.productData;
        let newData = state.newData;
        let engData = state.engineeringData
        if (productData.length == 0) {
            await th.$store.dispatch("getProductData", th).then((res) => {
                productData = res
            });
        }
        if (newData.length == 0) {
            await th.$store.dispatch("getNewData", th).then((res) => {
                newData = res
            });
        }
        if (engData.length == 0) {
            await th.$store.dispatch("getEngData", th).then((res) => {
                engData = res
            });
        }
        let arr = {
            'product': productData,
            'new': newData,
            'eng': engData
        }
        return arr;
    }
}