<template>
   <auth-layout>
       <div class="auth-continer">
           <div class="logo text-center pb-3">
           </div>
           <div class="whitebg content-inner p-3">
               <h2 class="auth-hd text-center">RESET PASSWORD</h2>
                <div class="px-4 pb-2 pt-4">
                    <div class="form-group pb-2" :class="{ 'form-group--error': $v.password.$error }">
                        <input type="password" class="form-control"
                            v-model.trim="$v.password.$model"
                            placeholder="New Password">
                    </div>
                    <div class="error col-sm-12 text-right" v-if="$v.password.$error && !$v.password.required">Please enter a new password</div>

                    <div class="form-group pb-2" :class="{ 'form-group--error': $v.confirmPassword.$error }">
                        <input type="password" class="form-control"
                            v-model.trim="$v.confirmPassword.$model"
                            placeholder="Confirm New Password">
                    </div>
                    <div class="error col-sm-12 text-right" v-if="!$v.confirmPassword.error && !$v.confirmPassword.required">Please confirm your password</div>
                    <div class="error col-sm-12 text-right" v-if="!$v.confirmPassword.error && !$v.confirmPassword.sameAs">Password mismatch</div>

                    <button type="submit" class="btn btn-primary d-block w-100" :disabled="isLoading" @click="submit"> Submit</button>
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
import { required, sameAs } from "vuelidate/lib/validators";

export default {
  name: "ResetpasswordIndex",
  components: {
    AuthLayout
  },
  beforeCreate: function() {
    document.body.className = "login-bg";
  },
  data() {
    return {
      password: "",
      confirmPassword: "",
      userId: "",
      token: "",
      mailReset: false,
      isLoading: true
    };
  },
  validations: {
    password: {
        required,
    },
    confirmPassword: {
        required,
        sameAs: sameAs('password')
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if(this.mailReset) {
            this.handleResetPasswordByUserIdToken();
        } else {
            this.handleResetPasswordBySecQues();
        }
      }
    },
    handleResetPasswordByUserIdToken() {
        var postJson = {
            userId: this.userId,
            postData: {
                token: this.token,
                password: this.password
            }
        };
        this.isLoading = true;
        let cachescope = this;
        this.$store.dispatch("password/resetpasswordbytoken", postJson).then(function(res) {
          cachescope.isLoading = false;
          cachescope.$toast.open({
              message: "Your password has been reset successfully. Please Login",
              type: "success",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
          Vue.router.push({ path: `/login` });
        }).catch(function(err){
           let message= err.message;
          cachescope.$toast.open({
           
              message: message,
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading = false;
        });
    },
    handleResetPasswordBySecQues() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        //console.log("check",this.token);
        var postJson = {
            token: this.token,
            password: this.password
        };
        this.isLoading = true;
        let cachescope = this;
        this.$store.dispatch("password/resetpasswordbysecquestion", postJson).then(function(res) {
          cachescope.isLoading = false;
          cachescope.$toast.open({
              message: "Your password has been reset successfully. Please Login",
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
      }
    }
  },
  mounted() {
    if(this.$route.query) {
     // console.log("check mounted");
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'userId')) {
        this.userId = this.$route.query.userId;
        this.mailReset = true;  /* userId will be sent as query param from reset password via email */
      }
      if(Object.prototype.hasOwnProperty.call(obj, 'token')) {
        this.token = this.$route.query.token;
      }
      this.isLoading = false;
    }
  },
  destroyed: function() {
    document.body.className = "";
  }
};
</script>

