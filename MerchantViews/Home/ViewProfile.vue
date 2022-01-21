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
                        <li class="breadcrumb-item active" aria-current="page" v-if="action=='view'">View Profile</li>
                        <li class="breadcrumb-item active" aria-current="page" v-else>Complete Profile</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
        <div class="" v-if="this.action=='view'">
        </div>
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0" v-if="action=='edit'"><i class="icon
                            icon-rewardcampaigns"></i> View Profile</h2>
                    <h2 class="mb-0" v-else><i class="icon
                            icon-rewardcampaigns"></i> View Profile</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.firstName.$error }">
                                <label for="firstName" class="col-sm-6
                                    col-form-label text-right">First Name</label>
                                <div class="col-sm-6">
                                    <input type="text" placeholder="" class="form-control" readonly
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
                                    col-form-label text-right">Last Name</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" placeholder="" readonly
                                     v-model.trim="$v.lastName.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.lastName.$error && !$v.lastName.required">Please enter your last name</div>
                                <div class="error col-sm-12 text-right" v-if="$v.lastName.$error && !$v.lastName.maxLength">Maximum allowed length is 20 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.lastName.$error && !$v.lastName.regex">Please enter a valid last name</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.gender.$error }">
                                <label for="gender" class="col-sm-6
                                    col-form-label text-right">Gender</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control"
                                     v-model.trim="$v.gender.$model">
                                </div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                        <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.emailId.$error }">
                                <label for="emailId" class="col-sm-6
                                    col-form-label text-right">Email</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control" readonly
                                     v-model.trim="$v.emailId.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.emailId.$error && !$v.emailId.required">Please enter your Email Id</div>
                                <div class="error col-sm-12 text-right" v-if="$v.emailId.$error && !$v.emailId.maxLength">Maximum allowed length is 32 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.emailId.$error && !$v.emailId.emailId">Please enter a valid Email Id</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.mobileNumber.$error }">
                                <label for="mobileNumber" class="col-sm-6
                                    col-form-label text-right">Phone</label>
                                <div class="col-sm-6">
                                     <input type="text" class="form-control"
                                     v-model.trim="$v.mobileNumber.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.mobileNumber.$error && !$v.mobileNumber.required">Please enter your mobile number</div>
                                <div class="error col-sm-12 text-right" v-if="$v.mobileNumber.$error && !$v.mobileNumber.numeric">Please enter a valid mobile number</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.organisationName.$error }">
                                <label for="organisationName" class="col-sm-6
                                    col-form-label text-right">Company Name</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" readonly
                                     v-model="$v.organisationName.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.organisationName.$error && !$v.organisationName.required">Please enter your company name</div>
                                <div class="error col-sm-12 text-right" v-if="$v.organisationName.$error && !$v.organisationName.maxLength">Maximum allowed length is 20 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.organisationName.$error && !$v.organisationName.regex">Please enter a valid first name</div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                        <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.organisationMobileNumber.$error }">
                                <label for="organisationMobileNumber" class="col-sm-6
                                    col-form-label text-right">Business Phone</label>
                                <div class="col-sm-6">
                                     <input type="text" class="form-control"
                                     v-model.trim="$v.organisationMobileNumber.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.organisationMobileNumber.$error && !$v.organisationMobileNumber.required">Please enter your business mobile number</div>
                                <div class="error col-sm-12 text-right" v-if="$v.organisationMobileNumber.$error && !$v.organisationMobileNumber.numeric">Please enter a valid business mobile number</div>
                              </div>
                         </div>
                          <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.yearOfIncorporation.$error }">
                                <label for="yearOfIncorporation" class="col-sm-6
                                    col-form-label text-right">Year of Incorporation</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="$v.yearOfIncorporation.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.yearOfIncorporation.$error && !$v.yearOfIncorporation.required">Please enter your Year of incorporation</div>
                                <div class="error col-sm-12 text-right" v-if="$v.yearOfIncorporation.$error && !$v.yearOfIncorporation.numeric">Please enter a valid year</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.legaldoc.$error }">
                                <label for="legaldoc" class="col-sm-6
                                    col-form-label text-right">Legal Documents</label>
                                <!--div class="form-group" style="margin-bottom: 0px;">
                                        <div class="upload-btn-wrapper">
                                          <button class="btn btn-primary">File Upload</button><input type="file" name="filecategory" ref="filecategory" accept=".xlsx, .xls"/>
                                        </div>
                                    </div-->
                              </div>
                         </div>
                     </div>
                     <div class="row">
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
                         <div class="col-md-4">
                             <div class="form-group row"  :class="{ 'form-group--error': $v.city.$error }">
                                <label for="city" class="col-sm-6
                                    col-form-label text-right">City</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control"
                                     v-model.trim="$v.city.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.city.$error && !$v.city.required">Please enter a valid city</div>
                                <div class="error col-sm-12 text-right" v-if="$v.city.$error && !$v.city.maxLength">Maximum allowed length is 32 characters</div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.stateName.$error }">
                                <label for="stateName" class="col-sm-6
                                    col-form-label text-right">State/Province</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control"
                                     v-model.trim="$v.stateName.$model">
                                </div>
                                 <div class="error col-sm-12 text-right" v-if="$v.stateName.$error && !$v.stateName.required">Please enter a state</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.countryCode.$error }">
                                <label for="countryCode" class="col-sm-6
                                    col-form-label text-right">Country</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control"
                                     v-model.trim="$v.countryCode.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.countryCode.$error && !$v.countryCode.required">Please enter a country</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.organisationType.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Type of Business</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="$v.organisationType.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.organisationType.$error && !$v.organisationType.required">Please enter your Type of business</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.subscriptionPlanId.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Subscription Type</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" readonly
                                     v-model.trim="$v.subscriptionPlanId.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.subscriptionPlanId.$error && !$v.subscriptionPlanId.maxLength">Maximum allowed length is 32 characters</div>
                              </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
            <div class="d-flex mb-5">
               <button type="button" class="btn btn-info" @click="handleEdit">Edit</button>
                <button type="button" class="btn btn-success" @click="handleSubmit">Submit</button>
            </div>
        </div>

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
</style>

