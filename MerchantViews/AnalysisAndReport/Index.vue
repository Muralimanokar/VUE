<template>
  <app-layout>
        <div class="AnalysisAndReport_container"   :dtName="'earnList'">
        <div class="row align-items-center">
            <!--<div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'merchantAnalysisAndReport.index' }">Analysis & Report</router-link>
                        </li>
                    </ol>
                </nav>
            </div>-->
        </div>
        <div class="form-section pt-3">
            <div class="card">
                 <!--<div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon icon-analysisandreport"></i> Analysis & Report</h2>
                 </div>-->
                 <div class="card-body px-0" style="padding-top:0px;">
                     <ul class="nav nav-tabs customerviewpnl">
                          <li><a data-toggle="tab" class="active" href="#tab_product">Customer Performance</a></li>
                        <li><a data-toggle="tab" href="#tab_pos">Product Label</a></li>
                       <!-- <li><a data-toggle="tab" href="#tab_product">Product Category</a></li>
                        <li><a data-toggle="tab" href="#tab_pos">Pos</a></li>
                        <li><a data-toggle="tab" href="#tab_segment">Segment Reports</a></li>
                        <li><a data-toggle="tab" href="#tab_referal">Referal Reports</a></li>
                        <li><a data-toggle="tab" href="#tab_revenue">Revenue Reports</a></li>
                        <li><a data-toggle="tab" href="#tab_performance">Customer Performance Reports</a></li>
                        <li><a data-toggle="tab" href="#tab_reward">Reward Points Reports</a></li>
                        <li><a data-toggle="tab" href="#tab_issuance">Issuance Details Report</a></li>
                        <li><a data-toggle="tab" href="#tab_purchase">Purchase Reports</a></li>
                        <li><a data-toggle="tab" href="#tab_transaction">Transactions</a></li>
                        <li><a data-toggle="tab" href="#tab_customer">Customer Reports</a></li>
                        <li><a data-toggle="tab" href="#tab_rfm">RFM Analysis</a></li>-->
                    </ul>
                    <div class="tab-content" v-if="!isLoading">
                        <div id="tab_product" class="tab-pane fade in active show">
                         
                           <ProductCategory></ProductCategory>
                        </div>
                        <div id="tab_pos" class="tab-pane fade">
                            <Pos></Pos>
                        </div>
                        <!--<div id="tab_segment" class="tab-pane fade">
                            <SegmentReports></SegmentReports>
                        </div>
                        <div id="tab_referal" class="tab-pane fade">
                             <ReferalReports></ReferalReports>
                        </div>
                        <div id="tab_revenue" class="tab-pane fade">
                             <RevenueReports></RevenueReports>
                        </div>
                        <div id="tab_performance" class="tab-pane fade">
                             <CustomerPerformanceReports></CustomerPerformanceReports>
                        </div>
                        <div id="tab_reward" class="tab-pane fade">
                             <RewardPointsReports></RewardPointsReports>
                        </div>
                        <div id="tab_issuance" class="tab-pane fade">
                             <IssuanceDetailsReport></IssuanceDetailsReport>
                        </div>
                        <div id="tab_purchase" class="tab-pane fade">
                             <PurchaseReports></PurchaseReports>
                        </div>
                        <div id="tab_transaction" class="tab-pane fade">
                             <Transactions></Transactions>
                        </div>
                        <div id="tab_customer" class="tab-pane fade">
                             <CustomerReports></CustomerReports>
                        </div>
                        <div id="tab_rfm" class="tab-pane fade">
                             <RFMAnalysis></RFMAnalysis>
                        </div>-->
                    </div>
                 </div>
            </div>    
        </div>
    </div>
        <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      :color="loadingbgcolor"
    ></loading>
  </app-layout>
</template>

<style>
.home_content_container{
  height: 100px;
  text-align: center;
  margin-top:100px
}
.input-group i {
  cursor: pointer;
}
.customerviewpnl li a{
  color :black;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
  padding: 10px 25px; 
  display: block;
}
.customerviewpnl li a.active{
  background: #f5b008;
}
.tab-content .card{
   border: 1px solid #34b8df!important;
   border-radius: 0px;
}
</style>


<script>
import AppLayout from '@/layouts/Merchant.vue';
import Loading from 'vue-loading-overlay';
import $ from "jquery";
import DebugMixin from "@/mixins/debug";
const ProductCategory = () => import('@/components/Merchant/AnalysisAndReport/ProductCategory');
const Pos = () => import('@/components/Merchant/AnalysisAndReport/Pos');
/*const SegmentReports = () => import('@/components/Merchant/AnalysisAndReport/SegmentReports');
const ReferalReports = () => import('@/components/Merchant/AnalysisAndReport/ReferalReports');
const RevenueReports = () => import('@/components/Merchant/AnalysisAndReport/RevenueReports');
const CustomerPerformanceReports = () => import('@/components/Merchant/AnalysisAndReport/CustomerPerformanceReports');
const RewardPointsReports = () => import('@/components/Merchant/AnalysisAndReport/RewardPointsReports');
const IssuanceDetailsReport = () => import('@/components/Merchant/AnalysisAndReport/IssuanceDetailsReport');
const PurchaseReports = () => import('@/components/Merchant/AnalysisAndReport/PurchaseReports');
const Transactions = () => import('@/components/Merchant/AnalysisAndReport/Transactions');
const CustomerReports = () => import('@/components/Merchant/AnalysisAndReport/CustomerReports');
const RFMAnalysis = () => import('@/components/Merchant/AnalysisAndReport/RFMAnalysis');*/

export default {
  name: 'AnalysisAndReportIndex',
  components: {
    AppLayout,
    Loading,
    //isLoading: true,
    ProductCategory,
    Pos,
    /*SegmentReports,
    ReferalReports,
    RevenueReports,
    CustomerPerformanceReports,
    RewardPointsReports,
    IssuanceDetailsReport,
    PurchaseReports,
    Transactions,
    CustomerReports,
    RFMAnalysis*/
  },
  data: function () {
    return{
    isLoading:false,
    loadingbgcolor: "#0069d9",
          }
  }
};
</script>
