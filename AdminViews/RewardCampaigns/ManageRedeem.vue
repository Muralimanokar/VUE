<template>
  <app-layout>
    <div class="managemerchant_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'rewardcategory.index' }">Reward Category</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">View Rewards Redeem</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> View Rewards Redeem</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Redeemed Date</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="redeemedDate" readonly>
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Used Date</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="usedDate" readonly>
                                </div>
                              </div>
                         </div>
                          <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Points for reward</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="points" readonly>
                                </div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Customer name</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="name" readonly>
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Customer email</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="email" readonly>
                                </div>
                              </div>
                         </div>
                          <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Reward Name</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="rewardName" readonly>
                                </div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Reward type</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="rewardType" readonly>
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Tax Value</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="taxValue" readonly>
                                </div>
                              </div>
                         </div>
                          <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Status</label>
                                <div class="col-sm-6">
                                    <div class="custom-control custom-switch">
                                      <input type="checkbox" id="customSwitch2" class="custom-control-input"
                                       v-model="status" disabled>
                                      <label for="customSwitch2" class="custom-control-label"></label>
                                    </div>
                                </div>
                              </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
        <div>
            <div class="d-flex mb-5">
              <button type="button" class="btn btn-danger" @click="handleCancel">Cancel</button>
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

</style>

<script>
import AppLayout from "@/layouts/Admin.vue";
import $ from "jquery";
import moment from "moment";
import Loading from 'vue-loading-overlay';
import DebugMixin from '@/mixins/debug';
export default {
  name: "ManageRewardCategory",
  components: {
    AppLayout,
    Loading
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
      action: "view",
      id: 0,
      uuid: "123e4567-e89b-42d3-a456-556642440000",
      partnerId: 0,
      redeemedDate: "",
      usedDate: "",
      points: "",
      name: "",
      email: "",
      rewardName: "",
      rewardType: "",
      taxValue: "",
      status: "",
      rewardTypeTxt: {
        CASH_BACK: "Cash back",
        GEO_LOCATION: "Geolocation",
        COUPON: "Coupon code",
        DISCOUNT: "Percentage discount"
      },
      isLoading: false,
      loadingbgcolor : '#0069d9',
      dateConfig: {
        wrap: true
      }
    };
  },
  methods: {
    getRewardRedeemInfo(id) {
      let cachescope = this;
      let param = {
        id: id
      };
      this.$store.dispatch("reward/getRedeemed", param).then(function(res) {
       // cachescope.myDebug(JSON.stringify(res));
        cachescope.name = res.name;
        cachescope.isLoading = false;
        cachescope.redeemedDate = cachescope.getDateFormattedString(res.redeemedDate);
        cachescope.usedDate = cachescope.getDateFormattedString(res.usedDate);
        cachescope.points = res.rewardValue;
        cachescope.name = res.userName;
        cachescope.email = res.emailId;
        cachescope.rewardName = res.rewardName;
        cachescope.rewardType = cachescope.rewardTypeTxt[res.rewardType];
        cachescope.taxValue = res.taxValue;
        cachescope.status = res.isActive;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Reward redeem view failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/redeem` });
      });
    },
    handleCancel() {
      this.$router.push({ path: `/redeem` });
    },
    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD"):"" );
    }
  },
  mounted() {
    $(".nav-reward").addClass("active");
    //let  uuid = ;
   /* if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }
      if(this.action == "view"
          && Object.prototype.hasOwnProperty.call(obj, 'uuid')) {
        //id = this.$route.query.redeem;
        this.myDebug("checkuuid", this.uuid);
       this.uuid = this.$route.query.uuid;
      }
      if(this.action == "view" && Object.prototype.hasOwnProperty.call(obj, 'redeem')) {
        this.myDebug("checkid", this.id);
        this.id = parseInt(this.$route.query.redeem);
      }
    }*/
    this.partnerId  = this.$store.getters["account/getuserid"];
    this.myDebug("partneridck", this.partnerId);
    if(this.partnerId == undefined || this.partnerId == "") {
        return;
    }


    if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.myDebug("Action Ck", this.action);
        this.action = this.$route.query.action;
      }

      if(this.action == "view" && Object.prototype.hasOwnProperty.call(obj, 'uuid')) {
        this.myDebug("checkuuid", this.uuid);
        this.uuid = this.$route.query.uuid;
      }

      if(this.action == "view" && Object.prototype.hasOwnProperty.call(obj, 'redeem')) {
        this.id = parseInt(this.$route.query.redeem);
      }
    }

    if((this.action == "view") && (this.id != undefined)) {
      this.myDebug("checkRedeemid",this.id);
        this.getRewardRedeemInfo(this.id);
    }
  }
};
</script>
