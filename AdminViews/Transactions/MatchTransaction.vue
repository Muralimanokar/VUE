<template>
  <app-layout>
    <div class="managemerchant_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'transaction.index' }">Transactions</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Match Transaction</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Match Transaction</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Customer Name</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="customerName">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.customerName.$error && !$v.customerName.maxLength">Maximum allowed length is 32 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.customerName.$error && !$v.customerName.regex">Please enter a valid name</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Customer Email Id</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="customerEmailId">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.customerEmailId.$error && !$v.customerEmailId.maxLength">Maximum allowed length is 32 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.customerEmailId.$error && !$v.customerEmailId.email">Please enter a valid email Id</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Account Number</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="accountNumber">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.accountNumber.$error && !$v.accountNumber.numeric">Please enter a valid account number</div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Transaction Number</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="transactionNumber">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.transactionNumber.$error && !$v.transactionNumber.numeric">Please enter a valid transaction number</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Transaction Amount</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="transactionAmount">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.transactionAmount.$error && !$v.transactionAmount.numeric">Please enter a valid amount</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Transaction Date</label>
                                <div class="col-sm-6 input-group">
                                  <flat-pickr class="form-control"
                                    v-model="transactionDate"
                                    :config="dateConfig">
                                  </flat-pickr>
                                  <div class="input-group-append">
                                    <div class="input-group-text" title="Toggle" data-toggle>
                                      <i class="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
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
                <button type="button" class="btn btn-success" @click="handleSubmit">Submit</button>
                <button type="button" class="btn btn-danger" @click="handleCancel">Cancel</button>
            </div>
        </div>
        <div class="form-section pt-3" v-if="foundResult == 1">
             <div class="card edit_transpnl">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0">Transaction</h2>
                 </div>
                 <div class="card-body px-0" style="padding: 10px 20px !important;">
                     <table class="tbl_edittrans">
                         <tr style="font-weight:500;">
                             <td>Id</td>
                             <td>Transaction ID</td>
                             <td>Description</td>
                             <td>Account Id</td>
                         </tr>
                         <tr class="edit_trans_row">
                             <td>{{id}}</td>
                             <td>{{transactionId}}</td>
                             <td>{{description}}</td>
                             <td>{{accountId}}</td>
                         </tr>
                     </table>
                 </div>
             </div>
        </div>
        <div v-if="foundResult == 2">
            <div class="d-flex mb-5">
               <label for="name" class="col-sm-6
                  col-form-label text-right">No match found</label>
            </div>
        </div>
    </div>
  </app-layout>
</template>

<style>
.input-group i {
  cursor: pointer;
}
.btn-outline-secondary{
    font-size: 13px;
    height: 31px;
    border: 1px solid #7e7e7e !important;
    border-right: 0px !important;
    color: #495057;
}
.phonefield_pnl .dropdown-item{
    font-size: 13px;
}
.resetpassword {
        color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}
.resetpassword:hover {
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
}
.form-group__message {
  font-size: 0.75rem;
  /*line-height: 1;*/
  display: none;
  /*margin-left: 14px;*/
  margin-top: -15px;
  margin-bottom: 15px;
}
.form-group--error,
.form-group--error input,
.form-group--error textarea,
.form-group--error input:focus,
.form-group--error input:hover {
  border: 0px none !important;
  border-bottom: 1px solid #f79483 !important;
}
.form-group--error + .form-group__message,
.form-group--error + .error,
.error {
  display: block;
  color: #f57f6c;
}
.lock-form {
 width:100%;
 height: 100%;
 position: absolute;
 background-color: grey;
 opacity: 0.2;
 z-index: 100;
 text-align: right;
}
.table_container .card {
  border: none;
}
.vbt-table-tools th {
  border-top: none !important;
  border-bottom: none !important;
}
.vbt-table-tools .form-control {
  border: 1px solid #34b8df !important;
  width: 145px;
  height: 31px !important;
}

.has-clear-right .form-control-feedback {
  top: -4px;
  right: -4px;
}

