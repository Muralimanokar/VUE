import Proxy from '@/proxies/CustomerProxy';
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
            return new Proxy().getCustomerlist(param);
         },
         tierInit({ state, dispatch },param) {
            return new Proxy().getCustomerTierlist(param);
         },
         add({ state, dispatch },param) {
            return new Proxy().createCustomer(param);
         },
         get({ state, dispatch },param) {
            return new Proxy().getCustomer(param);
         },
         gets({ state, dispatch },param) {
            return new Proxy().getCustomers(param);
         },
         update({ state, dispatch },param) {
            return new Proxy().updateCustomer(param);
         },
         deactivate({ state, dispatch },param) {
            return new Proxy().deactivateCustomer(param);
         },
         reactivate({ state, dispatch },param) {
            return new Proxy().reactivateCustomer(param);
         },
         isActivate({ state, dispatch },param) {
            return new Proxy().isActivateCustomer(param);
         },
       
         suspend({ state, dispatch },param) {
            return new Proxy().suspendCustomer(param);
         },
         unsuspend({ state, dispatch },param) {
            return new Proxy().unsuspendCustomer(param);
         },
         isSuspend({ state, dispatch },param) {
            return new Proxy().isSuspendCustomer(param);
         },
         block({ state, dispatch },param) {
            return new Proxy().blockCustomer(param.partnerId,param.customerId);
         },
         unblock({ state, dispatch },param) {
            return new Proxy().unblockCustomer(param.partnerId,param.customerId);
         },
         delete({ state, dispatch },param) {
            return new Proxy().deleteCustomer(param);
         },
         getProfile({ state, dispatch },param) {
            return new Proxy().getCustomerProfile(param);
         },
         getPonits({ state, dispatch },param) {
            return new Proxy().getCustomerPoints(param);
         },
         getAnalysis({ state, dispatch },param) {
            return new Proxy().getCustomerAnalysis(param);
         },
         getCustomerMerchantTransactions({ state, dispatch },param) {
            return new Proxy().getCustomerMerchantTransactions(param.customerId, param.partnerId);
         },
         getMerchantTransactions({ state, dispatch },param) {
            return new Proxy().getMerchantTransactions(param.customerId, param.partnerId);
         },
         getPointsTransfer({ state, dispatch },param) {
            return new Proxy().getCustomerPointsTransfer(param);
         },
         getPoints({ state, dispatch },param) {
            return new Proxy().getCustomerMerchantPointsTransfer(param);
         },
         getRewardsAvailable({ state, dispatch },param) {
            return new Proxy().getCustomerRewardsAvailable(param);
         },
         getRewardsRedeemed({ state, dispatch },param) {
            return new Proxy().getCustomerRewardsRedeemed(param);
         },
         getRewardsRedeemeds({ state, dispatch },param) {
            return new Proxy().getCustomerRewardsRedeem(param);
         },
         getCustomerWeeklyJoiningRate({ state, dispatch }) {
            return new Proxy().getCustomerWeeklyJoiningRate();
         },
         search({ state, dispatch },customerSearchDto) {
            return new Proxy().SearchCustomer(customerSearchDto);
         }
    },

}
