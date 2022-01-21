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
                        <li class="breadcrumb-item active" aria-current="page">Program Configuration</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Program Configuration</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.Name.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Name</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" value="" v-model="$v.Name.$model" disabled>
                                </div>
 <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.Name.$error && !$v.Name.required">Please enter your name</div>

                              </div>
                         </div>
                        <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.currency.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Currency</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" value="" v-model="$v.currency.$model" disabled>
                                </div>
 <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.currency.$error && !$v.currency.required">Please enter the currency</div>

                              </div>
                         </div>
                        <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.Timezone.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Time zone</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" value="" v-model="$v.Timezone.$model" disabled>
                                </div>
   <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.Timezone.$error && !$v.Timezone.required">Please enter Timezone</div>

                              </div>
                         </div>

                     </div>
                       <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.pointalert.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Points expiry alert *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" min="1" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" v-model="$v.pointalert.$model">
                                </div>
             <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.pointalert.$error && !$v.pointalert.required">Please enter the pointalert</div>

                              </div>
                         </div>
                                                     <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.calculatelevel.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Calculate level by *</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model="$v.calculatelevel.$model">
                                        <option value="">Select</option>
                                        <option value="TRANSACTIONS">Total Transaction Value</option>
                                        <option value="POINTS">Total Points Earned</option>
                                        <option value="EARNED_POINTS">Active Points</option>
                                    </select>
                                </div>
              <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.calculatelevel.$error && !$v.calculatelevel.required">Please enter the calculatelevel</div>

                              </div>
                         </div>
                          <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.Coupenexpiry.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Coupon expiry alert *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" min="1" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" v-model="$v.Coupenexpiry.$model">
                                </div>
  <div class="error col-md-12 text-left" style="margin-left:32%" v-if="$v.Coupenexpiry.$error && !$v.Coupenexpiry.required">Please enter the Coupenexpiryalert</div>

                              </div>
                         </div>

                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.pointexpiry.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Points expires after *</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model="$v.pointexpiry.$model" @change="handleAddRule()"  id="messagetype">
                                        <option value="">Select</option>
                                        <option value="NUMBER_OF_DAYS">Number Of Days</option>
                                        <option value="NEVER_EXPIRE">Never Expire</option>
                                        <option value="END_OF_YEAR">End Of Year</option>
                                    </select>
                                </div>
         <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.pointexpiry.$error && !$v.pointexpiry.required">Please enter the pointexpiry</div>

                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.numberofdays.$error }" id="days">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Number of days *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" min="1" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" v-model="$v.numberofdays.$model" id="days1">
                                </div>
   <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.numberofdays.$error && !$v.numberofdays.required">Please enter the numberofdays</div>

                              </div>
                         </div>
                          <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.returns.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Returns *</label>
                                <div class="col-sm-6">
                                    <input type="checkbox" class="form-control" style="width: 20px;" v-model="$v.returns.$model">
                                </div>
  <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.returns.$error && !$v.returns.required">Please enter the returns</div>

                              </div>
                         </div>
                      
                        
                     </div>
                   <div class="row">
                 <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.Includedelivery.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Include delivery cost for points calculations *</label>
                                <div class="col-sm-6">
                                    <input type="checkbox" class="form-control" style="width: 20px;" v-model="$v.Includedelivery.$model">
                                </div>
  <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.Includedelivery.$error && !$v.Includedelivery.required">Please enter the Includedelivery</div>

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
                            icon-rewardcampaigns"></i> Level downgrade settings</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                                              <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.points.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Points consider *</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model="$v.points.$model">
                                      <option value="">Select</option>
                                        <option value="ACTIVE_POINTS">Active Points</option>
                                        <option value="POINTS_FROM_LAST_LEVEL_CHANGE">Points From Last Level Change</option>
                                    </select>
                                </div>
                  <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.points.$error && !$v.points.required">Please enter the considered point</div>

                              </div>
                         </div>
                          <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.Downgrade.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Downgrade type *</label>
                                <div class="col-sm-6">
                                    <select class="form-control"  v-model="$v.Downgrade.$model" @change="handleRule()" id="type" >
                                        <option value="">Select</option>
                                         <option value="EVERY_N_DAYS">Every N Days</option>
                                         <option value="POINTS_RETURN"> Points Return</option>
                                    </select>
                                </div>
         <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.Downgrade.$error && !$v.Downgrade.required">Please enter the Downgrade type</div>

                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.Days.$error }" id="type1">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Number of days *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" min="1" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" v-model="$v.Days.$model">
                                </div>
                     <div class="error col-md-12 text-left" style="margin-left:32%" v-if="$v.Days.$error && !$v.Days.required">Please enter the number of days</div>

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
    <!-- <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true" :color="loadingbgcolor"></loading>-->
  </app-layout>
</template>

<style>
.input-group i {
  cursor: pointer;
}
</style>

