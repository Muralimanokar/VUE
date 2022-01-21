<template>
   <auth-layout>
       <div class="auth-continer">
           <div class="logo text-center pb-3">
               <a class="navbar-brand" href="#"><img
                                src="../../assets/images/claritysso-points.png">
               </a>
           </div>
           <div class="whitebg content-inner p-3">
               <h2 class="auth-hd text-center">Sign In With Your
                            Clarity
                            Points Account</h2>
                <div class="px-4 pb-2 pt-4">
                   <form @submit.prevent="submit">
                     <div class="form-group pb-2" :class="{ 'form-group--error': $v.username.$error }">
                          <input type="text" class="form-control"
                              aria-describedby="emailHelp"
                              placeholder="Username" v-model.trim="$v.username.$model"/>
                      </div>
                      <div class="error" v-if="!$v.username.required">Please enter your username</div>
                      <div class="error" v-if="!$v.username.minLength">Username must have at least 5 letters.</div>
                      <!--<div class="error" v-if="!$v.username.ValidatePhoneOrEmail">Please enter valid username</div>-->
                      <div class="form-group pb-2" :class="{ 'form-group--error': $v.password.$error }">
                          <input type="password" class="form-control"
                              v-model.trim="$v.password.$model"
                              placeholder="Password"> 
                      </div>
                      <div class="error" v-if="!$v.password.required">Please enter your password</div>
                      <div class="error" v-if="!$v.password.minLength">Password must have at least 4 letters.</div>
                      <div class="custom-control custom-checkbox
                          pb-4">
                          <input ref="chkrememberme" id="chkrememberme" type="checkbox"
                              class="custom-control-input"
                             >
                         <!-- <label class="custom-control-label"
                              for="chkrememberme">Keep me signed in</label>-->
                      </div>
                      <button type="submit" class="btn btn-primary
                          d-block w-100" :disabled="submitStatus === 'LOADING'">Sign In</button>
                   </form>
                </div>
           </div>
           <p class="text-uppercase font-size-16 py-3 m-0 text-center
                        text-white">
                        <router-link :to="{ name: 'forgotpassword.index' }" class="linkforgetpassword">Forgot Your Password ?</router-link>
           </p>
              <p class="text-white px-1 font-size-14" style="display:none;">Don't
              have an account ? <a href="#" class="text-uppercase
                  text-white ml-1">Create An Account</a></p>
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
  name: "LoginIndex",
  components: {
    AuthLayout
  },
  beforeCreate: function() {
    document.body.className = "login-bg";
  },
  data() {
    return {
      username: null,
      password: null,
      submitStatus: null
    };
  },
  validations: {
    username: {
      required,
      //ValidatePhoneOrEmail,
      minLength: minLength(4)
    },
    password: {
      required,
      minLength: minLength(4)
    }
  },
  methods: {
    submit() {
      console.log("User Privilages123");
      this.$v.$touch();
      if (!this.$v.$invalid) {
        var dataarr = {
          username: this.username,
          password: this.password,
          rememberme: this.$refs.chkrememberme.checked
        };
        this.submitStatus = "LOADING";
        let cachescope = this;
        console.log("User Privilages4");
        this.$store.dispatch("auth/login", dataarr).then(function(res) {
          console.log("User Privilages456");
           /*Vue.router.push({
            name: 'home.index',
          });*/

        })
        .catch(function(err){
          let message=err.message;
          //console.log("erroor msg",err);
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
    }
  },
  destroyed: function() {
    document.body.className = "";
  }
};
</script>
