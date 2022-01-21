import Proxy from './Proxy';

class PasswordProxy extends Proxy {

  constructor(parameters = {}) {
    super('user', parameters);
  }

  ChangePassword(dataarr){
    let data = (process.env.VUE_APP_API_AUTH + "user/reset-password");
    return this.submit('post', data, dataarr);
  }

  reSetPassword(param){
    let data = (process.env.VUE_APP_API_AUTH + `user/forgot-password`);
    return this.submit('post', data,param);
  }

  ForgotPasswordBySecQuestion(postData) {
    let data = (process.env.VUE_APP_API_AUTH + "user/forgot-password/security-question");
    return this.submit('post', data, postData);
  }

  ResetPasswordBySecQuestion(postData) {
    let data = (process.env.VUE_APP_API_AUTH + "user/forgot-password/security-question/reset-password");
    return this.submit('post', data, postData);
  }

  ResetPasswordByToken(userId, postData) {
    let data = (process.env.VUE_APP_API_AUTH + `user/${userId}/reset-password`);
    return this.submit('post', data, postData);
  }

}

export default PasswordProxy;
