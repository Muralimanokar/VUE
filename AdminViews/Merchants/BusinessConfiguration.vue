<template>
  <app-layout>
    <div class="managemerchant_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'home.index' }">Home</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'merchant.index' }">Merchant</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Business Configuration</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Earning Points</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" >
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Points value</label>
                                <div class="col-sm-6">
                                    <input type="number" min="1" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"  class="form-control" v-model.trim="pointsvalue" >
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Earning Type</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model.trim="earningtype">
                                        <option value="">Select</option>
                                        <option value="EARNING_RULE">EARNING_RULE</option>
                                        <option value="PERCENTAGE">PERCENTAGE</option>
                                    </select>
                                </div>
                              </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
        <div class="form-section">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Subscription Configuration</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Profit Type</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model="profittype" @change="handletype()">
                                        <option value="">Select</option>
                                        <option value="PER_TRANSACTION">PER_TRANSACTION</option>
                                        <option value="VOLUME_OF_TRANSACTION">VOLUME_OF_TRANSACTION</option>
                                        <option value="PER_MONTH">PER_MONTH</option>
                                        <option value="PER_YEAR">PER_YEAR</option>
                                    </select>
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4" id="one">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Profit value</label>
                               
                                <div class="col-sm-6">
                                    <input type="number"  min="1" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" class="form-control" v-model="profitvalue" >
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4" id="three">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right"> Points used</label>
                                <div class="col-sm-6">
                                    <input type="number"  min="1" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" class="form-control" v-model="points" readonly >
                                </div>
                              </div>
                         </div>
                          <div class="col-md-4" id="two">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Maximum allowed Points</label>
                                <div class="col-sm-6">
                                    <input type="number" min="1" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"  class="form-control" v-model="maximumpoints"  >
                                </div>
                              </div>
                         </div>
                          
                            <div class="col-md-4" >
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Number of Transactions</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model="usedvalue" readonly id="four">
                                </div>
                              </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
        <div class="form-section">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Invoicing</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.invoicingfrq.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Invoicing frequency</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model.trim="$v.invoicingfrq.$model">
                                        <option value="">Select</option>
                                        <option value="EVERY_X_POINTS_USAGE">EVERY_X_POINTS_USAGE</option>
                                        <option value="EVERY_N_DAYS">EVERY_N_DAYS</option>
                                        <option value="END_OF_CALENDER_WEEK">END_OF_CALENDER_WEEK</option>
                                        <option value="END_OF_EVERY_MONTH">END_OF_EVERY_MONTH</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.invoicingfrq.$error && !$v.invoicingfrq.required">Please select a invoicing frequency</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.invoicingfrqvalue.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Invoicing frequency value</label>
                                <div class="col-sm-6">
                                    <input type="number"  min="1" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"  class="form-control" v-model.trim="$v.invoicingfrqvalue.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.invoicingfrqvalue.$error && !$v.invoicingfrqvalue.required">Please select a invoicing frequency value</div>
                              </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
        <div>
            <div class="d-flex mb-5">
                <button type="button" class="btn btn-success"  @click="handleSubmit">Submit</button>
                <button type="button" class="btn btn-danger" @click="handleCancel">Cancel</button>
            </div>
        </div>
    </div>
    <!--loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true" :color="loadingbgcolor"></!--loading-->
  </app-layout>
</template>

<style>
.input-group i {
  cursor: pointer;
}
.form-group--error .error {
  font-size: 13px;
  color: #f79483;
  margin-top: 4px;
}
</style>

