import Proxy from './Proxy';

class MerchantSegmentProxy extends Proxy {

  constructor(parameters = {}) {
    super('segment/partner', parameters);
  }

  getAllSegmentList(id, param) {
    this.parameters = param;
    return this.submit('get', `${this.endpoint}/${id}/all/list`);
  }

  createSegment(id, param) {
    return this.submit('post', `${this.endpoint}/${id}/create`, param);
  }

  getReviewSegment(id, param) {
    this.parameters = param;
    return this.submit('get', `${this.endpoint}/${id}/users`);
  }
  
  updateSegment(id, param){
    return this.submit('post', `${this.endpoint}/${id}/update/?partnerId=${id}`, param);
  }

}

export default MerchantSegmentProxy;
