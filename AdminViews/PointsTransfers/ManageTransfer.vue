<template>
  <app-layout>
    <div class="managetransfer_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'pointstransfer.index' }">Points Transfers</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page" v-if="action=='edit'">Edit Transfers</li>
                        <li class="breadcrumb-item active" aria-current="page" v-else-if="action=='view'">View Transfers</li>
                        <li class="breadcrumb-item active" aria-current="page" v-else>Add Transfers</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0" v-if="action=='edit'"><i class="icon
                            icon-rewardcampaigns"></i> Edit Transfers</h2>
                    <h2 class="mb-0" v-else-if="action=='view'"><i class="icon
                            icon-rewardcampaigns"></i> View Transfers</h2>
                    <h2 class="mb-0" v-else><i class="icon
                            icon-rewardcampaigns"></i> Add Transfers</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.sourceAccountType.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Source Account Type *</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.sourceAccountType.$model"
                                     @change="handleAccountTypeChange('SA')" @click="put()"
                                      :disabled="this.action =='view' || this.action === 'edit'">
                                        <option value="">Select</option>
                                        <option  id="system" value="SYSTEM">System</option>
                                        <option   id="customer" value="CUSTOMER">Customer</option>
                                        <option    id="merchant" value="MERCHANT">Merchant</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.sourceAccountType.$error && !$v.sourceAccountType.required">Please select a source account type</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.sourceAccountName.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Source Account Name *</label>
                                <div class="col-sm-6">
                                    <multiselect
                                        :disabled="sourceAccountType == ''|| this.action == 'edit'|| this.action =='view'"
                                        placeholder="Search"
                                        open-direction="bottom"
                                        :multiple="false"
                                        :searchable="true"
                                        :internal-search="false"
                                        :clear-on-select="false"
                                        :close-on-select="true"
                                        :options-limit="300"
                                        :max-height="600"
                                        :show-no-results="false"
                                        :show-labels="false"
                                        :hide-selected="false"
                                        :preserve-search="true"
                                        :loading="srcAccountDataisLoading"
                                        :options="sourceAccountList"
                                        track-by="userAssociationId"
                                        @search-change="asyncFind($event, 'SA', 3)"
                                        :custom-label="customLabel"
                                        v-model="$v.sourceAccountName.$model"
                                        @select="onAccountSelect($event, 'SA')"
                                        :class="{'is-invalid': $v.sourceAccountName.$error}">
                                    </multiselect>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.sourceAccountName.$error && !$v.sourceAccountName.required">Please enter source account name</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.sourceAccountNumber.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Source Account *</label>
                                <div class="col-sm-6">
                                  <input type="text" class="form-control"
                                    v-model="$v.sourceAccountNumber.$model"
                                     readonly>
                                  <!---  <select class="form-control"
                                     v-model="$v.sourceAccountNumber.$model"
                                     :disabled="this.action === 'edit'|| this.action === 'view'">
                                     <option value="" v-if="sourceAccountNumberList.length != 1">Select</option>
                                     <option v-for="account in sourceAccountNumberList" :value="account.id" v-bind:key="account.id">{{account.id}}</option>
                                    </select>--->
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.sourceAccountNumber.$error && !$v.sourceAccountNumber.required">Please select a source account number</div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.destinationAccountType.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Destination Account Type *</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.destinationAccountType.$model"
                                     @change="handleAccountTypeChange('DA')" @click="get()"
                                     :disabled="this.action =='view'">
                                        <option value="" selected>Select</option>
                                        <option  id="gg" value="SYSTEM">System</option>
                                        <option    id="rr" value="CUSTOMER">Customer</option>
                                        <option   id="tt" value="MERCHANT">Merchant</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.destinationAccountType.$error && !$v.destinationAccountType.required">Please select a destination account type</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row"  :class="{ 'form-group--error': $v.destinationAccountName.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Destination Account Name *</label>
                                <div class="col-sm-6">
                                    <multiselect
                                        :disabled="destinationAccountType == ''|| this.action =='view'"
                                        placeholder="Search"
                                        open-direction="bottom"
                                        :multiple="false"
                                        :searchable="true"
                                        :internal-search="false"
                                        :clear-on-select="false"
                                        :close-on-select="true"
                                        :options-limit="300"
                                        :max-height="600"
                                        :show-no-results="false"
                                        :show-labels="false"
                                        :hide-selected="false"
                                        :preserve-search="true"
                                        :loading="dstAccountDataisLoading"
                                        :options="dstAccountList"
                                        track-by="userAssociationId"
                                        @search-change="asyncFind($event, 'DA', 3)"
                                        :custom-label="customLabel"
                                        v-model="$v.destinationAccountName.$model"
                                        @select="onAccountSelect($event, 'DA')"
                                        :class="{'is-invalid': $v.destinationAccountName.$error}">
                                    </multiselect>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.destinationAccountName.$error && !$v.destinationAccountName.required">Please enter destination account name</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.destinationAccountNumber.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Destination Account *</label>
                                <div class="col-sm-6">
                                  <!--  <select class="form-control"
                                     v-model="$v.destinationAccountNumber.$model"
                                     :disabled="this.action =='view'">
                                     <option value="" v-if="dstAccountNumberList.length != 1">Select</option>
                                     <option v-for="account in dstAccountNumberList" :value="account.id" v-bind:key="account.id">{{account.id}}</option>
                                    </select>-->
                                    <input type="text" class="form-control"
                                    v-model="$v.destinationAccountNumber.$model"
                                     readonly>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.destinationAccountNumber.$error && !$v.destinationAccountNumber.required">Please select a destination account number</div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.transferType.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Type *</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.transferType.$model"
                                 :disabled="this.action =='view' || this.action == 'edit'">
                                        <option value="" selected>Select</option>
                                        <option value="TRANSFER">Transfer</option>
                                        <option value="SPEND">Spend</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.transferType.$error && !$v.transferType.required">Please select a transfer type</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.points.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Points</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="$v.points.$model"
                               :disabled="this.action =='view' || this.action === 'edit'">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.points.$error && !$v.points.required">Please enter points to be transferred</div>
                                <div class="error col-sm-12 text-right" v-if="$v.points.$error && !$v.points.numeric">Please enter a valid point</div>
                              </div>
                         </div>

                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.remarks.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Remarks *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="$v.remarks.$model"
                                     :disabled="this.action =='view'">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.remarks.$error && !$v.remarks.required">Please enter transaction remarks</div>
                                <div class="error col-sm-12 text-right" v-if="$v.remarks.$error && !$v.remarks.maxLength">Maximum allowed length is 100 characters</div>
                              </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
        <div v-if="this.action!='view'">
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

