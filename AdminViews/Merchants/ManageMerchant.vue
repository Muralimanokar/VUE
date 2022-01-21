<template>
  <app-layout>
    <div class="managemerchant_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'merchant.index' }">Merchant</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">{{ action }} Merchant</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> {{ action }} Merchant</h2>
                 </div>
                 <div class="card-body px-0" style="margin-left:-97px">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.partnername.$error }" >
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Name *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                    v-model="$v.partnername.$model">
                                </div>
                                <div class="error col-sm-12 text-right" style="margin-left:-15px" v-if="$v.partnername.$error && !$v.partnername.required">Please enter your first name</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.username.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Username *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model="$v.username.$model">
                                </div>
                                <div class="error col-sm-12 text-right" style="margin-left:5px" v-if="$v.username.$error && !$v.username.required">Username should not be empty</div>
                            <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.username.$error && !$v.username.minLength">Minimum allowed length is 5 characters</div>

                              </div>
                         </div>
                         
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.email.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Email *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model="$v.email.$model">
                                </div>
                                <div class="error col-sm-12 text-right" style="margin-left:-30px" v-if="$v.email.$error && !$v.email.required">Please enter your Email Id</div>
                              </div>
                         </div>
                         
                     </div>
                     <div class="row">
                            <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.phone.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Phone *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"  v-model="$v.phone.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.phone.$error && !$v.phone.required">Please enter your phone number</div>
                                <div class="error col-sm-12 text-right" v-if="$v.phone.$error && !$v.phone.maxLength">Maximum Allowd 10 Numbers</div>
                                <div class="error col-sm-12 text-right" v-if="$v.phone.$error && !$v.phone.minLength">Minimun 10 Number Need</div>
                              </div>
                         </div>
                          <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.busitype.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Business Type *</label>
                                <div class="col-sm-6">
                                   <select class="form-control" v-model="$v.busitype.$model">
                                        <option value="">Select</option>
                                        <option value="RETAIL">Retail</option>
                                        <option value="TRAVEL">Travel</option>
                                        <option value="BANKING">Banking</option>
                                        <option value="MEDICAL">Medical</option>
                                        <option value="GOVERNMENT">Government</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" style="margin-left:-8px" v-if="$v.busitype.$error && !$v.busitype.required">Please select a business type</div>
                              </div>
                         </div>
                                            <div class="col-md-4">
                             <div class="form-group row">
                                <label for="yearOfIncorporation" class="col-sm-6
                                    col-form-label text-right">Year Of Incorporation*</label>
                                <div class="col-sm-6 input-group">
                                  <flat-pickr class="form-control"
                                  style="background-color:white;"
                                     v-model="yearOfIncorporation"
                                    :config="dateConfig">
                                  </flat-pickr>
                                  <div class="input-group-append">
                                    <div class="input-group-text" title="Toggle" data-toggle>
                                      <i class="fa fa-calendar"></i>
                                    </div>
                                   </div>
                                </div>
                              </div>
                         </div>
                    
                    
                         
                     </div>
                     <div class="row">
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
                             <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.address.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Address *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model="$v.address.$model">
                                </div>
                                <div class="error col-sm-12 text-right" style="margin-left:-30px" v-if="$v.address.$error && !$v.address.required">Please enter your address</div>
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
                             <div class="form-group row" :class="{ 'form-group--error': $v.city.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">City *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"  v-model="$v.city.$model">
                                </div>
                                <div class="error col-sm-12 text-right" style="margin-left:-53px" v-if="$v.city.$error && !$v.city.required">Please enter your city</div>
                              </div>
                         </div>
                            <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.country.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Country *</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model="$v.country.$model" @change="handleCountryChange">
                                        <option value="" selected>Select</option>
                                        <option v-for="country in countryList" :value="country.code" v-bind:key="country.id">{{country.name}}</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" style="margin-left:-52px" v-if="$v.country.$error && !$v.country.required">Please select a country</div>
                              </div>
                         </div>
                         
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.province.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Province *</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model="$v.province.$model">
                                        <option value="" selected>Select</option>
                                        <option v-for="state in stateList" :value="state.name" v-bind:key="state.id">{{state.name}}</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" style="margin-left:-42px" v-if="$v.province.$error && !$v.province.required">Please select a province</div>
                              </div>
                         </div>

                    
                         
                    
                         
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.postalcode.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Postal Code</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model="$v.postalcode.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.postalcode.$error && !$v.postalcode.required">Please enter your postal code</div>
                              </div>
                         </div>
                           <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.currency.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Operation Currency *</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model="$v.currency.$model">
                                        <option value="">Select</option>
                                        <option v-for="row in currencyList" :value="row.id" v-bind:key="row.id">{{row.name}}</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.currency.$error && !$v.currency.required">Please select a operation currency</div>
                              </div>
                         </div>
                           <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.subtype.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Subscription Type *</label>
                                <div class="col-sm-6">
                                   <select class="form-control" v-model="$v.subtype.$model">
                                        <option value="">Select</option>
                                        <option v-for="row in subscriptionList" :value="row.id" v-bind:key="row.id">{{row.planName}}</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right"  style="margin-left:20px" v-if="$v.subtype.$error && !$v.subtype.required">Please select a subscription type</div>
                              </div>
                         </div>
                         




                      
                                                                <!--     <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.yearOfIncorporation.$error }">
                                <label for="yearOfIncorporation" class="col-sm-6
                                    col-form-label text-right">Year OfIncorporation*</label>
                                <div class="col-sm-6">
                                     <input type="text" class="form-control"
                                     v-model.trim="$v.yearOfIncorporation.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.yearOfIncorporation.$error && !$v.yearOfIncorporation.required">Please enter your business mobile number</div>
                                <div class="error col-sm-12 text-right" v-if="$v.yearOfIncorporation.$error && !$v.yearOfIncorporation.numeric">Please enter a valid business mobile number</div>
                                <div class="error col-sm-12 text-right" v-if="$v.yearOfIncorporation.$error && !$v.yearOfIncorporation.maxLength">Maximum allowed length is 10 characters</div>

                              </div>
                         </div>-->
                                
                     </div>
                     <div class="row">
                          <div class="col-md-4" v-if="action=='Add'">
                             <div class="form-group row" :class="{ 'form-group--error': $v.password.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Password *</label>
                                <div class="col-sm-6">
                                    <input type="password" class="form-control" v-model="$v.password.$model">
                                </div>
                                <div class="error col-sm-12 text-right" style="margin-left:7px" v-if="$v.password.$error && !$v.password.required">Password should not be empty</div>
                              </div>
                         </div>
                         
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Contact Name</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model="contname">
                                </div>
                              </div>
                         </div>
                             
                                         
                             
                            
                                                  <div class="col-md-4" v-if="action=='Edit'">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Status</label>
                                <div class="col-sm-6">
                                    <div class="custom-control custom-switch">
                                        <input type="checkbox" id="customSwitch2" class="custom-control-input" v-model="isActive">
                                        <label for="customSwitch2" class="custom-control-label"></label>
                                    </div>
                                </div>
                              </div>
                            </div>
                         </div>
                     <!--<div class="row" v-for="(n,idx) in secQues.length" v-bind:key="n">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.secQues.$each[idx].ques.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Security Question {{n}} *</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model="$v.secQues.$each[idx].ques.$model">
                                        <option value="" selected>Select</option>
                                        <option v-for="secQues in secQuesList" :value="secQues.id" v-bind:key="secQues.id">{{secQues.question}}</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.secQues.$each[idx].ques.$error && !$v.secQues.$each[idx].ques.required">Please select a security question</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.secQues.$each[idx].answer.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Security Answer *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model="$v.secQues.$each[idx].answer.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.secQues.$each[idx].answer.$error && !$v.secQues.$each[idx].answer.required">Please enter a security answer</div>
                              </div>
                         </div>
                     </div>-->
                     <!--<div class="row" v-if="dupSecQues">
                         <div class="col-md-12">
                             <div class="form-group row form-group--error" style="padding-left: 24px;">
                                <div class="error col-sm-12">Duplicate security chosen. Please select unique questions to proceed</div>
                              </div>
                         </div>
                     </div>-->
                 </div>
            </div>
        </div>
        <div>
            <div class="d-flex mb-5">
                <button type="button" class="btn btn-success" @click="handleSubmit">Save</button>
                <button type="button" class="btn btn-danger" @click="handleCancel">Cancel</button>
              <!---  <button type="button" class="btn btn-info" v-if="action=='Edit'" @click="resetpassword">Reset Password</button> --->
            </div>
        </div>
    </div>
    <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true" :color="loadingbgcolor"></loading>
  </app-layout>
