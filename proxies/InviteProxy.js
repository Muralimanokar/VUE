import Proxy from './Proxy';

class InviteProxy extends Proxy {

  constructor(parameters = {}) {
    super('invite', parameters);
  }

  getInviteList(param){
    return this.submit('get', `${this.endpoint}/invite-summary?partnerId=${param}`);
  }

  create(param){
    return this.submit('post', `${this.endpoint}/create`,param);
  }

}

export default InviteProxy;
