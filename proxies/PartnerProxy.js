import Proxy from './Proxy';

class PartnerProxy extends Proxy {

  constructor(parameters = {}) {
    super('partner', parameters);
  }

  getDashboardPointsSummary(param){
    return this.submit('get', `${this.endpoint}/dashboard/points-summary?partnerId=${param}`);
  }

  getDashboardSalesGraphData(param){
    return this.submit('get', `${this.endpoint}/dashboard/sales-graph?partnerId=${param}`);
  }

  getDashboardPointsGraphData(param){
    return this.submit('get', `${this.endpoint}/dashboard/points/allocated-unallocated?partnerId=${param}`);
  }

  getTransactionsList(param){
    return this.submit('get', `${this.endpoint}/transactions/list?partnerId=${param}`);
  }
  generateTransaction(param){
    return this.submit('post', `${this.endpoint}/transactions/list?partnerId=${param.partnerId}&transactionDateFrom=${param.fromdate}&transactionDateTo=${param.todate}`,param.data);
  }
  gettransactions(param){
    return this.submit('post', `${this.endpoint}/transaction/export-settle?partnerId=${param.partnerId}&startDate=${param.fromdate}&endDate=${param.todate}`,param.data);
    }


}

export default PartnerProxy;
