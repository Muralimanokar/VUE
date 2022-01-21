<template>
 <app-layout>
   <div class="Changesubscription_container">

   </div>
   <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'merchanthome.index' }">Home</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Change Subscription</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="form-section pt-3">
        <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i>Change Subscription</h2>
                 </div>
            </div>
        </div>
        <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="partnerName" class="col-sm-6
                                    col-form-label text-right">Partner Name</label>
                                <div class="col-sm-6">
                                    <input readonly type="text" class="form-control" placeholder=""
                                     v-model="partnerName">
                                </div>
                              </div>
                         </div>

                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Current Subscription</label>
                                <div class="col-sm-6">
                                    <input readonly type="text" class="form-control" placeholder=""
                                     v-model="subscriptionPlan.planName">
                                </div>
                              </div>
                         </div>

                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.newSubscriptionPlanId.$error }">
                                <label for="newSubscriptionPlanId" class="col-sm-6
                                    col-form-label text-right">New Subscription Type *</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.newSubscriptionPlanId.$model">
                                        <option value="" selected>Select</option>
                                        <option v-for="subscription in subscriptionList" :value="subscription.id" v-bind:key="subscription.id">{{subscription.planName}}</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.newSubscriptionPlanId.$error && !$v.newSubscriptionPlanId.required">Please select a New Subscription Type</div>
                              </div>
                         </div>

                     </div>

                     <div class="row">
                         <div class="col-md-8">
                             <div class="form-group row">
                                <div class="col-sm-12">
                                </div>
                              </div>
                         </div>
                     </div>
                 </div>
                 <div class="d-flex mb-5">
                <button type="button" class="btn btn-success" @click="handleSubmit">Submit Request</button>
                <button type="button" class="btn btn-danger" @click="handleCancel">Cancel</button>
            </div>

 </app-layout>
</template>

<style>
.Changesubscription_container .table-active td:nth-child(2) input {
  width: 75px;
}
.Changesubscription_container .table-active td:nth-child(3) input {
  width: 85px;
}
.Changesubscription_container .table-active td:nth-child(4) input {
  width: 75px;
}
.Changesubscription_container .table-active td:nth-child(5) input {
  width: 100px;
}
.Changesubscription_container .table-active td:nth-child(6) input {
  width: 75px;
}
.Changesubscription_container .table-active td:nth-child(7) input {
  width: 75px;
}
.Changesubscription_container .table-active td:nth-child(8) input {
  width: 100px;
  padding: 5px !important;
}
.Changesubscription_container .filter_status {
  background: #eaeaea;
  border-radius: 2px;
}
.Changesubscription_container .modal-header{
  background: #34b8df;
    border-radius: 0px;
    color: white;
    font-size: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
}
.Changesubscription_container .modal-header .close{
  color: white !important;
  background: transparent;
  font-size: 24px;
  opacity:1;
}
.Changesubscription_container .modal-header .close i{
  text-shadow: none;
}
.Changesubscription_container .upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.Changesubscription_container .upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>

<script>
import Vue from "vue";
import axios from "axios";
import DebugMixin from '@/mixins/debug';
import AppLayout from "@/layouts/Merchant.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import $ from "jquery";
import moment from "moment";
import { required, minLength, maxLength, email, alpha, numeric, alphaNum  } from "vuelidate/lib/validators";
export default {
  name: "ChangeSubscriptionIndex",
  components: {
    AppLayout,
    DataTable,
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
      subscriptionPlan: "",
      newSubscriptionPlanId: "",
      subscriptionList: [],
      partnerName: "",
      partnerId: 0
    }
  },
  validations: {
    newSubscriptionPlanId: {
        required
    }
  },
  methods: {
    getMerchantinfo(partnerId) {
      let cachescope = this;
      cachescope.isLoading = true;
      this.$store.dispatch("merchant/get", partnerId).then(function(res) {
        cachescope.partnerName = res.userName;
        cachescope.countryCode = res.countryCode;
        cachescope.subscriptionPlan = res.subscriptionPlansDto;
        cachescope.getSubscriptionList();
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Change Subscription failed.",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/merchanthome` });
      });
    },
    getSubscriptionList() {
      let cachescope = this;
      cachescope.isLoading = true;
      this.$store.dispatch("subscription/init", this.countryCode).then(function(res) {
        cachescope.subscriptionList = res.filter(ele => ele.id != cachescope.subscriptionPlan.id);
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Change Subscription failed.",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/merchanthome` });
      });
    },
    handleSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = {
          subscriptionPlanId: this.newSubscriptionPlanId,
          partnerId: this.partnerId
        };

        let cachescope = this;
        this.$store.dispatch("merchant/changesubscription", data).then(function(res) {
          cachescope.$toast.open({
              message: "Subscription changed successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.$router.push({ path: `/merchanthome` });


        }).catch(function(err){
          cachescope.$toast.open({
              message: "Subscription change failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
        });
      }
    },

    handleCancel() {
       this.$router.push({ path: `/merchanthome` });
    }
  },

  mounted() {
    $(".nav-viewprofile").addClass("active");
    this.partnerId  = this.$store.getters["account/getuserid"];
    if(this.partnerId == undefined || this.partnerId == "") {
        return;
    }

    this.getMerchantinfo(this.partnerId);
  }

};
</script>
