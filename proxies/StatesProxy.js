import Proxy from './Proxy';

class StatesProxy extends Proxy {

  constructor(parameters = {}) {
    super('states', parameters);
  }

  getStatesList(param){
    return this.submit('get', `${this.endpoint}/all/?countryId=${param}`);
  }

}

export default StatesProxy;
