/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import Vue from 'vue';
import {
  CHECK,
  REGISTER,
  LOGIN,
  LOGOUT,
} from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
  [CHECK](state) {
    state.role = sessionStorage.getItem('role');
    state.authenticated = !!sessionStorage.getItem('id_token') ||  !!localStorage.getItem('id_token');
    if (state.authenticated) {
      var token = (sessionStorage.getItem('id_token')) ? (sessionStorage.getItem('id_token')) : (localStorage.getItem('id_token'));
      Vue.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  },

  [REGISTER]() {
    //
  },

  [LOGIN](state, obj) {
    state.authenticated = true;
    if(obj.roles.SUPER_ADMIN) {
      state.role = 1;
      sessionStorage.setItem('role', 1);
    } else if(obj.roles.PARTNER) {
      state.role = 2;
      sessionStorage.setItem('role', 2);
    } else {
      state.role = 0;
      sessionStorage.setItem('role', 0);
    }
    sessionStorage.setItem('id_token', obj.token);
    //localStorage.setItem('id_token', obj.token);
    Vue.$http.defaults.headers.common.Authorization = `Bearer ${obj.token}`;
  },

  [LOGOUT](state) {
    state.role = 0;
    sessionStorage.removeItem('role');
    localStorage.removeItem('role');

    state.authenticated = false;
    sessionStorage.removeItem('id_token');
    localStorage.removeItem('id_token');
    Vue.$http.defaults.headers.common.Authorization = '';
  },
};
