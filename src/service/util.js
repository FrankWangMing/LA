const setValueKey = (type = "") => {
    let len = 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var key = '';
    for (let i = 0; i < len; i++) {
        key += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    key = type + key + String(Date.parse(new Date()))
    return key;
}

export {
    setValueKey
}