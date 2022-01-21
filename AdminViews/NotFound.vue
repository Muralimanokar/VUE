<template>
  <app-layout class="two">
       <div class="auth-continer" style="margin-left:550px">
          
             
         

          
    
       </div>

  </app-layout>
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
import Vue from "vue";
import axios from "axios";
import DebugMixin from "@/mixins/debug";
import AppLayout from "@/layouts/Admin.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import $ from "jquery";
import moment from "moment";
export default {
  name: "CustomerIndex",
  components: {
    AppLayout,
    DataTable,
    Loading,
  },
    data: function() {
    return {

    };
    }


  


};
</script>
