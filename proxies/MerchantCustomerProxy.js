import Proxy from './Proxy';

class MerchantCustomerProxy extends Proxy {

  constructor(parameters = {}) {
    super('partner', parameters);
  }

  getAllCustomer(param) {
    this.parameters = param;
    return this.submit('get', `${this.endpoint}/customers-active`);
  }

  deactivateCustomer(param) {
    this.parameters = param;
    return this.submit('post', `${this.endpoint}/de-activate/customer`, null);
  }

  reactivateCustomer(param) {
    this.parameters = param;
    return this.submit('post', `${this.endpoint}/re-activate/customer`, null);
  }

  getCustomer(param) {
    this.parameters = param;
    return this.submit('get', `${this.endpoint}/customer`);
  }
}

export default MerchantCustomerProxy;
