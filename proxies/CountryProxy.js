import Proxy from './Proxy';

class CountryProxy extends Proxy {

  constructor(parameters = {}) {
    super('country', parameters);
  }

  getCountryList(param){
    return this.submit('get', `${this.endpoint}/all`);
  }

  getCurrencyList(param){
    return this.submit('get', `${this.endpoint}/get/currency?countryId=${param}`);
  }

}

export default CountryProxy;
