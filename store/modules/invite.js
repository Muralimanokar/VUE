import Proxy from '@/proxies/InviteProxy';
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
      summary({ state, dispatch }, param) {
          return new Proxy().getInviteList(param);
      },
      create({ state, dispatch },param) {
        return new Proxy().create(param);
      },
    }
}
