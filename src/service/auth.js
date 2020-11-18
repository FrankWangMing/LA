import tcb from "@cloudbase/js-sdk";
import cloudbaserc from '../../cloudbaserc.json'
//第二步，初始化
const app = tcb.init({
    env: cloudbaserc.envId
});
const auth = app.auth()
export {
    auth
}
