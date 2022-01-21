import Proxy from './Proxy';

class AdminProxy extends Proxy {
  
  constructor(parameters = {}) {
    super('support', parameters);
  }

  getuserlist(param){
    return this.submit('get', `${this.endpoint}/admins/all`);
  }
  
  createuser(param){
    return this.submit('post', `${this.endpoint}/user/create`,param);
  }

  getuser(param){
    return this.submit('get', `${this.endpoint}/admin/?supportAdminId=${param}`);
  }

  updateuser(param){
    return this.submit('post', `${this.endpoint}/user/update`,param);
  }
  Customer(param){
    return this.submit('post', `${this.endpoint}/activation/?supportAdminId=${param.adminid}&status=${param.isActive}`, null);
  }
}

export default AdminProxy;
