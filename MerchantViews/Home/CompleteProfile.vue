<template>
  <app-layout>
    <div class="managemerchant_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'merchanthome.index' }">Home</router-link>
                        </li>
                        <!--li class="breadcrumb-item active" aria-current="page" v-if="action=='edit'">Edit Merchant</li-->
                        <li class="breadcrumb-item active" aria-current="page">Complete Profile</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Complete Profile</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.firstName.$error }">
                                <label for="firstName" class="col-sm-6
                                    col-form-label text-right">First Name *</label>
                                <div class="col-sm-6">
                                    <input type="text" placeholder="" class="form-control"
                                     v-model="$v.firstName.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.firstName.$error && !$v.firstName.required">Please enter your first name</div>
                                <div class="error col-sm-12 text-right" v-if="$v.firstName.$error && !$v.firstName.maxLength">Maximum allowed length is 20 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.firstName.$error && !$v.firstName.regex">Please enter a valid first name</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.lastName.$error }">
                                <label for="lastName" class="col-sm-6
                                    col-form-label text-right">Last Name *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" placeholder=""
                                     v-model.trim="$v.lastName.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.lastName.$error && !$v.lastName.required">Please enter your last name</div>
                                <div class="error col-sm-12 text-right" v-if="$v.lastName.$error && !$v.lastName.maxLength">Maximum allowed length is 20 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.lastName.$error && !$v.lastName.regex">Please enter a valid last name</div>
                              </div>
                         </div>
                           <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.emailId.$error }">
                                <label for="emailId" class="col-sm-6
                                    col-form-label text-right">Email *</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control"
                                     v-model.trim="$v.emailId.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.emailId.$error && !$v.emailId.required">Please enter your Email Id</div>
                                <div class="error col-sm-12 text-right" v-if="$v.emailId.$error && !$v.emailId.maxLength">Maximum allowed length is 32 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.emailId.$error && !$v.emailId.emailId">Please enter a valid emailId Id</div>
                              </div>
                         </div>
                       
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.mobileNumber.$error }">
                                <label for="mobileNumber" class="col-sm-6
                                    col-form-label text-right">Phone *</label>
                                <div class="col-sm-6">
                                     <input type="text" class="form-control"
                                     v-model.trim="$v.mobileNumber.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.mobileNumber.$error && !$v.mobileNumber.required">Please enter your mobile number</div>
                                <div class="error col-sm-12 text-right" v-if="$v.mobileNumber.$error && !$v.mobileNumber.numeric">Please enter a valid mobile number</div>
                                <div class="error col-sm-12 text-right" v-if="$v.mobileNumber.$error && !$v.mobileNumber.maxLength">Maximum allowed length is 10 characters</div>
                              </div>
                         </div>
                        <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.gender.$error }">
                                <label for="gender" class="col-sm-6
                                    col-form-label text-right">Gender</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.gender.$model">
                                        <option value="" selected>Select</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHER">Other</option>
                                        <option value="NOT_INTERESTED">Not Disclosed</option>
                                    </select>
                                </div>
                              </div>
                         </div>
                           <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.organisationType.$error }">
                                <label for="organisationType" class="col-sm-6
                                    col-form-label text-right">Type of Business *</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.organisationType.$model">
                                        <option value="" selected>Select</option>
                                        <option value="RETAIL">Retail</option>
                                        <option value="TRAVEL">Travel</option>
                                        <option value="MEDICAL">Medical</option>
                                        <option value="GOVERNMENT">Government</option>
                                        <option value="BANKING">Banking</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.organisationType.$error && !$v.organisationType.required">Please enter your Type of business</div>
                              </div>
                     </div>
                       
                        
                     </div>
                     <div class="row">
                            <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.organisationEmailId.$error }">
                                <label for="organisationEmailId" class="col-sm-6
                                    col-form-label text-right">Business Email *</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control"
                                     v-model.trim="$v.organisationEmailId.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.organisationEmailId.$error && !$v.organisationEmailId.required">Please enter your Business Email Id</div>
                                <div class="error col-sm-12 text-right" v-if="$v.organisationEmailId.$error && !$v.organisationEmailId.maxLength">Maximum allowed length is 32 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.organisationEmailId.$error && !$v.organisationEmailId.email">Please enter a valid Business Email Id</div>
                              </div>
                         </div>
 
                      
                              <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.address.$error }">
                                <label for="address" class="col-sm-6
                                    col-form-label text-right">Address Line1</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="$v.address.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.address.$error && !$v.address.maxLength">Maximum allowed length is 32 characters</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row"  :class="{ 'form-group--error': $v.addressLine2.$error }">
                                <label for="addressLine2" class="col-sm-6
                                    col-form-label text-right">Address Line2</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control"
                                     v-model.trim="$v.addressLine2.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.addressLine2.$error && !$v.addressLine2.maxLength">Maximum allowed length is 32 characters</div>
                              </div>
                         </div>
                     </div>
                     <div class="row">

                    
                         <div class="col-md-4">
                             <div class="form-group row"  :class="{ 'form-group--error': $v.city.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">City</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control"
                                     v-model.trim="$v.city.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.city.$error && !$v.city.regex">Please enter a valid city</div>
                                <div class="error col-sm-12 text-right" v-if="$v.city.$error && !$v.city.maxLength">Maximum allowed length is 32 characters</div>
                              </div>
                         </div>
                            <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.country.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Country *</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     @change="handleCountryChange"
                                     v-model="$v.country.$model">
                                        <option value="" selected>Select</option>
                                        <option v-for="country in countryList" :value="country.code" v-bind:key="country.id">{{country.name}}</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.country.$error && !$v.country.required">Please select a country</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.stateName.$error }">
                                <label for="stateName" class="col-sm-6
                                    col-form-label text-right">State/Province</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.stateName.$model">
                                        <option value="" selected>Select</option>
                                        <option v-for="state in stateList" :value="state.name" v-bind:key="state.id">{{state.name}}</option>
                                    </select>
                                </div>
                              </div>
                     </div>
                       </div>
                     <div class="row">
                               <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.postalCode.$error }">
                                <label for="postalCode" class="col-sm-6
                                    col-form-label text-right">Postal Code *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model="$v.postalCode.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.postalCode.$error && !$v.postalCode.required">Please enter your postal code</div>
                              </div>
                         </div>
                                                   <div class="col-md-4">
                             <div class="form-group row">
                                <label for="subscriptionPlan" class="col-sm-6
                                    col-form-label text-right">Subscription Type</label>
                                <div class="col-sm-6">
                                   <input readonly type="text" class="form-control"
                                     v-model.trim="subscriptionPlan.planName">
                                </div>
                              </div>
                         </div>
                           <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.organisationMobileNumber.$error }">
                                <label for="organisationMobileNumber" class="col-sm-6
                                    col-form-label text-right">Business Phone *</label>
                                <div class="col-sm-6">
                                     <input type="text" class="form-control"
                                     v-model.trim="$v.organisationMobileNumber.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.organisationMobileNumber.$error && !$v.organisationMobileNumber.required">Please enter your business mobile number</div>
                                <div class="error col-sm-12 text-right" v-if="$v.organisationMobileNumber.$error && !$v.organisationMobileNumber.numeric">Please enter a valid business mobile number</div>
                                <div class="error col-sm-12 text-right" v-if="$v.organisationMobileNumber.$error && !$v.organisationMobileNumber.maxLength">Maximum allowed length is 10 characters</div>

                              </div>
                         </div>
                         </div>
                      
                        
                       
                    <!--<div class="row">

                         </div>-->
                        <!-- <div class="col-md-5">
                             <div class="form-group row" :class="{ 'form-group--error': $v.legaldoc.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Legal Documents</label>
                                <div class="upload-btn-wrapper">
                                    <button class="btn btn-primary">File Upload</button>
                                    <input type="file" name="filecategory" ref="file" v-on:change="handleFileUpload()"/>
                                </div>
                              </div>
                         </div>-->
                   
                 </div>
            </div>
        </div>

            <div class="d-flex mb-5">
                <button type="button" class="btn btn-success" @click="handleSubmit">Submit</button>
               <button type="button" class="btn btn-danger" @click="handleCancel">Cancel</button>
            </div>

    </div>
  <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true" :color="loadingbgcolor"></loading>

  </app-layout>
