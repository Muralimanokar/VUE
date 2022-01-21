import Proxy from '@/proxies/SegmentProxy';
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
            return new Proxy().getSegmentList(param);
         },
         allsegment({ state, dispatch }, param) {
            return new Proxy().allsegment(param);
         },
         create({ state, dispatch }, param) {
            return new Proxy().createSegment(param.id, param.data);
         },
         get({ state, dispatch }, param) {
            return new Proxy().getSegment(param.partnerId, param.id);
         },
         getCustomerSegmentList({ state, dispatch }, param) {
            return new Proxy().getCustomerSegmentList(param);
         },
         getCustomerList({ state, dispatch }, param) {
            return new Proxy().getSegmentCustomerList(param.partnerId, param.id);
         },
         update({ state, dispatch }, param) {
            return new Proxy().updateSegment(param.id, param.data);
         }
    }

}
