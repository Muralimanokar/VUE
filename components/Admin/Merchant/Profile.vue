<template>
    <div class="row" :dtName="'earnList'">
        <div class="col-md-3">
            <div style="padding:10px 0px;">
                <div class="card">
                    <div class="card-header" style="background: #188ae2;">
                        <h2 class="mb-0" style="font-size:13px;">Profile Details</h2>
                    </div>
                    <div class="card-body px-0" style="padding-top:0px;">
                        <ul class="profile_details_list">
                            <li>Name:  <span>{{profile.userName}}</span></li>
                            <li>Country: <span>{{profile.countryCode}}</span></li>
                            <li>Email: <span>{{profile.emailId}}</span></li>
                            <li>Phone: <span>{{profile.mobileNumber}}</span></li>
                            <li>Enrolled Date: <span>{{moment(enrolledDate).format('YYYY-MM-DD')}}</span></li>
                            <li>Last order Date: <span>{{moment(lastOrderedDate).format('YYYY-MM-DD')}}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div style="padding:10px;">
                <div class="card">
                    <div class="card-header" style="background: #188ae2;">
                        <h2 class="mb-0" style="font-size:13px;">Merchant Value</h2>
                    </div>
                    <div class="card-body px-0" style="padding-top:0px;">
                        <ul class="merchant_value_list">
                            <li>
                                Total Transactions value:<br/>
                                <span>{{profile.totalTransactions || 0}}</span>
                            </li>
                            <li>
                                Average Transactions value:<br/>
                                <span>{{profile.averageValueOfTransaction || 0}}</span>
                            </li>
                            <li>
                                Number of Orders:<br/>
                                <span>{{profile.orders}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
         </div>
         <div class="col-md-3">
            <div style="padding:10px;">
                <div class="card">
                    <div class="card-header" style="background: #188ae2;">
                        <h2 class="mb-0" style="font-size:13px;">Loyalty Summary</h2>
                    </div>
                    <div class="card-body px-0" style="padding-top:0px;">
                        <ul class="merchant_value_list">
                            <li>
                                Points Purchased:<br/>
                                <span>{{ loyaltysummary.pointsPurchased || 0 }}</span>
                            </li>
                            <li>
                                Points used:<br/>
                                <span>{{ loyaltysummary.pointsUsed || 0}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
         </div>
        <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true" :color="loadingbgcolor"></loading>
    </div>
</template>

<style>
.profile_details_list,.merchant_value_list {
  list-style: none;
  padding: 0px;
  margin: 0px;
  font-size: 13px;
}
.profile_details_list li , .merchant_value_list li {
  padding: 10px;
  padding-right: 0px;
}
.profile_details_list span{
  font-weight: 600;
}
.profile_details_summary label {
  font-size: 13px;
}
.profile_details_summary span , .merchant_value_list span{
  font-weight: 600;
  padding: 5px;
  font-size: 20px;
}
.merchant_value_list span{
  font-size: 22px;
}
</style>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import moment from "moment";
import Vue from 'vue';
Vue.prototype.moment = moment
export default {
  name: "MechnatProfileIndex",
  components: {
      Loading
  },
  props : ["merchantid"],
  data: function() {
    return {
      isLoading : true,
      loadingbgcolor : '#0069d9',
      profile : {},
      enrolledDate:{},
      lastOrderedDate:{},
      loyaltysummary : {}
    };
  },
  provide:function(){
    return{
      handlePageSelected: this.handlePageSelected,
            updatedfilter:this.updatedfilter

    }
  },
  methods: {
       updatedfilter(payload){
},

    handlePageSelected(dtName,value){
},
      loadmerchantprofile(){
        var cache_obj = this;
        var dataobj = {
         
        partnerId:this.merchantid
        };
        this.$store.dispatch("merchant/viewprofile",this.merchantid).then(function(res) {
            cache_obj.isLoading = false;
            cache_obj.profile = res;
            cache_obj.enrolledDate=res.enrolledDate;
            cache_obj.lastOrderedDate=res.lastOrderedDate;
            
        });
      },
      loadloyaltysummary(){
          var cache_obj = this;
           var dataobj = {
           partnerId: this.merchantid,
    
        };
          this.$store.dispatch("merchant/loyaltysummary",this.merchantid).then(function(res) {
              cache_obj.loyaltysummary = res;
          });
      }
  },
  created(){
       let cache_obj=this;
        cache_obj.partnerId  = this.$store.getters["account/getuserid"];
      this.loadmerchantprofile();
      this.loadloyaltysummary();
  },
  mounted() {
      //this.isLoading = false;
  }
};
</script>