<script>
import AppLayout from "@/layouts/Admin.vue";
import Loading from 'vue-loading-overlay';
import $ from "jquery";
import { required, minLength, maxLength, email, alpha, numeric, alphaNum, helpers, regex } from "vuelidate/lib/validators";
export default {
  name: "ManageRoles",
  components: {
    AppLayout,
   // flatPickr,
    Loading,
   
  },
  
  data: function() {
    return {
         action: "create",
        Name:null,
        currency:null,
        Timezone:"",
        tiers:[],
        pointexpiry:null,
        numberofdays:null,
        returns:null,
        testdays:"",
        ruleIdcounter:1,
        pointalert:null,
        Coupenexpiry:null,
        calculatelevel:"",
        Includedelivery:"",
        Downgrade:"",
         Days:null,
        points:"",
      
    };
  },
  validations: {
    Name: {
      required,
      
    },
    points:{
    required
    },
    currency: {
      required,
      
    },
    Timezone: {
      required,
    
    },
    pointexpiry: {
      required,
    
    },
   numberofdays: {
      required,
     
    },
  returns:{
  required,
  },
    pointalert:{
      required
    },
    Coupenexpiry:{
required
    },
    calculatelevel:{
  required
    },
    Includedelivery:{
  required
    },
    Downgrade:{
        required
    },
    Days:{
required
    }
   
  
  },
  methods: {
   
   
      getCustomerInfo() {
        
      let cachescope = this;
      this.$store.dispatch("get/Configuration",this.partnerId).then(function(res) {
        cachescope.Name = res.name;
        cachescope.ID = res.id;
        cachescope.currency = res.currency.name;
        cachescope.Timezone = res.timeZone;
        cachescope.numberofdays = res.numberOfDays;
        cachescope.pointalert = res.pointsExpiryAlert;
        cachescope.Coupenexpiry = res.couponExpiryAlert;
        cachescope.calculatelevel = res.calculateLevelBy;
        cachescope.Downgrade = res.downGradeType;
         let ptype=cachescope.Downgrade;
         if(ptype=="EVERY_N_DAYS"){
            $('#type1').show();

         }else{
            $('#type1').hide();

         }
        cachescope.Days = res.downGradeNumberOfDays;
        cachescope.points = res.pointsConsiderType;
        cachescope.pointexpiry = res.pointsExpiryType;
        let stype = cachescope.pointexpiry;
          if(stype=="NUMBER_OF_DAYS"){
            $('#days').show();

          }else{
             $('#days').hide();

          }
        cachescope.returns = res.isReturn;
        cachescope.Includedelivery = res.includeDeliveryCost;

        //cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Customer edit failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.isLoading = false;
      });
    },
    
     handleAddRule(){
         let stype = this.pointexpiry;
          if(stype=="NUMBER_OF_DAYS"){
            $('#days').show();

             
          }else{
             $('#days').hide();


          }
         
       },
       handleRule(){
         let ptype=this.Downgrade;
         if(ptype=="EVERY_N_DAYS"){
            $('#type1').show();

         }else{
            $('#type1').hide();

         }

       },
   
    handleSubmit() {
        if(this.pointexpiry=="NUMBER_OF_DAYS"){
          let cacheScope=this;
          cacheScope.numberofdays=this.numberofdays;
        }
        else{
          let cacheScope=this;
         cacheScope.numberofdays=null;

        }
    if(this.Downgrade=="EVERY_N_DAYS"){
          let cacheScope=this;
          cacheScope.Days=this.Days;
        }
        else{
          let cacheScope=this;
          
          //cacheScope.testdays=0;
          cacheScope.Days=null;

        }
     let cache_obj=this;
          let cachescope = this;
           //this.myDebug("JSON:", JSON.stringify(postJson));
           
          this.$store.dispatch("get/update", {
             partnerId:this.partnerId,
             data :{
         name: this.Name,
          id:1,
          isPublic:true,
         timeZone :this.Timezone,
         numberOfDays : this.numberofdays,
         pointsExpiryAlert : this.pointalert,
         couponExpiryAlert : this.Coupenexpiry,
          calculateLevelBy: this.calculatelevel,
          downGradeType: this.Downgrade,
          downGradeNumberOfDays: this.Days,
          pointsConsiderType: this.points,
          pointsExpiryType: this.pointexpiry,
          isReturn : this.returns,
          includeDeliveryCost : this.Includedelivery,

        }
       
       
          })
            .then(function (res) {

             //cache_obj.myDebug(JSON.stringify(res));
          cache_obj.rows = res.data;
            cachescope.$toast.open({
              message: "success",
              type: "success",
              duration: 3000,
              dismissible: true,
              position: "top",
            });
            cachescope.isLoading = false;
          
      })
      .catch(function(err){
        cachescope.$toast.open({
          message: "Configuration gets failed",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.isLoading = false;
      });
     cachescope.$router.push({ path: `/customer` });
      
    },
    handleCancel() {
      let cachescope=this;
      cachescope.$router.push({ path: `/customer` });
    },
    isFormValid() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        return true;
      }
      return false;
    },
  },
  
  mounted() {
    $(".nav-merchant").addClass("active");
    $("#togglePassword").click(function() {
      var stype =
        $("#txtpassword").attr("type") == "password" ? "text" : "password";
      $("#txtpassword").attr("type", stype);
      $(this).toggleClass("fa-eye-slash");
    });
  this.partnerId = this.$store.getters["account/getuserid"];
   
    this.getCustomerInfo();
  }
};
</script>