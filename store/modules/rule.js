import Proxy from '@/proxies/RuleProxy';
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
         getLabel({ state, dispatch },param) {
            return new Proxy().getLabel(param);
         },
    }

}