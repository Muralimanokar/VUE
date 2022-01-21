<template>
  <app-layout>
    <div class="manageearningrule_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'earningrule.index' }">Earning Rule</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page" v-if="action=='create'">Earning Rule Template</li>
                        <li class="breadcrumb-item active" aria-current="page" v-else>Edit Earnig Rule Template</li>

                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Earning Rule Template</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.templatename.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Template Name *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="$v.templatename.$model"/>
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.templatename.$error && !$v.templatename.required">Template name should not be empty</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.templatename.$error && !$v.templatename.minLength">Minimum allowed length is 4 characters</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.templatename.$error && !$v.templatename.maxLength">Maximum allowed length is 32 characters</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.templatename.$error && !$v.templatename.regex">Please enter a valid value</div>
                             </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.merchat.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Merchant *</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model.trim="$v.merchat.$model">
                                        <option value="">Select</option>
                                        <option v-for="row in merchatList" :value="row.id" v-bind:key="row.id">{{row.name}}</option>
                                    </select>
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.merchat.$error && !$v.merchat.required">Merchant name should not be empty</div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                        <!-- <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">POS</label>
                                <div class="col-sm-6">
                                    <select class="form-control">
                                        <option>Select</option>
                                    </select>
                                </div>
                              </div>
                         </div>-->
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.copyFromId.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Copy From</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model.trim="$v.copyFromId.$model">
                                        <option value="">Select</option>
                                        <option v-for="row in templateList" :value="row.id" v-bind:key="row.id">{{row.name}}</option>
                                    </select>
                                </div>
                                <!--div class="error col-sm-12 text-right" v-if="$v.copyFromId.$error && !$v.copyFromId.required">Select Copy From</!--div-->
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
                                        <input type="checkbox" id="customSwitch2" class="custom-control-input" v-model="status">
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
                <button type="button" @click="save" class="btn btn-success">Submit</button>
                <button type="button" @click.prevent="cancel" class="btn btn-danger">Cancel</button>
            </div>
        </div>
    </div>
     <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true" :color="loadingbgcolor"></loading>
  </app-layout>
</template>

<style>
.vue-treeselect__control {
  border: 1px solid #7e7e7e !important;
}
.vue-treeselect__control-arrow,
.vue-treeselect__placeholder {
  color: #7e7e7e;
}
</style>

<script>
import Vue from 'vue';
import AppLayout from "@/layouts/Admin.vue";
import { validationMixin } from "vuelidate";
import {
  required,
  requiredIf,
  minLength,
  maxLength,
  between,
  email,
  helpers,
  regex
} from "vuelidate/lib/validators";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import filter from "lodash/filter";
import $ from "jquery";
export default {
  name: "ManageEarningRules",
  components: {
    AppLayout,
    Loading
  },
  data: function() {
    return {
      isLoading: true,
      loadingbgcolor: "#0069d9",
      action: "create",
      ruleId: null,
      copyFromId: null,
      templateid : null,
      templatename : null,
      merchat : null,
      status : true,
      merchatList: [],
      templateList:[],
      Pos: [0],

    };
  },
  validations: {
    templatename: {
      required,
      maxLength: maxLength(32),
      minLength: minLength(4),
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
    },
    merchat : {
       required
    },
    copyFromId : {
    },

  },
  methods: {

    getrule(id){
         let cacheScope = this;
         let dataobj={
           id:this.id,
           partnerId:this.partnerId
         }
         console.log("jj",dataobj)
         this.$store.dispatch("earningrule/getadminrule", dataobj).then(function(res) {
             cacheScope.isLoading = false;
             let row = filter(res.data, row);
            if(row){
                cacheScope.templatename = row[0].name;
                cacheScope.merchat = row[0].partnerId;
                cacheScope.status = row[0].status;
            }
         });
      },
    loadmerchant() {
      let cacheScope = this;
      this.$store.dispatch("merchant/adminMerchantList").then(function(res) {
        cacheScope.isLoading = false;
        let listobj = res.data.map(row => ({
          id: row.id,
          name: row.userName
        }));
        cacheScope.merchatList = listobj;
      });
    },
    loadtempaltedetails(stemplateid){
      let cacheScope = this;
      this.$store.dispatch("earningrule/earningrulelistAdmin",this.partnerId).then(function(res) {
        cacheScope.isLoading = false;
        let listobj = res.data.map(row => ({
          id: row.id,
          name: row.name
        }));
        cacheScope.templateList = listobj;
        if(cacheScope.action == "edit") {
            //Remove the current chosen template
            cacheScope.templateList.splice(cacheScope.templateList.findIndex(el => el.id == stemplateid), 1);
        }
      });

    },
    isFormValid() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
            return true;
        }
        return false;
    },
    save() {
        if(this.isFormValid()) {

           let dataobj = {
                "name": this.templatename,
                "partnerId": this.merchat,
                "copyFromId": this.copyFromId,
                "posIdList": this.Pos,
                "isActive": this.status
           };
           let storeAction = "";
           this. isLoading = true;
        if(this.action == "create") {
        storeAction = "earningrule/createTemplate";
        let cachescope = this;
        this.$store.dispatch(storeAction, dataobj).then(function(res) {
          cachescope.$toast.open({
              message: "Earning Rule Template created successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading = false;
          cachescope.$router.push({ path: `/earningrule` });
        }).catch(function(err){
          cachescope.submitStatus = "IDLE";
          cachescope.$toast.open({
              message: "Earning Rule Template creation failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading = false;
          cachescope.$router.push({ path: `/earningrule` });
        });
        } else if(this.action == "edit") {
          dataobj.id = this.id;
          storeAction = "earningrule/updateTemplate";
          let cachescope = this;
        this.$store.dispatch(storeAction, dataobj).then(function(res) {
          cachescope.$toast.open({
              message: "Earning Rule Template Updated successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading = false;
          cachescope.$router.push({ path: `/earningrule` });
        }).catch(function(err){
          cachescope.submitStatus = "IDLE";
          cachescope.$toast.open({
              message: "Earning Rule Template Update failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading=false;
          cachescope.$router.push({ path: `/earningrule` });
        });
        }
        }
    },
    cancel: function() {
        this.$router.push({ path: `/earningrule` });
    }
  },
  created() {

    this.loadmerchant();


  },
  mounted() {
    $(".nav-earningrule").addClass("active");
let cache_obj=this;
    cache_obj.partnerId  = this.$store.getters["account/getuserid"];
    if(this.partnerId == undefined || this.partnerId == "") {
        return;
    }

    if (this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }


      if(this.action == "edit" && Object.prototype.hasOwnProperty.call(obj, 'earningrule')) {
        this.id = parseInt(this.$route.query.earningrule);
        this.getrule(this.id);
      }

      if (Object.prototype.hasOwnProperty.call(obj, "templateid")) {
        this.templateid = this.$route.query.templateid;
      }
      this.loadtempaltedetails(this.id);
    }

  }

};
</script>
