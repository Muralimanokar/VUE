import Proxy from '@/proxies/PartnerProxy';
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
         getDashboardPointsSummary({ state, dispatch },param) {
            return new Proxy().getDashboardPointsSummary(param);
         },

         getDashboardSalesGraphData({ state, dispatch },param) {
            return new Proxy().getDashboardSalesGraphData(param);
         },

         getDashboardPointsGraphData({ state, dispatch },param) {
            return new Proxy().getDashboardPointsGraphData(param);
         },

         getTransactionsList({ state, dispatch },param) {
            return new Proxy().getTransactionsList(param);
         },
         generateTransaction({ state, dispatch },param) {
            return new Proxy().generateTransaction(param);
         },
         gettransactions({ state, dispatch }, param){
            return new Proxy().gettransactions(param);
   
         }
    }

}
