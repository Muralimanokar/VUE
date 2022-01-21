<template>
  <app-layout>
    <div class="managetransfer_container" :dtName="'earnList'">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'transaction.index' }">Transaction</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page" v-if="action=='edit'">Edit Transaction</li>
                        <li class="breadcrumb-item active" aria-current="page" v-else>View Transaction</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
             <div class="card edit_transpnl">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0" v-if="action=='edit'">Edit Transaction</h2>
                    <h2 class="mb-0" v-else>View Transaction</h2>
                 </div>
                 <div class="card-body px-0" style="padding: 10px 20px !important;">
                     <table class="tbl_edittrans">
                         <tr style="font-weight:500;">
                             <td>Txn NO</td>
                             <td>Loyalty ID</td>
                             <td>E-mail</td>
                             <td>Txn.type</td>
                             <td>Txn.Date</td>
                             <td>POS</td>
                             <td>Amount</td>
                             <td>Status</td>
                             <td>Initiated By</td>
                              <td>PNR</td>
                         </tr>
                         <tr class="edit_trans_row">
                             <td>{{transactionId}}</td>
                             <td>{{loyaltyId}}</td>
                             <td>{{emailId}}</td>
                             <td>{{transactionType}}</td>
                             <td>{{getDateFormattedString(transactionDate)}}</td>
                             <td>{{pos}}</td>
                             <td>{{amount}}</td>
                             <td>{{status}}</td>
                             <td>{{initiatedBy}}</td>
                              <td>{{pnr}}</td>
                         </tr>
                     </table>
                 </div>
             </div>
        </div>
        <div class="table_container" style="margin-top:20px;" v-if="rows.length">
          <DataTable :rows="rows" :columns="columns" :config="config" :actions="actions"  :dtName="'earnList'">
            <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="View" v-on:click='handleViewItem(props.row["id"])'>
                              <i class="fa fa-eye"></i>
                          </a>
                          <a class="mx-2 action-icon-btn" title="Edit" v-if="action=='edit'" v-on:click='handleEditItem(props.row["id"])'>
                              <i class="fa fa-pencil-square-o"></i>
                          </a>
                      </div>
                   </div>
            </template>
            <template slot="paginataion-previous-button">
                <i class="fa fa-arrow-left" style="color:#188ae3;" aria-hidden="true"></i>
            </template>
            <template slot="paginataion-next-button">
                <i class="fa fa-arrow-right" style="color:#188ae3;" aria-hidden="true"></i>
            </template>
           
        </DataTable>
        </div>
        <div v-if="this.action!='view'&& this.status=='SUCCESS'&& this.transactionType=='PURCHASE'">
            <div class="d-flex mb-5">
                <button type="button" class="btn btn-success" @click="handleSumbit()">Revert</button>
               <!-- <button type="button" class="btn btn-danger">Void</button>
                <button type="button" class="btn btn-success">Complete</button>-->
                <button type="button" class="btn btn-danger" @click="handleCancel">Cancel</button>
            </div>
        </div>
    </div>
   <!--  <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true" :color="loadingbgcolor"></loading>-->
  </app-layout>
</template>

