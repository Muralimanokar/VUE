import Proxy from './Proxy';

class BusinessconfProxy extends Proxy {

  constructor(parameters = {}) {
    super('business', parameters);
  }

  getBusinessConf(param){
    return this.submit('get', `${this.endpoint}/configuration/get?partnerId=${param}`);
  }

  addBusinessConf(param){
    return this.submit('post', `${this.endpoint}/configuration/add`,param);
  }

  updateBusinessConf(param){
    return this.submit('post', `${this.endpoint}/configuration/update`,param);
  }

}

export default BusinessconfProxy;
