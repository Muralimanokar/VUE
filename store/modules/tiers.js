import Proxy from '@/proxies/TiersProxy';
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
            return new Proxy().getTierslist(param);
         },
         getTierList({ state, dispatch },param) {
            return new Proxy().getTiersAll(param);
         },
         initActive({ state, dispatch },param) {
            return new Proxy().getTiersActivelist(param);
         },
         create({ state, dispatch },param) {
            return new Proxy().createTier(param);
         },
         add({ state, dispatch },param) {
            return new Proxy().addTier(param);
         },
         get({ state, dispatch },param) {
            return new Proxy().getTier(param);
         },
         update({ state, dispatch },param) {
            return new Proxy().updateTier(param);
         },
         delete({ state, dispatch },param) {
            return new Proxy().deleteTier(param.partnerId, param.tierGroupId);
         }
    },

}
