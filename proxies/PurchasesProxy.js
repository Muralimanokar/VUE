import Proxy from './Proxy';

class PurchasesProxy extends Proxy {

  constructor(parameters = {}) {
    super('purchases', parameters);
  }

  getPurchaseList(param){
    return this.submit('get', `${this.endpoint}/transaction/${param.id}/purchases`);
  }
  getPurchaseLists(param){
    return this.submit('get', `${this.endpoint}/transaction/${param}/purchases`);
  }
  rulePurchases(param){
    return this.submit('get', `${this.endpoint}/rule/${param.id}/purchases`);
  }

  getPurchase(param){
    return this.submit('get', `${this.endpoint}/get/one/?purchaseLogId=${param}`);
  }

  updatePurchase(param){
    return this.submit('post', `${this.endpoint}/update`, param);
  }

}

export default PurchasesProxy;
