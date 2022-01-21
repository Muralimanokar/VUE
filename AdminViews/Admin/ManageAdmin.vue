<template>
  <app-layout>
    <div class="manageroles_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'admin.index' }">Admin</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">{{ action }} Admin</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> {{ action }} Admin</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.firstname.$error }" >
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">First Name *</label>
                                <div class="col-sm-6">
                                    <input type="text" v-model.trim="$v.firstname.$model" class="form-control" value="">
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.firstname.$error && !$v.firstname.required">Please enter the valid first name</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.firstname.$error && !$v.firstname.maxLength">Maximum allowed characters is 32</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.firstname.$error && !$v.firstname.minLength">Minimum length is 2 characters</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.firstname.$error && !$v.firstname.alpha">Only alphabets are allowed</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.lastname.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Last Name *</label>
                                <div class="col-sm-6">
                                     <input type="text" class="form-control" v-model.trim="$v.lastname.$model" value="">
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.lastname.$error && !$v.lastname.required">Please enter the valid last name</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.lastname.$error && !$v.lastname.maxLength">Maximum allowed characters is 32</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.lastname.$error && !$v.lastname.minLength">Minimum length is 2 characters</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.lastname.$error && !$v.lastname.alpha">Only alphabets are allowed</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.phone.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Phone *</label>
                                <div class="col-sm-6">
                                     <input type="text" class="form-control"
                                     v-model.trim="$v.phone.$model">
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:37%" v-if="$v.phone.$error && !$v.phone.required">Please enter the mobile number</div>
                                <div class="error col-md-12 text-left" style="margin-left:37%" v-if="$v.phone.$error && !$v.phone.numeric">Please enter a valid mobile number</div>
                                <div class="error col-md-12 text-left" style="margin-left:37%" v-if="$v.phone.$error && !$v.phone.maxLength">Maximum allowed length is 10 number</div>
                                <div class="error col-md-12 text-left" style="margin-left:37%" v-if="$v.phone.$error && !$v.phone.minLength">Minimum need 10 number</div>
                              </div>

                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.email.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Email *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="$v.email.$model" value="">
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.email.$error && !$v.email.required">Please enter the email</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.role.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Role *</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model.trim="$v.role.$model">
                                        <option value="">Select</option>
                                        <option value="SUPPORT_ADMIN">SUPPORT_ADMIN</option>
                                       <!-- <option v-for="row in roleList" :value="row.id" v-bind:key="row.id">{{row.name}}</option>-->
                                    </select>
                                </div>
                                 <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.role.$error && !$v.role.required">Please Select a Role</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.externaluser.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">IsExternalUser *</label>
                                <div class="col-sm-6">
                                     <div class="form-check form-check-inline" style="padding-top: 7px !important;">
                                        <input class="form-check-input" v-model.trim="$v.externaluser.$model" type="radio" name="rdbexternaluser" id="rdbexternaluser1" value="true">
                                        <label class="form-check-label" for="rdbexternaluser1" style="padding-left:10px;">Yes</label>
                                    </div>
                                    <div class="form-check form-check-inline" style="padding-left:15px;padding-top: 7px !important;">
                                        <input class="form-check-input" v-model.trim="$v.externaluser.$model" type="radio" name="rdbexternaluser" id="rdbexternaluser2" value="false">
                                        <label class="form-check-label" for="rdbexternaluser2" style="padding-left:10px;">No</label>
                                    </div>
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.externaluser.$error && !$v.externaluser.required">select Yes/No</div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Merchant</label>
                                <div class="col-sm-6">
                                    <treeselect :options="merchatList" v-model.trim="merchat" :multiple="multiple" placeholder="Select">
                                        <div slot="value-label" slot-scope="{ node }">{{ node.raw.customLabel }}</div>
                                    </treeselect>
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4" v-if="bfieldvisible">
                             <div class="form-group row" :class="{ 'form-group--error': $v.username.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Username *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="$v.username.$model" value=""/>
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.username.$error && !$v.username.required">Please enter the user name</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.username.$error && !$v.username.maxLength">Maximum allowed characters is 20</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.username.$error && !$v.username.minLength">Minimum length is 4 characters</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.username.$error && !$v.username.isNameValid">Username should not contain special characters</div>
                              </div>
                         </div>
                         <div class="col-md-4" v-if="bfieldvisible">
                             <div class="form-group row" :class="{ 'error-password': $v.password.$error, 'form-group--error': $v.username.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Password *</label>
                                <div class="col-sm-6">
                                    <div class="input-group mb-2">
                                        <input type="password" id="txtpassword" v-model.trim="$v.password.$model" class="form-control" value="">
                                         <div class="input-group-prepend">
                                                <div class="input-group-text">
                                                  <i class="fa fa-eye" id="togglePassword" aria-hidden="true"></i>
                                                </div>
                                         </div>
                                    </div>
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.password.$error && !$v.password.required">Please enter the password</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.password.$error && !$v.password.maxLength">Maximum allowed characters is 20</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.password.$error && !$v.password.minLength">Minimum length is 4 characters</div>
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
                                <div class="error col-md-12 text-left" style="margin-left:50%"  v-if="$v.country.$error && !$v.country.required">Please enter the API KEY</div>
                              </div>
                         </div>
                         <div class="col-md-4" v-if="externaluser=='true'">
                             <div class="form-group row" :class="{ 'form-group--error': $v.apikey.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">APIKey</label>
                                <div class="col-sm-6">
                                    <input :disabled="action == 'Edit'" type="text" class="form-control" v-model="apikey">
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.apikey.$error && !$v.apikey.required">Please enter the Api Key</div>
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
                 </div>
            </div>
        </div>
        <div>
            <div class="d-flex mb-5">
                <button type="button" @click.prevent="save" class="btn btn-success">Save</button>
                <button type="button" @click.prevent="cancel" class="btn btn-danger">Cancel</button>
                <button v-if="action=='Edit'" type="button" @click="resetpassword" class="btn btn-primary">Reset Password</button>

            </div>
        </div>
    </div>
    <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true" :color="loadingbgcolor"></loading>
  </app-layout>
