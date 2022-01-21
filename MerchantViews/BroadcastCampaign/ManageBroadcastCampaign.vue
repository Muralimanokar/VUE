<template>
 <app-layout>
   <div class="broadcastcampaign_container">

   </div>
   <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'merchantBroadcastCampaign.index' }">Broadcast Campaign</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page" v-if="action=='edit'">Edit Campaign</li>
                        <li class="breadcrumb-item active" aria-current="page" v-else>Add Campaign Template</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="form-section pt-3"   :dtName="'earnList'">
        <div class="card">
                 <div class="card-header" id="headingOne">
                   <h2 class="mb-0" v-if="action=='edit'"><i class="icon
                            icon-rewardcampaigns"></i> Edit Campaign</h2>
                    <h2 class="mb-0" v-else><i class="icon
                            icon-rewardcampaigns"></i>Add Campaign Template</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.name.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Campaign Name</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" placeholder="Campaign Name"
                                     v-model.trim="$v.name.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.name.$error && !$v.name.required">Please enter your Campaign Name</div>
                                <div class="error col-sm-12 text-right" v-if="$v.name.$error && !$v.name.maxLength">Maximum allowed length is 20 characters</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.campaignType.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Campaign Type</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.campaignType.$model">
                                        <option value="" selected>Select</option>
                                        <option value="ONE_TIME">One time</option>
                                        <option value="SCHEDULED">Scheduled</option>
                                        <option value="EVENT_BASED">Event Based</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.campaignType.$error && !$v.campaignType.required">Please select a Campaign Type</div>
                              </div>
                         </div>

                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.broadCastType.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Broadcast Type</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model.trim="$v.broadCastType.$model">
                                        <option value="" selected>Select</option>
                                        <option value="SMS">Message</option>
                                        <option value="EMAIL">Email</option>
                                        <option value="PUSH_NOTIFICATION">Push notification</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.broadCastType.$error && !$v.broadCastType.required">Please select a Broadcast Type</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.content.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Content</label>
                                <div class="col-sm-6">
                                    <textarea class="form-control"
                                     v-model.trim="$v.content.$model">
                                    </textarea>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.content.$error && !$v.content.required">Please enter the Content</div>
                              </div>
                         </div>

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
              <div class="d-flex mb-5">
                <button type="button" class="btn btn-success" @click="handlesubmit">Submit</button>
                <button type="button" class="btn btn-danger" @click="handleCancel">Cancel</button>
            </div>
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      :color="loadingbgcolor">
    </loading>
 </app-layout>
</template>

<style>
.broadcastcampaign_container .table-active td:nth-child(2) input {
  width: 75px;
}
.broadcastcampaign_container .table-active td:nth-child(3) input {
  width: 85px;
}
.broadcastcampaign_container .table-active td:nth-child(4) input {
  width: 75px;
}
.broadcastcampaign_container .table-active td:nth-child(5) input {
  width: 100px;
}
.broadcastcampaign_container .table-active td:nth-child(6) input {
  width: 75px;
}
.broadcastcampaign_container .table-active td:nth-child(7) input {
  width: 75px;
}
.broadcastcampaign_container .table-active td:nth-child(8) input {
  width: 100px;
  padding: 5px !important;
}
.broadcastcampaign_container .filter_status {
  background: #eaeaea;
  border-radius: 2px;
}
.broadcastcampaign_container .modal-header{
  background: #34b8df;
    border-radius: 0px;
    color: white;
    font-size: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
}
.broadcastcampaign_container .modal-header .close{
  color: white !important;
  background: transparent;
  font-size: 24px;
  opacity:1;
}
.broadcastcampaign_container .modal-header .close i{
  text-shadow: none;
}
.broadcastcampaign_container .upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.broadcastcampaign_container .upload-btn-wrapper input[type=file] {
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
import { required, maxLength,  } from "vuelidate/lib/validators";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "ManagebroadcastcampaignIndex",
  components: {
    AppLayout,
    DataTable,
    Loading
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
      action: "create",
      name: "",
      campaignType: "",
      broadCastType: "",
      content: "",
      partnerId: 0,
      id: 0,
      status: true,
      isLoading: false
    }
  },
  validations: {
    name: {
      required,
      maxLength: maxLength(20),

    },
    campaignType: {
      required,
    },
     broadCastType: {
      required,
    },
    content: {
      required,
    },
    status: {
      required,
    }
  },
  methods: {
    getBroadcastinfo(id) {
      let cachescope = this;
      cachescope.isLoading = true;
      this.$store.dispatch("broadcastcampaign/get", id).then(function(res) {
      //  cachescope.myDebug(JSON.stringify(res));
        cachescope.name = res.name;
        cachescope.campaignType = res.campaignType;
        cachescope.broadCastType = res.broadCastType;
        cachescope.content = res.content;
        cachescope.partnerId = res.partnerId;
        cachescope.status = res.status;
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Campaign edit Failed. Campaign Updated Failed",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/merchantBroadcastCampaign` });
      });
    },
    handlesubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let cachescope = this;
        cachescope.isLoading = true;
        let postJson = {
          name: this.name,
          campaignType: this.campaignType,
          broadCastType: this.broadCastType,
          content: this.content,
          partnerId: this.partnerId,
          status: this.status
        }
        let storeAction = "";
        if(this.action == "create") {
        storeAction = "broadcastcampaign/add";
        this.myDebug("JSON:", JSON.stringify(postJson));
        this.$store.dispatch(storeAction, postJson).then(function(res) {
          cachescope.$toast.open({
              message: "Campaign Template created successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.$router.push({ path: `/merchantBroadcastCampaign` });
        }).catch(function(err){
          cachescope.$toast.open({
              message: "Campaign Template creation failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
          cachescope.$router.push({ path: `/merchantBroadcastCampaign` });
        });
        } else if(this.action == "edit") {
          postJson.id = this.id;
          storeAction = "broadcastcampaign/update";
          let cachescope = this;
          this.myDebug("JSON:", JSON.stringify(postJson));
          this.$store.dispatch(storeAction, postJson).then(function(res) {
          cachescope.$toast.open({
              message: "Campaign Template Updated successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.$router.push({ path: `/merchantBroadcastCampaign` });
        }).catch(function(err){
          cachescope.$toast.open({
              message: "Campaign Template Update failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
          cachescope.$router.push({ path: `/merchantBroadcastCampaign` });
        });
        }else {
            this.myDebug("Invalid action");
            return;
        }

      }

    },
    handleCancel() {
       this.$router.push({ path: `/merchantBroadcastCampaign` });
    }
  },

  mounted() {
    $(".nav-broadcastcampaign").addClass("active");
    this.partnerId  = this.$store.getters["account/getuserid"];
    if(this.partnerId == undefined || this.partnerId == "") {
        return;
    }
    if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }
      if(this.action == "edit" && Object.prototype.hasOwnProperty.call(obj, 'broadcastcampaign')) {
        this.id = parseInt(this.$route.query.broadcastcampaign);
      }
    }
    if((this.action == "edit") && (this.id != undefined)) {
        this.getBroadcastinfo(this.id);
    }
  }

};
</script>
