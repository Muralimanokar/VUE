<template>
  <app-layout>
     <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'home.index' }">Home</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Reset Password</li>
                    </ol>
                </nav>
            </div>
        </div>
        <form>
          <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i>Reset Password</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                        <div class="col-md-4">
                         </div>
                         <div class="col-md-4">
                             <div  class="form-group row" :class="{ 'form-group--error': $v.oldPassword.$error }">
                                <label for="name" class="col-sm-6 
                                    col-form-label text-right">Confirm Old Password</label>
                                <div class="col-sm-6">
                                    <input type="text"  class="form-control" v-model.trim="$v.oldPassword.$model"/>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.oldPassword.$error && !$v.oldPassword.required">Please enter your Confirm Old Password</div>
                              </div>
                         </div>
                     </div>
                            <div class="row" >
                               <div class="col-md-4">
                         </div>
                         <div class="col-md-4">
                              <div class="form-group row" :class="{ 'form-group--error': $v.newPassword.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">New Password</label>
                                <div class="col-sm-6">
                                    <input type="password"  class="form-control" v-model.trim="$v.newPassword.$model"/>
                                </div>
                                <div class="error error col-sm-12 text-right" v-if="$v.newPassword.$error && !$v.newPassword.required">New Password is required.</div>
                                <div class="error col-sm-12 text-right" v-if="$v.newPassword.$error && !$v.newPassword.minLength">New Password must have at least {{ $v.newPassword.$params.minLength.min }} letters.</div>
                                <div class="error col-sm-12 text-right" v-if="$v.newPassword.$error && !$v.newPassword.maxLength">New Password must have at most {{ $v.newPassword.$params.maxLength.max }} letters.</div>
                              </div>
                         </div>
                            </div>
                            <div class="row" >
                              <div class="col-md-4">
                         </div>
                         <div class="col-md-4">
                              <div class="form-group row" :class="{ 'form-group--error': $v.confirmNewPassword.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Confirm New Password</label>
                                <div class="col-sm-6">
                                    <input type="password"  class="form-control" v-model.trim="$v.confirmNewPassword.$model"/>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.confirmNewPassword.$error && !$v.confirmNewPassword.sameAsPassword">Confirm Password must be identical.</div>
                              </div>
                         </div>
                            
                     </div>
                 </div>
            </div>
            <div>
            <div class="d-flex mb-5" style="margin-left:520px">
                <button type="button" class="btn btn-success" @click="submit">Submit</button>
                <button type="button" class="btn btn-danger" @click="handleCancel">Cancel</button>
            </div>
        </div>
        </div>
        </form>

  </app-layout>
</template>

<style>
.home_content_container{
  height: 100px;
  text-align: center;
  margin-top:100px;
}

</style>


<script>
import Vue from 'vue';
import axios from 'axios'
import $ from "jquery";
import AuthLayout from "@/layouts/Auth.vue";
import DebugMixin from '@/mixins/debug';
import AppLayout from '@/layouts/Admin.vue';
import { validationMixin } from "vuelidate";
import { required, sameAs, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: 'ResetpasswordIndex',
  components: {
    AppLayout
  },
  data() {
    return {
      action: "resetpassword",
      oldPassword: null,
      newPassword: null,
      confirmNewPassword: null,
     // answer: null,
      uuid: "",
      //securityQuestionId: "",
      //questionList: [],
      partnerId: ""

    }
  },
  validations: {
    oldPassword: {
      required,
    },
    newPassword: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(32)
    },
    confirmNewPassword: {
      sameAsPassword: sameAs('newPassword')
    },
   /* answer: {
      required,
    },
    securityQuestionId: {
      //required,
    },*/
  },
methods: {
   /*   getQuestionsList() {
      let cachescope = this;
      let storeAction = "";
      if(this.action == "changepassword") {
        storeAction = "securityquestion/get";
      }
      this.$store.dispatch(storeAction).then(function(res) {
        cachescope.questionList = [];
        res.forEach((questionList) => {
          let questionObj = {};
          questionObj.id = questionList.id;
          questionObj.question = questionList.question;
          cachescope.questionList.push(questionObj);
        });
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Customer action failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
       // cachescope.$router.push({ path: `/merchanthome` });
      });
    },*/

  submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        
        var dataarr = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmNewPassword,
         // securityQuestionId: this.securityQuestionId,
          //answer: this.answer,
          //uuid: this.uuid,
        };
        let cachescope = this;
        this.$store.dispatch("password/changepassword", dataarr).then(function(res) {
          cachescope.$toast.open({
              message: "Password has been successfully updated.",
              type: "success",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
          cachescope.$router.push({ path: `/home` });
        }).catch(function(err){
          let message=err.message;
          cachescope.submitStatus = "READY";
          cachescope.$toast.open({
              message: message,
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
        });
      }
    },
    handleCancel() {
       this.$router.push({ path: `/home` });
    }
  },

  mounted() {
    this.uuid = this.$store.getters["account/getuseruuid"];
   // this.getQuestionsList();
   

  }
};
</script>