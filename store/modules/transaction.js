import Proxy from '@/proxies/TransactionProxy';
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
      init({ state, dispatch },param) {
         return new Proxy().getTransactionlist(param);
      },
     inits({ state, dispatch },param) {
         return new Proxy().getTransactionlists(param);
      },
      getTransactionlistOne({ state, dispatch },param) {
         return new Proxy().getTransactionlistOne(param);
      },
      Assigncustomertransaction({ state, dispatch }, param) {
        return new Proxy().Assigncustomertransaction(param);
     },
      get({ state, dispatch }, param) {
         return new Proxy().getTransaction(param);
      },
      revert({ state, dispatch },param) {
         return new Proxy().getRevert(param);
      },
      match({ state, dispatch }, param) {
         return new Proxy().matchTransaction(param);
      },
      couponList({ state, dispatch }, param) {
         return new Proxy().getTxnCouponList(param);
      },
      TransactionList({ state, dispatch }, param) {
         return new Proxy().EditTransaction(param);
      },
      gettransactions({ state, dispatch }, param){
         return new Proxy().gettransactions(param);

      }
   },

}
