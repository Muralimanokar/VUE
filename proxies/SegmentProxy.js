import Proxy from './Proxy';

class TiersProxy extends Proxy {

  constructor(parameters = {}) {
    super('segment', parameters);
  }

  getSegmentList(param){
    return this.submit('get', `${this.endpoint}/all/list?partnerId=${param}&status=true`);
  }
  allsegment(param){
    return this.submit('get', `${this.endpoint}/all/list?partnerId=${param}`);
  }

  getSegmentCustomerList(partnerId, id){
    return this.submit('get', `${this.endpoint}/partner/${partnerId}/users/?partnerId=${partnerId}&segmentId=${id}`);
  }

  createSegment(id, param){
    return this.submit('post', `${this.endpoint}/partner/${id}/create`, param);
  }

  getCustomerSegmentList(partnerId){
    return this.submit('get', `${this.endpoint}/partner/${partnerId}/all/list?partnerId=${partnerId}`);
  }

  getSegment(partnerId, id){
    return this.submit('get', `${this.endpoint}/partner/${partnerId}/get/?partnerId=${partnerId}&segmentId=${id}`);
  }

  updateSegment(id, param){
    return this.submit('post', `${this.endpoint}/partner/${id}/update/?partnerId=${id}`, param);
  }
}

export default TiersProxy;
