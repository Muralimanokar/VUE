import Proxy from '@/proxies/MerchantProxy';
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
            return new Proxy().getMerchentlist(param);
         },
         adminMerchantList({ state, dispatch },param) {
          return new Proxy().adminMerchantList(param);
       },
         add({ state, dispatch },param) {
            return new Proxy().createMerchant(param);
         },
         edit({ state, dispatch },param) {
            return new Proxy().editMerchant(param);
         },
         filter({ state, dispatch },param) {
            return new Proxy().filter(param);
         },
         get({ state, dispatch },param) {
            return new Proxy().getMerchant(param);
         },
         deactivate({ state, dispatch },param){
            return new Proxy().deactivate(param);
         },
         reactivate({ state, dispatch },param){
            return new Proxy().reactivate(param);
         },
         viewprofile({ state, dispatch },param){
            return new Proxy().viewprofile(param);
         },
         viewcustomer({ state, dispatch },param){
            return new Proxy().viewcustomer(param);
         },
         viewtransaction({ state, dispatch },param){
            return new Proxy().viewtransaction(param);
         },
         viewpoints({ state, dispatch },param){
            return new Proxy().viewpoints(param);
         },
         viewanalysis({ state, dispatch },param){
            return new Proxy().viewanalysis(param);
         },
         loyaltysummary({ state, dispatch },param){
            return new Proxy().loyaltysummary(param);
         },
         earningrulelist({ state, dispatch },param){
            return new Proxy().earningrulelist(param);
        },
        completeprofile({ state, dispatch },param){
         return new Proxy().CompleteProfile(param);
      },
      update({ state, dispatch },param) {
         return new Proxy().updateMerchant(param);
      },
      loadBrand({ state, dispatch },param) {
         return new Proxy().loadBrand(param);
      },
      merchantearningruleList({ state, dispatch },param){
         return new Proxy().merchantEarningruleList(param.partnerId);
     },

     reviewrule({ state, dispatch },param) {
         return new Proxy().reviewrule(param.partnerId);
     },

     reviewrules({ state, dispatch },param){
           return new Proxy().Reviewrules(param.partnerId);
        },
     addRule({ state, dispatch },param){
            return new Proxy().addRule(param);
     },
     currentsubscription({ state, dispatch },param) {
       return new Proxy().getCurrentSubscription(param);
    },
    changesubscription({ state, dispatch },param) {
       return new Proxy().changeSubscription(param.partnerId, param.subscriptionPlanId);
    },
    getEarningRulePage({ state, dispatch },param) {
      return new Proxy().getEarningRulePage(param);
   },
   getMerchantTransactionPage({ state, dispatch },param) {
      return new Proxy().getMerchantTransactionPage(param);
   }
  }
}

