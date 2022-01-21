/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import Vue from 'vue';
import store from '@/store';
import * as types from './mutation-types';

import Proxy from '@/proxies/AuthProxy';

export const check = ({ commit }) => {
  commit(types.CHECK);
};

export const register = ({ commit }) => {
};

export const login = ({ commit },payload) => {

  var dataarr = {
    susername : payload.username,
    spassword : payload.password
  };
  return new Promise((resolve, reject) => {
    new Proxy().login(dataarr).then((response) => {
      //console.log("tokencheck",response.roles[0].resourcePrivilegeDtoList);
      if(payload.rememberme){
        localStorage.setItem('id_token', response.token);
      }

      const roles = {
        SUPER_ADMIN: false,
        PARTNER: false,
        GUEST: false
      };
      response.roles.forEach((ele) => {
        roles[ele.roleName] = true;
      });

      let loginObj = {
          token: response.token,
          roles: roles
      };
      commit(types.LOGIN, loginObj);
      store.dispatch('account/saveaccount',response);

      if(roles.SUPER_ADMIN) {
        Vue.router.push({name: 'home.index',});
      } else if(roles.PARTNER) {
        //Vue.router.push({name: 'merchanthome.index',});
        Vue.router.push({name: 'merchantcustomer.index',});
      } else {
        Vue.router.push({name: 'login.index',});
      }

    }) .catch((err) => {
      reject(err);
    });
  });
};

export const logout = ({ commit }) => {
  commit(types.LOGOUT);
  Vue.router.push({
    name: 'login.index',
  });
};

export const generateKey = ({ commit }, payload) => {
    return new Proxy().generateKey(payload);
};

export const verification = ({ commit }, payload) => {
  return new Proxy().verification(payload);
};

export default {
  check,
  register,
  login,
  logout,
  generateKey,
  verification
};
