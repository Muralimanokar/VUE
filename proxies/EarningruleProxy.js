import Proxy from './Proxy';

class PointsProxy extends Proxy {

  constructor(parameters = {}) {
    super('rule', parameters);
  }

  createTemplate(param){
    return this.submit('post', `${this.endpoint}/template/create`,param);
  }
  listRules(param){
    return this.submit('get', `${this.endpoint}/partner/${param.partnerId}/get?templateId=${param.templateId}&${param.Name}pageNumber=${param.pageNumber}&pageSize=${param.pageSize}`);
  }

  updateTemplate(param){
    return this.submit('post', `${this.endpoint}/template/update`,param);
  }

  earningrulelist(param){
    return this.submit('get', `${this.endpoint}/template/all?partnerId=${param}`);
  }

  earningrulelistAdmin(param){
    return this.submit('get', `${this.endpoint}/template/all`);
  }

  gettemplatedetails(param){
    return this.submit('get', `${this.endpoint}/template/all?partnerId=${param}`,param);
  }

  addRule(param){
    return this.submit('post', `${this.endpoint}/partner/${param.partnerid}/add`,param.payload);
  }

  getRule(param) {
    return this.submit('get', `${this.endpoint}/get/one?ruleId=${param.ruleId}&partnerId=${param.partnerId}`);
  }

  getAdminrule(param) {
    return this.submit('get', `${this.endpoint}/template/all?id=${param.id}&partnerId=${param.partnerId}`);
  }

  updateRule(id) {
    return this.submit('post', `${this.endpoint}?id=${id}/update-rule`);
  }

  listRule(param){
    return this.submit('get', `${this.endpoint}/partner/${param.partnerId}/get?templateId=${param.templateId}&pageNumber=${param.pageNumber}&pageSize=${param.pageSize}`);
  }

  deleteTemplate(param){
    return this.submit('post',  `${this.endpoint}/template/delete` ,param);
  }

  partneraddrule(id){
    return this.submit('get', `${this.endpoint}?id=${id}/add`);
  }

}

export default PointsProxy;
