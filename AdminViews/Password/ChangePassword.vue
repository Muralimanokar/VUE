<template>
   <auth-layout>
       <div class="auth-continer">
           <div class="logo text-center pb-3">

           </div>
           <div class="whitebg content-inner p-3">
               <h2 class="auth-hd text-center">FORGOT PASSWORD?
                            </h2>
                <div class="px-4 pb-2 pt-4">
                   <form @submit.prevent="submit">
                      <div class="form-group row" :class="{ 'form-group--error': $v.securityQuestionId.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Select Question</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.securityQuestionId.$model">
                                        <option value="">Select</option>
                                        <option v-for="securityQuestionId in questionList" :value="securityQuestionId.id" v-bind:key="securityQuestionId.id">{{securityQuestionId.question}}</option>
                                    </select>
                                </div>
                              </div>
                              <div class="error col-sm-12 text-right" v-if="$v.securityQuestionId.$error && !$v.securityQuestionId.required">Please select a security question</div>

                      <!--<div class="error" v-if="!$v.username.ValidatePhoneOrEmail">Please enter valid username</div>-->
                      <div class="form-group pb-2" :class="{ 'form-group--error': $v.answer.$error }">
                          <input type="text" class="form-control"
                              v-model.trim="$v.answer.$model"
                              placeholder="Answer">
                      </div>
                      <div class="error" v-if="!$v.answer.required">Please enter your Answer</div>
                      <button type="submit" class="btn btn-primary
                          d-block w-100" :disabled="submitStatus === 'LOADING'"> Submit</button>
                   </form>
                </div>
           </div>
       </div>
   </auth-layout>
</template>

<style>
.auth-continer .form-group__message,
.auth-continer .error {
  font-size: 0.75rem;
  /*line-height: 1;*/
  display: none;
  /*margin-left: 14px;*/
  margin-top: -15px;
  margin-bottom: 15px;
}
.login-cont-view .form-group--error input {
  border: 0px none !important;
  border-bottom: 1px solid #f79483 !important;
}
.auth-continer .form-group--error input,
.auth-continer .form-group--error textarea,
.auth-continer .form-group--error input:focus,
.auth-continer .form-group--error input:hover {
  border: 0px none !important;
  border-bottom: 1px solid #f79483 !important;
}
.auth-continer .form-group--error + .form-group__message,
.auth-continer .form-group--error + .error {
  display: block;
  color: #f57f6c;
}
</style>

<script>
import Vue from 'vue';
import AuthLayout from "@/layouts/Auth.vue";
import { validationMixin } from "vuelidate";
import { required, minLength, between } from "vuelidate/lib/validators";

const ValidatePhoneOrEmail = value => {
  if (value) {
    return /^\d{10,11}$/.test(value) || /\S+@\S+\.\S+/.test(value);
  }
  return false;
};

export default {
  name: "ForgotpasswordIndex",
  components: {
    AuthLayout
  },
  beforeCreate: function() {
    document.body.className = "login-bg";
  },
  data() {
    return {
      securityQuestionId: null,
      answer: null,
      submitStatus: null,
      questionList: []
    };
  },
  validations: {
    securityQuestionId: {
      required,
      //ValidatePhoneOrEmail,
     // minLength: minLength(4)
    },
    answer: {
      required,
     // minLength: minLength(4)
    }
  },
  methods: {
    getQuestionsList() {
      let cachescope = this;
      let storeAction = "";
      storeAction = "securityquestion/get";
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
          message: "Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
       // cachescope.$router.push({ path: `/merchanthome` });
      });
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        var dataarr = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmNewPassword: this.confirmNewPassword,
          securityQuestionId: this.securityQuestionId,
          answer: this.answer,
          uuid: this.uuid,
        };
        let cachescope = this;
        this.$store.dispatch("password/reSetPassword", dataarr).then(function(res) {

        }).catch(function(err){
          cachescope.submitStatus = "READY";
          cachescope.$toast.open({
              message: "The Username or Password is incorrect",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
        });
      }
    }
  },
  mounted() {


    this.getQuestionsList();

    },
  destroyed: function() {
    document.body.className = "";
  }
};
</script>

