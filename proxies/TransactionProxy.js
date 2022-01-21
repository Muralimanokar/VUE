import Proxy from './Proxy';

class TransactionProxy extends Proxy {

  constructor(parameters = {}) {
    super('transaction', parameters);
  }

  getTransactionlist(param) {
    return this.submit('get', `${this.endpoint}/list?partnerId=${param.partnerId}&pageNumber=${param.pageNumber}&pageSize=${param.pageSize}`);
  }
  getTransactionlists(param) {
    return this.submit('get', `${this.endpoint}/list?${param.Name}partnerId=${param.partnerId}&pageNumber=${param.pageNumber}&pageSize=${param.pageSize}`);
  }
  getTransactionlistOne(param) {
    return this.submit('get', `${this.endpoint}/list?transactionId=${param}`);
  }

  Assigncustomertransaction(param) {
    return this.submit('get', `${this.endpoint}/list?partnerId=${param}`);
  }

  getTransaction(param) {
    return this.submit('get', `${this.endpoint}/one/points-transfer/?transactionId=${param}`);
  }
  getRevert(param) {
    return this.submit('post', `${this.endpoint}/revert`,param);
  }

  matchTransaction(param) {
    return this.submit('post', `${this.endpoint}/match`, param);
  }

  getTxnCouponList(param) {
    return this.submit('get', `${this.endpoint}/coupons/list/?transactionId=${param}`);
  }
  EditTransaction(param) {
    return this.submit('post', `${this.endpoint}/amend/?transactionId=${param.transactionId}&points=${param.points}&accountId=${param.accountId}&partnerId=${param.partnerId}`);
  }
}

export default TransactionProxy;
