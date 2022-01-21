<template>
  <app-layout>
      <div class="viewmerchant_container">
          <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'merchant.index' }">Merchant</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">View Merchant</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon icon-customer"></i> View Merchant</h2>
                 </div>
                 <div class="card-body px-0" style="padding-top:0px;">
                     <ul class="nav nav-tabs merchantviewpnl">
                        <li><a data-toggle="tab" class="active" href="#tab_profile">Profile Summary</a></li>
                        <li><a data-toggle="tab" href="#tab_customer">Active Customers</a></li>
                        <li><a data-toggle="tab" href="#tab_transaction">Transactions</a></li>
                        <li><a data-toggle="tab" href="#tab_points">Points Transfer</a></li>
                        <li><a data-toggle="tab" href="#tab_analysis">Segment Analysis</a></li>
                    </ul>
                    <div class="tab-content">
                        <div id="tab_profile" class="tab-pane fade in active show">
                           <Profile :merchantid="merchantid"></Profile>
                        </div>
                        <div id="tab_customer" class="tab-pane fade">
                            <Customer :merchantid="merchantid"></Customer>
                        </div>
                        <div id="tab_transaction" class="tab-pane fade">
                            <Transaction :merchantid="merchantid"></Transaction>
                        </div>
                        <div id="tab_points" class="tab-pane fade">
                             <Points :merchantid="merchantid"></Points>
                        </div>
                        <div id="tab_analysis" class="tab-pane fade">
                             <Analysis :merchantid="merchantid"></Analysis>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
      </div>
  </app-layout>
</template>

<style>
.input-group i {
  cursor: pointer;
}
.merchantviewpnl li a{
  color :black;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
  padding: 10px 25px;
  display: block;
}
.merchantviewpnl li a.active{
  background: #f5b008;
}
.tab-content .card{
   border: 1px solid #34b8df!important;
   border-radius: 0px;
}
</style>

<script>
import AppLayout from "@/layouts/Admin.vue";
const Profile = () => import('@/components/Admin/Merchant/Profile');
const Customer = () => import('@/components/Admin/Merchant/Customer');
const Transaction = () => import('@/components/Admin/Merchant/Transaction');
const Points = () => import('@/components/Admin/Merchant/Points');
const Analysis = () => import('@/components/Admin/Merchant/Analysis');
import $ from "jquery";

export default {
  name: "ViewMerchant",
  components: {
    AppLayout,
    Profile,
    Customer,
    Transaction,
    Points,
    Analysis
  },
  data: function() {
      return {
          merchantid : null
      }
  },
  created(){
    if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'merchantid')) {
        /* View or Edit action */
        this.merchantid = this.$route.query.merchantid;
      }
    }
  },
  mounted() {
    $(".nav-merchant").addClass("active");
  }
};
</script>
