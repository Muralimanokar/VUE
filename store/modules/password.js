import Proxy from '@/proxies/PasswordProxy.js';
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
        changepassword({ state, dispatch }, dataarr) {
            return new Proxy().ChangePassword(dataarr);
        },
        reSetPassword({ state, dispatch },param) {
            return new Proxy().reSetPassword(param);
        },
        forgotpasswordbysecquestion({ state, dispatch }, dataarr) {
            return new Proxy().ForgotPasswordBySecQuestion(dataarr);
        },
        resetpasswordbysecquestion({ state, dispatch }, dataarr) {
            return new Proxy().ResetPasswordBySecQuestion(dataarr);
        },
        resetpasswordbytoken({ state, dispatch }, param) {
            return new Proxy().ResetPasswordByToken(param.userId, param.postData);
        }
    }
}
