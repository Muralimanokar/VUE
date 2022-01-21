import Proxy from './Proxy';

class PointsProxy extends Proxy {

  constructor(parameters = {}) {
    super('points', parameters);
  }

  getPointsList(param){
    return this.submit('get', `${this.endpoint}/list?partnerId=${param}`);
  }
  getMerchantPointsList(param){
    return this.submit('get', `${this.endpoint}/list?referenceId=${param.id}&partnerId=${param.partnerId}`);
  }

  createPoint(param){
    return this.submit('post', `${this.endpoint}/add?`,param);
  }

  getPoint(param){
    return this.submit('get', `${this.endpoint}/one/?transactionId=${param.transferId}&partnerId=${param.partnerId}`);
  }

  updatePoint(param){
    return this.submit('post', `${this.endpoint}/edit`,param);
  }

  getCustomerPoints(param){
    return this.submit('get', `${this.endpoint}/all/count/?uuid=${param.id}&partnerId=${1}`);
  }

}

export default PointsProxy;
