import Proxy from '@/proxies/PurchasesProxy';
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
         init({ state, dispatch }, param) {
            return new Proxy().getPurchaseList(param);
         },
         inits({ state, dispatch }, param) {
            return new Proxy().getPurchaseLists(param);
         },
         get({ state, dispatch }, param) {
            return new Proxy().getPurchase(param);
         },
         rulepurchases({ state, dispatch }, param) {
          return new Proxy().rulePurchases(param);
       },
         update({ state, dispatch },param) {
            return new Proxy().updatePurchase(param);
         },
    }

}
