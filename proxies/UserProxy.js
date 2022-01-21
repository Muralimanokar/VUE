import Proxy from './Proxy';

class UserProxy extends Proxy {

  constructor(parameters = {}) {
    super('user', parameters);
  }

  searchUser(param){
    return this.submit('get', `${this.endpoint}/association/search/${param.key}?accountType=${param.accountType}`);
  }
  checkuser(param){
    this.parameters=param;
    let loginur = process.env.VUE_APP_API_AUTH + "user/user-exist";
    return this.submit('post', loginur,);
  }
}

export default UserProxy;
