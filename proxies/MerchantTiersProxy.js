import Proxy from './Proxy';

class MerchantTiersProxy extends Proxy {

  constructor(parameters = {}) {
    super('partner', parameters);
  }

  getTiers(param) {
    this.parameters = param;
    return this.submit('get', `${this.endpoint}/list-tiers`);
  }

  getViewTiers(param) {
    this.parameters = param;
    return this.submit('get', `${this.endpoint}/view-tiers`);
  }
  viewcustomercount(partnerId,tierName){
    return this.submit('get', `${this.endpoint}/customers-active?partnerId=${partnerId}&tierName=${tierName}`);
  }
  viewtransactioncount(param){
    return this.submit('post', `${this.endpoint}/transactions/list?partnerId=${param.partnerId}&tierId=${param.tierId}`,param.data);
  }

}

export default MerchantTiersProxy;
