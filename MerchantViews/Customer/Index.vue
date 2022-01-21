<template>
  <app-layout>
    <div class="customer_container"   :dtName="'earnList'">
                 <!-- <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'customer.index' }">Customers</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">List Customers</li>
                    </ol>
                    @on-invitecustomer="handleInviteCustomer"
                </nav>
            </div>
        </div>-->
      <div class="table_container">
        <DataTable
          :rows="rows"
          :columns="columns"
          :config="config"
          :actions="actions"
          :dtName="'earnList'"
          @on-addcustomer="handleAddNew"
          @on-importcustomer="handleImportCustomer"
          @on-downloadcustomer="handleDownloadCustomer"
          
          @on-invitesummary="handleInviteSummary"
        >
          <template slot="actionpnl" slot-scope="props">
            <div>
              <div class="d-flex action-btn-main justify-content-center">
                <a
                  class="mx-2 action-icon-btn"
                  title="View"
                  v-on:click="handleViewItem(props.row['id'])"
                >
                  <i class="fa fa-eye"></i>
                </a>
                <a
                  class="mx-2 action-icon-btn"
                  title="Edit"
                  v-on:click="handleEditItem(props.row['id'])"
                >
                  <i class="fa fa-pencil-square-o"></i>
                </a>
                <a class="mx-2 action-icon-btn" title="block" v-if="props.row['isBlocked']" v-on:click='handleSuspendItem(props.row["id"])'>
                  <i class="fa fa-toggle-off" style="color: red !important"></i>
                </a>
                <a class="mx-2 action-icon-btn" title="Un-block" v-if="!props.row['isBlocked']" v-on:click='handleReactivateItem(props.row["id"])'>
                  <i class="fa fa-toggle-on" style="color: green !important"></i>
                </a>
              </div>
            </div>
          </template>
          <template slot="emailIdSlot" slot-scope="props">
            <div
              style="
                width: 120px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
              :title="props.row['emailId']"
            >
              {{ props.row["emailId"] }}
            </div>
          </template>
          <template slot="dobSlot" slot-scope="props">
            <div>{{ getDateFormattedString(props.row["dob"]) }}</div>
          </template>
          <template slot="lastOrderedDateSlot" slot-scope="props">
            <div>{{ getDateFormattedString(props.row["lastOrderedDate"]) }}</div>
          </template>
          <template slot="paginataion-previous-button">
            <i
              class="fa fa-arrow-left"
              style="color: #188ae3"
              aria-hidden="true"
            ></i>
          </template>
          <template slot="paginataion-next-button">
            <i
              class="fa fa-arrow-right"
              style="color: #188ae3"
              aria-hidden="true"
            ></i>
          </template>
         <template slot="empty-results" v-if="isLoading"> Fetching records... </template>
           <template slot="empty-results" v-else> No record found! </template>
        </DataTable>
      </div>
            <div class="modal fade" id=
            "importModal"  style="top: 150px">
        <div class="modal-dialog">
          <div class="modal-content" style="border-radius: 0px">
            <div class="modal-header">
              <h5 class="modal-title" style="font-size: 16px">
                Import Customer
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i class="fa fa-times-circle-o" aria-hidden="true"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="row justify-content-md-center">
                  <div class="col-md-auto">
                    <div class="form-group">
                      <div class="upload-btn-wrapper">
                        <button class="btn btn-primary" >File Upload</button>
                        <input
                          type="file"
                          ref="file"
                          v-on:change="handleFileUpload()" 
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label v-if="importFile"
                        >File chosen : {{ importFile["name"] }}</label
                      ><br />
                      <label v-if="!fileError">File Format : csv</label>
                      <label class="text-danger" v-else
                        >Invalid file Format. Please choose a csv file</label
                      >
                    </div>
                    <div class="form-group" >
                      <label v-if="importFile" 
                        ></label
                      >
                      <label class="text-danger"  v-else id="popup"  style="display:none!important;"
                        > Please choose the file</label
                      >
                    </div>
                    <div class="form-group">
                      <button
                        type="button"
                        class="btn btn-success"
                        @click="submitImportFile"
                      
                     
                      >
                        Submit
                      </button>
                      <!-- <button
                        type="button"
                        class="btn btn-success"
                        @click="submitBerkleyImportFile"
                      >
                        Import BerkleyId
                      </button>-->

                        <!--<button
                        type="button"
                        class="btn btn-danger"
                        @click="handleDownloadCustomer"
                      >
                        Download Customer
                      </button>-->
                    </div>

                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      :color="loadingbgcolor"
    ></loading>
  </app-layout>
