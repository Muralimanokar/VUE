import Proxy from '@/proxies/SubscriptionProxy';
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
            return new Proxy().getSubscriptionList(param);
         }
    },
}
