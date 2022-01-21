<template>
  <app-layout>
    <div class="viewcustomer_container" :dtName="'earnList'">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'customer.index' }">Customer</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">View Customer</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
          
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon icon-customer"></i> View Customer</h2>
                 </div>
                 <div class="card-body px-0" style="padding-top:0px;">
                     <ul class="nav nav-tabs customerviewpnl">
                        <li><a data-toggle="tab" class="active" href="#tab_profile">Profile Details</a></li>
                        <li><a data-toggle="tab" href="#tab_analysis">Analysis</a></li>
                        <li><a data-toggle="tab" href="#tab_merchant">Merchant History</a></li>
                        <li><a data-toggle="tab" href="#tab_points">Points Transfer</a></li>
                        <li><a data-toggle="tab" href="#tab_rewards">Rewards</a></li>
                    </ul>
                    <div class="tab-content" v-if="!isLoading">
                        <div id="tab_profile" class="tab-pane fade in active show" :dtName="'earnList'">
                           <Profile :customer="customer" :points="points"></Profile>
                        </div>
                        <div id="tab_analysis" class="tab-pane fade" :dtName="'earnList'">
                            <Analysis :customer="customer"></Analysis>
                        </div>
                        <div id="tab_merchant" class="tab-pane fade" :dtName="'earnList'">
                            <MerchantHistory></MerchantHistory>
                        </div>
                        <div id="tab_points" class="tab-pane fade" :dtName="'earnList'">
                             <PointsTransfer></PointsTransfer>
                        </div>
                        <div id="tab_rewards" class="tab-pane fade" :dtName="'earnList'">
                             <Rewards></Rewards>
                        </div>
                      
                    </div>
                 </div>
            </div>
        </div>
    </div>
  <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true" :color="loadingbgcolor"></loading>
  </app-layout>
</template>

<style>
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
import AppLayout from "@/layouts/Admin.vue";
import Loading from 'vue-loading-overlay';
import $ from "jquery";
import DebugMixin from "@/mixins/debug";

const Profile = () => import('@/components/Admin/Customer/Profile');
const Analysis = () => import('@/components/Admin/Customer/Analysis');
const MerchantHistory = () => import('@/components/Admin/Customer/MerchantHistory');
const PointsTransfer = () => import('@/components/Admin/Customer/PointsTransfer');
const Rewards = () => import('@/components/Admin/Customer/Rewards');

export default {
  name: "ViewCustomer",
  components: {
    AppLayout,
    Loading,
    Profile,
    Analysis,
    MerchantHistory,
    PointsTransfer,
    Rewards
  },
  mixins: [DebugMixin],
  data: function() {
    return {
      loadingbgcolor : '#0069d9',
      customer: {
        customerId: null,
        username: null,
        mobileNum: null,
        loyaltyCardNumber: null,
        countryCode: null,
        city: null,
        emailId: null,
        gender: null,
        upcomingTiers:null,
        fromRange:null,
        TierType:null,
        dob: null,
        tierName: null,
        totalTransactions: null,
        averageValueOfTransaction: null,
        orders: null,
        tierFromRange: null,
        tierType: "",
        lastOrderedDate: null,

      },
      points: {
        earnedPoints: 0,
        expiredPoints: 0,
        pointsUsed: 0,
        activePoints: 0,
        blockedPoints: 0
      },
      tierList: [],
      isLoading: true
    };
  },
   provide:function(){
    return{
      handlePageSelected: this.handlePageSelected,
      updatedfilter:this.updatedfilter

    }
  },
  methods: {
      updatedfilter(){

    },
            handlePageSelected(dtName,value){
     

    },
    getCustomerInfo(id) {
      let cachescope = this;
      cachescope.submitStatus = "LOADING";
      let dataobj={
        customerId:this.customerId,
        partnerId:this.partnerId
      }
      console.log("log",dataobj)
      this.$store.dispatch("customer/getProfile", dataobj).then(function(res) {
       // console.log("check",res.data);
       // console.log("chacek upcoming tiers",res.upcomingTiers.name);
        cachescope.submitStatus = "IDLE";
      //  cachescope.myDebug("Profile:", JSON.stringify(res));
        cachescope.customer.username = res.data.userName;
        cachescope.customer.mobileNum = res.data.mobileNumber;
        cachescope.customer.loyaltyCardNumber = res.data.loyaltyCardNumber;
        cachescope.customer.countryCode = res.data.countryCode;
        cachescope.customer.city = res.data.city;
        cachescope.customer.emailId = res.data.emailId;
        cachescope.customer.gender = res.data.gender;
        cachescope.customer.dob = res.data.dob;
        cachescope.customer.upcomingTiers=res.data.upcomingTiers.name
        cachescope.customer.fromRange=res.data.upcomingTiers.fromRange
        cachescope.customer.TierType=res.data.upcomingTiers.tierType
        if(res.tierId != undefined || res.tierId != "") {
          let tier = cachescope.tierList.find(ele => ele.id == res.data.tierId);
          cachescope.customer.tierName = ((tier!=undefined)?tier.name:"");
        } else {
          cachescope.customer.tierName = "";
        }
        cachescope.customer.totalTransactions = res.data.totalTransactions;
        cachescope.customer.averageValueOfTransaction = res.data.averageTransaction;
        cachescope.customer.orders = res.data.orders;
        cachescope.customer.tierFromRange = res.data.tierFromRange;
        cachescope.customer.tierType = res.data.tierType;
        cachescope.customer.lastOrderedDate = res.data.lastOrderedDate;
        cachescope.customer.uuid = res.data.uuid;

      //  console.log(cachescope.customer.uuid);
        cachescope.getCustomerPointsInfo(cachescope.customer.uuid);
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Customer view failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/customer` });
      });
    },
    //this.getCustomerPointsInfo(this.customer.uuid);
    getTiersList() {
      let cachescope = this;
      cachescope.submitStatus = "LOADING";
      this.$store.dispatch("tiers/init",this.partnerId).then(function(res) {
        cachescope.submitStatus = "IDLE";
      //  cachescope.myDebug(JSON.stringify(res));
        cachescope.tierList = [];
        res.data.forEach((tier) => {
          let tierObj = {};
          tierObj.id = tier.id;
          tierObj.name = tier.name;
          cachescope.tierList.push(tierObj);
        });
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Customer action failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/customer` });
      });
    },
    getCustomerPointsInfo(id) {
      let cachescope = this;
      this.isLoading = true;
      cachescope.submitStatus = "LOADING";
        let dataobj={
        id,
        partnerId:this.partnerId
      }
      console.log("orr",this.partnerId)
      this.$store.dispatch("points/getPoints",dataobj).then(function(res) {
        cachescope.submitStatus = "IDLE";
       // cachescope.myDebug("Points:", JSON.stringify(res));
       // cachescope.points.earnedPoints = res.earnedPoints;
        cachescope.points.expiredPoints = res.expiredPoints;
        cachescope.points.pointsUsed = res.pointsUsed;
        cachescope.points.activePoints = res.activePoints;
        cachescope.points.blockedPoints = res.blockedPoints;
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Customer point summary failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        //cachescope.$router.push({ path: `/customer` });
      });
    }
  },
  mounted() {
    $(".nav-customer").addClass("active");
 let cache_obj = this;
       cache_obj.partnerId  = this.$store.getters["account/getuserid"];
   
    if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'customer')) {
        /* View or Edit action */
        this.customerId = this.$route.query.customer;
      }
    }

    this.getTiersList();

    if(this.customerId != undefined) {
      this.getCustomerInfo(this.customerId);
    }
  }
};
</script>