input.form-control[placeholder="ID"] {
  width: 100px;
}
.table_container .card-header {
  display: none;
}
.table_container .card-body {
  padding: 0px;
}
.vbt-column-header {
  border-top: none;
  border-bottom: none;
  background: #34b8df;
  vertical-align: bottom;
  text-align: center;
  font-size: 13px !important;
  border: none !important;
  box-shadow: none;
  font-weight: 500;
}
.card-body tbody tr {
  -webkit-box-shadow: 0 15px 31px #f2f2f2 inset !important;
  box-shadow: 0 15px 31px #f2f2f2 inset !important;
  text-align: center;
  font-size: 13px !important;
  border: none !important;
  font-weight: 400;
}
.action-btn-main .action-icon-btn {
  cursor: pointer;
}
.action-btn-main .action-icon-btn i {
  color: #7f7f7f;
  font-size: 18px;
}
.card-footer {
  padding: 0px;
  background-color: inherit;
  border-top: none;
}
.vbt-per-page-dropdown {
  display: none;
}
.vbt-per-page-dropdown ~ .input-group {
  display: none;
}
.page-item {
  color: #000 !important;
  border: none !important;
}
.page-item .page-link {
  color: #000;
  border: none !important;
  background: none !important;
}
.page-link:focus {
  background: none !important;
  box-shadow: none !important;
}
.page-item.active {
  background: #188ae3 !important;
  border-radius: 50%;
  border: none !important;
  /*width: 28px;*/
  height: 28px;
  top: 5px;
  font-size: 11px;
  position: relative;
}
.page-item.disabled .fa-arrow-left,
.page-item.disabled .fa-arrow-right {
  opacity: 0.5 !important;
}
.table-active td {
  padding: 10px 0px;
}
.table-active td .form-group {
  margin: 0px;
}
.table-active td .form-group input {
  background: #eaeaea;
  border-radius: 2px;
}
.table-active td:nth-child(2) input {
  width: 75px;
}
.table-active td:nth-child(3) input {
  width: 85px;
}
.table-active td:nth-child(4) input {
  width: 75px;
}
.table-active td:nth-child(5) input {
  width: 100px;
}
.table-active td:nth-child(6) input {
  width: 75px;
}
.filter_status {
  background: #eaeaea;
  border-radius: 2px;
}
.tbl_edittrans{
    font-size: 13px;
    width: 100%;
}
.edit_transpnl{
    box-shadow: 1px 2px 2px 1px #888888;
    border-radius: 0px;
}
.edit_trans_row td{
    padding-top:20px;
}

</style>

<script>
import AppLayout from "@/layouts/Admin.vue";
import $ from "jquery";
import DebugMixin from '@/mixins/debug';
import { required, minLength, maxLength, email, alpha, numeric, alphaNum, helpers, regex } from "vuelidate/lib/validators";
import flatPickr from "vue-flatpickr-component";
import 'flatpickr/dist/flatpickr.css';
import moment from "moment";
export default {
  name: "ManagePurchase",
  components: {
    AppLayout,
    flatPickr
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
        transactionId: null,
        customerName: "",
        customerEmailId: "",
        accountNumber: "",
        transactionNumber: "",
        transactionAmount: "",
        transactionDate: "",
        id: "",
        description: "",
        accountId: "",
        foundResult: 0,
        dateConfig: {
          wrap: true,
          maxDate: "today",
        }
    };
  },
  validations: {
    customerName: {
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
      maxLength: maxLength(32)
    },
    customerEmailId: {
      email,
      maxLength: maxLength(32)
    },
    accountNumber: {
      numeric
    },
    transactionNumber: {
      numeric
    },
    transactionAmount: {
      numeric
    }
  },
  methods: {
    handleSubmit() {
      let cachescope = this;
      let postJson = {
        customerName: this.customerName,
        customerEmailId: this.customerEmailId,
        accountNumber: this.accountNumber,
        transactionNumber: this.transactionNumber,
        transactionAmount: this.transactionAmount,
        transactionDate: moment(this.transactionDate).format("YYYY-MM-DD[T]HH:mm:ss.SSS") + "Z",
      };
      cachescope.submitStatus = "LOADING";
      cachescope.myDebug(JSON.stringify(postJson));
      this.$store.dispatch("transaction/match", postJson).then(function(res) {
        cachescope.submitStatus = "IDLE";
       // cachescope.myDebug(JSON.stringify(res));
        cachescope.id = res.id;
        cachescope.transactionId= res.transactionId;
        cachescope.description = res.description;
        cachescope.accountId = res.accountId;
        if(Object.prototype.hasOwnProperty.call(res, 'id')) {
          cachescope.foundResult = 1; //Found match
        } else {
          cachescope.foundResult = 2; //No match found or failure
        }
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Transaction Match failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.foundResult = 2; //No match found or failure
      });
    },
    handleCancel() {
      this.$router.push({ path: `/transaction` });
      return false;
    }
  },
  mounted() {
    $(".nav-transaction").addClass("active");
  }
};
</script>
