<template>
  <app-layout>
    <div class="managemerchant_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'merchanttransactions.index' }">Transactions</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page" v-if="action=='edit'">Edit Transaction</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
        <div class="lock-form" v-if="this.action=='view'">
          <span class="btn btn-primary">
            <i class="fa fa-lock"></i>
          </span>
        </div>
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Transaction Details</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.name.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Name</label>
                                <div class="col-sm-6">
                                  <select class="form-control"
                                     v-model="$v.name.$model">
                                     <option value="" disabled selected hidden>Select</option>
                                        <option v-for="transaction in TransactionList" :value="transaction" v-bind:key="transaction.id">{{transaction.name}}</option>
                                    </select>
                                </div>
                                 <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.name.$error && !$v.name.required">Please Select the name</div>
                                </div>
                         </div>
                                                                                                   <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.points.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Points</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="$v.points.$model"
                                     >
                                </div>
                                
                                 <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.points.$error && !$v.points.required">Please Enter the Points</div>
                                 <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.points.$error && !$v.points.numeric">Please Enter the Valid Points</div>
                              </div>
                         </div>
                        <!--<div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.initiatedBy.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">InitiatedBy</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="$v.initiatedBy.$model"
                                     readonly>
                                </div>
                              </div>
                         </div>
                                                 <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.transactiontype.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Transaction Type</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="$v.transactiontype.$model"
                                     readonly>
                                </div>
                              </div>
                         </div>-->

                     </div>
                    <!--<div class="row">
                                                                          <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.amount.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Amount</label>
                                <div class="col-sm-6" >
                                    <input type="text" class="form-control"
                                     v-model.trim="$v.amount.$model"
                                     readonly>
                                </div>
                              </div>
                         </div>
                                                                          <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.points.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Points</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="$v.points.$model"
                                     readonly>
                                </div>
                                
                              </div>
                         </div>
                                                                                                   <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.newpoints.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Amend Points</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="$v.newpoints.$model">
                                </div>
                                 <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.newpoints.$error && !$v.newpoints.required">Please Enter the value</div>
                                 <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.newpoints.$error && !$v.newpoints.numeric">Please Enter the Numeric value only</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.newpoints.$error && !$v.newpoints.minValue">Please Enter Valid Value</div>
                              </div>
                         </div>

                     </div>-->
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
    <loading :active.sync="isLoading"
       :can-cancel="false"
       :is-full-page="true" :color="loadingbgcolor"></loading>
  </app-layout>
</template>
<style>
</style>

<script>
import AppLayout from "@/layouts/Merchant.vue";
import $ from "jquery";
import DebugMixin from '@/mixins/debug';
import { required, maxLength, numeric, helpers,minValue,between, regex } from "vuelidate/lib/validators";
import MinimalVue from '../../../layouts/Minimal.vue';
import Loading from 'vue-loading-overlay';
import filter from "lodash/filter";
export default {
  name: "ManageEditTransactions",
  components: {
    AppLayout,
    Loading
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
      action: "edit",
      name:"",
      TransactionList:"",
      points:"",
      isLoading: true,
      loadingbgcolor : '#0069d9'

    };
  },
  validations: {
 points: {
   required,
   numeric,

    },
    name:{
      required

    },

  },
    watch : {
    "name": function(newValue,oldValue){
      let cachescope = this;
      //console.log("check new value",newValue.id);
            cachescope.accountId=newValue.id;
     //this.ruleList = [];
     //console.log("list check",this.TransactionList);
      let res = filter(this.TransactionList , row => (row.id == newValue.id));
      //console.log("response",res[0].points);
    //console.log("value check",res.points);
    cachescope.points=res[0].points;

     }
  },
  methods: {
          getTransactionInfo(id) {
      let cachescope = this;
      let cache_obj=this;
      let data_obj={
                partnerId: this.partnerId,
        transactionId:id,
        pageNumber: 1,
        pageSize: 2000,
        data:{

        }

      }
      cachescope.submitStatus = "LOADING";
    this.$store
    
      .dispatch("merchantTxn/getTransaction",data_obj)
      .then(function (res) {
       // console.log(res);
        cache_obj.isLoading = false;
          cachescope.TransactionList = [];
      res.data[0].childTransaction.forEach((transaction) => {
          let templateObj = {};
          templateObj.id = transaction.accountId;
          templateObj.name = transaction.accountName;
          templateObj.points = transaction.points;
          cachescope.TransactionList.push(templateObj);
        });
        //console.log("check data",cachescope.TransactionList);
      })
      .catch(function(err){
        cachescope.$toast.open({
          message: "Edit failed Child Transaction is empty",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/merchanttransactions` });
        cachescope.isLoading = false;
      });
    },

    handleCancel() {
      this.$router.push({ path: `/merchanttransactions` });
    },
    isFormValid() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        return true;
      }
      return false;
    },

        handleSubmit() {
      if (this.isFormValid()) {
        this.isLoading = true;
        let postJson = {
          accountId:this.accountId,
            transactionId:this.transactionId,
          points :this.points,
          partnerId:this.partnerId

        };
       // console.log("check",postJson);


        let storeAction = "";
        let errMsg = { success: "", error: "" };
        errMsg.success = "Customer details updated successfully";
        errMsg.error = "Customer updation failed";
        storeAction = "transaction/TransactionList";

        this.myDebug("JSON:", JSON.stringify(postJson));

        let cachescope = this;

        this.$store
          .dispatch(storeAction, postJson)
          .then(function (res) {
            cachescope.$toast.open({
              message: errMsg.success,
              type: "success",
              duration: 2000,
              dismissible: true,
              position: "top",
            });
            cachescope.isLoading = false;
            cachescope.$router.push({ path: `/merchanttransactions` });
          })
          .catch(function (err) {
            if (Object.prototype.hasOwnProperty.call(err, "status")) {
                if(err.status == 409) {
                    if(err.message != "" && err.message != undefined) {
                        errMsg.error = err.message;
                    }
                }
            }
            cachescope.$toast.open({
              message: errMsg.error,
              type: "error",
              duration: 3000,
              dismissible: true,
              position: "top",
            });
            cachescope.isLoading = false;
          });
      }
    },
  },
  mounted() {
    $(".nav-transaction").addClass("active");
    let cache_obj=this;
    cache_obj.partnerId = this.$store.getters["account/getuserid"];
    let cachescope=this;
        if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }
      if(this.action == "edit" && Object.prototype.hasOwnProperty.call(obj, 'transaction')) {
        /* View or Edit action */
        this.transactionId = this.$route.query.transaction;
        this.getTransactionInfo(this.transactionId);
        
       // console.log("transaction ID CHECK",this.transactionId);
        
      }
      
    }
    

    
  },
};
</script>
