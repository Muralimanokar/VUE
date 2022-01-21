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
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'managetransaction.index', query:{action: action, transaction: transactionId} }" v-if="action=='edit'">Edit Transactions</router-link>
                            <router-link :to="{ name: 'managetransaction.index', query:{action: action, transaction: transactionId} }" v-else>View Transactions</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page" v-if="action=='edit'">Edit Purchase</li>
                        <li class="breadcrumb-item active" aria-current="page" v-else>View Purchase</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
        <div class="lock-form" v-if="this.action=='view'">
     <!---     <span class="btn btn-primary">
            <i class="fa fa-lock"></i>
          </span> --->
        </div>
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0" v-if="action=='edit'"><i class="icon
                            icon-rewardcampaigns"></i> Edit Purchase</h2>
                    <h2 class="mb-0" v-else><i class="icon
                            icon-rewardcampaigns"></i> View Purchase</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Product Code</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     :class="{ 'form-group--error': $v.productCode.$error }"
                                     v-model="$v.productCode.$model"
                                     readonly>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.productCode.$error && !$v.productCode.required">Please enter product code</div>
                                <div class="error col-sm-12 text-right" v-if="$v.productCode.$error && !$v.productCode.maxLength">Maximum allowed length is 20 characters</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Product Name</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     :class="{ 'form-group--error': $v.productName.$error }"
                                     v-model.trim="$v.productName.$model"
                                     readonly>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.productName.$error && !$v.productName.required">Please enter product name</div>
                                <div class="error col-sm-12 text-right" v-if="$v.productName.$error && !$v.productName.maxLength">Maximum allowed length is 50 characters</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Number Of Unit</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     :class="{ 'form-group--error': $v.quantity.$error }"
                                     v-model.trim="$v.quantity.$model"
                                     :readonly="this.action!='edit'">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.quantity.$error && !$v.quantity.required">Please enter number of unit</div>
                                <div class="error col-sm-12 text-right" v-if="$v.quantity.$error && !$v.quantity.numeric">Please enter a valid unit</div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Product Value</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     :class="{ 'form-group--error': $v.price.$error }"
                                     v-model.trim="$v.price.$model"
                                     readonly>
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Product Label</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     :class="{ 'form-group--error': $v.productLabel.$error }"
                                     v-model.trim="$v.productLabel.$model"
                                     readonly>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.productLabel.$error && !$v.productLabel.maxLength">Maximum allowed length is 50 characters</div>
                              </div>
                         </div>
                                                  <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">PNR</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     :class="{ 'form-group--error': $v.pnr.$error }"
                                     v-model.trim="$v.pnr.$model"
                                     readonly>
                                </div>
                               <!-- <div class="error col-sm-12 text-right" v-if="$v.productLabel.$error && !$v.productLabel.maxLength">Maximum allowed length is 50 characters</div>-->
                              </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
        <div v-if="this.action!='view'">
            <div class="d-flex mb-5">
                <button type="button" class="btn btn-success" @click="handleSubmit">Submit</button>
                <button type="button" class="btn btn-danger" @click="handleCancel">Cancel</button>
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
/*.lock-form {
 width:100%;
 height: 100%;
 position: absolute;
 background-color: grey;
 opacity: 0.2;
 z-index: 100;
 text-align: right;
} */
</style>

<script>
import AppLayout from "@/layouts/Admin.vue";
import $ from "jquery";
import DebugMixin from '@/mixins/debug';
import { required, minLength, maxLength, email, alpha, numeric, alphaNum, helpers, regex } from "vuelidate/lib/validators";
export default {
  name: "ManagePurchase",
  components: {
    AppLayout
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
        action: "create",
        id: null,
        transactionId: null,
        productCode: "",
        productName: "",
        pnr:'',
        quantity: 0,
        price: 0,
        productLabel: "",
        sourceTransactionId: "",
        currency: ""
    };
  },
  validations: {
    productCode: {
      required,
      maxLength: maxLength(20)
    },
    productName: {
      required,
      maxLength: maxLength(50)
    },
    quantity: {
      required,
      numeric
    },
    pnr:{

    },
    price: {
    },
    productLabel: {
      maxLength: maxLength(50)
    }
  },
  methods: {
    getPurchaseList() {
      let cachescope = this;

      cachescope.submitStatus = "LOADING";
      this.$store.dispatch("purchases/init", this.id).then(function(res) {
        cachescope.submitStatus = "IDLE";
        //cachescope.myDebug(JSON.stringify(res));
        cachescope.sourceTransactionId = res.sourceTransactionId;
        cachescope.productName = res.productName;
        cachescope.productCode = res.productCode;
        cachescope.pnr=res.pnr;
        cachescope.productLabel = res.productLabel;
        cachescope.quantity = res.quantity;
        cachescope.price = res.totalPrice;
        cachescope.currency = res.currency;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Purchase view/edit failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
      });
    },
    getPurchaseInfo(id) {
      let cachescope = this;
      cachescope.submitStatus = "LOADING";
      this.$store.dispatch("purchases/get", id).then(function(res) {
        cachescope.submitStatus = "IDLE";
       // cachescope.myDebug(JSON.stringify(res));
        cachescope.sourceTransactionId = res.sourceTransactionId;
        cachescope.productName = res.productName;
        cachescope.productCode = res.productCode;
        cachescope.productLabel = res.productLabel;
        cachescope.quantity = res.quantity;
        cachescope.price = res.totalPrice;
        cachescope.currency = res.currency;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Purchase view/edit failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
      });
    },
    handleSubmit() {
      if(this.isFormValid()) {
        let postJson = {
          id: this.id,
          sourceTransactionId: this.sourceTransactionId,
          productName: this.productName,
          productCode: this.productCode,
          productLabel: this.productLabel,
          quantity: this.quantity,
          price: this.price,
          pnr:this.pnr,
          currency: this.currency
        }

        this.myDebug("JSON:", JSON.stringify(postJson));

        /* TODO: Add a loading spinner */
        this.submitStatus = "LOADING";
        let cachescope = this;

        this.$store.dispatch("purchases/update", postJson).then(function(res) {
          cachescope.$toast.open({
              message: "Purchase updated successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.$router.push({ path: `/managetransaction/?action=${cachescope.action}&transaction=${cachescope.transactionId}` });
        }).catch(function(err){
          cachescope.submitStatus = "IDLE";
          cachescope.$toast.open({
              message: "Purchase edit failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
        });
      }
    },
    handleCancel() {
      this.$router.push({ path: `/managetransaction/?action=${this.action}&transaction=${this.transactionId}` });
    },
    isFormValid() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    $(".nav-transaction").addClass("active");
    if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }
      if(this.action != "create" && Object.prototype.hasOwnProperty.call(obj, 'transaction')) {
        /* View or Edit action */
        this.transactionId = this.$route.query.transaction;
      }
      if(this.action != "create" && Object.prototype.hasOwnProperty.call(obj, 'purchase')) {
        /* View or Edit action */
        this.id = this.$route.query.purchase;
      }
    }

    this.getPurchaseInfo(this.id);

  }
};
</script>
