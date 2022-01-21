import Proxy from '@/proxies/RewardProxy';
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
            return new Proxy().getRewardList(param);
         },
         get({ state, dispatch }, param) {
            return new Proxy().getReward(param);
         },
         create({ state, dispatch }, param) {
            return new Proxy().createReward(param.id, param.data);
         },
         update({ state, dispatch }, param) {
            return new Proxy().updateReward(param.id, param.data);
         },
         initRedeem({ state, dispatch }, param) {
          return new Proxy().getRewardRedeemedList(param);
       },
         getRedeemed({ state, dispatch }, param) {
            return new Proxy().getRewardRedeemed(param.id);
         },
         initCategory({ state, dispatch },param) {
            return new Proxy().getRewardCategoryList(param);
         },
         initCategoryActive({ state, dispatch }) {
            return new Proxy().getRewardCategoryActiveList();
         },
         getCategory({ state, dispatch }, param) {
            return new Proxy().getRewardCategory(param);
         },
         createCategory({ state, dispatch }, param) {
            return new Proxy().createRewardCategory(param);
         },
         updateCategory({ state, dispatch }, param) {
            return new Proxy().updateRewardCategory(param);
         },
         partner({ state, dispatch }, param) {
          return new Proxy().AssignRewardtocustomer(param.partnerId, param.data);
       },

       segmentInit({ state, dispatch }, segmentId) {
        return new Proxy().segmentInit(segmentId);
     },

     tierInit({ state, dispatch }, param) {
      return new Proxy().tierInit(param);
   },
   rewardValue({ state, dispatch }, param) {
      return new Proxy().rewardvalue(param);
   },
   CouponCount({ state, dispatch }, param) {
      return new Proxy().couponcode(param);
   },
    }
}
