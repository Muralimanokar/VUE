import Proxy from './Proxy';

class CustomerProxy extends Proxy {

  constructor(parameters = {}) {
    super('customer', parameters);
  }

  getCustomerlist(param){
    this.parameters=param;
    return this.submit('get', `${this.endpoint}/all`);
  }

  getCustomerTierlist(param){
    return this.submit('get', `${this.endpoint}/tier/all/?tierId=${param}&partnerId=${param}`);
  }

  createCustomer(param){
    return this.submit('post', `${this.endpoint}/add`,param);
  }

  getCustomer(param){
    return this.submit('get', `${this.endpoint}/get/?customerId=${param.customerId}&partnerId=${param.partnerId}`);
  }
  getCustomers(param){
    return this.submit('get', `${this.endpoint}/get/?customerId=${param.id}&partnerId=${param.partnerId}`);
  }
  updateCustomer(param){
    return this.submit('post', `${this.endpoint}/update`,param);
  }

  deactivateCustomer(param){
    return this.submit('post', `${this.endpoint}/de-activate/?customerId=${param}`, null);
  }

  reactivateCustomer(param){
    return this.submit('post', `${this.endpoint}/re-activate/?customerId=${param}`, null);
  }

  isActivateCustomer(param){
    return this.submit('post', `${this.endpoint}/activation/?customerId=${param.id}&status=${param.isActive}&partnerId=${param.partnerId}`, null);
  }
 

  suspendCustomer(param){
    return this.submit('post', `${this.endpoint}/suspend/?customerId=${param}`, null);
  }

  unsuspendCustomer(param){
    return this.submit('post', `${this.endpoint}/un-suspend/?customerId=${param}`, null);
  }

  isSuspendCustomer(param){
    return this.submit('post', `${this.endpoint}/suspend-status/?customerId=${param.id}&isSuspended=${param.isSuspend}&partnerId=${param.partnerId}`, null);
  }

  blockCustomer(partnerId,customerId){
    return this.submit('post', `${this.endpoint}/block-customers?partnerId=${partnerId}&customerId=${customerId}`, null);
  }

  unblockCustomer(partnerId,customerId){
    return this.submit('post', `${this.endpoint}/Unblock-customers?partnerId=${partnerId}&customerId=${customerId}`, null);
  }

  deleteCustomer(param){
    return this.submit('post', `${this.endpoint}/delete/?customerId=${param}`, null);
  }

  getCustomerProfile(param){
    return this.submit('get', `${this.endpoint}/get-profile/?customerId=${param.customerId}&partnerId=${param.partnerId}&allDetails=true`);
  }

  getCustomerPoints(param){
    return this.submit('get', `${this.endpoint}/points/all/count/${param}`);
  }

  getCustomerAnalysis(param){
    return this.submit('get', `${this.endpoint}/analysis/?customerId=${param.partnerId}&partnerId=${param.partnerId}`);
  }

  getCustomerMerchantTransactions(param){
    return this.submit('get', `${this.endpoint}/transactions/list/?customerId=${param}&partnerId=${1}`);
  }

  getMerchantTransactions(customerId, partnerId){
    return this.submit('get', `${this.endpoint}/transactions/list/${customerId}?partnerId=${partnerId}`);
  }

  getCustomerPointsTransfer(param){
    return this.submit('get', `${this.endpoint}/points-transfer/?customerId=${param}&partnerId=${1}`);
  }
  getCustomerMerchantPointsTransfer(param){
    return this.submit('get', `${this.endpoint}/points-transfer/?customerId=${param.customerId}&partnerId=${param.partnerId}`);
  }

  getCustomerRewardsAvailable(param){
    return this.submit('get', `${this.endpoint}/rewards-available/?customerId=${param.customerId}&partnerId=${param.partnerId}`);
  }

  getCustomerRewardsRedeemed(param){
    return this.submit('get', `${this.endpoint}/rewards-redeemed/?customerId=${param.id}&partnerId=${param.partnerId}`);
  }
  getCustomerRewardsRedeem(param){
    return this.submit('get', `${this.endpoint}/rewards-redeemed/?customerId=${param.customerId}&partnerId=${param.partnerId}`);
  }

  getCustomerWeeklyJoiningRate(){
    return this.submit('get', `${this.endpoint}/week/joining-rate`);
  }

  SearchCustomer(customerSearchDto){
    return this.submit('post', `${this.endpoint}/search`, customerSearchDto);
  }

}

export default CustomerProxy;
