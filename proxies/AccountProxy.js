import Proxy from './Proxy';

class AccountProxy extends Proxy {

  constructor(parameters = {}) {
    super('account', parameters);
  }

  getAccountsByType(param){
    return this.submit('get', `${this.endpoint}/get/?accountType=${param}`);
  }

  getAccountNameById(param){
    return this.submit('get', `${this.endpoint}/get/userName?accountId=${param}`);
  }

  getUserAccountList(param){
    return this.submit('get', `${this.endpoint}/view-accounts?userAssociationId=${param.id}&accountType=${param.accountType}`);
  }

}

export default AccountProxy;
