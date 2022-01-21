import Proxy from './Proxy';

class RuleProxy extends Proxy {

  constructor(parameters = {}) {
    super('rule', parameters);
  }

  getLabel(param){
    return this.submit('get', `${this.endpoint}/search-label?name=${param.query}&partnerId=${param.partnerId}`);
  }

}

export default RuleProxy;
