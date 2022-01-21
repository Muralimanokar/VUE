import Proxy from '@/proxies/SecurityQuestionProxy';
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

         get({ state, dispatch }) {
            return new Proxy().getSecurityQuestions();
         },

         userAddOrChange({ state, dispatch }, param) {
            return new Proxy().addOrChangeSecurityQuestions(param);
         },

         getUserQuesAns({ state, dispatch }, param) {
            return new Proxy().getUserSecQuesAns(param);
         },

    }
}