<style>
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
        margin-left: -20px;

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
import Vue from "vue";
import AppLayout from "@/layouts/Admin.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import $ from "jquery";
import moment from "moment";
//import Loading from 'vue-loading-overlay';
//import 'vue-loading-overlay/dist/vue-loading.css';
import DebugMixin from '@/mixins/debug';
export default {
  name: "ManageTransaction",
  components: {
    AppLayout,
    DataTable,
   // Loading
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
      action: "view",
      transactionId: 0,
      uniqueTransactionId: "",
      emailId: "",
      pnr:"",
      transactionType: "",
      status: "",
      transactionDate: "",
      initiatedBy: "",
      loyaltyId: "",
      accountId: 0,
      amount: 0,
      pos: 0,
      rows: [],
      columns: [
        {
          label: "Product Code",
          name: "productCode",
          filter: {
            type: "simple",
            placeholder: "Code",
            showClearButton: false
          }
        },
        {
          label: "Name",
          name: "productName",
          filter: {
            type: "simple",
            placeholder: "Name",
            showClearButton: false
          }
        },
        {
          label: "Number of Unit",
          name: "quantity",
          filter: {
            type: "simple",
            placeholder: "Unit",
            showClearButton: false
          }
        },
                {
          label: "PNR",
          name: "pnr",
          filter: {
            type: "simple",
            placeholder: "PNR",
            showClearButton: false
          }
        },
        {
          label: "Product value",
          name: "totalPrice",
          filter: {
            type: "simple",
            placeholder: "Value",
            showClearButton: false
          }
        },
        {
          label: "Product Label",
          name: "productLabel",
          filter: {
            type: "simple",
            placeholder: "Label",
            showClearButton: false
          }
        },
       /* {
          label: "Extra Field 1",
          name: "",
          filter: {
            type: "simple",
            placeholder: "Extra Field 1",
            showClearButton: false
          }
        },
                {
          label: "Extra Field 2",
          name: "",
          filter: {
            type: "simple",
            placeholder: "Extra Field 2",
            showClearButton: false
          }
        },  */
            /*    {
          label: "Extra Field 3",
          name: "",
          filter: {
            type: "simple",
            placeholder: "Extra Field 3",
            showClearButton: false
          }
        },
                {
          label: "Extra Field 4",
          name: "",
          filter: {
            type: "simple",
            placeholder: "Extra Field ",
            showClearButton: false
          }
        },*/
        {
          label: "Actions",
          name: "action",
          slot_name: "actionpnl"
        }
      ],
      actions: [],
      config: {
        checkbox_rows: false,
        rows_selectable: false,
        show_refresh_button: false,
        show_reset_button: false,
        highlight_row_hover: false,
        per_page: 10,
        global_search: {
          placeholder: "Search",
          showClearButton: false
        }
      }
    };
  },
      provide:function(){
    return{
      handlePageSelected: this.handlePageSelected,
            updatedfilter:this.updatedfilter

    }
  },
  methods: {
     updatedfilter(){

          },
            handlePageSelected(dtName,value){
    

    },
        handleSumbit() {
                let bstatus = "";
        bstatus = confirm("Are you sure Revert this Transaction");

      if (bstatus == true) {
      let cachescope = this;
      let cacheScope=this;
     // console.log(this.transactionId);
      let dataobj={
        "transactionId":parseInt(this.transactionId),
        "description":"Reverted"
      }
      this.$store.dispatch("transaction/revert",dataobj).then(function(res) {
       // cachescope.myDebug(JSON.stringify(res));
        cachescope.countryList = res;
        let message=res.message
             cacheScope.isLoading = false;
             if(res.code==200){
                 cacheScope.$toast.open({
                    message: message,
                    type: "success",
                    duration: 2000,
                    dismissible: true,
                    position: "top"
                });
             }
             else{
           cachescope.$toast.open({
          message: message,
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });

             }
        cachescope.$router.push({ path: `/transaction` });
      })
      }
    },
    getPurchaseList(id) {
      let cachescope = this;
      cachescope.submitStatus = "LOADING";
      console.log("id",id)
      this.$store.dispatch("purchases/inits", id).then(function(res) {
        cachescope.submitStatus = "IDLE";
        //cachescope.myDebug("Purchase List", JSON.stringify(res));
        cachescope.rows = res.data;
       // cachescope.productlabel=res.data[0].productLabel;
       // console.log("if check the data",cachescope.productlabel=res.data[0].productLabel);
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Transaction action failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/transaction` });
      });
    },
    getTransactionInfo(id) {
      let cachescope = this;
      cachescope.submitStatus = "LOADING";
      this.$store.dispatch("transaction/get", id).then(function(res) {
        cachescope.submitStatus = "IDLE";
       // cachescope.myDebug(JSON.stringify(res));
        cachescope.loyaltyId = res.loyaltyId;
        cachescope.emailId = res.emailId;
        cachescope.pnr=res.pnr;
        cachescope.transactionType = res.transactionType;
        cachescope.status = res.status;
        cachescope.transactionDate = res.transactionDate;
        cachescope.initiatedBy = res.initiatedBy;
        cachescope.accountId = res.accountId;
        cachescope.amount = res.amount;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Transaction edit failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
      });
    },
    handleViewItem: function(id) {
     // this.myDebug("View purchase", id);
      let path = `/managepurchase/?action=view&transaction=${this.transactionId}&purchase=${id}`;
      Vue.router.push({ path: path });
    },
    handleEditItem: function(id) {
     /// this.myDebug("Edit purchase", id);
      let path = `/managepurchase/?action=edit&transaction=${this.transactionId}&purchase=${id}`;
      Vue.router.push({ path: path });
    },
    handleCancel() {
      this.$router.push({ path: `/transaction` });
    },
    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD"):"" );
    }
  },
  mounted() {
    $(".nav-transaction").addClass("active");
    if(this.$route.query) {
      let cachescope=this
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }
      if(this.action != "create" && Object.prototype.hasOwnProperty.call(obj, 'transaction')) {
        /* View or Edit action */
        cachescope.transactionId = this.$route.query.transaction;
      }
    }

    if(this.action == "view") {
      /* TODO :: ADD A VIEWABLE layer on top */
    }

    this.getTransactionInfo(this.transactionId);
    this.getPurchaseList(this.transactionId);
  }
};
</script>
