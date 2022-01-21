<template>
  <app-layout>
    <div class="managemerchant_container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-white m-0 p-0">
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'merchantcustomer.index' }"
                  >Customer</router-link
                >
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Add Customer
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="form-section pt-3">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <i class="icon icon-rewardcampaigns"></i> Add Customer
            </h2>
          </div>
          <div class="card-body px-0" style="margin-left:-100px">
            <div class="row">
              <div class="col-md-4">
                <div
                  class="form-group row"
                  :class="{ 'form-group--error': $v.firstname.$error }"
                >
                  <label for="name" class="col-sm-6 col-form-label text-right"
                    >First Name *</label
                  >
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control"
                      v-model="$v.firstname.$model"
                    />
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.firstname.$error && !$v.firstname.required"
                  >
                    Please enter first name
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.firstname.$error && !$v.firstname.maxLength"
                  >
                    Maximum allowed length is 20 characters
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.firstname.$error && !$v.firstname.regex"
                  >
                    Please enter a valid first name
                  </div>
                    <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.firstname.$error && !$v.firstname.minLength"
                  >
                    Minimum allowed length is 4 characters
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div
                  class="form-group row"
                  :class="{ 'form-group--error': $v.lastname.$error }"
                >
                  <label for="name" class="col-sm-6 col-form-label text-right"
                    >Last Name *</label
                  >
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control"
                      v-model.trim="$v.lastname.$model"
                    />
                  </div>
                  <div
                   class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.lastname.$error && !$v.lastname.required"
                  >
                    Please enter last name
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.lastname.$error && !$v.lastname.maxLength"
                  >
                    Maximum allowed length is 20 characters
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.lastname.$error && !$v.lastname.regex"
                  >
                    Please enter a valid last name
                  </div>
                                    <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.lastname.$error && !$v.lastname.minLength"
                  >
                    Minimum allowed length is 4 characters
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div
                  class="form-group row"
                  :class="{ 'form-group--error': $v.username.$error }"
                >
                  <label for="name" class="col-sm-6 col-form-label text-right"
                    >User Name *</label
                  >
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control"
                      v-model.trim="$v.username.$model"
                       @blur="handleBlur"
                    />
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.username.$error && !$v.username.required"
                  >
                    Please enter user name
                  </div>
                 <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.username.$error && !$v.username.minLength"
                  >
                    Maximum allowed length is 5 characters
                  </div>
                 <!-- <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.username.$error && !$v.username.alphaNum"
                  >
                    Please enter a valid user name
                  </div>-->
                  
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div
                  class="form-group row"
                  :class="{ 'form-group--error': $v.gender.$error }"
                >
                  <label for="name" class="col-sm-6 col-form-label text-right"
                    >Gender *</label
                  >
                  <div class="col-sm-6">
                    <select class="form-control" v-model="$v.gender.$model">
                      <option value="" selected>Select</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                      <option value="NOT_INTERESTED">Not Disclosed</option>
                    </select>
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.gender.$error && !$v.gender.required"
                  >
                    Please Select a valid Gender
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div
                  class="form-group row"
                  :class="{ 'form-group--error': $v.email.$error }"
                >
                  <label for="name" class="col-sm-6 col-form-label text-right"
                    >Email *</label
                  >
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control"
                      v-model.trim="$v.email.$model"
                        @blur="handleBlur"
                    />
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.email.$error && !$v.email.required"
                  >
                    Please enter Email Id
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.email.$error && !$v.email.maxLength"
                  >
                    Maximum allowed length is 32 characters
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.email.$error && !$v.email.email"
                  >
                    Please enter a valid Email Id
                  </div>
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
                        @blur="handleBlur"
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
                    class="error col-md-12 text-left" style="margin-left:50%"
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
                  <label for="name" class="col-sm-6 col-form-label text-right"
                    >Birth date</label
                  >
                  <div class="col-sm-6 input-group">
                    <flat-pickr
                      class="form-control"
                      style="background-color:white;"
                      v-model="dob"
                      :config="dateConfig"
                    >
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
                <div
                  class="form-group row"
                  :class="{ 'form-group--error': $v.addr1.$error }"
                >
                  <label for="name" class="col-sm-6 col-form-label text-right"
                    >Address Line_1</label
                  >
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control"
                      v-model.trim="$v.addr1.$model"
                    />
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.addr1.$error && !$v.addr1.maxLength"
                  >
                    Maximum allowed length is 32 characters
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div
                  class="form-group row"
                  :class="{ 'form-group--error': $v.addr2.$error }"
                >
                  <label for="name" class="col-sm-6 col-form-label text-right"
                    >Address Line_2</label
                  >
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control"
                      v-model.trim="$v.addr2.$model"
                    />
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.addr2.$error && !$v.addr2.maxLength"
                  >
                    Maximum allowed length is 32 characters
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div
                  class="form-group row"
                  :class="{ 'form-group--error': $v.tierId.$error }"
                >
                  <label for="name" class="col-sm-6 col-form-label text-right"
                    >Select Tier *</label
                  >
                  <div class="col-sm-6">
                    <select class="form-control" v-model="$v.tierId.$model">
                      <option value="">Select</option>
                      <option
                        v-for="tier in tierList"
                        :value="tier.id"
                        v-bind:key="tier.id"
                      >
                        {{ tier.name }}
                      </option>
                    </select>
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.tierId.$error && !$v.tierId.required"
                  >
                    Please select a tier
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div
                  class="form-group row"
                  :class="{ 'form-group--error': $v.city.$error }"
                >
                  <label for="name" class="col-sm-6 col-form-label text-right"
                    >City *</label
                  >
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control"
                      v-model.trim="$v.city.$model"
                    />
                  </div>
                  <div class="error col-md-12 text-left" style="margin-left:50%"  v-if="$v.city.$error && !$v.city.required">Please Enter City</div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.city.$error && !$v.city.regex"
                  >
                    Please enter a valid city
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.city.$error && !$v.city.maxLength"
                  >
                    Maximum allowed length is 32 characters
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div
                  class="form-group row"
                  :class="{ 'form-group--error': $v.pincode.$error }"
                >
                  <label for="name" class="col-sm-6 col-form-label text-right"
                    >Postal code *</label
                  >
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control"
                      v-model.trim="$v.pincode.$model"
                    />
                  </div>
                  <div class="error col-md-12 text-left" style="margin-left:43%"  v-if="$v.pincode.$error && !$v.pincode.required">Please Enter Postal Code</div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.pincode.$error && !$v.pincode.alphaNum"
                  >
                    Please enter a valid postal code
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.pincode.$error && !$v.pincode.maxLength"
                  >
                    Maximum allowed length is 6 characters
                  </div>
                </div>
              </div>
              
            </div>
            <div class="row">
              <div class="col-md-4">
                <div
                  class="form-group row"
                  :class="{ 'form-group--error': $v.country.$error }"
                >
                  <label for="name" class="col-sm-6 col-form-label text-right"
                    >Country *</label
                  >
                  <div class="col-sm-6">
                    <select
                      class="form-control"
                      @change="handleCountryChange"
                      v-model="$v.country.$model"
                    >
                      <option value="" selected>Select</option>
                      <option
                        v-for="country in countryList"
                        :value="country.code"
                        v-bind:key="country.id"
                      >
                        {{ country.name }}
                      </option>
                    </select>
                  </div>
                  <div
                    class="error col-md-12 text-left" style="margin-left:50%"
                    v-if="$v.country.$error && !$v.country.required"
                  >
                    Please select a country
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div
                  class="form-group row"
                  :class="{ 'form-group--error': $v.province.$error }"
                >
                  <label for="name" class="col-sm-6 col-form-label text-right"
                    >State/Province *</label
                  >
                  <div class="col-sm-6">
                    <select class="form-control" v-model="$v.province.$model">
                      <option value="" selected>Select</option>
                      <option
                        v-for="state in stateList"
                        :value="state.name"
                        v-bind:key="state.id"
                      >
                        {{ state.name }}
                      </option>
                    </select>
                  </div>
               <div class="error col-sm-12 text-right" style="margin-left:-5%" v-if="$v.province.$error && !$v.province.required">Please Select Province</div>

                </div>
              </div>
                                                                               <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.userType.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">User Type *</label>
                                <div class="col-sm-6">
                                   <select class="form-control"
                                     v-model="$v.userType.$model">
                                        <option value="" selected>Select</option>
                                        <option value="CUSTOMER">CUSTOMER</option>
                                        <option value="AGENT">AGENT</option>
                                        <option value="AGENCY">AGENCY</option>
                                    </select>

                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.userType.$error && !$v.userType.required">Please Select User Type</div>
                              </div>
                         </div>
            
            </div>
            <div class="row">
                                   <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.ParticipantType.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Participant Type </label>
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
            
           <!-- <div
              class="row"
              v-for="(item, idx) in cardNum"
              v-bind:key="item.id"
            >
              <div class="col-md-12">
                <div
                  class="form-group row"
                  :class="{
                    'form-group--error': $v.cardNum.$each[idx].val.$error,
                  }"
                >
                  <label for="name" class="col-sm-2 col-form-label text-right"
                    >Loyalty Card number
                    (If not entered, System will assign a card   for you)
                    </label
                  >//_{{ idx + 1 }}//
                  <div class="col-sm-2">
                    <input
                      type="text"
                      class="form-control"
                      v-model.trim="$v.cardNum.$each[idx].val.$model"
                    />
                  </div>
                  //<div class="col-sm-1">
                    <a
                      class="btn icon-btn btn-sm plus text-success"
                      @click="addInputField()"
                      v-if="idx === 0"
                      title="Add loyal card"
                    >
                      <i class="fa fa-plus"></i>
                    </a>
                    <a
                      class="btn icon-btn btn-sm minus text-danger"
                      @click="removeInputField(idx)"
                      v-if="cardNum.length != 1"
                      title="Remove loyal card"
                    >
                      <i class="fa fa-minus"></i>
                    </a>
                  </div>//
                  <div
                    class="error col-md-12 text-left" style="margin-left:15%"
                    v-if="
                      $v.cardNum.$each[idx].val.$error &&
                      !$v.cardNum.$each[idx].val.numeric
                    "
                  >
                    Please enter a valid card number
                  </div>
                                    <div
                    class="error col-md-12 text-left" style="margin-left:15%"
                    v-if="
                      $v.cardNum.$each[idx].val.$error &&
                      !$v.cardNum.$each[idx].val.maxLength
                    "
                  >
                    Maximum allowed length is 16 characters
                  </div>
                                    <div
                    class="error col-md-12 text-left" style="margin-left:15%"
                    v-if="
                      $v.cardNum.$each[idx].val.$error &&
                      !$v.cardNum.$each[idx].val.minLength
                    "
                  >
                    Minimum allowed length is 12 characters
                  </div>
                </div>
              </div>
            </div>-->

          </div>
        </div>
      </div>
      <div class="d-flex mb-5">
          <button type="button" class="btn btn-success" @click="handleSubmit">
            Submit
          </button>
          <button type="button" class="btn btn-danger" @click="handleCancel">
            Cancel
          </button>
      </div>
    </div>
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      :color="loadingbgcolor"
    ></loading>
  </app-layout>
