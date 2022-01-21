<template>
 <app-layout>
     <div class="table_container">
       <DataTable :rows="rows" :columns="columns" :config="config" :actions="actions" 
       :dtName="'earnList'" @on-addreward="handleAddNew">
            <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="Edit"  v-on:click='handleEditItem(props.row["id"])'>
                              <i class="fa fa-pencil-square-o"></i>
                          </a>
                          <a class="mx-2 action-icon-btn" title="Redeemed Rewards" v-on:click='handleRedeemedAction(props.row["id"])'>
                              <i class="fa fa-gift"></i>
                          </a>
                         <a class="mx-2 action-icon-btn" title="Assign Customers" v-on:click='handleAssignAction(props.row["id"])'>
                              <i class="fa fa-share"></i>
                          </a>
                      </div>
                   </div>
            </template>
            <template slot="rewardTypeSlot"  slot-scope="props">
               <div>{{ rewardTypeTxt[(props.row["rewardType"])] }}</div>
            </template>
            <template slot="createdAtSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["createdAt"]) }}</div>
            </template>
            <template slot="paginataion-previous-button">
                <i class="fa fa-arrow-left" style="color:#188ae3;" aria-hidden="true"></i>
            </template>
            <template slot="paginataion-next-button">
                <i class="fa fa-arrow-right" style="color:#188ae3;" aria-hidden="true"></i>
            </template>
          <template slot="empty-results" v-if="isLoading"> Fetching records... </template>
           <template slot="empty-results" v-else> No record found! </template>
        </DataTable>
     </div>

    <div class="modal fade" id="assignModal" tabindex="-1" style="top:150px;">
        <div class="modal-dialog">
          <div class="modal-content" style="border-radius:0px;">
            <div class="modal-header">
              <h5 class="modal-title" style="font-size: 16px;">Assign reward</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <i class="fa fa-times-circle-o" aria-hidden="true"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="row justify-content-md-center">
                 <div class="card-body px-0">
                     <div class="row">
                        <div class="col-md-12">
                           <div class="form-group row" :class="{ 'form-group--error': $v.customerSearchType.$error }">
                              <label for="name" class="col-sm-6
                                 col-form-label text-right">Search</label>
                              <div class="col-sm-12">
                                 <select class="form-control" v-model="$v.customerSearchType.$model" @change="handleTypeSelection($event)">
                                        <option value="NAME">Name</option>
                                        <option value="EMAIL">Email</option>
                                        <option value="LOYALTY_CARD_NUMBER">Loyalty number</option>
                                        <option value="MOBILE_NUMBER">Phone number</option>
                                 </select>
                              </div>
                              <div class="error col-sm-12 text-right" v-if="$v.customerSearchType.$error && !$v.customerSearchType.required">Please Select Search type</div>
                           </div>
                        </div>
                        <div class="col-md-6">
                             <div class="form-group row" :class="{ 'form-group--error': $v.customerSearchTypeValue.$error }">
                                <div class="col-sm-12">
                                  <label for="name" class="col-sm-8
                                    col-form-label text-right">Select Customer</label>
                                    <select v-if="this.customerSearchType=='NAME'" class="form-control"
                                     v-model="$v.customerSearchTypeValue.$model">
                                        <option value="">Select</option>
                                        <option v-for="customer in customerList" :value="{ customerId: customer.id, name: customer.userName }" v-bind:key="customer.id">{{customer.userName}}</option>
                                    </select>
                                    <select v-else-if="this.customerSearchType=='EMAIL'" class="form-control"
                                     v-model="$v.customerSearchTypeValue.$model">
                                        <option value="">Select</option>
                                        <option v-for="customer in customerList" :value="{ customerId: customer.id, email: customer.emailId }" v-bind:key="customer.id">{{customer.emailId}}</option>
                                    </select>
                                    <select v-else-if="this.customerSearchType=='MOBILE_NUMBER'" class="form-control"
                                     v-model="$v.customerSearchTypeValue.$model">
                                        <option value="">Select</option>
                                        <option v-for="customer in customerList" :value="{ customerId: customer.id, mobileNumber: customer.mobileNumber }" v-bind:key="customer.id">{{customer.mobileNumber}}</option>
                                    </select>
                                    <select v-else-if="this.customerSearchType=='LOYALTY_CARD_NUMBER'" class="form-control"
                                     v-model="$v.customerSearchTypeValue.$model">
                                        <option value="">Select</option>
                                        <option v-for="customer in customerList" :value="{ customerId: customer.id, loyaltyId: customer.loyaltyId }" v-bind:key="customer.id">{{customer.loyaltyId}}</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.customerSearchTypeValue.$error && !$v.customerSearchTypeValue.required">Please select a Customer</div>
                              </div>
                         </div>
                         <div class="col-md-6">
                             <div class="form-group row" :class="{ 'form-group--error': $v.transactionId.$error }">
                                <label for="name" class="col-sm-8
                                    col-form-label text-right">Select Transaction</label>
                                <div class="col-sm-12">
                                    <select class="form-control"
                                     v-model="$v.transactionId.$model">
                                        <option value="">Select</option>
                                        <option v-for="transaction in transactionList" :value="transaction.transactionId" v-bind:key="transaction.transactionId">{{transaction.transactionId}}</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.transactionId.$error && !$v.transactionId.required">Please select a Transaction</div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                        <div class="col-md-12">
                           <div class="form-group row" :class="{ 'form-group--error': $v.useCustomerPoints.$error }">
                              <div class="col-sm-12 d-flex justify-content-center">
                                 <input v-model="$v.useCustomerPoints.$model" type="checkbox" id="usePointsChbx">
                                 <label for="usePointsChbx">Use customer points</label>
                              </div>
                              <div class="d-flex mb-5">
                                <button type="button" class="btn btn-success" @click="handleSubmit">Submit</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                              </div>
                           </div>
                        </div>
                     </div>

                 </div>
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
.table_container .card {
  border: none;
}
.vbt-table-tools th {
  border-top: none !important;
  border-bottom: none !important;
}
.vbt-table-tools .form-control {
  border: 1px solid #34b8df !important;
  width: 145px;
  height: 31px !important;
}

