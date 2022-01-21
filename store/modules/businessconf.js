import Proxy from '@/proxies/BusinessconfProxy';
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
         init({ state, dispatch },param) {
            return new Proxy().getBusinessConf(param);
         },
         add({ state, dispatch },param) {
            return new Proxy().addBusinessConf(param);
         },
         update({ state, dispatch },param) {
            return new Proxy().updateBusinessConf(param);
         },
    },

}
