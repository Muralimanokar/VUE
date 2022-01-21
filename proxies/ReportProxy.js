import Proxy from './Proxy';

class ReportProxy extends Proxy {

  constructor(parameters = {}) {
    super('report', parameters);
  }

  getRevenue(id, timeInterval){
    return this.submit('get', `${this.endpoint}/revenue?partnerId=${id}&timeInterval=${timeInterval}`);
  }
  getReportCustomer(param){
    return this.submit('get', `${this.endpoint}/customer-performance?partnerId=${param.id}`);
  }
  getReportProduct(param){
    return this.submit('get', `${this.endpoint}/product-label?partnerId=${param.id}`);
  }

}

export default ReportProxy;
