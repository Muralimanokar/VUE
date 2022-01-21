<template>
   <auth-layout class="two">
       <div class="auth-continer">
          
             
         
       
           <div class="card" style="width:900px;margin-left:-270px;padding:70px">
         
                    <h2 class="mb-0 one">Thanks for your verification in Clarity Rewards</h2>
               
              
           </div><br><br>
          
    
       </div>
   </auth-layout>
</template>

<style>
.one{
text-align:center;
font-style: normal;
  border: 1px solid rgb(26, 23, 23);
font-size: 15px;
width: 500px;
padding: 5px;
margin-left: 100px;
}

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
  name: "verification",
  components: {
    AuthLayout
  },
 /* beforeCreate: function() {
    document.body.className = "login-bg";
  },*/
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
   /* password: {
        required,
    },
    confirmPassword: {
        required,
        sameAs: sameAs('password')
    }*/
  },
  methods: {
 /*   submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if(this.mailReset) {
            this.handleResetPasswordByUserIdToken();
        } else {
            this.handleResetPasswordBySecQues();
        }
      }
    },*/
    handleResetPasswordByUserIdToken() {
        var postJson = {
            userId: this.userId,
            postData: {
                token: this.token,
            }
        };
        this.isLoading = true;
        let cachescope = this;
        this.$store.dispatch("auth/verification", postJson).then(function(res) {
          cachescope.isLoading = false;
        /*  cachescope.$toast.open({
             // message: "Your password has been reset successfully. Please Login",
              type: "success",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });*/

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
    /*handleResetPasswordBySecQues() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
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
    }*/
  },
  mounted() {
  if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'userId')) {
        this.userId = this.$route.query.userId;
        this.mailReset = true;  // userId will be sent as query param from reset password via email 
      }
      if(Object.prototype.hasOwnProperty.call(obj, 'token')) {
        this.token = this.$route.query.token;
      }
      this.isLoading = false;
    }
    this.handleResetPasswordByUserIdToken();
  },
  destroyed: function() {
    //document.body.className = "";
  }
};
</script>