<script>
import Vue from "vue";
import AppLayout from "@/layouts/Admin.vue";
import { validationMixin } from "vuelidate";
import { required, minLength, between, email } from "vuelidate/lib/validators";
import Loading from 'vue-loading-overlay';
import "vue-loading-overlay/dist/vue-loading.css";
import $ from "jquery";
export default {
  name: "BusinessConfigurarion",
  components: {
    AppLayout,
    Loading
  },
  data: function() {
    return {
        isLoading: true,
        loadingbgcolor: "#0069d9",
        pointsvalue : null,
        earningtype : null,
        maximumpoints:'',
        points:null,
        Transactions:null,
        profittype : null,
        profitvalue : null,
        invoicingfrq : null,
        usedvalue:null,
        invoicingfrqvalue : null,
        id : null,
        action : "add",
    };
  },
  validations: {
      invoicingfrq : {
          required
      },
      invoicingfrqvalue : {
          required
      }
  },
  methods : {
      handletype(){
        if(this.profittype=="PER_TRANSACTION"){
             $('#three').show();
             $('#two').show();
             $('#four').show();
             $('#one').hide();
          }
        else{
             $('#one').show();
             $('#four').show();
             $('#three').hide();
             $('#two').hide();
          }
      },
      isFormValid() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
            return true;
        }
        return false;
      },
      handleSubmit : function(){
        if(this.isFormValid()){
            this.savebusinessconf();
                 if(this.profittype=="PER_TRANSACTION"){
          this.maximumAllowedPoints=this.maximumpoints;
        }
        else{
         this.maximumAllowedPoints=null;

        }
        }
      },
      handleCancel : function(){
         Vue.router.push({ path: `/merchant`});
      },
      loadbusinessconf(){
          let cachescope = this;
          //this.handletype();
          let errMsg = { success: "", error: "" };
        errMsg.success = "Merchant Have Businessconfigaration";
        errMsg.error = "Merchant Have Not Businessconfigaration";
          this.$store.dispatch("businessconf/init", this.merchantid).then(function(res) {
              //cachescope.isLoading = false;
              if(res){
                  cachescope.pointsvalue = res.pointsValue;
                  cachescope.earningtype = res.earningType;
                  cachescope.maximumpoints = res.maximumAllowedPoints;
                  cachescope.profittype = res.profitType;
                  cachescope.handletype();
                  cachescope.profitvalue = res.profitValue;
                  cachescope.usedvalue=res.usedCount;
                  cachescope.invoicingfrq = res.invoicingFrequency;
                  cachescope.invoicingfrqvalue = res.invoicingFrequencyValue;
                  cachescope.id = res.id;
                  cachescope.action = "edit";
              }
              cachescope.$toast.open({
              message: errMsg.success,
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top',
          });
        }).catch(function(err){
          if (Object.prototype.hasOwnProperty.call(err, "status")) {
                if(err.status == 400) {
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
            if(err.status == 400){
              cachescope.action ="add";
            }
            cachescope.$router.push({ path: `/businessconfigurarionadd?merchantid=${cachescope.merchantid}&action=add` });
        });
      },
      savebusinessconf(){
          let spartnerid  = this.merchantid;
          let data_obj = {
              pointsValue : this.pointsvalue,
              earningType : this.earningtype,
              profitType : this.profittype,
              profitValue : this.profitvalue,
              invoicingFrequency : this.invoicingfrq,
              invoicingFrequencyValue : this.invoicingfrqvalue,
              partnerId : spartnerid,
               maximumAllowedPoints:this.maximumpoints,
           
               
          };
          let storeAction = "";
          if(this.action == "add"){
             storeAction = "businessconf/add";
          this.$store.dispatch(storeAction, data_obj).then(function(res) {
          });
           this.$router.push({ path: `/merchant` });
          }else if(this.action == "edit"){
             storeAction = "businessconf/update";
                data_obj["id"] = this.id;
              this.$store.dispatch(storeAction, data_obj).then(function(res) {
          });
           this.$router.push({ path: `/merchant` });
          }
          }

      },
  /*created(){
      this.loadbusinessconf();

  },*/
  mounted() {
    $(".nav-merchant").addClass("active");
    //this.partnerId  = this.$store.getters["account/getuserid"];
    if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'merchantid')) {
        /* View or Edit action */
        this.merchantid = this.$route.query.merchantid;
      }

      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        /* View or Edit action */
        this.action = this.$route.query.action;
      }
    }
    if(this.action == "edit"){
      this.loadbusinessconf();
    }

    $("#togglePassword").click(function() {
      var stype =
        $("#txtpassword").attr("type") == "password" ? "text" : "password";
      $("#txtpassword").attr("type", stype);
      $(this).toggleClass("fa-eye-slash");
    });
  }
};
</script>
