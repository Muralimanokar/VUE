<template>
  <app-layout>
    <div class="managemerchant_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'tiers.index' }">Tier</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page" v-if="action=='edit'">Edit Tier</li>
                        <li class="breadcrumb-item active" aria-current="page" v-else>Add Tier</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0" v-if="action=='edit'"><i class="icon
                            icon-rewardcampaigns"></i> Edit Tier</h2>
                    <h2 class="mb-0" v-else><i class="icon
                            icon-rewardcampaigns"></i> Add Tier</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.name.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Name *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="$v.name.$model">
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.name.$error && !$v.name.required">Please enter tier name</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.name.$error && !$v.name.maxLength">Maximum allowed length is 20 characters</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.name.$error && !$v.name.regex">Please enter a valid tier name</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.description.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Description</label>
                                <div class="col-sm-6">
                                    <textarea class="form-control" v-model.trim="$v.description.$model">
                                    </textarea>
                                </div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Threshold value Type</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     :class="{ 'form-group--error': $v.thresholdValueType.$error }"
                                     v-model="$v.thresholdValueType.$model">
                                        <option value="TRANSACTIONS">Total Transaction Value</option>
                                        <option value="EARNED_POINTS">Total Points Earned</option>
                                        <option value="ACTIVE_POINTS">Active Points</option>
                                    </select>
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.thresholdValue.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Threshold value *</label>
                                <div class="col-sm-6">
                                    <input  type="text" class="form-control" v-model.trim="$v.thresholdValue.$model" >
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.thresholdValue.$error && !$v.thresholdValue.required">Please enter threshold value</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.thresholdValue.$error && (!$v.thresholdValue.minValue || !$v.thresholdValue.numeric)">Please enter a valid threshold value</div>

                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Status</label>
                                <div class="col-sm-6">
                                    <div class="custom-control custom-switch">
                                      <input type="checkbox" id="customSwitch2" class="custom-control-input"
                                       v-model="$v.status.$model"
                                       :disabled="action=='create'">
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
                <button type="button" class="btn btn-success" @click="handleSubmit">Submit</button>
                <button type="button" class="btn btn-danger" @click="handleCancel">Cancel</button>
            </div>
        </div>
    </div>
  </app-layout>
</template>

<style>
</style>

<script>
import AppLayout from "@/layouts/Admin.vue";
import $ from "jquery";
import DebugMixin from '@/mixins/debug';
import { required, maxLength, numeric, helpers,minValue,between, regex } from "vuelidate/lib/validators";
import MinimalVue from '../../../layouts/Minimal.vue';
export default {
  name: "ManageTier",
  components: {
    AppLayout
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
      action: "create",
      tierId : null,
      name: null,
      description: null,
      thresholdValueType: 'TRANSACTIONS',
      thresholdValue: null,
      status: true,
      submitStatus: "IDLE"
    };
  },
  validations: {
    name: {
      required,
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
      maxLength: maxLength(20)
    },
    description: {},
    thresholdValueType: {},
    thresholdValue: {
      required,
      numeric,
      minValue:minValue(0),
    },
    status: {
      required,
    }
  },
  methods: {
    getTierInfo(id) {
      let cachescope = this;
      cachescope.submitStatus = "LOADING";
      this.$store.dispatch("tiers/get", id,this.partnerId).then(function(res) {
        cachescope.submitStatus = "IDLE";
        //cachescope.myDebug(JSON.stringify(res));
           cachescope.name = res.data[0].name;
        cachescope.description = res.data[0].description;
        cachescope.thresholdValueType = res.data[0].tierType;
        cachescope.thresholdValue = res.data[0].fromRange;
        cachescope.status = res.data[0].status;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Tier edit failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/tiers` });
      });
    },
    handleSubmit() {
      if(this.isFormValid()) {
        let postJson = {
          name: this.name,
          description: this.description,
          tierType: this.thresholdValueType,
          fromRange: this.thresholdValue,
          status: this.status,
          partnerId:this.partnerId
        }

        let storeAction = "";
        if(this.action == "create") {
          storeAction = "tiers/create";

          let cachescope = this;
          this.$store.dispatch(storeAction, postJson).then(function(res) {
          cachescope.$toast.open({
              message: "Tier created successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.$router.push({ path: `/tiers` });
        }).catch(function(err){
          //console.log("error",err);
          let msg=err.message;
          cachescope.submitStatus = "IDLE";
          cachescope.$toast.open({
              message: msg,
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
        });
        } else if(this.action == "edit") {
          postJson.id = this.tierId;
         postJson.partnerId=this.partnerId
          storeAction = "tiers/update";

          let cachescope = this;
          this.$store.dispatch(storeAction, postJson).then(function(res) {
          cachescope.$toast.open({
              message: "Tier Update Successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.$router.push({ path: `/tiers` });
        }).catch(function(err){
          let msg  =err.message
          cachescope.submitStatus = "IDLE";
          cachescope.$toast.open({
              message: msg,
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
        });
        } else {
            this.myDebug("Invalid action");
            return;
        }

        /* TODO: Add a loading spinner */
        this.submitStatus = "LOADING";
        //let cachescope = this;

        this.myDebug("JSON:", JSON.stringify(postJson));

       /* this.$store.dispatch(storeAction, postJson).then(function(res) {
          cachescope.$toast.open({
              message: "Tier created successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.$router.push({ path: `/tiers` });
        }).catch(function(err){
          cachescope.submitStatus = "IDLE";
          cachescope.$toast.open({
              message: "Tiers creation failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
        });*/
      }
    },
    handleCancel() {
      this.$router.push({ path: `/tiers` });
    },
    isFormValid() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    $(".nav-tiers").addClass("active");
     let cache_obj = this;
     cache_obj.partnerId  = this.$store.getters["account/getuserid"];
      
    if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }
      if(this.action == "edit" && Object.prototype.hasOwnProperty.call(obj, 'tier')) {
        this.tierId = this.$route.query.tier;
      }
    }

    if((this.action == "edit") && (this.tierId != undefined)) {
        this.getTierInfo(this.tierId);
    }
  }
};
</script>
