import Proxy from './Proxy';

class MerchantTxnProxy extends Proxy {

  constructor(parameters = {}) {
    super('partner', parameters);
  }

  getTxnList(param) {
    //this.parameters = param;
    return this.submit('post', `${this.endpoint}/transactions/list?partnerId=${param.partnerId}&pageNumber=${param.pageNumber}&pageSize=${param.pageSize}`,param.data);
  }
  TxnLists(param) {
    //Sthis.parameters = param;
    return this.submit('post', `${this.endpoint}/transactions/list?${param.Name}partnerId=${param.partnerId}&pageNumber=${param.pageNumber}&pageSize=${param.pageSize}`,param.data);
  }
  
  getcustomerList(param) {
    //this.parameters = param;
    return this.submit('get', `${this.endpoint}/pending-settlements?partnerId=${param.partnerId}`);
  }
  getTransaction(param) {
    //this.parameters = param;
    return this.submit('post', `${this.endpoint}/transactions/list?partnerId=${param.partnerId}&transactionId=${param.transactionId}&pageNumber=${param.pageNumber}&pageSize=${param.pageSize}`,param.data);
  }

  getViewTiers(param) {
    this.parameters = param;
    return this.submit('get', `${this.endpoint}/view-tiers`);
  }

}

export default MerchantTxnProxy;
