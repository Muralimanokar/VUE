import Proxy from './Proxy';

class TiersProxy extends Proxy {

  constructor(parameters = {}) {
    super('tiers', parameters);
  }

  getTierslist(param){
    return this.submit('get', `${this.endpoint}/active/all?partnerId=${param}`);
  }
  getTiersAll(param){
    return this.submit('get', `${this.endpoint}/all?partnerId=${param}`);
  }
  getTiersActivelist(param){
    return this.submit('get', `${this.endpoint}/active/all?partnerId=${param}&status=true`);
  }

  createTier(param){
    return this.submit('post', `${this.endpoint}/create?partnerId=${param.partnerId}`,param);
  }

  addTier(param){
    return this.submit('post', `${this.endpoint}/add`,param);
  }

  getTier(param){
    return this.submit('get', `${this.endpoint}/all/?tierId=${param}&partnerId=${param}`);
  }

  updateTier(param){
    return this.submit('post', `${this.endpoint}/update?partnerId=${param.partnerId}`,param);
  }

  deleteTier(param1, param2){
    return this.submit('post', `${this.endpoint}/partner/${param1}/delete/${param2}`, null);
  }

}

export default TiersProxy;
