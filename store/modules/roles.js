import Proxy from '@/proxies/RoleProxy';
import axios from 'axios';
export default {
    namespaced: true,
    state: {
        roles: []
    },
    getters: {
        getroles(state) {
            return state.roles;
        }
    },
    mutations: {
    },
    actions: {
        init({ state, dispatch },param) {
            return new Proxy().getrolelist(param);
            /*axios({
                method: 'get',
                url: 'http://45.79.178.45:8080/api/v1/role/all',
            }).then((response) => {
            }, (error) => {
            });*/
        },
        getresourcelist() {
            return new Proxy().getresourcelist();
        },
        getprivilegelist() {
            return new Proxy().getprivilegelist();
        },
        createrole({ state, dispatch },param) {
            return new Proxy().createrole(param);
        },
        getroledetails({ state, dispatch },param){
            return new Proxy().getroledetails(param);
        },
        updaterole({ state, dispatch },param) {
            return new Proxy().updaterole(param);
        },
        deleterole({ state, dispatch },param){
            return new Proxy().deleterole(param.roleId, param.newRoleId);
        }
    },
}