<script>
import AppLayout from "@/layouts/Admin.vue";
import $ from "jquery";
import DebugMixin from '@/mixins/debug';
import { required, maxLength, numeric, alphaNum, helpers, regex } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import Loading from 'vue-loading-overlay';

export default {
  name: "ManageTransfer",
  components: {
    AppLayout,
    Loading,
    Multiselect
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
        action: "create",
        transferId: "",
        sourceAccountType: "",
        sourceAccountNumber: "",
        userId:"",
        sourceAccountName: "",
        destinationAccountType: "",
        destinationAccountNumber: "",
        destinationAccountName: "",
        oldDestinationAccountNumber: "",
        sourceUserAssociationId:"",
        destinationUserAssociationId:"",
        newDestinationUserAssociationId:null,
        transferType: "",
        points: 0,
        oldPoints: 0,
        remarks: "",
        sourceAccountList: [],
        sourceAccountNumberList: [],
        srcAccountDataisLoading: false,
        dstAccountList: [],
        dstAccountNumberList: [],
        dstAccountDataisLoading: false,
        isLoading: false,
        loadingbgcolor : '#0069d9'
    };
  },


  validations: {
    sourceAccountType: {
      required
    },
    sourceAccountNumber: {
      required,
    },
    sourceAccountName: {
      required
    },
    destinationAccountType: {
      required
    },
    destinationAccountNumber: {
      required,
    },
    destinationAccountName: {
      required
    },
    transferType: {
      required
    },
    points: {
      required,
      numeric
    },
    remarks: {
      required,
      maxLength: maxLength(100)
    }
  },

