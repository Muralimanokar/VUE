import Proxy from '@/proxies/EarningruleProxy';
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
        createTemplate({ state, dispatch },param) {
            return new Proxy().createTemplate(param);
        },
        listRules({ state, dispatch },param){
            return new Proxy().listRules(param);
        },
        updateTemplate({ state, dispatch },param) {
            return new Proxy().updateTemplate(param);
        },
        earningrulelist({ state, dispatch },param){
            return new Proxy().earningrulelist(param);
        },
        earningrulelistAdmin({ state, dispatch },param){
          return new Proxy().earningrulelistAdmin(param);
      },
        gettemplatedetails({ state, dispatch },param){
            return new Proxy().gettemplatedetails(param);
        },
        addRule({ state, dispatch },param){
            return new Proxy().addRule(param);
        },
        listRule({ state, dispatch },param){
            return new Proxy().listRule(param);
        },
        deleteTemplate({ state, dispatch },param){
            return new Proxy().deleteTemplate(param);
        },
        getRule({ state, dispatch },param){
          return new Proxy().getRule(param);
      },
      getadminrule({ state, dispatch },param){
        return new Proxy().getAdminrule(param);
    },
      updaterule({ state, dispatch },param){
        return new Proxy().updateRule(param.partnerId);
    },
    partner({ state, dispatch },param) {
      return new Proxy().partneraddrule(param.partnerId);
   }
    },

}
