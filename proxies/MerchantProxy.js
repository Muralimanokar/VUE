import Proxy from './Proxy';

class MerchantProxy extends Proxy {

  constructor(parameters = {}) {
    super('partner', parameters);
  }

  getMerchentlist(param){
    return this.submit('get', `${this.endpoint}/all?isActive=true`);
  }
  filter(param) {
    //this.parameters = param;
    return this.submit('get', `${this.endpoint}/view-rules?${param.name}partnerId=${param.partnerId}&pageNumber=${param.pageNumber}&pageSize=${param.pageSize}`,param.data);
  }

  adminMerchantList(param){
    return this.submit('get', `${this.endpoint}/all?partnerId=${param}`);
  }

  createMerchant(param){
    return this.submit('post', `${this.endpoint}/add`,param);
  }

  editMerchant(param){
    return this.submit('post', `${this.endpoint}/update`,param);
  }

  getMerchant(id){
    return this.submit('get', `${this.endpoint}/get?partnerId=${id}`);
  }

  viewprofile(param){
    return this.submit('get', `${this.endpoint}/get/profile?partnerId=${param}`);
  }

  deactivate(param){
    return this.submit('post', `${this.endpoint}/de-activate?partnerId=${param}`);
  }

  reactivate(param){
    return this.submit('post', `${this.endpoint}/re-activate?partnerId=${param}`);
  }

  viewcustomer(param){
    return this.submit('get', `${this.endpoint}/customers-active?partnerId=${param}`);
  }

  viewtransaction(param){
    return this.submit('get', `${this.endpoint}/transactions/list?partnerId=${param}`);
  }
  viewpoints(param){
    return this.submit('get', `${this.endpoint}/points/spend?partnerId=${param}`);
  }
  viewanalysis(param){
    return this.submit('get', `${this.endpoint}/analysis?partnerId=${param}`);
  }
  loyaltysummary(param){
    return this.submit('get', `${this.endpoint}/loyalty/summary?partnerId=${param}`);
  }
 /* Reviewrules(param){
    return this.submit('get', `${this.endpoint}/review-rules/?partnerId=${param}/export`);
  }*/
  earningrulelist(param){
    return this.submit('get', `${this.endpoint}/template/all`,param);
  }
  CompleteProfile(param){
    return this.submit('post', `${this.endpoint}/complete-profile`,param);
  }

  updateMerchant(param){
    return this.submit('post', `${this.endpoint}/update`,param);
  }
  
  loadBrand(param){
    return this.submit('get', `${this.endpoint}/all?isActive=true`,param);
  }
  merchantEarningruleList(partnerId){
    return this.submit('get', `${this.endpoint}/view-rules?partnerId=${partnerId}`);
  }

  reviewrule(partnerId){
    return this.submit('get', `${this.endpoint}/review-rules?partnerId=${partnerId}`);
  }

  Reviewrules(partnerId){
    return this.submit('get', `${this.endpoint}/review-rules/export?partnerId=${partnerId}`);
  }

  getCurrentSubscription(partnerId){
    return this.submit('get', `${this.endpoint}/${partnerId}/current-subscription`);
  }

  changeSubscription(partnerId, subscriptionPlanId){
    return this.submit('post', `${this.endpoint}/${partnerId}/subscription/change/${subscriptionPlanId}`);
  }
  getEarningRulePage(param){
    this.parameters=param
    return this.submit('get', `${this.endpoint}/view-rules`,);
  }
  getMerchantTransactionPage(param){
    return this.submit('post', `${this.endpoint}/transactions/list?partnerId=${param.partnerId}`,param.data);
  }

}

export default MerchantProxy;
