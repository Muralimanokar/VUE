import Proxy from '@/proxies/AccountProxy';
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
        getAccountList({ state, dispatch },param) {
           return new Proxy().getAccountsByType(param);
        },
        getAccountName({ state, dispatch },param) {
           return new Proxy().getAccountNameById(param);
        },
        accountList({ state, dispatch },param) {
           return new Proxy().getUserAccountList(param);
        }
    },

}
