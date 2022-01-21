import Proxy from '@/proxies/BroadcastcampaignProxy';
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
        init({ state, dispatch }) {
          return new Proxy().getBroadcastlist();
      },
         add({ state, dispatch },param) {
            return new Proxy().addTemplate(param);
         },
         schedule({ state, dispatch },param) {
          return new Proxy().schedulecampaign(param);
       },

       update({ state, dispatch },param) {
        return new Proxy().updateBroadcastcampaign(param);
     },

     partner({ state, dispatch },param) {
      return new Proxy().getBroadcastcampaign(param.partnerId, param.data);
   },

     get({ state, dispatch },param) {
        return new Proxy().getBroadcastcampaignedit(param);
    },

  deletecampaign({ state, dispatch },param) {
    return new Proxy().deleteBroadcastcampaign(param);
  },

    }
}