.has-clear-right .form-control-feedback {
  top: -4px;
  right: -4px;
}

input.form-control[placeholder="ID"] {
  width: 100px;
}
.table_container .card-header {
  display: none;
}
.table_container .card-body {
  padding: 0px;
}
.vbt-column-header {
  border-top: none;
  border-bottom: none;
  background: #34b8df;
  vertical-align: bottom;
  text-align: center;
  font-size: 13px !important;
  border: none !important;
  box-shadow: none;
  font-weight: 500;
}
.card-body tbody tr {
  -webkit-box-shadow: 0 15px 31px #f2f2f2 inset !important;
  box-shadow: 0 15px 31px #f2f2f2 inset !important;
  text-align: center;
  font-size: 13px !important;
  border: none !important;
  font-weight: 400;
}
.action-btn-main .action-icon-btn {
  cursor: pointer;
}
.action-btn-main .action-icon-btn i {
  color: #7f7f7f !important;
  font-size: 18px;
}
.card-footer {
  padding: 0px;
  background-color: inherit;
  border-top: none;
}
.vbt-per-page-dropdown {
  display: none;
}
.vbt-per-page-dropdown ~ .input-group {
  display: none;
}
.page-item {
  color: #000 !important;
  border: none !important;
}
.page-item .page-link {
  color: #000;
  border: none !important;
  background: none !important;
}
.page-link:focus {
  background: none !important;
  box-shadow: none !important;
}
.page-item.active {
  background: #188ae3 !important;
  border-radius: 50%;
  border: none !important;
  /*width: 28px;*/
  height: 28px;
  top: 5px;
  font-size: 11px;
  position: relative;
}
.page-item.disabled .fa-arrow-left,
.page-item.disabled .fa-arrow-right {
  opacity: 0.5 !important;
}
.table-active td {
  padding: 10px 0px;
}
.table-active td .form-group {
  margin: 0px;
}
.table-active td .form-group input {
  background: #eaeaea;
  border-radius: 2px;
}
.table-active td:nth-child(2) input {
  width: 75px;
}
.table-active td:nth-child(3) input {
  width: 200px;
}
.table-active td:nth-child(4) input {
  width: 95px;
}
.table-active td:nth-child(5) input {
  width: 100px;
}
.table-active td:nth-child(6) input {
  width: 75px;
}
.table-active td:nth-child(7) input {
  width: 110px;
}
.table-active td:nth-child(8) input {
  width: 100px;
  padding: 5px !important;
}
.filter_status {
  background: #eaeaea;
  border-radius: 2px;
}
.modal-header{
  background: #34b8df;
    border-radius: 0px;
    color: white;
    font-size: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
}
.modal-header .close{
  color: white !important;
  background: transparent;
  font-size: 24px;
  opacity:1;
}
.modal-header .close i{
  text-shadow: none;
}
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>

