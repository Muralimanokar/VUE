import Proxy from '@/proxies/UserProxy';
import axios from 'axios';
export default {
    namespaced: true,
    state: {
    },
    getters : {
    },
    mutations : {
    },
    actions : {
         search({ state, dispatch },param) {
            return new Proxy().searchUser(param);
         },
         CheckUser({ state, dispatch },param) {
            return new Proxy().checkuser(param);
         }
    },

}
