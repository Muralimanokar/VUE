import Proxy from '@/proxies/ReportProxy';
import axios from 'axios';

export default {
    namespaced: true,
    state: {
    },
    getters : {
    },
    mutations : {
    },
    actions : {
         getRevenue({ state, dispatch },param) {
            return new Proxy().getRevenue(param.id, param.timeInterval);
         },
         getReportCustomer({ state, dispatch },param) {
            return new Proxy().getReportCustomer(param);
         },
         getReportProduct({ state, dispatch },param) {
            return new Proxy().getReportProduct(param);
         }
    }

}
