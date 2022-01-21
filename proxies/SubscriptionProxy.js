import Proxy from './Proxy';

class SubscriptionProxy extends Proxy {

  constructor(parameters = {}) {
    super('subscription', parameters);
  }

  getSubscriptionList(param){
    return this.submit('get', this.endpoint + `/country/plans?countryCode=${param}`);
  }

}

export default SubscriptionProxy;
