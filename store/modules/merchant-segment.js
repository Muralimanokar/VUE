import Proxy from '@/proxies/MerchantSegmentProxy';
import axios from 'axios';
export default {
   namespaced: true,
   state: {
   },
   getters: {
   },
   mutations: {
   },
   actions: {
      getAllSegmentList({ state, dispatch }, param) {
         return new Proxy().getAllSegmentList(param.partnerId, param.data);
      },

      create({ state, dispatch }, param) {
         return new Proxy().createSegment(param.id, param.data);
      },

      getReviewSegment({ state, dispatch }, param) {
         return new Proxy().getReviewSegment(param.partnerId, param.data);
      },
      update({ state, dispatch }, param) {
         return new Proxy().updateSegment(param.id, param.data);
      }
   }

}
