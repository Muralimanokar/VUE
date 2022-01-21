import Proxy from '@/proxies/CountryProxy';
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
            return new Proxy().getCountryList(param);
         },
         getCurrencylist({ state, dispatch },param) {
            return new Proxy().getCurrencyList(param);
         },
    },

}
