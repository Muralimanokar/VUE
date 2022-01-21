import Proxy from '@/proxies/PointsProxy';
import axios from 'axios';
import { param } from 'jquery';
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
            return new Proxy().getPointsList(param);
         },
         getMerchantPoint({ state, dispatch },param) {
            return new Proxy().getMerchantPointsList(param);
         },
         add({ state, dispatch },param) {
            return new Proxy().createPoint(param);
         },
         get({ state, dispatch },param) {
            return new Proxy().getPoint(param);
         },
         update({ state, dispatch },param) {
            return new Proxy().updatePoint(param);
         },
         getPoints({ state, dispatch },param) {
            return new Proxy().getCustomerPoints(param);
         }
    },

}