</template>

<style>
.customer_container .table-active td:nth-child(2) input {
  width: 120px;
}
.customer_container .table-active td:nth-child(3) input {
  width: 100px;
  margin-left: -10px;
}
.customer_container .table-active td:nth-child(4) input {
  width: 160px;
  margin-left: -10px;
}
.customer_container .table-active td:nth-child(5) input {
  width: 100px;
}
.customer_container .table-active td:nth-child(6) input {
  width: 130px;
}
.customer_container .table-active td:nth-child(7) input {
  width: 110px;
}
.customer_container .table-active td:nth-child(8) input {
  width: 100px;
  padding: 5px !important;
}
.customer_container .table-active td:nth-child(9) input {
  width: 100px;
  padding: 5px !important;
}
.customer_container .table-active td:nth-child(10) input {
  width: 160px;
}
.customer_container .filter_status {
  background: #eaeaea;
  border-radius: 2px;
}
.customer_container .modal-header{
  background: #34b8df;
    border-radius: 0px;
    color: white;
    font-size: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
}
.customer_container .modal-header .close{
  color: white !important;
  background: transparent;
  font-size: 24px;
  opacity:1;
}
.customer_container .modal-header .close i{
  text-shadow: none;
}
.customer_container .upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.customer_container .upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>


<script>
import Vue from "vue";
import DebugMixin from "@/mixins/debug";
import axios from "axios";
import AppLayout from "@/layouts/Merchant.vue";
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
  mixins: [DebugMixin],
  data: function () {
    return {
      isLoading: true,
      fileError: false,
      loadingbgcolor: "#0069d9",
      importFile: null,
      partnerId: null,
      rows: [],
      columns: [      
        {
          label: "Name",
          name: "userName",
          filter: {
            type: "simple",
            placeholder: "Name",
            showClearButton: false,
          },
        },
        {
          label: "Phone",
          name: "mobileNumber",
          filter: {
            type: "simple",
            placeholder: "Phone",
            showClearButton: false,
          },
        },
        {
          label: "Email",
          name: "emailId",
         // slot_name: "emailIdSlot",
          filter: {
            type: "simple",
            placeholder: "Email",
            showClearButton: false,
          },
        },
       /* {
          label: "Gender",
          name: "gender",
        },*/
        {
          label: "DOB",
          name: "dob",
          slot_name: "dobSlot",
          filter: {
            type: "simple",
            placeholder: "DOB",
            showClearButton: false,
          },
        },
        {
          label: "Current Tier",
          name: "tierName",
          filter: {
            type: "simple",
            placeholder: "Current Tier",
            showClearButton: false,
          },
        },
        {
          label: "Total Txn",
          name: "totalTransactions",
          filter: {
            type: "simple",
            placeholder: "Total Txn",
            showClearButton: false,
          },
        },
        {
          label: "Avg.Txn",
          name: "averageTransactionValue",
          filter: {
            type: "simple",
            placeholder: "Avg Txn",
            showClearButton: false,
          },
        },
        {
          label: "Orders",
          name: "orders",
          filter: {
            type: "simple",
            placeholder: "Orders",
            showClearButton: false,
          },
        },
        {
          label: "Last order date",
          name: "lastOrderedDate",
          slot_name: "lastOrderedDateSlot",
          filter: {
            type: "simple",
            placeholder: "Last Order Date",
            showClearButton: false,
          },
        },
        {
          label: "Actions",
          name: "action",
          slot_name: "actionpnl",
        },   
      ],
      actions: [
        {
          btn_text: "Add Customer",
          event_name: "on-addcustomer",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg",
          },
        },
        {
          btn_text: "Import Customer",
          event_name: "on-importcustomer",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg",
          },
        },
                {
          btn_text: "Download Customer",
          event_name: "on-downloadcustomer",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg",
          },
        },
      /*  {
          btn_text: "Invite Customer",
          event_name: "on-invitecustomer",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg",
          },
        },*/
      /*  {
          btn_text: "Invite Summary",
          event_name: "on-invitesummary",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg",
          },
        },*/
      ],
      config: {
        checkbox_rows: false,
        rows_selectable: false,
        show_refresh_button: false,
        show_reset_button: false,
        highlight_row_hover: false,
        per_page: 10,
         global_search: {
          placeholder: "Search",
          showClearButton: false,
        },
      },
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
     // console.log("check transaction",dtName,value);
      //this.pageNumber=value;
      //this.getLoadEarningRuleList();

    },
 //   reloadpage(){
     // $("#importModal").modal("toggle");{
    //console.log("dbbbjhsdbhjd");
   //   window.location.reload();
   // },
   
    getCustomerList(id,sid) {
      let cache_obj = this;
      this.isLoading = true;

      /* Default: Show all customer */
      this.$store
        .dispatch("customer/init", {
          partnerId: this.partnerId,
          segmentId:this.segmentId,
          tierId:sid,
          pageNumber: 1,
          pageSize: 2000,
        })
        .then(function (res) {
          cache_obj.isLoading = false;
        //  cache_obj.myDebug(JSON.stringify(res));
          if (res.data) {
            cache_obj.rows = res.data;
            cache_obj.isLoading = false;
          }
        });
    },
        handleImportCustomer: function () {
              this.importFile=null;
      this.fileError = false;
      $("#importModal").modal("toggle");
      this.$refs.file.value=null
  
    },
        handleFileUpload() {
      this.fileError = false;
      this.importFile = this.$refs.file.files[0];
      //console.log(this.importFile["type"]);
      if (
        this.importFile &&
        this.importFile["type"] !== "text/csv" &&
        this.importFile["type"] !== "application/vnd.ms-excel" 
      ) {
        this.fileError = true;
      }
    },
        submitImportFile: function () {
          //console.log(this.importFile.type);
          if(this.importFile != null ){
            if(this.importFile.type ==="application/vnd.ms-excel"||this.importFile.type === "text/csv"){
      let formData = new FormData();
      $("#importModal").modal("hide");
      formData.append("file", this.importFile);
      let cachescope = this;
      this.isLoading = true;
      axios
        .post(`${process.env.VUE_APP_API_LOCATION}customer/import?partnerId=${this.partnerId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (res) {
        //  console.log("check",res.data);
         var fileURL = window.URL.createObjectURL(new Blob([res.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'Customers.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
        cachescope.isLoading = false;
          if (cachescope.fileError == false) {
            cachescope.$toast.open({
              message: "Customer import success",
              type: "success",
              duration: 3000,
              dismissible: true,
              position: "top",
            });
            cachescope.isLoading = false;
            cachescope.getCustomerList();
            //cachescope.getTiersList();
            cachescope.importFile = null;
          }
        })
        .catch(function (err) {
          cachescope.$toast.open({
            message: "Customer import failed",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "top",
          });
          cachescope.isLoading = false;
          cachescope.getCustomerList();
          //cachescope.getTiersList();
          cachescope.importFile = null;
        });
          }
          }
           else {
             $("#popup").show();

             
     
 }
        
      /* TODO :: Move this to store dispatch */
    },
            submitBerkleyImportFile: function () {
          if(this.importFile != null){
          if(this.importFile.type ==="application/vnd.ms-excel"||this.importFile.type === "text/csv"){
      let formData = new FormData();
      $("#importModal").modal("hide");
      formData.append("file", this.importFile);
      let cachescope = this;
      this.isLoading = true;
      axios
        .post(`${process.env.VUE_APP_API_LOCATION}customer/import-paritcipant-id?partnerId=${this.partnerId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (res) {
          if (cachescope.fileError == false) {
            cachescope.$toast.open({
              message: "Customer import success",
              type: "success",
              duration: 3000,
              dismissible: true,
              position: "top",
            });
            cachescope.isLoading = false;
            cachescope.getCustomerList();
            //cachescope.getTiersList();
            cachescope.importFile = null;
          }
        })
        .catch(function (err) {
          cachescope.$toast.open({
            message: "Customer import failed",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "top",
          });
          cachescope.isLoading = false;
          cachescope.getCustomerList();
          //cachescope.getTiersList();
          cachescope.importFile = null;
        });
          }
          }
                    else {
             $("#popup").show();

             
     
 }
      /* TODO :: Move this to store dispatch */
    },
     handleDownloadCustomer : function() {
      this.isLoading = true;
      let cachescope = this;
      axios({
        url: `${process.env.VUE_APP_API_LOCATION}customer/export?partnerId=${this.partnerId}`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'Customers.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
        cachescope.isLoading = false;
      });
    },
    handleAddNew: function () {
      Vue.router.push({ path: `/createmerchantcustomer` });
    },
    handleInviteCustomer: function () {
      Vue.router.push({ path: `/merchantcustomerinvite/?action=create` });
    },
    handleInviteSummary: function () {
      Vue.router.push({ path: `/merchantinvite` });
    },
    handleViewItem: function (id) {
      this.myDebug("View customer", id);
      let path = `/viewmerchantcustomer/?customer=${id}`;
      Vue.router.push({ path: path });
    },
    handleEditItem: function (id) {
      this.myDebug("Edit customer", id);
      let path = `/editmerchantcustomer/?action=Edit&customer=${id}`;
      Vue.router.push({ path: path });
    },
      handleSuspendItem: function (customerId) {
              let bstatus = "";
     // let successMsg = "";
      //let errMsg = "";
      
        bstatus = confirm("Are you sure un-block this customer?");
      
      if (bstatus == true) {
       this.myDebug("Suspend customer", customerId);
                 var dataobj = {
                   "partnerId" : this.partnerId,
                   "customerId" : customerId 
           
         };
        
      this.myDebug("Suspend customer", dataobj);
      let cachescope = this;
      this.isLoading=true;
      this.$store.dispatch(`customer/unblock`, dataobj).then(function(res) {
     let idx = cachescope.rows.findIndex(ele => ele.customerId == customerId);
        if(idx >= 0) {
          cachescope.rows[idx].isBlocked = !(cachescope.rows[idx].isBlocked);
        }
        cachescope.isLoading = false;
        cachescope.$toast.open({
          message: "Customer Un-block successfully",
          type: "success",
          duration: 2000,
          dismissible: true,
          position: 'top'
        });
        cachescope.getCustomerList();
      }).catch(function(err){
        cachescope.isLoading = false;
        cachescope.$toast.open({
          message: "Customer un-block failed",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
      });
      }
      
    },
    handleReactivateItem: function (customerId) {
      let bstatus=" ";

        bstatus = confirm("Are you sure Block this customer?");
      
      if (bstatus == true) {
       this.myDebug("Un-suspend customer", customerId);

        var dataobj = {
                   "partnerId" : this.partnerId,
           "customerId" : customerId 
           
         };
         
      this.myDebug("un-block customer", dataobj);
      let cachescope = this;
      this.isLoading=true;
      this.$store.dispatch(`customer/block`, dataobj).then(function(res) {
     let idx = cachescope.rows.findIndex(ele => ele.customerId == customerId);
        if(idx >= 0) {
          cachescope.rows[idx].isBlocked = !(cachescope.rows[idx].isBlocked);
        }
        cachescope.isLoading = false;
        cachescope.$toast.open({
          message: "Customer block successfully",
          type: "success",
          duration: 2000,
          dismissible: true,
          position: 'top'
        });
        cachescope.getCustomerList();
      }).catch(function(err){
        cachescope.isLoading = false;
        cachescope.$toast.open({
          message: "Customer block failed",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
      });
      }
      
    },
    getDateFormattedString(date) {
      return date
        ? moment(date, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]").format("YYYY-MM-DD")
        : "";
    },
  },
  mounted() {
        this.partnerId  = this.$store.getters["account/getuserid"];
    if(this.partnerId == undefined || this.partnerId == "") {
        return;
    }    if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'customer')) {
        /* View or Edit action */
        this.customerId = this.$route.query.customer;
      }
    }
 

    if(this.customerId != undefined) {
      //this.handleSuspendItem(this.customerId, this.partnerId);
    }
    $(".nav-customer").addClass("active");
    let cache_obj = this;
    cache_obj.partnerId  = this.$store.getters["account/getuserid"];
      if (this.$route.query) {
      let obj = this.$route.query;
      if (Object.prototype.hasOwnProperty.call(obj, "segment")) {
        this.segmentId = this.$route.query.segment;
      }
    }
            if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }
      if(this.action == "view" && Object.prototype.hasOwnProperty.call(obj, 'tier')) {
        /* View or Edit action */
        this.id = this.$route.query.tier;
        
        
      }
    }
    this.getCustomerList(this.segmentId,this.id);
   // this.handleSuspendItem(this.customerId, this.partnerId);
  },
};
</script>
