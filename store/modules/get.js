import Proxy from '@/proxies/ConfigurationProxy';
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
        Configuration({ state, dispatch },param) {
            return new Proxy().Configurationdetails(param);
         },
         update({ state, dispatch },param) {
            return new Proxy().updateConfigurationdetails(param);
         },
      
    }
}