watch : {
    "sourceAccountType": function(newValue,oldValue){
      
      let cachescope = this;
      let cacheScope=this;
      cachescope.Source=newValue;
     // console.log("new valjdjjhdjk",this.Source);
this.get(this.Source)
     },

 "destinationAccountType": function(newValue,oldValue){
      
      let cachescope = this;
      let cacheScope=this;
      cachescope.dsa=newValue;
     // console.log(" valjdjjhdjk",this.dsa);
this.put(this.dsa)
     },

},
  
  methods: {
    get(){
      if(this.Source=="CUSTOMER"){
        $('#rr').hide();
          $('#tt').show();
           $('#gg').show();
      }

       if(this.Source=="MERCHANT"){
       
         $('#rr').show();
          $('#gg').show();
      };
       if(this.Source=="SYSTEM"){
          
          $('#tt').show();
           $('#rr').show();
      }
     },
 put(){
      if(this.dsa=="CUSTOMER"){
        $('#customer').hide();
          $('#merchant').show();
           $('#system').show();
      }

       if(this.dsa=="MERCHANT"){
      
         $('#customer').show();
          $('#system').show();
      };
       if(this.dsa=="SYSTEM"){
           
          $('#merchant').show();
           $('#customer').show();
      }
     },



    getPointInfo(id) {
      let cachescope = this;
      cachescope.isLoading = true;
      console.log("gg",this.partnerId)
      let dataobj={
      transferId:this.transferId,
  partnerId:this.partnerId
      }
      this.$store.dispatch("points/get", dataobj
        
      
        ).then(function(res) {
        //cachescope.myDebug(JSON.stringify(res));
        //console.log("sourceaccount check",res);
        cachescope.sourceAccountType = res.sourceUserType;
        cachescope.destinationAccountType = res.targetUserType;
        if(res.transactionType == "NORMAL"){
          cachescope.transferType = "TRANSFER";
        }else{
          cachescope.transferType = "SPEND";
        }
        cachescope.points = cachescope.oldPoints = res.amount;
        cachescope.remarks = res.remarks;

        let srcNameObj = {
            id: res.sourceUserName,
            userName: res.sourceUserName
        };
        cachescope.sourceAccountList = [];
        cachescope.sourceAccountList.push(srcNameObj);
        cachescope.sourceAccountName = cachescope.sourceAccountList[0];

        let dstNameObj = {
            id: res.targetUserName,
            userName: res.targetUserName
        };
        cachescope.dstAccountList = [];
        cachescope.dstAccountList.push(dstNameObj);
        cachescope.destinationAccountName = cachescope.dstAccountList[0];

        let srcNumberObj = {
            id: res.sourceAccount
        };
        cachescope.sourceAccountNumberList = [];
        cachescope.sourceAccountNumberList.push(srcNumberObj);
        cachescope.sourceAccountNumber = res.sourceAccount;

        let dstNumberObj = {
            id: res.targetAccount
        };
        cachescope.dstAccountNumberList = [];
        cachescope.dstAccountNumberList.push(dstNumberObj);
        cachescope.oldDestinationAccountNumber = cachescope.destinationAccountNumber= res.targetAccount;

        cachescope.srcAccountDataisLoading = false;
        cachescope.dstAccountDataisLoading = false;
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Points Transfer edit failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.isLoading = false;
      });
    },
    handleAccountTypeChange(type) {
        if(type === "SA") {
            this.srcAccountDataisLoading = false;
            this.sourceAccountList = [];
            this.sourceAccountNumberList = [];
            this.sourceAccountNumber = "";
            this.sourceAccountName = "";
        } else if(type === "DA") {
            this.dstAccountDataisLoading = false;
            this.dstAccountList = [];
            this.dstAccountNumberList = [];
            this.destinationAccountNumber = "";
            this.destinationAccountName = "";
        }
    },
    customLabel: function(option) {
        return option.userName;
    },
    onAccountSelect: function(option, type) {

        let opts = [];

        let cachescope = this;
        let param = {}

        if(type === "SA") {
            this.srcAccountDataisLoading = true;
            this.sourceAccountNumberList = [];
            param.id = option.userAssociationId;
            param.accountType = this.sourceAccountType;
        } else if(type === "DA") {
            this.dstAccountDataisLoading = true;
            this.dstAccountNumberList = [];
            param.id = option.userAssociationId;
            param.accountType = this.destinationAccountType;
        }

        this.$store.dispatch("accountManage/accountList", param).then(function(res) {

         // cachescope.userAssociationId=res[0].id
          //console.log("check", cachescope.userAssociationId);
            res.forEach((item, index) => {
                let accountObj = {};
                accountObj.id = item.accountId;
                opts.push(accountObj);
            });
            if(type === "SA") {
                cachescope.sourceAccountNumberList = opts;
                if(cachescope.sourceAccountNumberList.length == 1) {
                    cachescope.sourceAccountNumber = cachescope.sourceAccountNumberList[0].id;
                }
                cachescope.srcAccountDataisLoading = false;
            } else if(type === "DA") {
                cachescope.dstAccountNumberList = opts;
                if(cachescope.dstAccountNumberList.length == 1) {
                    cachescope.destinationAccountNumber = cachescope.dstAccountNumberList[0].id;
                }
                cachescope.dstAccountDataisLoading = false;
            }
        });
    },
    asyncFind (query, type, minLen) {
        if(query.length < minLen) {
            return;
        }

        let opts = [];

        let cachescope = this;
        let param = {};

        if(type === "SA") {
            this.srcAccountDataisLoading = true;
            this.sourceAccountList = [];
            param.key = query;
            param.accountType = this.sourceAccountType;
        } else if(type === "DA") {
            this.dstAccountDataisLoading = true;
            this.dstAccountList = [];
            param.key = query;
            param.accountType = this.destinationAccountType;
        }

        this.$store.dispatch("user/search", param).then(function(res) {
            res.forEach((item, index) => {
                opts.push(item);
            });
            if(type === "SA") {
                cachescope.sourceAccountList = opts;
                cachescope.srcAccountDataisLoading = false;
            } else if(type === "DA") {
                cachescope.dstAccountList = opts;
               // console.log("check",cachescope.dstAccountList[0].userAssociationId)
                cachescope.dstAccountDataisLoading = false;
            }
        });
    },
    handleSubmit() {
      if(this.isFormValid()) {
        this.isLoading = true;
        let postJson = {
          //sourceAccountType: this.sourceAccountType,
          //sourceAccountName: this.sourceAccountName.userName,
          //destinationAccountType: this.destinationAccountType,
         // destinationAccountName: this.destinationAccountName.userName,
         // transferType: this.transferType,
          remarks: this.remarks
        }

        let storeAction = "";
        if(this.action == "create") {
          postJson.destinationAccountName= this.destinationAccountName.userName,
          postJson.sourceAccountType= this.sourceAccountType,
           postJson.destinationAccountType= this.destinationAccountType
           postJson.sourceUserAssociationId=this.sourceAccountList[0].userAssociationId
           postJson.destinationUserAssociationId=this.dstAccountList[0].userAssociationId
          postJson.sourceAccountName= this.sourceAccountName.userName,
          postJson.sourceAccountNumber = this.sourceAccountNumber;
          postJson.destinationAccountNumber = this.destinationAccountNumber;
          postJson.transferType= this.transferType,
          postJson.points = this.points;
         //  postJson.partnerId = this.partnerId;
          storeAction = "points/add";
        } else if(this.action == "edit") {
          postJson.transactionId=this.transferId
         // postJson.destinationAccountType= this.destinationAccountType,
         // postJson.oldSourceAccountId = this.sourceAccountNumber;
          postJson.newDestinationAccountType= this.destinationAccountType,
          postJson.newDestinationUserAssociationId=this.dstAccountList[0].userAssociationId || 0,
        //  postJson.oldDestinationAccountId = this.oldDestinationAccountNumber;
          postJson.newDestinationAccountId = this.destinationAccountNumber;
          postJson.oldPoints = this.oldPoints;
          postJson.newPoints = parseInt(this.points);
         //  postJson.partnerId = this.partnerId;
          storeAction = "points/update";
        } else {
            this.myDebug("Invalid action");
            return;
        }

        this.myDebug("JSON:", JSON.stringify(postJson));

        /* TODO: Add a loading spinner */
        let cachescope = this;

        this.$store.dispatch(storeAction, postJson).then(function(res) {
          cachescope.$toast.open({
              message: "Points transfer created successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading = false;
          cachescope.$router.push({ path: `/pointstransfer` });
        }).catch(function(err){
          let message=err.message;
          cachescope.$toast.open({
              message:message,
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading = false;
        });
      }
    },
    handleCancel() {
      this.$router.push({ path: `/pointstransfer` });
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
    $(".nav-transfer").addClass("active");
      let cache_obj = this;
     cache_obj.partnerId  = this.$store.getters["account/getuserid"];
      
    if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }
      if(this.action != "create" && Object.prototype.hasOwnProperty.call(obj, 'transfer')) {
        /* View or Edit action */
        this.transferId = this.$route.query.transfer;
      }
    }

    if(this.action == "view") {
      /* TODO :: ADD A VIEWABLE layer on top */
    }

    if((this.action != "create") && (this.transferId != undefined)) {
        this.getPointInfo(this.transferId,this.partnerId);
    }
  }
};
</script>
