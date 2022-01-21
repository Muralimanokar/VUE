<template>
   <auth-layout>
       <div class="auth-continer">
           <div class="logo text-center pb-3">
           </div>
           <div class="whitebg content-inner p-6">
              <div class="row align-items-center">
            <div class="col-md-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                             <router-link :to="{ name: 'login.index' }">Log In</router-link>

                        </li>
                   <li class="breadcrumb-item active" aria-current="page">Forgot password</li>

                    </ol>
                </nav>
            </div>
              </div>
           
                <div class="px-4 pb-2 pt-4">
                   <h2 class="auth-hd text-center">FORGOT PASSWORD?</h2>
                    <div class="form-group pb-2" :class="{ 'form-group--error': $v.emailOrMobile.$error }">
                        <input type="text" class="form-control"
                            v-model.trim="$v.emailOrMobile.$model"
                            placeholder=" Email ">
                    </div>
                    <div class="error col-sm-12 text-right" v-if="$v.emailOrMobile.$error && !$v.emailOrMobile.required">Please enter a Email id or mobile number</div>

                   <!-- <div class="form-group row" :class="{ 'form-group--error': $v.securityQuestionId.$error }" v-if="!forgotSecQues">
                        <div class="col-sm-12">
                            <select class="form-control"
                                v-model="$v.securityQuestionId.$model">
                                <option value="">Security Question</option>
                                <option v-for="securityQuestionId in questionList" :value="securityQuestionId.id" v-bind:key="securityQuestionId.id">{{securityQuestionId.question}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="error col-sm-12 text-right" v-if="$v.securityQuestionId.$error && !$v.securityQuestionId.required">Please select a security question</div>

                    <div class="form-group pb-2" :class="{ 'form-group--error': $v.answer.$error }" v-if="!forgotSecQues">
                        <input type="text" class="form-control"
                            v-model.trim="$v.answer.$model"
                            placeholder=" Answer">
                    </div>
                    <div class="error col-sm-12 text-right" v-if="!$v.answer.error && !$v.answer.required">Please enter your Answer</div>-->

                    <button type="submit" class="btn btn-primary d-block w-100" :disabled="isLoading" @click="submit"> Submit</button>
                </div>
           </div>
          <!--<p class="text-uppercase font-size-16 py-3 m-0 text-center text-white" v-if="!forgotSecQues">
               <a href="#" @click="handleForgotSecQues">Forgot your security question/answer?</a>
           </p>-->
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
import { required, requiredIf, minLength, between } from "vuelidate/lib/validators";

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
      emailOrMobile: "",
     // securityQuestionId: "",
      //answer: "",
      //questionList: [],
      //forgotSecQues: false,
      token: "",
      isLoading: false
    };
  },
  validations: {
    emailOrMobile: {
        required,
        //ValidatePhoneOrEmail,
    },
   /* securityQuestionId: {
      required: requiredIf(function() {
                    return !this.forgotSecQues;
                })
    },
    answer: {
      required: requiredIf(function() {
                    return !this.forgotSecQues;
                })
    }*/
  },
  methods: {
   /* getQuestionsList() {
      let cachescope = this;
      let storeAction = "";
      cachescope.isLoading = true;
      storeAction = "securityquestion/get";
      this.$store.dispatch(storeAction).then(function(res) {
        cachescope.questionList = [];
        res.forEach((questionList) => {
          let questionObj = {};
          questionObj.id = questionList.id;
          questionObj.question = questionList.question;
          cachescope.questionList.push(questionObj);
        });
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.isLoading = false;
      });
    },*/
    handleForgotSecQues() {
        this.forgotSecQues = true;
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.handleForgotPasswordByEmail();
       /* if(this.forgotSecQues) {
            this.handleForgotPasswordByEmail();
        } else {
            this.handleForgotPasswordSubmit();
        }*/
      }
    },
    handleForgotPasswordByEmail() {
        var dataarr = {
            field: this.emailOrMobile
        };
        this.isLoading = true;
        let cachescope = this;
        this.$store.dispatch("password/reSetPassword", dataarr).then(function(res) {
          cachescope.isLoading = false;
          cachescope.$toast.open({
              message: "Password reset mail has been sent. Please check your registered email",
              type: "success",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
          Vue.router.push({ path: `/login` });
        }).catch(function(err){
          cachescope.$toast.open({
              message: "Invalid details provided. Please try again.",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading = false;
        });
    },
    handleForgotPasswordSubmit() {
        var dataarr = {
            userType: "MERCHANT",       //TODO :: Right now forgot password is applicable only for merchant users
            emailId: this.emailOrMobile,
            questionId: this.securityQuestionId,
            answer: this.answer
        };
        this.isLoading = true;
        let cachescope = this;
        this.$store.dispatch("password/forgotpasswordbysecquestion", dataarr).then(function(res) {
          cachescope.isLoading = false;
          cachescope.token = res.token;
          Vue.router.push({ path: `/resetPassword?token=${cachescope.token}` });
        }).catch(function(err){
          cachescope.$toast.open({
              message: "Invalid details provided. Please try again.",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading = false;
        });
    }
  },
  mounted() {
    //this.getQuestionsList();
  },
  destroyed: function() {
    document.body.className = "";
  }
};
</script>

