import Proxy from '@/proxies/MerchantCustomerProxy';

export default {
   namespaced: true,
   state: {
   },
   getters: {
   },
   mutations: {
   },
   actions: {
      getAllCustomer({ state, dispatch }, param) {
         return new Proxy().getAllCustomer(param);
      },
      deactivate({ state, dispatch }, param) {
         return new Proxy().deactivateCustomer(param);
      },
      reactivate({ state, dispatch }, param) {
         return new Proxy().reactivateCustomer(param);
      },
      get({ state, dispatch }, param) {
         return new Proxy().getCustomer(param);
      }
   }

}