</template>

<style>
.lock-form {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: grey;
  opacity: 0.2;
  z-index: 100;
  text-align: right;
}
</style>

<script>
import AppLayout from "@/layouts/Merchant.vue";
import $ from "jquery";
import DebugMixin from "@/mixins/debug";
import {
  required,
  minLength,
  maxLength,
  email,
  requiredIf,
  alpha,
  numeric,
  alphaNum,
  helpers,
  regex,
} from "vuelidate/lib/validators";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";
import filter from "lodash/filter";
import Loading from "vue-loading-overlay";
export default {
  name: "ManageRoles",
  components: {
    AppLayout,
    flatPickr,
    Loading,
  },
  mixins: [DebugMixin],
  data: function () {
    return {
      customerId: null,
      username: null,
      firstname: null,
      lastname: null,
      phoneNum: null,
      dob: "",
      gender: "",
      email: null,
      tierId: "",
      ParticipantType:"",
      ParticipantID:"",
      userType:"",
      //cardNum: [],
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
        maxDate: moment().subtract(8, 'years').format('YYYY-MM-DD')
      },
      numOfInputs: -1,
      isLoading: true,
      loadingbgcolor: "#0069d9",
      partnerId: null,
    };
  },
  validations: {
    username: {
      required,
       minLength:minLength(5),
      //alphaNum,
     // maxLength: maxLength(40),
    },
    firstname: {
      required,
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
      minLength:minLength(4),
      maxLength: maxLength(20),
    },
    lastname: {
      required,
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
       minLength:minLength(4),
      maxLength: maxLength(20),
    },
    email: {
      required,
      email,
      maxLength: maxLength(32),
    },
    phoneNum: {
      required,
      numeric,
      maxLength: maxLength(10),
      minLength: minLength(10)
    },
  /*  cardNum: {
      $each: {
        val: {
          numeric,
            maxLength: maxLength(16),
            minLength: minLength(12)
        },
      },
    },*/
    dob: {},
    tierId: {
      required,
    },
    userType:{
      required
    },
    gender: {
      required,
    },
    city: {
      required,
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
      maxLength: maxLength(20),
    },
    country: {
      required,
    },
    province: {
      required
    },
    ParticipantType:{
      
    },
    ParticipantID:{
 required : requiredIf(function () {
        return this.ParticipantType == "BERKLEY_ID"
      }),
    },
    pincode: {
      required,
      alphaNum,
      maxLength: maxLength(6),
    },
    addr1: {
      maxLength: maxLength(32),
    },
    addr2: {
      maxLength: maxLength(32),
    },
  },
  methods: {
     handleBlur(e) {
      // console.log("12333")
          let cache_obj = this;
   //  console.log('blur', e.path[5].innerText)
      if(e.path[2].innerText=="User Name *"){
        this.phonevalue=0
        this.emailvalue=0;
      cache_obj.value=e.path[0]._value
     // console.log("value",e.path[2].innerText)
      
      cache_obj.msg="user name already exists"
       this.getCustomerList(this.value);
      }
           else if(e.path[2].innerText=="Phone *"){
             this.value=0;
             this.emailvalue=0;
      cache_obj.phonevalue=e.path[0]._value
      cache_obj.msg="Phone already exists"
      this.getCustomerList(this.phonevalue);
      }
         else if(e.path[2].innerText=="Email *"){
             this.value=0;
             this.phonevalue=0;
      cache_obj.emailvalue=e.path[0]._value
      cache_obj.msg="Email already exists"
      this.getCustomerList(this.emailvalue);
      }
      
      
    },
       getCustomerList(id,sid) {
         // console.log("Check check")
      let cache_obj = this;
      let cachescope=this;
    // this.isLoading = true;

    //Default: Show all customer 
      this.$store
        .dispatch("user/CheckUser", {
          userName:this.value,
          mobileNumber:this.phonevalue,
          emailId:this.emailvalue,
          //pageNumber: 1,
          //pageSize: 2000,
        })
        .then(function (res) {
         // console.log("then");
          cache_obj.isLoading = false;
          if (res.status=='SUCCESS') {
            cache_obj.rows = res.data;
            cache_obj.isLoading = false;
          }
            else{     
          cachescope.$toast.open({
            message: cache_obj.msg,
            type: "error",
            duration: 10000,
            dismissible: true,
            position: "top",
          });
            }
        })
       .catch(function (err) {

          cachescope.$router.push({ path: `/createmerchantcustomer` });
        });
    },
    getTiersList() {
      let cachescope = this;
      let storeAction = "";
      storeAction = "tiers/initActive";
      this.$store
        .dispatch(storeAction,this.partnerId)
        .then(function (res) {
        //  cachescope.myDebug(JSON.stringify(res));
          cachescope.tierList = [];
          res.data.forEach((tier) => {
            let tierObj = {};
            tierObj.id = tier.id;
            tierObj.name = tier.name;
            cachescope.tierList.push(tierObj);
          });
        })
        .catch(function (err) {
          cachescope.$toast.open({
            message: "Customer action failed. Please try again after sometime",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "top",
          });
          cachescope.$router.push({ path: `/merchantcustomer` });
        });
    },
    getCountryList() {
      let cachescope = this;
      this.$store
        .dispatch("country/init",this.partnerId)
        .then(function (res) {
         // cachescope.myDebug(JSON.stringify(res));
          cachescope.countryList = res;
        })
        .catch(function (err) {
          cachescope.$toast.open({
            message: "Customer action failed. Please try again after sometime",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "top",
          });
          cachescope.$router.push({ path: `/merchantcustomer` });
        });
    },
    getStatesList(countryId) {
      let cachescope = this;
      this.isLoading = true;
         var dataobj={
        partnerId:this.partnerId,
       countryId,
      }
      this.$store
        .dispatch("states/init", countryId)
        .then(function (res) {
       //   cachescope.myDebug(JSON.stringify(res));
          cachescope.stateList = res;
          cachescope.isLoading = false;
        })
        .catch(function (err) {
          cachescope.$toast.open({
            message: "Customer action failed. Please try again after sometime",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "top",
          });
          cachescope.isLoading = false;
        });
    },
    handleCountryChange() {},
   /* addInputField() {
      let id = ++this.numOfInputs;
      this.cardNum.push({ id: id, val: "" });
    },
    removeInputField(idx) {
      this.$delete(this.cardNum, idx);
    },*/
    handleSubmit() {
      if (this.isFormValid()) {
        this.isLoading = true;
          if(this.ParticipantType=="BERKLEY_ID")
            {
              let cachescope=this;
                this.Us=this.ParticipantID;
                this.value= [
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
          userName: this.username,
          firstName: this.firstname,
          lastName: this.lastname,
          mobileNumber: this.phoneNum,
          dob:
            this.dob != "" && this.dob != null
              ? moment(this.dob).format("YYYY-MM-DD[T]HH:mm:ss.SSS") + "Z"
              : "",
          gender: this.gender,
          address: this.addr1,
          addressLine2: this.addr2,
          countryCode: this.country,
          stateName: this.province,
        
           participantDetails:this.value,
          city: this.city,
          postalCode: this.pincode,
         // loyaltyCardNumber: [],
          tierId: this.tierId,
          userType:this.userType,
          timeZone: new Date().getTimezoneOffset(),
          emailId: this.email
        };

       /* this.cardNum.forEach((ele, index) => {
          postJson.loyaltyCardNumber.push(ele.val);
        });*/

        postJson.partnerId = this.partnerId;

        let storeAction = "";
        let errMsg = { success: "", error: "" };
        errMsg.success = "Customer created successfully";
        errMsg.error = "Customer creation failed";
        storeAction = "customer/add";

        this.myDebug("JSON:", JSON.stringify(postJson));

        let cachescope = this;

        this.$store
          .dispatch(storeAction, postJson)
          .then(function (res) {
            if(res.code==200){           // console.log("cehck1221",res);
            let msg=res.message
            cachescope.$toast.open({
              message: msg,
              type: "success",
              duration: 2000,
              dismissible: true,
              position: "top",
            });
            cachescope.isLoading = false;
            cachescope.$router.push({ path: `/merchantcustomer` });
            }
            else{
              console.log("errormessage");
                          let msg=res.message
            cachescope.$toast.open({
              message: msg,
              type: "error",
              duration: 2000,
              dismissible: true,
              position: "top",
            });
            cachescope.isLoading = false;
            cachescope.$router.push({ path: `/createmerchantcustomer` });
            }

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
    handleCancel() {
      this.$router.push({ path: `/merchantcustomer` });
    },
    isFormValid() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        return true;
      }
      return false;
    },
  },
  watch: {
    country: function (newValue, oldValue) {
      this.stateList = [];
      let res = filter(this.countryList, (row) => row.code == newValue);
      if (res.length > 0) {
        this.getStatesList(res[0].id);
      }
    },
  },
  mounted() {
    $(".nav-customer").addClass("active");
    this.partnerId = this.$store.getters["account/getuserid"];
    if (this.$route.query) {
      let obj = this.$route.query;
      if (Object.prototype.hasOwnProperty.call(obj, "customer")) {
        this.customerId = this.$route.query.customer;
      }
    }

    this.isLoading = false;
    //this.addInputField();

    this.getTiersList();
    this.getCountryList();
    //this.handleBlur();
    // @blur="handleBlur"
    //v-on:blur
  },
};
</script>