</template>

<style>
.input-group i {
  cursor: pointer;
}
.btn-outline-secondary {
  font-size: 13px;
  height: 31px;
  border: 1px solid #7e7e7e !important;
  border-right: 0px !important;
  color: #495057;
}
.phonefield_pnl .dropdown-item {
  font-size: 13px;
  cursor: pointer;
}
.vue-treeselect__control {
  border: 1px solid #7e7e7e !important;
}
.vue-treeselect__control-arrow,
.vue-treeselect__placeholder {
  color: #7e7e7e;
}
</style>

<script>
import AppLayout from "@/layouts/Admin.vue";
import { validationMixin } from "vuelidate";
import { required, requiredIf , helpers, alpha, minLength, between, email , numeric , maxLength} from "vuelidate/lib/validators";
import filter from "lodash/filter";
import treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import $ from "jquery";
export default {
  name: "ManageAdmin",
  components: {
    AppLayout,
    treeselect,
    Loading
  },
  data() {
    return {
      isLoading: true,
      loadingbgcolor: "#0069d9",
      action: "Add",
      adminid: null,
      multiple: true,
      firstname: null,
      lastname: null,
      email: null,
      phone: null,
      role: null,
      merchat: null,
      apikey : null,
      username: null,
      password: null,
      roleList: [],
      merchatList: [],
      isActive:true,
      bfieldvisible : true,
      externaluser : "true",
      country: null,
      countryList: []
    };
  },
  validations: {
    firstname: {
      required,
      alpha,
      minLength : minLength(2),
      maxLength: maxLength(32)
    },
    apikey:{
     required : requiredIf(function () {
        return this.externaluser == "true"
      }),
    },
    externaluser: {
      required
    },
    lastname: {
      required,
      alpha,
      minLength : minLength(2),
      maxLength: maxLength(32)
    },
    email: {
      required,
      email
    },
    phone: {
      required,
      numeric,
      minLength : minLength(10),
      maxLength: maxLength(10)
    },
    role: {
      required
    },
    username: {
      required :requiredIf(function () {
        return this.action == "Add"
      }),
      isNameValid: helpers.regex('isNameValid',/^[a-z0-9]*$/i),
      minLength : minLength(4),
      maxLength: maxLength(20)
    },
    password: {
      required : requiredIf(function () {
        return this.action == "Add"
      }),
      minLength : minLength(4),
      maxLength: maxLength(20)
    },
    country: {
      required
    },
  },
  methods: {

    handleCountryChange() {
    },
    getCountryList() {
      let cachescope = this;
      this.$store.dispatch("country/init").then(function(res) {
        cachescope.countryList = res;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Country not available.",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/admin` });
      });
    },
    loadroles() {
      let cacheScope = this;
      this.$store.dispatch("roles/init").then(function(res) {
        let roleobj = res.map(row => ({
          id: row.id,
          name: row.roleName
        }));
        cacheScope.roleList = roleobj;
      });
    },
    loadmerchant() {
      let cacheScope = this;
      this.$store.dispatch("merchant/init").then(function(res) {
       // console.log("check",res.data.length);
            var resobj = [{
                id : "0",
                label: "All",
                customLabel: "All",
            }];
            for(var i=0;i<res.data.length;i++){
                resobj.push({
              id: res.data[i].id,
               label: res.data[i].userName,
             customLabel: res.data[i].userName
                });
            }
        cacheScope.merchatList = resobj;
      });
    },
    isFormValid() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        return true;
      }
      return false;
    },
    loadadmindetails(adminid) {
      let cacheScope = this;
      this.$store.dispatch("admin/get", adminid).then(function(res) {
        cacheScope.isLoading = false;
        cacheScope.firstname = res.firstName;
        cacheScope.lastname = res.lastName;
        cacheScope.email = res.emailId;
        cacheScope.username = res.userName;
        cacheScope.apikey = res.apiKey;
        cacheScope.merchat = res.partnerIds;
        cacheScope.role=res.roleName;
       // cacheScope.role = res.roleMasterDto["id"];
        //let smobnum = res.mobileNumber;
        //cacheScope.$refs.mobcountrycode.innerHTML = smobnum.slice(0,3);
       // cacheScope.phone = smobnum.slice(3);
        cacheScope.externaluser = res.isExternalUser?"true":"false";
        cacheScope. country = res.countryCode,
        cacheScope.phone = res.mobileNumber,
        cacheScope.isActive=res.isActive
      });
    },
    save: function() {
      if (this.isFormValid()) {
        var cache_obj = this;
       // var smobnum = this.$refs.mobcountrycode.innerHTML + this.phone;
        let selrole = filter(this.roleList, row => row.id == this.role);
        var data_obj = {
          firstName: this.firstname,
          lastName: this.lastname,
          emailId: this.email,
          userName :  this.username,
          isExternalUser: this.externaluser,
          apiKey: this.apikey,
          mobileNumber: this.phone,
          countryCode: this.country,
          roleName: this.role,
         // roleName: selrole[0].name,
          partnerIds: this.merchat ? this.merchat : [0]
        };
        cache_obj.isLoading = true;
        var storeAction = "";
        var successMsg = "";
        if (this.action == "Add") {
          storeAction = "admin/create";
          successMsg = "User created successfully";
          data_obj["password"] = this.password;
        }else if(this.action == "Edit"){
          storeAction = "admin/update";
          successMsg = "User edited successfully";
          data_obj["id"] = this.adminid;
          data_obj["isActive"] = this.isActive;
        }
        this.$store.dispatch(storeAction, data_obj).then(function(res) {
            cache_obj.isLoading = false;
            cache_obj.$toast.open({
              message: successMsg,
              type: "success",
              duration: 2000,
              dismissible: true,
              position: "top"
            });
            cache_obj.$router.push({ path: `/admin` });
        });
      }
    },
    cancel: function() {
      this.$router.push({ path: `/admin` });
    },
    resetpassword: function() {
      let cachescope = this;
      let param ={
         field: this.email
       }
        this.$store.dispatch("password/reSetPassword",param).then(function(res) {
        }).catch(function(err){
          cachescope.$toast.open({
              message: "Forgot Password",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
        });
    }
  },
  created() {

    if (this.$route.query) {
      let obj = this.$route.query;
      if (Object.prototype.hasOwnProperty.call(obj, "adminid")) {
        this.adminid = this.$route.query.adminid;
        this.action = "Edit";
        this.bfieldvisible = false;
      }
    }
    this.loadroles();
    this.loadmerchant();
    if (this.action == "Edit") {
      this.loadadmindetails(this.adminid);
    } else {
      this.isLoading = false;
    }

  },
  mounted() {
        this.getCountryList();
    $("#togglePassword").click(function() {
      var stype =
        $("#txtpassword").attr("type") == "password" ? "text" : "password";
      $("#txtpassword").attr("type", stype);
      $(this).toggleClass("fa-eye-slash");
    });
    $(".mob_country_code_link span").click(function(e) {
      var scode = $(this).text();
      $(".spancountrycode").text(scode);
    });

  }
};
</script>