</template>

<style>
.form-group--error .error {
  font-size: 13px;
  color: #f79483;
  margin-top: 4px;
}
</style>

<script>
import AppLayout from "@/layouts/Admin.vue";
import $ from "jquery";
import DebugMixin from "@/mixins/debug";
import flatPickr from "vue-flatpickr-component";
import 'flatpickr/dist/flatpickr.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import filter from "lodash/filter";
import moment from "moment";
import {
  required,
  minLength,
  maxLength,
  email,
  alpha,
  numeric,
  alphaNum,
  helpers,
  regex
} from "vuelidate/lib/validators";
import ManageCustomerVue from '../Customer/ManageCustomer.vue';
export default {
  name: "ManageMerchant",
  components: {
    AppLayout,
    Loading,
     flatPickr,
  },
  mixins: [DebugMixin],
  data: function() {
    return {
      seen: true,
      isLoading : true,
      loadingbgcolor : '#0069d9',
      action : "Add",
      merchantid : null,
      partnername: null,
      address: null,
      city: null,
      province: null,
      country: null,
      addressLine2:null,
      postalcode: null,
      email: null,
      phone: null,
      organisationMobileNumber:null,
      yearOfIncorporation:"",
      busitype: null,
      subtype: null,
      currency: null,
      contname: null,
      username : null,
      password: null,
      countryList: [],
      stateList: [],
      subscriptionList: [],
      currencyList : [],
      isActive: null,
      loyaltyId: "",
        dateConfig: {
          wrap: true,

        },
      secQuesList: [],
      secQues: [
        { ques: "", answer: "" },
        { ques: "", answer: "" },
        { ques: "", answer: "" }
      ],
      //dupSecQues: false
    };
  },
  watch : {
      country : function(newValue,oldValue){
      // console.log("check watch",newValue,oldValue);
          let res = filter(this.countryList , row => (row.code == newValue));
        //  console.log("chekc resss",res);
          if(res.length > 0){
              this.getStatesList(res[0].id);
              this.loadSubscriptionType(res[0].code);
              this.loadCurrencyList(res[0].id);
          }
      }
  },
  validations: {
    partnername: {
      required
    },
        addressLine2: {
      maxLength: maxLength(32)
    },
    address: {
      required
    },
    city: {
      required
    },
    province: {
      required
    },
           yearOfIncorporation: {
      required,
      numeric,
      maxLength: maxLength(10)
    },
       organisationMobileNumber: {
      required,
      numeric,
      maxLength: maxLength(10)
    },
    country: {
      required
    },
    postalcode: {
      alphaNum,
      maxLength: maxLength(6)
    },
    email: {
      required,
      email,
      maxLength: maxLength(32)
    },
    phone: {
      required,
      numeric,
      maxLength: maxLength(10),
      minLength: minLength(10)
    },
    busitype: {
      required
    },
    subtype: {
      required
    },
    currency: {
      required
    },
    username : {
      required,
      alphaNum,
       minLength: minLength(5),
      maxLength: maxLength(20)
    },
    password: {
      required
    },
    secQues: {
      $each: {
        ques: {
            //required
        },
        answer: {
            //required
        }
      }
    }
  },
  methods: {
    getCountryList() {
      let cachescope = this;
      this.$store
        .dispatch("country/init")
        .then(function(res) {

         // cachescope.myDebug(JSON.stringify(res));
          cachescope.countryList = res;
        })
        .catch(function(err) {
        });
    },
    getStatesList(countryid) {
      let cachescope = this;
      console.log("check state",countryid);
      //if (!this.country) return;
      this.$store
        .dispatch("states/init", countryid)
        .then(function(res) {
          cachescope.stateList = res;
        })
        .catch(function(err) {});
    },
    loadSubscriptionType() {
      let cachescope = this;
      this.$store
        .dispatch("subscription/init",this.country)
        .then(function(res) {
         // cachescope.myDebug(JSON.stringify(res));
          cachescope.subscriptionList = res;
        })
        .catch(function(err) {
        });
    },
    loadCurrencyList(countryid) {
      let cachescope = this;
      this.$store
        .dispatch("country/getCurrencylist",countryid)
        .then(function(res) {
          cachescope.currencyList = [res];
        })
        .catch(function(err) {
        });
    },
    handleCountryChange() {
     // this.stateList = [];
      //this.getStatesList();
    },
    isSecQuesDup() {
        let cacheScope = this;
        return this.secQues.map(function(obj) {
            return (obj.ques);
        }).some(function(value, idx, array) {
            return array.indexOf(value) !== array.lastIndexOf(value);
        });
    },
    isFormValid() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        //console.log("in");
      /*  if(this.isSecQuesDup()) {
            this.dupSecQues = true;
            return false;
        } else {
            this.dupSecQues = false;
        }*/
        return true;
      }
     // console.log("out");
      return false;
    },
    handleSubmit() {
      
      if (this.isFormValid()) {
        let cacheScope = this;
       // console.log("check data");
        let dataobj = {
            "organisationName": this.partnername,
            "organisationType": this.busitype,
            "organisationDescription": "",
            "organisationLogoURL": "",
            "organisationEmailId": this.email,
            "organisationMobileNumber": this.organisationMobileNumber,
            "organisationAddress": this.addressLine2,
            "yearOfIncorporation":this.yearOfIncorporation,
            "firstName": this.contname,
            "lastName": this.contname,
            "userName": this.username,
            "password": this.password,
            "mobileNumber": this.phone,
            "emailId": this.email,
            "dob": moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS") + "Z",
            "gender": "MALE",
            "address": this.address,
            "timeZone": new Date().getTimezoneOffset(),
            "countryCode": this.country,
            "stateName": this.province,
            "city": this.city,
            "isActive":this.isActive,
            "postalCode": this.postalcode,
            //"subscriptionPlanId": this.subtype,
            "operatingCurrency" : this.currency,
            "subscriptionPlansDto": {
                  "id": this.subtype,
              },
        };
        let storeAction = "merchant/add";
        let successMsg = "Merchant created successfully";
        if(this.action == "Edit") {
            dataobj["id"] = this.merchantid;
            storeAction = "merchant/edit";
            successMsg = "Merchant updated successfully";
        }
        this.isLoading = true;
        this.$store.dispatch(storeAction, dataobj).then(function(res) {
          cacheScope.isLoading = false;
          //cacheScope.handleSecQuesSubmit(cacheScope.loyaltyId);
          cacheScope.$toast.open({
              message: successMsg,
              type: "success",
              duration: 2000,
              dismissible: true,
              position: "top"
          });
          cacheScope.$router.push({ path: `/merchant` });
        }).catch(function(err){
        });
      }
    },
    handleSecQuesSubmit(loyaltyId) {
      if (this.isFormValid()) {
        let cacheScope = this;
        if(this.loyaltyId == "" || this.loyaltyId == undefined) {
            return;
        }
        let postJson = {
            id: loyaltyId,
            data: []
        }

        this.secQues.forEach((ele) => {
            let obj = {
                questionId: ele.ques,
                answer: ele.answer
            }
            postJson.data.push(obj);
        });
        let storeAction = "securityquestion/userAdd";
        if(this.action == "Edit") {
            storeAction = "securityquestion/userChange";
        }
        storeAction = "securityquestion/userAddOrChange";
        this.isLoading = true;
        this.$store.dispatch(storeAction, postJson).then(function(res) {
          cacheScope.isLoading = false;
        }).catch(function(err){
          cacheScope.isLoading = false;
        });
      }
    },
    handleCancel() {
      this.$router.push({ path: `/merchant` });
    },
    resetpassword() {
      //this.$v.$touch();

       /* var dataarr = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmNewPassword: this.confirmNewPassword,
          securityQuestionId: this.securityQuestionId,
          answer: this.answer,
          uuid: this.uuid,
        };*/
       let param ={
         field: this.email
       }
        let cachescope = this;
        this.$store.dispatch("password/reSetPassword", param).then(function(res) {

        }).catch(function(err){
          cachescope.submitStatus = "READY";
          cachescope.$toast.open({
              message: "Forgot Password",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
        });


    },
    getSecurityQuestions(){
        let cacheScope = this;
        this.$store.dispatch("securityquestion/get").then(function(res) {
            cacheScope.secQuesList = res;
        }).catch(function(err){
            cacheScope.isLoading = false;
        });
    },
    loadMerchantDetails(merid){   
        let cacheScope = this;
        cacheScope.isLoading = true;
        this.$store.dispatch("merchant/get", merid).then(function(res) {
         // console.log("merchnstg respopne",res);
            cacheScope.isLoading = false;
            cacheScope.partnername = res.organisationName;
            cacheScope.address = res.address;
            cacheScope.password = res.password;
             cacheScope.yearOfIncorporation = res.yearOfIncorporation;
             cacheScope.organisationMobileNumber = res.organisationMobileNumber;
             cacheScope.addressLine2 = res.organisationAddress;
            cacheScope.phone = res.mobileNumber;
            cacheScope.email = res.emailId;
            cacheScope.country = res.countryCode;
            
            cacheScope.province = res.stateName;
            cacheScope.city = res.city;
            cacheScope.postalcode = res.postalCode;
            cacheScope.subtype = res.subscriptionPlansDto.id;
            cacheScope.busitype = res.organisationType;
            cacheScope.username = res.userName;
            cacheScope.contname = res.firstName;
            cacheScope.currency = res.operatingCurrency;
            cacheScope.isActive = res.isActive;
            cacheScope.loyaltyId = res.loyaltyId;
            //cacheScope.loadSecQues(cacheScope.loyaltyId);
        }).catch(function(err){
            cacheScope.isLoading = false;
        });
    },
    loadSecQues(loyaltyId) {
        let cacheScope = this;
        cacheScope.isLoading = true;
        this.$store.dispatch("securityquestion/getUserQuesAns", loyaltyId).then(function(res) {
            if(res.length) {
                cacheScope.secQues = [];
                cacheScope.isLoading = false;
                res.forEach((ele) => {
                    let obj = {
                        ques: ele.questionId,
                        answer: ele.answer
                    }
                    cacheScope.secQues.push(obj);
                });
            }
            cacheScope.isLoading = false;
        }).catch(function(err){
            cacheScope.isLoading = false;
        });
    }
  },
  created(){
    if (this.$route.query) {
      let obj = this.$route.query;
      if (Object.prototype.hasOwnProperty.call(obj, "merchantid")) {
        this.merchantid = this.$route.query.merchantid;
        this.action= "Edit";
      }
    }
    this.getCountryList();
    this.loadSubscriptionType();
    if(this.action == "Edit"){
        this.loadMerchantDetails(this.merchantid);
    }
    else {
        this.isLoading = false;
    }
  },
  mounted() {
    $(".nav-merchant").addClass("active");
    let cache_obj=this;
    cache_obj.partnerId  = this.$store.getters["account/getuserid"];
   
    //this.getSecurityQuestions();
  }
};
</script>
