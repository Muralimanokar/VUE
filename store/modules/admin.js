import Proxy from '@/proxies/AdminProxy';
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
            return new Proxy().getuserlist(param);
            /*axios({
                method: 'get',
                url: 'http://45.79.178.45:8080/api/v1/role/all',
            }).then((response) => {
            }, (error) => {
            });*/
         },
         create({ state, dispatch },param){
            return new Proxy().createuser(param);
         },
         get({ state, dispatch },param) {
            return new Proxy().getuser(param);
         },
         Activate({ state, dispatch },param) {
            return new Proxy().Customer(param);
         },
         update({ state, dispatch },param) {
            return new Proxy().updateuser(param);
         },
    },

}
