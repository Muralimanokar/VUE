import Proxy from '@/proxies/AdminProxy';
import axios from 'axios';

export default {
    namespaced: true,
    state: {
        id: null,
        email: null,
        firstName: null,
        lastName: null,
        username: null,
        roles:null,
    },
    getters: {
        getuserid(state){
            return state.id;
        },
        getuseruuid(state){
            return state.uuid;
        },
        getuserroles(state){
            return state.roles;
        },
    },
    mutations: {
        FIND(state) {
        },
        SAVEACCOUNT(state, account) {
            state.id = account.id;
            state.uuid = account.uuid;
            state.firstName = account.firstName;
            state.lastName = account.lastName;
            state.username = account.username;
            state.email = account.email;
            state.roles = account.roles;
        }
    },
    actions: {
        find({ commit }){
            if (localStorage.getItem('account')) {
                var acccount = JSON.parse(localStorage.getItem('account'));
                commit('SAVEACCOUNT', acccount);
            }
        },
        saveaccount({ commit }, payload){
            const account = {
                id: payload.id,
                uuid: payload.uuid,
                firstName: payload.firstName,
                lastName: payload.lastName,
                username: payload.userName,
                email: payload.emailId,
                roles: payload.roles
            };
            localStorage.setItem('account', JSON.stringify(account));
            commit('SAVEACCOUNT', account);
        }
    }
}
