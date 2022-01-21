import Proxy from '@/proxies/MerchantTxnProxy';

export default {
   namespaced: true,
   state: {
   },
   getters: {
   },
   mutations: {
   },
   actions: {
      getTxnList({ state, dispatch }, param) {
         return new Proxy().getTxnList(param);
      },
      TxnList({ state, dispatch }, param) {
         return new Proxy().TxnLists(param);
      },
      
      
      getcustomerList({ state, dispatch },param) {
         return new Proxy().getcustomerList(param);
      },
      getTransaction({ state, dispatch }, param) {
         return new Proxy().getTransaction(param);
      },

      getViewTiers({ state, dispatch }, param) {
         return new Proxy().getViewTiers(param);
      }
   },

}
