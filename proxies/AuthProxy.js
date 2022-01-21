import Proxy from './Proxy';

class AuthProxy extends Proxy {

  constructor(parameters = {}) {
    super('user', parameters);
  }

  login({ susername, spassword }) {
    /*const data = {
      username,
      password,
      client_id: process.env.VUE_APP_API_CLIENT_ID,
      client_secret: process.env.VUE_APP_API_CLIENT_SECRET,
      grant_type: 'password',
      scope: '',
    };*/
    const data = {
      userName: susername,
      password: spassword
    }
    let loginur = process.env.VUE_APP_API_AUTH + "user/login";
    return this.submit('post',loginur, data);
  }

  register(data) {
    return this.submit('post', `${this.endpoint}/register`, data);
  }
  verification(data) {
    return this.submit('post', `${process.env.VUE_APP_API_AUTH}user/${data.userId}/confirm/email`, data.postData);
  }

  generateKey(data) {
    return this.submit('get', `${process.env.VUE_APP_API_AUTH}user/generate-api-key/${data}`);
  }
}

export default AuthProxy;
