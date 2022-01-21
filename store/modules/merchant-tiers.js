import Proxy from '@/proxies/MerchantTiersProxy';

export default {
   namespaced: true,
   state: {
   },
   getters: {
   },
   mutations: {
   },
   actions: {
      getTiers({ state, dispatch }, param) {
         return new Proxy().getTiers(param);
      },

      getViewTiers({ state, dispatch }, param) {
         return new Proxy().getViewTiers(param);
      },
      getcustomercount({ state, dispatch }, param) {
         return new Proxy().viewcustomercount(param.partnerId,param.tierName);
      },
      gettransactioncount({ state, dispatch }, param) {
         return new Proxy().viewtransactioncount(param);
      }
   },

}