</template>

<style>
.lock-form {
 width:100%;
 height: 100%;
 position: absolute;
 background-color: grey;
 opacity: 0.2;
 z-index: 100;
 text-align: right;
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
import AppLayout from "@/layouts/Merchant.vue";
import axios from 'axios';
import $ from "jquery";
import DebugMixin from '@/mixins/debug';
import { required, minLength, maxLength, email, alpha, numeric, alphaNum, helpers, regex } from "vuelidate/lib/validators";
import flatPickr from "vue-flatpickr-component";
import 'flatpickr/dist/flatpickr.css';
import moment from "moment";
import filter from "lodash/filter";
import Loading from 'vue-loading-overlay';
export default {
  name: "CompleteProfileIndex",
  components: {
    AppLayout,
    flatPickr,
    Loading
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
        merchantId: "",
        firstName: "",
        lastName: "",
        mobileNumber: "",
        organisationMobileNumber: "",
        postalCode: "",
        organisationType: "",
        gender: "",
        emailId: "",
        organisationEmailId: "",
        //legaldoc: "",
        address: "",
        addressLine2: "",
        city: "",
        stateName: "",
        country: null,
        partnerId: 0,
        yearOfIncorporation:"",
        id: "",
        subscriptionPlan:"",
        organisationName: "Check",
        countryList: [],
        stateList: [],
        dateConfig: {
          wrap: true,
          maxDate: "today",
        },
        loadingbgcolor : '#0069d9',
        isLoading: false
    };
  },
  validations: {
    firstName: {
      required,
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
      maxLength: maxLength(20)
    },
    lastName: {
      required,
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
      maxLength: maxLength(20)
    },
    postalCode: {
      alphaNum,
      maxLength: maxLength(6)
    },

    emailId: {
      required,
      email,
      maxLength: maxLength(32)
    },
    organisationEmailId: {
      required,
      email,
      maxLength: maxLength(32)
    },
    mobileNumber: {
      required,
      numeric,
      maxLength: maxLength(10)
    },
    organisationMobileNumber: {
      required,
      numeric,
      maxLength: maxLength(10)
    },
    organisationType: {
      alpha,
      maxLength: maxLength(30),
      minLength: minLength(4)
    },
   //legaldoc: {
   // },
    gender: {
    },
    city: {
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
      maxLength: maxLength(20)
    },
    country: {
    },
    stateName: {
    },
    address: {
      maxLength: maxLength(32)
    },
    addressLine2: {
      maxLength: maxLength(32)
    }
  },
  methods: {
    getCountryList() {
      let cachescope = this;
      cachescope.isLoading = true;
      this.$store.dispatch("country/init").then(function(res) {
         //cachescope.myDebug(JSON.stringify(res));
        cachescope.countryList = res;
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Customer action failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/customer` });
      });
    },
    getStatesList(countryId) {
      let cachescope = this;
      cachescope.isLoading = true;
      this.$store.dispatch("states/init", countryId).then(function(res) {
         //cachescope.myDebug(JSON.stringify(res));
        cachescope.stateList = res;
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Customer action failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.isLoading = false;
      });
    },
    getMerchantinfo(partnerId) {
      let cachescope = this;
      cachescope.isLoading = true;
      this.$store.dispatch("merchant/get", partnerId).then(function(res) {
         //cachescope.myDebug(JSON.stringify(res));
        cachescope.firstName = res.firstName;
        cachescope.lastName = res.lastName;
        cachescope.postalCode = res.postalCode;
        cachescope.organisationEmailId = res.organisationEmailId;
        cachescope.gender = res.gender;
        cachescope.emailId = res.emailId;
        cachescope.mobileNumber = res.mobileNumber;
        cachescope.organisationName = res.organisationName;
        cachescope.organisationMobileNumber = res.organisationMobileNumber;
        cachescope.yearOfIncorporation = res.yearOfIncorporation;
        cachescope.address = res.address;
        cachescope.addressLine2 = res.addressLine2;
        cachescope.city = res.city;
        cachescope.stateName = res.stateName;
        cachescope.country = res.countryCode;
        cachescope.organisationType = res.organisationType;
        cachescope.subscriptionPlan = res.subscriptionPlansDto;
        cachescope.status = res.status;
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Partner edit Failed. Partner Updated Failed",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/merchanthome` });
      });
    },
    handleCountryChange() {
    },
    handleFileUpload(){
      this.fileError = false;
      this.importFile = this.$refs.file.files[0];
    },

    handleSubmit() {
      if(this.isFormValid()) {
        this.isLoading = true;
        let postJson = {
          "firstName": this.firstName,
          "lastName": this.lastName,
          "gender": this.gender,
          "emailId": this.emailId,
          "mobileNumber": this.mobileNumber,
          "organisationName": this.organisationName,
          "organisationMobileNumber": this.organisationMobileNumber,
          "yearOfIncorporation": this.yearOfIncorporation,
          "postalCode": this.postalCode,
          "organisationEmailId": this.organisationEmailId,
          "organisationType": this.organisationType,
          "address": this.address,
          "addressLine2": this.addressLine2,
          "subscriptionPlanId": this.subscriptionPlan.id,
          "countryCode": this.country,
          "stateName": this.stateName,
          "city": this.city,
        }
        let cachescope = this;
        postJson.id = this.partnerId;
        let surl =  `${process.env.VUE_APP_API_LOCATION}partner/complete-profile`;

        this.myDebug("JSON:", JSON.stringify(postJson));
        let formobj = new FormData();
        formobj.append("json", JSON.stringify(postJson));
        axios.post(surl, formobj, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
        }).then(function(res){
            cachescope.isLoading = false;
            cachescope.$toast.open({
                message: "Profile updated successfully",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top"
            });
        }).catch(function(err){
          cachescope.$toast.open({
              message: "Profile updation failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
            });
        });

        /*this.$store.dispatch(surl, formobj).then(function(res) {
          cachescope.$toast.open({
              message: "Merchant updated successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
        }).catch(function(err){
          cachescope.$toast.open({
              message: "Merchant updation failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
        });*/
        cachescope.$router.push({ path: `/merchanthome` });
      }
    },
    handleCancel() {
      this.$router.push({ path: `/merchanthome` });
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
    country : function(newValue,oldValue){
      this.stateList = [];
      let res = filter(this.countryList , row => (row.code == newValue));
      if(res.length > 0){
        this.getStatesList(res[0].id);
      }
    }
  },
  mounted(){
    $(".nav-viewprofile").addClass("active");
    this.partnerId  = this.$store.getters["account/getuserid"];
    if(this.partnerId == undefined || this.partnerId == "") {
        return;
    }
    this.getCountryList();
    this.getMerchantinfo(this.partnerId);
  }
};
</script>