<script>
import Vue from "vue";
import AppLayout from "@/layouts/Merchant.vue";
import $ from "jquery";
import DebugMixin from '@/mixins/debug';
import { required, minLength, maxLength, email, alpha, numeric, alphaNum, helpers, regex } from "vuelidate/lib/validators";
import flatPickr from "vue-flatpickr-component";
import 'flatpickr/dist/flatpickr.css';
import moment from "moment";
import filter from "lodash/filter";
import Loading from 'vue-loading-overlay';
export default {
  name: "ViewProfileIndex",
  components: {
    AppLayout,
    Loading
  },
  mixins: [DebugMixin,],
  data: function() {
    return {
      loadingbgcolor : '#0069d9',
      action: "view",
        merchantId: null,
       firstName: null,
        lastName: null,
        organisationName: null,
        mobileNumber: null,
        organisationMobileNumber: null,
        yearOfIncorporation: "",
        organisationType: "",
        gender: "",
        emailId: null,
        legaldoc: "",
        address: "",
        addressLine2: "",
        city: "",
        stateName: null,
        countryCode: null,
        partnerId: 0,
        id: 0,
        subscriptionPlanId:"",
        uuid: "",
      tierList: [],
      isLoading: true
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
    organisationName: {
      required,
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
      maxLength: maxLength(20)
    },
    emailId: {
      required,
      email,
      maxLength: maxLength(32)
    },
    mobileNumber: {
      required,
      numeric
    },
    organisationMobileNumber: {
      required,
      numeric
    },
    yearOfIncorporation: {
      required,
      numeric,
      maxLength: maxLength(4),
      minLength: minLength(4)
    },
    organisationType: {
      required,
      alpha,
      maxLength: maxLength(30),
      minLength: minLength(4)
    },
   legaldoc: {
     },
    gender: {
    },
    city: {
      required,
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
      maxLength: maxLength(20)
    },
    countryCode: {
      required
    },
    stateName: {
      required
    },
    address: {
      maxLength: maxLength(32)
    },
    addressLine2: {
      maxLength: maxLength(32)
    },
        subscriptionPlanId: {
      maxLength: maxLength(32)
    }
  },
  methods: {
    getMerchantinfo(partnerId) {
      let cachescope = this;
      cachescope.submitStatus = "LOADING";
      this.$store.dispatch("merchant/get", partnerId).then(function(res) {
        cachescope.submitStatus = "IDLE";
      //  cachescope.myDebug(JSON.stringify(res));
        cachescope.firstName = res.firstName;
        cachescope.lastName = res.lastName;
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
        cachescope.countryCode = res.countryCode;
        cachescope.organisationType = res.organisationType;
        cachescope.subscriptionPlanId = res.subscriptionPlanId;
        cachescope.partnerId = res.partnerId;
        cachescope.status = res.status;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Partner edit Failed. Partner Updated Failed",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        //cachescope.$router.push({ path: `/merchanthome` });
      });
    },
    handleSubmit() {
         this.$v.$touch();
         let cachescope = this;
      if (!this.$v.$invalid) {
        let dataobj = {
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender,
          emailId: this.emailId,
          mobileNumber: this.mobileNumber,
          organisationName: this.organisationName,
          organisationMobileNumber: this.organisationMobileNumber,
          yearOfIncorporation: this.yearOfIncorporation,
         // legaldoc: this.legaldoc,
          address: this.address,
          addressLine2: this.addressLine2,
          city: this.city,
          stateName: this.stateName,
          countryCode: this.countryCode,
          organisationType: this.organisationType,
          subscriptionPlanId: this.subscriptionPlanId,
          partnerId: this.partnerId,
        };
        let storeAction = "merchant/get";
        let successMsg = "Merchant created successfully";
        if(this.action == "update") {
            dataobj["id"] = this.merchantid;
            storeAction = "merchant/get";
            successMsg = "Merchant updated successfully";
        }
        this.isLoading = true;
        this.$store.dispatch(storeAction, dataobj).then(function(res) {
          cachescope.isLoading = false;
          cachescope.$toast.open({
              message: successMsg,
              type: "success",
              duration: 2000,
              dismissible: true,
              position: "top"
            });
          cachescope.$router.push({ path: `/merchanthome` });
        }).catch(function(err){
        });
      }
    },
    handleEdit: function(id) {
      this.myDebug("Edit", id);
      let path = `/completeprofile/?action=edit&merchant=${id}`;
      Vue.router.push({ path: path });
    },
  },
mounted() {
    $(".nav-viewprofile").addClass("active");
    this.partnerId  = this.$store.getters["account/getuserid"];
    if(this.partnerId == undefined || this.partnerId == "") {
        return;
    }

    this.getMerchantinfo(this.partnerId);

  }
};
</script>
