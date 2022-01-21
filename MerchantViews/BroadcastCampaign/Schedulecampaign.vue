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

                        <li class="breadcrumb-item active" aria-current="page">Schedule Campaign</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="form-section pt-3">
        <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i>Schedule Campaign</h2>
                 </div>
            </div>
        </div>
        <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.broadCastId.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Campaign Template</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.broadCastId.$model">
                                        <option value="">Select</option>
                                        <option v-for="campaign in campaignList" :value="campaign.id" v-bind:key="campaign.id">{{campaign.name}}</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.broadCastId.$error && !$v.broadCastId.required">Please select a Campaign Template</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.broadCastTypeValue.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Campaign Type</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.broadCastTypeValue.$model">
                                        <option value="" selected>Select</option>
                                        <option value="ONE_TIME">One time</option>
                                        <option value="ACCOUNT_RELATED">Account Related</option>
                                        <option value="DATE">Scheduled</option>
                                        <option value="EVENT">Event Based</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.broadCastTypeValue.$error && !$v.broadCastTypeValue.required">Please select a Campaign Type</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.customerIds.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Customer</label>
                                    <div class="col-sm-6">
                                    <input type="text" class="form-control" placeholder="Customer"
                                     v-model="$v.customerIds.$model" @click="chooseId">
                                </div>

                                <div class="error col-sm-12 text-right" v-if="$v.customerIds.$error && !$v.customerIds.required">Please enter a Customer Id's</div>
                              </div>
                         </div>

                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Type Value</label>
                                <div class="col-sm-6 input-group">
                                  <flat-pickr class="form-control"
                                    v-model="scheduleDate"
                                    :config="dateConfig">
                                  </flat-pickr>
                                  <div class="input-group-append">
                                    <div class="input-group-text" title="Toggle" data-toggle>
                                      <i class="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
                                   </div>
                                </div>
                              </div>
                         </div>

                         <div class="col-md-8">
                             <div class="form-group row" :class="{ 'form-group--error': $v.content.$error }">
                                <label for="name" class="col-sm-3
                                    col-form-label text-right">Content</label>
                                <div class="col-sm-9">
                                    <textarea class="form-control"
                                     v-model.trim="$v.content.$model">
                                    </textarea>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.content.$error && !$v.content.required">Please enter the Content</div>
                              </div>
                         </div>
                     </div>
                 </div>
                 <div class="d-flex mb-5">
                <button type="button" class="btn btn-success" @click="submit">Schedule now</button>
                <button type="button" class="btn btn-danger" @click="handleCancel">Cancel</button>
            </div>

    <div class="modal fade" id="idChooseModal" tabindex="-1" style="top:150px;">
        <div class="modal-dialog" style="width: 90%; max-width: 90%;">
          <div class="modal-content" style="border-radius:0px;">
            <div class="modal-header">
              <h5 class="modal-title" style="font-size: 16px;">Customer List</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <i class="fa fa-times-circle-o" aria-hidden="true"></i>
              </button>
            </div>
            <div class="modal-body" style="padding: 10px; margin: 0px">
              <div class="container">
                <div class="row justify-content-md-center">
                   <div class="col-md-auto">
                     <div class="form-group">
                       <div class="upload-btn-wrapper">
                        <CustomerList ref="customerListRef"></CustomerList>
                      </div>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>


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
import DebugMixin from '@/mixins/debug';
import AppLayout from "@/layouts/Merchant.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import flatPickr from "vue-flatpickr-component";
import 'flatpickr/dist/flatpickr.css';
import $ from "jquery";
import moment from "moment";
import { required, maxLength  } from "vuelidate/lib/validators";
import CustomerList from "@/components/Merchant/BroadcastCampaign/CustomerList.vue";


export default {
  name: "BroadcastSchedulecampaignIndex",
  components: {
    AppLayout,
    DataTable,
    CustomerList,
    flatPickr
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
      broadCastId: "",
      broadCastTypeValue: "",
      campaignList: [],
      customerIds: [0],
      content: "",
    scheduleDate: "",
      dateConfig: {
        wrap: true,
        maxDate: "today"
      }
    }
  },
  validations: {
    broadCastId: {
      required,
    },
    broadCastTypeValue: {
      required,
    },
     customerIds: {
      required,
    },
    content: {
      required,

    },
    scheduleDate: {
    }
  },
  methods: {
    chooseId() {
        $('#idChooseModal').modal('toggle')
    },
    submit() {
      this.$v.$touch();
      if(!this.$v.$invalid) {
        let scheduleData = {
          broadCastId: this.broadCastId,
          broadCastTypeValue: this.broadCastTypeValue,
          segmentIds: [],
          tierIds: [],
          customerIds: [],
          scheduleData: [ this.content ]
          //scheduleDate: (this.scheduleDate != "" && this.scheduleDate != null)?(moment(this.scheduleDate).format("YYYY-MM-DD[T]HH:mm:ss.SSS") + "Z"):"",
        }

        let selectedIds = this.$refs.customerListRef.getSelectedIds();
        selectedIds.forEach((ele) => {
          if(ele.segmentSelected) {
            scheduleData.segmentIds.push(ele.segmentId);
          }
          if(ele.tierSelected) {
            scheduleData.tierIds.push(ele.tierId);
          }
          if(ele.customerSelected) {
            scheduleData.customerIds.push(ele.customerId);
          }
        });

        let storeAction = "";
        storeAction = "broadcastcampaign/schedule";
        let cachescope = this;
        this.$store.dispatch(storeAction, scheduleData).then(function(res) {
         cachescope.$toast.open({
              message: "Schedule Campaign successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.$router.push({ path: `/merchantBroadcastCampaign` });
        }).catch(function(err){
          cachescope.submitStatus = "IDLE";
          cachescope.$toast.open({
              message: "Schedule Campaign failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
        });
        cachescope.$router.push({ path: `/merchantBroadcastCampaign` });
      }

    },
    handleCancel() {
       this.$router.push({ path: `/merchantBroadcastCampaign` });
    },
    getCampaignList(id) {
        let cache_obj = this;
        cache_obj.isLoading = true;
        this.$store.dispatch("broadcastcampaign/partner", {
            partnerId: id,
            data: { pageNumber: 1, pageSize: 2000 },
        }).then(function(res) {
            cache_obj.isLoading = false;
            if(res.data) {
                cache_obj.campaignList = res.data;
            }
        });
    }
  },
  mounted() {
    this.partnerId = this.$store.getters["account/getuserid"];

    if(this.partnerId != undefined || this.partnerId != "") {
      this.getCampaignList(this.partnerId);
    }
  }


};
</script>
