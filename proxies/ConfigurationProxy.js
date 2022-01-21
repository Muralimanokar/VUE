import Proxy from './Proxy';

class ConfigurationProxy extends Proxy {

  constructor(parameters = {}) {
    super('program', parameters);
  }

  Configurationdetails(param){
    return this.submit('get', `${this.endpoint}/get?partnerId=${param}`);
  }
  updateConfigurationdetails(param){
    return this.submit('post', `${this.endpoint}/update?partnerId=${param.partnerId}`,param.data);

  }
 

}

export default ConfigurationProxy;