<script>
import Vue from "vue";
import DebugMixin from '@/mixins/debug';
import AppLayout from "@/layouts/Admin.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios';
import $ from "jquery";
import moment from "moment";
import filter from "lodash/filter";
import { required  } from "vuelidate/lib/validators";
export default {
  name: "SegmentIndex",
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
     // edit_item_visible: true,
      customerList: {},
      transactionList: {},
      isLoading : true,
      loadingbgcolor : '#0069d9',
      action: "view",
      customerSearchType: "NAME",
      customerSearchTypeValue: "",
      partnerId: null,
      useCustomerPoints: false,
      transactionId: null,
      rewardId: null,
      customerSearchDto: {},
      segmentList: {},
      rewardTypeTxt: {
        CASH_BACK: "Cash back",
        GEO_LOCATION: "Geolocation",
        COUPON: "Coupon code",
        DISCOUNT: "Percentage discount"
      },
      rows: [],
      columns: [
        {
          label: "ID",
          name: "id",
          filter: {
            type: "simple",
            placeholder: "Id",
            showClearButton: false
          }
        },
        {
          label: "Name",
          name: "name",
          filter: {
            type: "simple",
            placeholder: "Name",
            showClearButton: false
          }
        },
        {
          label: "Reward Type",
          name: "rewardType",
          slot_name: "rewardTypeSlot",
          filter: {
            type: "simple",
            placeholder: "Type",
            showClearButton: false
          }
        },
        {
          label: "Cost in points",
          name: "rewardValue",
          filter: {
            type: "simple",
            placeholder: "points",
            showClearButton: false
          }
        },
        {
          label: "Limit",
          name: "limit",
          filter: {
            type: "simple",
            placeholder: "Limit",
            showClearButton: false
          }
        },
        {
          label: "Limit per customer",
          name: "limitPerCustomer",
          filter: {
            type: "simple",
            placeholder: "Customer",
            showClearButton: false
          }
        },
        {
          label: "Coupon count",
          name: "couponCount",
          filter: {
            type: "simple",
            placeholder: "Count",
            showClearButton: false
          }
        },
        {
          label: "Redeemed count",
          name: "redeemedCount",
          filter: {
            type: "simple",
            placeholder: "Count",
            showClearButton: false
          }
        },
        {
          label: "Created at",
          name: "createdAt",
          slot_name: "createdAtSlot",
          filter: {
            type: "simple",
            placeholder: "Date",
            showClearButton: false
          }
        },
        {
          label: "Actions",
          name: "action",
          slot_name: "actionpnl"
        }
      ],
      actions: [
        {
          btn_text: "Add Reward",
          event_name: "on-addreward",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg"
          }
        }
      ],
      config: {
        checkbox_rows: false,
        rows_selectable: false,
        show_refresh_button: false,
        show_reset_button: false,
        highlight_row_hover: false,
        per_page: 10,
        global_search: {
          placeholder: "Search",
          showClearButton: false
        }
      }
    };
  },
  validations: {
    transactionId: {
      required
    },
    customerSearchTypeValue: {
      required,
    },
    useCustomerPoints: {

    },
    customerSearchType: {
      required,
    }
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
    getCustomerList() {
      let cachescope = this;
      let storeAction = "";
      storeAction = "customer/init";
      let param={
        partnerId:this.partnerId

      }
      this.$store.dispatch(storeAction ,param).then(function(res) {
        cachescope.isLoading = false;

       // cachescope.myDebug(JSON.stringify(res));
        cachescope.customerList = [];
        res.data.forEach((customer) => {
          let customerObj = {};
          customerObj.id = customer.id;
          customerObj.userName = customer.userName;
          customerObj.emailId = customer.emailId;
          customerObj.mobileNumber = customer.mobileNumber;
          customerObj.loyaltyId = customer.loyaltyId;
          cachescope.customerList.push(customerObj);
          
        });
      });
    },
    getTransactionList() {
      let cachescope = this;
      let storeAction = "";
      cachescope.isLoading = true;
      storeAction = "transaction/Assigncustomertransaction";
      
      this.$store.dispatch(storeAction,this.partnerId ).then(function(res) {
       // cachescope.myDebug(JSON.stringify(res));
        cachescope.isLoading = false;
        cachescope.transactionList = [];
         res.data.forEach((transaction) => {
          let transactionObj = {};
          transactionObj.transactionId = transaction.transactionId;
          cachescope.transactionList.push(transactionObj);
        });
        cachescope.isLoading = false;
      });

    },
    handleAddNew: function() {
      Vue.router.push({ path: `/manageReward/?action=create` });
    },
    handleEditItem: function(id) {
      this.myDebug("Edit Item", id);
      let path = `/manageReward/?action=edit&reward=${id}`;
      Vue.router.push({ path: path });
    },
    handleRedeemedAction: function(id) {
      this.myDebug("Show rewards for reward", id);
      let path = `/redeem/?reward=${id}`;
      this.myDebug("nextck", id);
      Vue.router.push({ path: path });
    },
    handleAssignAction: function(id) {
      this.customerSearchType = "NAME";
      this.customerSearchTypeValue = "";
      this.transactionList = [];
      this.transactionId = "";
      $('#assignModal').modal('toggle')
      let path = `/rewardcampaign/?reward=${id}`;
      Vue.router.push({ path: path });
    },
    handleSubmit: function(){
     if(this.isFormValid()){
      $('#assignModal').modal('toggle')
      if(this.$route.query) {
        let obj = this.$route.query;
        if(Object.prototype.hasOwnProperty.call(obj, 'reward')) {
          this.rewardId = parseInt(this.$route.query.reward);
        }
      }

      let postJson = {
        data: {
          customerId: this.customerSearchTypeValue.customerId,
          transactionId: this.transactionId,
          rewardId: this.rewardId,
          useCustomerPoints: this.useCustomerPoints
        }
        };
        postJson.partnerId = this.partnerId;
        let storeAction = "";
        if(this.action == "view") {
        storeAction = "reward/partner";
        let errMsg = { success: "", error: "" };
        errMsg.success = "Assign Reward to Customer successfully";
        errMsg.error = "Assign Reward to Customer failed";
        let cachescope = this;
        this.isLoading = true;
        this.myDebug("JSON:", JSON.stringify(postJson));
        this.$store.dispatch(storeAction, postJson).then(function(res) {
          cachescope.$toast.open({
              message: errMsg.success,
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading = false;
          cachescope.$router.push({ path: `/rewardcampaign` });
        }).catch(function(err){
          if (Object.prototype.hasOwnProperty.call(err, "status")) {
                if(err.status == 409) {
                    if(err.message != "" && err.message != undefined) {
                        errMsg.error = err.message;
                    }
                }
            }
          cachescope.$toast.open({
              message:  errMsg.error,
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
              cachescope.isLoading = false;
              cachescope.$router.push({ path: `/rewardcampaign` });
        });
        }
     }
    },
    handleTypeSelection(event) {
      this.customerSearchTypeValue = "";
    },
    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD"):"" );
    },

    isFormValid() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        return true;
      }
      return false;
    }
  },
  watch : {
    customerSearchTypeValue : function(newValue, oldValue) {
      this.transactionId = "";
      if(this.customerSearchTypeValue == "" || this.customerSearchTypeValue == undefined) {
        this.transactionList = [];
      } else {
        this.getTransactionList();
      }
    }
  },
  mounted() {
    $(".nav-reward").addClass("active");
    this.partnerId  = this.$store.getters["account/getuserid"];
    this.getCustomerList();

    let cache_obj = this;

    if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }
      if(this.action == "view" && Object.prototype.hasOwnProperty.call(obj, 'tier')) {
        let tierId = this.$route.query.tier;
        this.$store.dispatch("reward/tierInit",{
tierId,
partnerId:this.partnerId,
        } ).then(function(res) {
          cache_obj.isLoading = false;
         // cache_obj.myDebug(JSON.stringify(res));
          if(res.data) {
            cache_obj.rows = res.data;
          }
        });
      } else if(this.action == "view" && Object.prototype.hasOwnProperty.call(obj, 'segment')) {
        let segmentId = this.$route.query.segment;
        this.$store.dispatch("reward/segmentInit", segmentId).then(function(res) {
          cache_obj.isLoading = false;
         // cache_obj.myDebug(JSON.stringify(res));
          if(res.data) {
            cache_obj.rows = res.data;
          }
        });
      } else {
        /* Default: Show all rewards */
        this.$store.dispatch("reward/init",this.partnerId).then(function(res) {
          cache_obj.isLoading = false;
         // cache_obj.myDebug(JSON.stringify(res));
          if(res.data) {
            cache_obj.rows = res.data;
          }
        });
      }
    }
  }
};
</script>
