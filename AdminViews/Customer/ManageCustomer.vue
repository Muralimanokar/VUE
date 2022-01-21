<template>
  <app-layout>
    <div class="managemerchant_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'customer.index' }">Customer</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page" v-if="action=='edit'">Edit Customer</li>
                        <li class="breadcrumb-item active" aria-current="page" v-else>Add Customer</li>
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
                    <h2 class="mb-0" v-if="action=='edit'"><i class="icon
                            icon-rewardcampaigns"></i> Edit Customer</h2>
                    <h2 class="mb-0" v-else><i class="icon
                            icon-rewardcampaigns"></i> Add Customer</h2>
                 </div>
                 <div class="card-body px-0" style="margin-left:-100px">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.firstname.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">First Name *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model="$v.firstname.$model">
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.firstname.$error && !$v.firstname.required">Please enter your first name</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.firstname.$error && !$v.firstname.maxLength">Maximum allowed length is 20 characters</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.firstname.$error && !$v.firstname.regex">Please enter a valid first name</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.lastname.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Last Name *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="$v.lastname.$model">
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.lastname.$error && !$v.lastname.required">Please enter your last name</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.lastname.$error && !$v.lastname.maxLength">Maximum allowed length is 20 characters</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.lastname.$error && !$v.lastname.regex">Please enter a valid last name</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.username.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">User Name *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="$v.username.$model">
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.username.$error && !$v.username.required">Please enter user name</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.username.$error && !$v.username.minLength">Minimum allowed length is 5 characters</div>
                               <!-- <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.username.$error && !$v.username.alphaNum">Please enter a valid user name</div>-->
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.gender.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Gender *</label>
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
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.gender.$error && !$v.gender.required">Please Select Gender</div>
                              </div>
                         </div>

                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.email.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Email *</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control"
                                     v-model.trim="$v.email.$model">
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.email.$error && !$v.email.required">Please enter your Email Id</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.email.$error && !$v.email.maxLength">Maximum allowed length is 32 characters</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.email.$error && !$v.email.email">Please enter a valid Email Id</div>
                              </div>
                         </div>
                                                                <div class="col-md-4">
                <div
                  class="form-group row"
                  :class="{ 'form-group--error': $v.phoneNum.$error }"
                >
                  <label for="name" class="col-sm-6 col-form-label text-right"
                    >Phone *</label
                  >
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control"
                      v-model.trim="$v.phoneNum.$model"
                    />
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:45%"
                    v-if="$v.phoneNum.$error && !$v.phoneNum.required"
                  >
                    Please enter mobile number
                  </div>
                  <div
                    class="error col-sm-12 text-right"
                    v-if="$v.phoneNum.$error && !$v.phoneNum.maxLength"
                  >
                    Maximum Valid 10 Numbers
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.phoneNum.$error && !$v.phoneNum.minLength"
                  >
                    Minimum Valid 10 Numbers
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:32%"
                    v-if="$v.phoneNum.$error && !$v.phoneNum.numeric"
                  >
                    Please enter a valid mobile number
                  </div>
                </div>
              </div>
                     </div>
                     <div class="row">
                                                                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Birth date</label>
                                <div class="col-sm-6 input-group">
                                  <flat-pickr class="form-control"
                                  style="background-color:white;"
                                    v-model="dob"
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
                                                  <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.addr1.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Address Line1</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="$v.addr1.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.addr1.$error && !$v.addr1.maxLength">Maximum allowed length is 32 character</div>
                                <div class="error col-sm-12 text-right" v-if="$v.addr1.$error && !$v.addr1.regex">Please enter a valid Address</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row"  :class="{ 'form-group--error': $v.addr2.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Address Line2</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control"
                                     v-model.trim="$v.addr2.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.addr2.$error && !$v.addr2.maxLength">Maximum allowed length is 32 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.addr2.$error && !$v.addr2.regex">Please enter a valid Address</div>
                              </div>
                         </div>
                         <!--div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.phoneNum.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Phone *</label>
                                <div class="col-sm-6">
                                     <input type="text" class="form-control"
                                     v-model.trim="$v.phoneNum.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.phoneNum.$error && !$v.phoneNum.required">Please enter your mobile number</div>
                                <div class="error col-sm-12 text-right" v-if="$v.phoneNum.$error && !$v.phoneNum.numeric">Please enter a valid mobile number</div>
                                <div class="error col-sm-12 text-right" v-if="$v.phoneNum.$error && !$v.phoneNum.maxLength">Maximum allowed length is 10 number</div>
                                <div class="error col-sm-12 text-right" v-if="$v.phoneNum.$error && !$v.phoneNum.minLength">Minimum need 10 number</div>
                              </div>
                         </div-->


                     </div>
                     <div class="row">
                                                                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.tierId.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Select Tier * </label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.tierId.$model">
                                        <option value="">Select</option>
                                        <option v-for="tier in tierList" :value="tier.id" v-bind:key="tier.id">{{tier.name}}</option>
                                    </select>
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.tierId.$error && !$v.tierId.required">Please select a tier</div>
                              </div>
                         </div>
                                                  <div class="col-md-4">
                             <div class="form-group row"  :class="{ 'form-group--error': $v.city.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">City *</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control"
                                     v-model.trim="$v.city.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.city.$error && !$v.city.required">Please enter city</div>
                                <div class="error col-sm-12 text-right" v-if="$v.city.$error && !$v.city.regex">Please enter a valid city</div>
                                <div class="error col-sm-12 text-right" v-if="$v.city.$error && !$v.city.maxLength">Maximum allowed length is 32 characters</div>
                              </div>
                         </div>
                                                                                                  <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.pincode.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Postal code</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control"
                                     v-model.trim="$v.pincode.$model">
                                
                                <div class="error col-sm-12 text-right" v-if="$v.pincode.$error && !$v.pincode.required">Please enter postal code</div></div>
                                <div class="error col-sm-12 text-right" v-if="$v.pincode.$error && !$v.pincode.numeric">Please enter a valid postal code</div>
                                <div class="error col-sm-12 text-right" v-if="$v.pincode.$error && !$v.pincode.maxLength">Maximum allowed length is 6 characters</div>
                              </div>
                         </div>




                     </div>
                     <div class="row">


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
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.country.$error && !$v.country.required">Please select a country</div>
                              </div>
                         </div>
                                                   <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.province.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">State/Province</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.province.$model">
                                        <option value="" selected>Select</option>
                                        <option v-for="state in stateList" :value="state.name" v-bind:key="state.id">{{state.name}}</option>
                                    </select>
                                </div>
                              </div>
                         </div>
                                                                                                     <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.userType.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">User Type *</label>
                                <div class="col-sm-6">
                                   <select class="form-control"
                                     v-model="$v.userType.$model"
                                     :disabled="this.action =='edit'" >
                                        <option value="" selected>Select</option>
                                        <option value="CUSTOMER">CUSTOMER</option>
                                        <option value="AGENT">AGENT</option>
                                        <option value="AGENCY">AGENCY</option>
                                    </select>

                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%"  v-if="$v.userType.$error && !$v.userType.required">Please Select User Type</div>
                              </div>
                         </div>




                           <!-- <div class="col-md-4">
                                  <div class="component mb-2">
                                    <VuePhoneNumberInput
                                    id="phonenumber"
                                    v-model="phoneNumber"
                                    clearable
                                    class="mb-2"
 
                                    />
                                  </div>
                                  
                            </div>-->
                     </div>
                                 <div class="row">
                                   <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.ParticipantType.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Participant Type</label>
                                <div class="col-sm-6">
                                   <select class="form-control"
                                     v-model="$v.ParticipantType.$model">
                                        <option value="SELECT" >Select</option>
                                        <option value="BERKLEY_ID">BERKLEY ID</option>
                                    </select>

                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.ParticipantType.$error">Please Select ParticipantType</div>
                              </div>
                         </div>
              <div class="col-md-4" v-if="this.ParticipantType =='BERKLEY_ID'">
                <div
                  class="form-group row"
                  :class="{ 'form-group--error': $v.ParticipantID.$error }"
                >
                  <label for="name" class="col-sm-6 col-form-label text-right"
                    >Participant ID *</label
                  >
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control"
                      v-model.trim="$v.ParticipantID.$model"
                    />
                  </div>
                  <div class="error col-md-12 text-left" style="margin-left:43%"  v-if="$v.ParticipantID.$error && !$v.ParticipantID.required">Please Enter ParticipantID</div>
                </div>
              </div>
              
            </div>
                     <!--<div class="row" v-for="(item, idx) in cardNum" v-bind:key="item.id">
                         <div class="col-md-12">
                             <div class="form-group row" :class="{ 'form-group--error': $v.cardNum.$each[idx].val.$error }">
                                <label for="name" class="col-sm-2
                                    col-form-label text-right">Loyalty Card number {{idx + 1}}</label>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control"
                                     v-model.trim="$v.cardNum.$each[idx].val.$model">
                                </div>
                                <div class="col-sm-1">
                                   <a class="btn icon-btn btn-sm plus text-success" @click="addInputField()" v-if="idx === 0" title="Add loyalty card">
                                      <i class="fa fa-plus"></i>
                                   </a>
                                   <a class="btn icon-btn btn-sm minus text-danger" @click="removeInputField(idx)"  v-if="cardNum.length != 1" title="Remove loyalty card">
                                      <i class="fa fa-minus"></i>
                                   </a>
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:17%" v-if="$v.cardNum.$each[idx].val.$error && !$v.cardNum.$each[idx].val.numeric">Please enter a valid card number</div>
                                <div class="error col-md-12 text-left" style="margin-left:17%" v-if="$v.cardNum.$each[idx].val.$error && !$v.cardNum.$each[idx].val.maxLength">Maximum allowed length is 16 characters</div>
                                <div class="error col-md-12 text-left" style="margin-left:17%" v-if="$v.cardNum.$each[idx].val.$error && !$v.cardNum.$each[idx].val.minLength">Minimum allowed length is 12 characters</div>
                              </div>
                         </div>

                     </div>-->
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
import AppLayout from "@/layouts/Admin.vue";
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import $ from "jquery";
import DebugMixin from '@/mixins/debug';
import { required, minLength, maxLength, email,  requiredIf, alpha, numeric, alphaNum, helpers, regex } from "vuelidate/lib/validators";
import flatPickr from "vue-flatpickr-component";
import 'flatpickr/dist/flatpickr.css';
import moment from "moment";
import filter from "lodash/filter";
import Loading from 'vue-loading-overlay';
export default {
  name: "ManageRoles",
  components: {
    AppLayout,
    flatPickr,
    Loading,
    VuePhoneNumberInput
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
        action: "create",
        phoneNumber: null,
        customerId: null,
        firstname: null,
        lastname: null,
        username: null,
        phoneNum: null,
        dob: "",
        gender: "",
        email: null,
        tierId: "",
              ParticipantType:"",
      ParticipantID:"",
        cardNum: [],
        userType:"",
        addr1: "",
        addr2: "",
        city: "",
        province: null,
        country: null,
        pincode: "",
        uuid: "",
        tierList: [],
        countryList: [],
        stateList: [],
        dateConfig: {
          wrap: true,
          minDate:moment().subtract(73, 'years').format('YYYY-MM-DD'),
          maxDate: moment().subtract(8, 'years').format('YYYY-MM-DD'),
        },
        numOfInputs: -1,
        isLoading: true,
        loadingbgcolor : '#0069d9'
    };
  },
  validations: {
    firstname: {
      required,
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
      maxLength: maxLength(20)
    },
    lastname: {
      required,
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
      maxLength: maxLength(20)
    },
    username: {
      required,
       minLength:minLength(5),
     // alphaNum,
     // maxLength: maxLength(40)
    },
    email: {
      required,
      email,
      maxLength: maxLength(32)
    },
   phoneNum: {
      required,
      numeric,
      maxLength: maxLength(10),
      minLength: minLength(10)
    },
    /*cardNum: {
      $each: {
        val: {
          numeric,
          maxLength: maxLength(16),
          minLength: minLength(12)
        }
      }
    },*/
    dob: {
    },
        ParticipantType:{
      
    },
    ParticipantID:{
 required : requiredIf(function () {
        return this.ParticipantType == "BERKLEY_ID"
      }),
    },
    tierId: {
      required
    },
    gender: {
      required
    },
    city: {
      required,
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
      maxLength: maxLength(20)
    },
    country: {
      required
    },
    userType:{
      required
    },
    province: {
    },
    pincode: {
      required,
      numeric,
      maxLength: maxLength(6)
    },
    addr1: {
      maxLength: maxLength(32),
      regex: helpers.regex("alpha", /^[a-zA-Z0-9/,.:][a-zA-Z0-9/,:.\s]*$/),
    },
    addr2: {
      maxLength: maxLength(32),
      regex: helpers.regex("alpha", /^[a-zA-Z0-9/,.:][a-zA-Z0-9/,.:\s]*$/),
    }
  },
  methods: {
    getTiersList() {
      let cachescope = this;
      let storeAction = "";
      if(this.action == "create") {
        storeAction = "tiers/initActive";
      } else {
        storeAction = "tiers/init";
      }
      this.$store.dispatch(storeAction,this.partnerId).then(function(res) {
       // cachescope.myDebug(JSON.stringify(res));
        cachescope.tierList = [];
        res.data.forEach((tier) => {
          let tierObj = {};
          tierObj.id = tier.id;
          tierObj.name = tier.name;
          cachescope.tierList.push(tierObj);
        });
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
    getCountryList() {
      let cachescope = this;
      this.$store.dispatch("country/init",this.partnerId).then(function(res) {
       // cachescope.myDebug(JSON.stringify(res));
        cachescope.countryList = res;
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
      this.isLoading = true;
       var dataobj={
      //  partnerId:this.partnerId,
       countryId,
      }
      this.$store.dispatch("states/init", countryId).then(function(res) {
       // cachescope.myDebug(JSON.stringify(res));
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
    getCustomerInfo(id) {
      let cachescope = this;
      let dataobj={
        id,
        partnerId:this.partnerId
      }
      this.$store.dispatch("customer/gets",dataobj).then(function(res) {
       // cachescope.myDebug(JSON.stringify(res));
        cachescope.firstname = res.firstName;
        cachescope.lastname = res.lastName;
        cachescope.username = res.userName;
       // cachescope.phoneNumber = res.mobileNumber;
       cachescope.phoneNum = res.mobileNumber;
        cachescope.email = res.emailId;
        cachescope.dob = res.dob;

        cachescope.gender = res.gender;
        cachescope.addr1 = res.address;
        cachescope.addr2 = res.addressLine2;
        cachescope.country = res.countryCode;
        cachescope.province = res.stateName;
        cachescope.city = res.city;
        cachescope.pincode = res.postalCode;
        cachescope.tierId = res.tierId;
        cachescope.userType=res.userType;
        cachescope.uuid = res.uuid;

       if(res.participantDetails){
                cachescope.ParticipantType = res.participantDetails[0].participantIdType;
       cachescope.ParticipantID = res.participantDetails[0].participantId;
       }
        res.loyaltyCardNumber.forEach((ele, idx) => {
          //cachescope.addInputField();
         // cachescope.cardNum[idx].val = ele;
        });
       // console.log("tested",res.mobileNumber);
        if(res.loyaltyCardNumber == 0){
          //cachescope.addInputField();
        }
        cachescope.isLoading = false;
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
    handleCountryChange() {
    },
    addInputField() {
      let id = ++this.numOfInputs;
      this.cardNum.push({id: id, val: ""});
    },
    removeInputField(idx) {
        this.$delete(this.cardNum, idx);
    },
    handleSubmit() {
      console.log("check country",this.country);
      if(this.isFormValid()) {
        this.isLoading = true;
                  if(this.ParticipantType=="BERKLEY_ID")
            {
                this.Us=this.ParticipantID;
                this.value=[
    {
      participantIdType: this.ParticipantType,
      participantId: this.Us
    }
  ]

            }
            else{
              this.value=null;
                this.Us=null

            }
        let postJson = {
          firstName: this.firstname,
          lastName: this.lastname,
          //mobileNumber: this.phoneNum,
          dob: (this.dob != "" && this.dob != null)?(moment(this.dob).format("YYYY-MM-DD[T]HH:mm:ss.SSS") + "Z"):"",
          gender: this.gender,
          address: this.addr1,
          addressLine2: this.addr2,
          stateName: this.province,
                     participantDetails: this.value,
          city: this.city,
          postalCode: this.pincode,
          //loyaltyCardNumber: [],
          tierId: this.tierId,
          timeZone: new Date().toUTCString(),
          mobileNumber:this.phoneNum,
          
        }
         // console.log("Phone:",this.phoneNum);
       this.cardNum.forEach((ele, index) => {
          //postJson.loyaltyCardNumber.push(ele.val);
        });

        let storeAction = "";
        let errMsg = { success: "", error: "" };
        errMsg.success = "Customer created successfully";
        errMsg.error = "Customer creation failed";
        if(this.action == "create") {
          postJson.userName = this.username;
          postJson.countryCode= this.country,
          postJson.emailId = this.email;
          postJson.userType=this.userType,
          postJson.partnerId=this.partnerId,
          storeAction = "customer/add";
          let cachescope = this;
          this.$store.dispatch(storeAction, postJson).then(function(res) {
            if(res.code==200){    
            let message=res.message
            //console.log("check the message",res)
          cachescope.$toast.open({
              message: message,
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading = false;
          cachescope.$router.push({ path: `/customer` });
            }
            else{
                          let message=res.message
            //console.log("check the message",res)
          cachescope.$toast.open({
              message: message,
              type: "error",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading = false;
          cachescope.$router.push({ path: `/managecustomer` });

            }
        }).catch(function (err) {
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
            cachescope.$router.push({ path: `/customer` });
          });
        } else if(this.action == "edit") {
          postJson.id = this.customerId;
          postJson.uuid = this.uuid;
          postJson.partnerId=this.partnerId;
          //postJson.phoneCode="21"
          //console.log("check",postJson);
          storeAction = "customer/update";
          let cachescope = this;
          this.$store.dispatch(storeAction, postJson).then(function(res) {
          cachescope.$toast.open({
              message: "Customer Details Updated Successfully.",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading = false;
          cachescope.$router.push({ path: `/customer` });
        }).catch(function (err) {
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
        } else {
            this.myDebug("Invalid action");
            return;
        }

        this.myDebug("JSON:", JSON.stringify(postJson));

       /* this.$store.dispatch(storeAction, postJson).then(function(res) {
          cachescope.$toast.open({
              message: "Customer created successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading = false;
          cachescope.$router.push({ path: `/customer` });
        }).catch(function(err){
          cachescope.$toast.open({
              message: "Customer creation failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading = false;
        });*/
      }
    },
    handleCancel() {
      this.$router.push({ path: `/customer` });
    },
    isFormValid() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        return true;
      }
      return false;
    },
  },
  watch : {
    country : function(newValue,oldValue){
      console.log("countrylist",this.countryList);
      this.stateList = [];
      let res = filter(this.countryList , row => (row.code == newValue));
      if(res.length > 0){
        this.getStatesList(res[0].id);
      }
    }
  },
  mounted() {
    $(".nav-customer").addClass("active");
      let cache_obj = this;
       cache_obj.partnerId  = this.$store.getters["account/getuserid"];
   
    if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }
      if(this.action != "create" && Object.prototype.hasOwnProperty.call(obj, 'customer')) {
        /* View or Edit action */
        this.customerId = this.$route.query.customer;
      }
    }

    if(this.action == "view") {
      /* TODO :: ADD A VIEWABLE layer on top */
    }

    if(this.action == "create") {
      this.isLoading = false;
      this.addInputField();
    }

    this.getTiersList();
    this.getCountryList();

    if((this.action != "create") && (this.customerId != undefined)) {
        this.getCustomerInfo(this.customerId);

    }
  }
};
</script>
