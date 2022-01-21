<template>
  <app-layout>
    <div class="customer_container">
      <div class="table_container">
        <DataTable
          :rows="rows"
          :columns="columns"
          :config="config"
          :actions="actions"
          id="one"
          :dtName="'earnList'"
          @on-addcustomer="handleAddNew"          
          @on-importcustomer="handleImportCustomer"
          @on-downloadcustomer="handleDownloadCustomer"
        >
          <template slot="actionpnl" slot-scope="props">
            <div>
              <div class="d-flex action-btn-main justify-content-center">
                <a v-if="(props.row['check']) == true" 
                  class="mx-2 action-icon-btn"
                  title="View"
                  v-on:click="handleViewItem(props.row['id'])"
                >
                  <i class="fa fa-eye"></i>
                </a>
                <a v-if="(props.row['modify']) == true" 
                  class="mx-2 action-icon-btn"
                  title="Edit"
                  v-on:click="handleEditItem(props.row['id'])"
                >
                  <i class="fa fa-pencil-square-o"></i>
                </a>
                <a v-if="props.row['isSuspended'] && (props.row['suspend']) ==true"
                  class="mx-2 action-icon-btn"
                  title="Suspend"
                  
                  v-on:click="handleSuspendItem(props.row['id'], false)"
                >
                  <i class="fa fa-toggle-on" style="color: red !important"></i>
                </a>
                <a
                  class="mx-2 action-icon-btn"
                  title="Un-Suspend"
                  v-if="!props.row['isSuspended']&& (props.row['suspend']) ==true"
                  v-on:click="handleSuspendItem(props.row['id'], true)"
                >
                  <i class="fa fa-toggle-off" style="color: green !important"></i>
                </a>
                <a
                  class="mx-2 action-icon-btn"
                  title="Activate"
                  v-if="props.row['isActive']&& (props.row['activate']) ==true"
                  v-on:click="handleActivateItem(props.row['id'], false)"
                >
                  <i class="fa fa-toggle-off" style="color: green !important"></i>
                </a>
                <a
                  class="mx-2 action-icon-btn"
                  title="De-Activate"
                  v-if="!props.row['isActive']&& (props.row['activate']) ==true"
                  v-on:click="handleActivateItem(props.row['id'], true)"
                >
                  <i class="fa fa-toggle-on" style="color: red !important"></i>
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
          <template slot="lastoSlot" slot-scope="props">
            <div>
              {{ getDateFormattedString(props.row["lastOrderedDate"]) }}
            </div>
          </template>
          <template slot="filter_dob">
            <div class="dropdown" style="margin-top: 5px">
              <a
                class="drp-dwn-link text-underline"
                style="color: #000 !important"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                DOB
              </a>
            </div>
          </template>
          <template slot="filter_noofpos">
            <div class="dropdown" style="margin-top: 5px">
              <a
                class="drp-dwn-link text-underline"
                style="color: #000 !important"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                No.of POS
              </a>
            </div>
          </template>
          <template slot="filter_status">
            <select class="form-control filter_status">
              <option>Status</option>
              <option></option>
            </select>
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

      <div class="modal fade" id="importModal" tabindex="-1" style="top: 150px">
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
                        <button class="btn btn-primary">File Upload</button>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
        <div class="customer_container">
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
/*.customer_container .table-active td:nth-child(2) input {
  width: 75px;
}
.customer_container .table-active td:nth-child(3) input {
  width: 115px;
}
.customer_container .table-active td:nth-child(4) input {
  width: 90px;
}
.customer_container .table-active td:nth-child(5) input {
  width: 100px;
}
.customer_container .table-active td:nth-child(6) input {
  width: 75px;
}
.customer_container .table-active td:nth-child(7) input {
  width: 140px;
}
.customer_container .table-active td:nth-child(8) input {
  width: 100px;
  padding: 5px !important;
}
.customer_container .table-active td:nth-child(9) input {
  width: 120px;
}
.customer_container .table-active td:nth-child(10) input {
  width: 85px;
}
.customer_container .table-active td:nth-child(11) input {
  width: 100px;
}
.customer_container .table-active td:nth-child(12) input {
  width: 95px;
}
.customer_container .table-active td:nth-child(13) input {
  width: 125px;
}
.customer_container.mx-2 action-icon-btn.fa fa-toggle-on{
  background-color: #34b8df;
}
.customer_container .filter_status {
  background: #eaeaea;
  border-radius: 2px;
}*/
.customer_container .modal-header {
  background: #34b8df;
  border-radius: 0px;
  color: white;
  font-size: 13px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.customer_container .modal-header .close {
  color: white !important;
  background: transparent;
  font-size: 24px;
  opacity: 1;
}
.customer_container .modal-header .close i {
  text-shadow: none;
}
.customer_container .upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.customer_container .upload-btn-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
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
  mixins: [DebugMixin],
  data: function () {
    let actiondata=[];
    let columndata=[];
    let cache_obj={
      userRoles:'',
      role:'',
      setvalue:'',
      add:''


    }
    console.log("check actiondata",this.$store.getters["account/getuserroles"])
           cache_obj.userRoles  = this.$store.getters["account/getuserroles"];
      // console.log("check email");
       cache_obj.role=cache_obj.userRoles[0].resourcePrivilegeDtoList
      console.log("role check",cache_obj.role);

       var i;
       for(i=0;i<cache_obj.role.length;i++)
      {
        let val;
       // console.log("check the roles");
        if(cache_obj.role[i].resourceName=='customers'){
          cache_obj.setvalue=cache_obj.role[i].privilegeName
         // console.log("check",cache_obj.setvalue.includes("add"));
          cache_obj.add=cache_obj.setvalue.includes("add")
         // cache_obj.addall=cache_obj.setvalue.includes("add_all")
          //cache_obj.modify=cache_obj.setvalue.includes("modify")
          //cache_obj.delete=cache_obj.setvalue.includes("delete")
          //cache_obj.view=cache_obj.setvalue.includes("view")
          cache_obj.viewall=cache_obj.setvalue.includes("list")
          cache_obj.import=cache_obj.setvalue.includes("import")
          cache_obj.export=cache_obj.setvalue.includes("export") 
          console.log("check all the values",cache_obj.add);
          if(cache_obj.add){
            actiondata.push(        {
          btn_text: "Add Customer",
          event_name: "on-addcustomer",
          id:"one",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg",
          },
        })

          }
                 if(cache_obj.import){
            actiondata.push(        {
        
          btn_text: "Import Customer",
          event_name: "on-importcustomer",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg",
          },
      
        })

          }
                    if(cache_obj.export){
            actiondata.push(        {
          btn_text: "Download Customer",
          event_name: "on-downloadcustomer",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg",
          },
        })

          }


        }

       /* if( cache_obj.add==true){
          console.log("checkif")
          $("").hide();
        }*/
      }
              if(cache_obj.viewall){
          columndata.push({
                    
          label: "ID",
          name: "id",
          filter: {
            type: "simple",
            placeholder: "ID",
            showClearButton: false,
          },
        
          },
           {
          label: "Name",
          name: "userName",
          filter: {
            type: "simple",
            placeholder: "Username",
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
          label: "Country",
          name: "countryCode",
          filter: {
            type: "simple",
            placeholder: "Country",
            showClearButton: false,
          },
        },
        {
          label: "City",
          name: "city",
          filter: {
            type: "simple",
            placeholder: "city",
            showClearButton: false,
          },
        },
        {
          label: "Email",
          name: "emailId",
          slot_name: "emailIdSlot",
          filter: {
            type: "simple",
            placeholder: "Email",
            showClearButton: false,
          },
        },
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
            placeholder: "Tier",
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
          name: "averageTransaction",
          filter: {
            type: "simple",
            placeholder: "Avg. Txn",
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
          slot_name: "lastoSlot",
          filter: {
            type: "simple",
            placeholder: "Order Date",
            showClearButton: false,
          },
        },
        {
          label: "Actions",
          name: "action",
          slot_name: "actionpnl",
        })
        }

    return {
      isLoading: true,
      fileError: false,
      loadingbgcolor: "#0069d9",
      tierList: [],
      importFile: null,
      rows: [],
      columns: columndata,
      check:{
        test:null,
      },
      actions: actiondata,
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
  /*  reloadpage(){
      window.location.reload();
    },*/
    getCustomerList() {
      let cache_obj = this;
      this.isLoading = true;
      if (this.$route.query) {
        let obj = this.$route.query;
        if (Object.prototype.hasOwnProperty.call(obj, "action")) {
          this.action = this.$route.query.action;
        }
        if (
          this.action == "view" &&
          Object.prototype.hasOwnProperty.call(obj, "tier")
        ) {
          let tierId = this.$route.query.tier;
        //   this.isLoading = true;
          this.$store
            .dispatch("customer/tierInit", tierId,this.partnerId)
            .then(function (res) {
              //cache_obj.myDebug(JSON.stringify(res));
              //this.isLoading = false;
              if (res.data) {
                res.data.forEach((ele) => {
                  let tier = cache_obj.tierList.find(
                    (ele) => ele.id == res.data.tierId
                  );
                  res.data.tierName = tier != undefined ? tier.name : "";
                  res.data.test = true;
                });
                
                cache_obj.rows = res.data;
               // console.log("check customerdata",cache_obj.rows);
                


              }
              cache_obj.isLoading = false;
            });
        } else if (
          this.action == "view" &&
          Object.prototype.hasOwnProperty.call(obj, "segment")
        ) {
          let segmentId = this.$route.query.segment;
          let suserid = this.$store.getters["account/getuserid"];
          let param = {
            partnerId: suserid,
            segmentId: segmentId,
          };
          this.isLoading = true;
          this.$store
            .dispatch("customer/init", param)
            .then(function (res) {
            //  cache_obj.isLoading = false;
            //  cache_obj.myDebug(JSON.stringify(res));
              if (res.data) {
                res.data.forEach((ele) => {
                  let tier = cache_obj.tierList.find(
                    (ele) => ele.id == res.data.tierId
                  );
                  res.data.tierName = tier != undefined ? tier.name : "";
                });
                cache_obj.rows = res.data;
              }
              cache_obj.isLoading = false;
            });
        } else {
          /* Defaul
          t: Show all customer */
          this.isLoading = true;
      
          this.$store.dispatch("customer/init",{
           partnerId:this.partnerId
          }).then(function (res) {
          //  cache_obj.myDebug(JSON.stringify(res));
        //  cache_obj.isLoading = false;
            if (res.data) {
              res.data.forEach((ele) => {
                let tier = cache_obj.tierList.find(
                  (ele) => ele.id == res.data.tierId
                );
                res.data.tierName = tier != undefined ? tier.name : "";
              });
              //console.log("check data",res.data);
              var checkobj=[];
              var dublicate=res.data;
              var check={test:null};
              //console.log("Dublicate",dublicate);
              for(var i=0;i<dublicate.length;i++)
              {
                dublicate[i]["check"]=cache_obj.add;
                dublicate[i]["view"]=cache_obj.view;
                dublicate[i]["modify"]=cache_obj.modify;
                dublicate[i]["suspend"]=cache_obj.suspend;
                dublicate[i]["activate"]=cache_obj.activate;
              }
              console.log("Result",dublicate);
              cache_obj.rows = dublicate;
            }
            cache_obj.isLoading = false;
          });
        }
      }
    },
    getTiersList() {
      let cachescope = this;
      this.isLoading = true;
      this.$store
        .dispatch("tiers/init",this.partnerId)
        .then(function (res) {
        //  cachescope.myDebug(JSON.stringify(res));
          cachescope.tierList = [];
          res.data.forEach((tier) => {
            let tierObj = {};
            tierObj.id = tier.id;
            tierObj.name = tier.name;
            cachescope.tierList.push(tierObj);
          });
         // cachescope.isLoading = false;
        })
        .catch(function (err) {
          cachescope.isLoading = false;
        });
    },
    handleAddNew: function () {
      Vue.router.push({ path: `/managecustomer/?action=create` });
    },
    handleImportCustomer: function () {
      this.fileError = false;
      $("#importModal").modal("toggle");
      this.importFile=null;
      this.$refs.file.value=null
    },
    handleDownloadCustomer: function () {
               this.isLoading = true;
              let cachescope = this;
              let cache_obj=this;
                  if (this.$route.query) {
        let obj = this.$route.query;
        if (Object.prototype.hasOwnProperty.call(obj, "action")) {
          this.action = this.$route.query.action;
        }
        if ( this.action == "view" &&Object.prototype.hasOwnProperty.call(obj, "tier")) {
          let tierId = this.$route.query.tier;
          cache_obj.url= `${process.env.VUE_APP_API_LOCATION}customer/export?partnerId=${this.partnerId}&tierId=${tierId}`

        } else if ( this.action == "view" &&Object.prototype.hasOwnProperty.call(obj, "segment")) {
          let segmentId = this.$route.query.segment;
          cache_obj.url= `${process.env.VUE_APP_API_LOCATION}customer/export?partnerId=${this.partnerId}&segmentId=${segmentId}`

        } else {
          // Defaul
         // t: Show all customer
          cache_obj.url= `${process.env.VUE_APP_API_LOCATION}customer/export?partnerId=${this.partnerId}`


        }
      }
          axios({
            url: this.url,
            method: "GET",
            responseType: "blob",
          }).then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));

            var fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "customer.csv");
            document.body.appendChild(fileLink);
            fileLink.click();
            cachescope.isLoading = false;
          });
    },

    handleViewItem: function (id) {
      //this.myDebug("View customer", id);
      //let path = `/managecustomer/?action=view&customer=${id}`;
      let path = `/viewcustomer/?customer=${id}`;
      Vue.router.push({ path: path });
    },
    handleEditItem: function (id) {
      //this.myDebug("Edit customer", id);
      let path = `/managecustomer/?action=edit&customer=${id}`;
      Vue.router.push({ path: path });
    },
    handleSuspendItem: function (id, isSuspend) {
      let bstatus = "";
      let successMsg = "";
      let errMsg = "";
      if(isSuspend) {
        bstatus = confirm("Are you sure Suspend this customer?");
        successMsg = "Customer suspended successfully.";
        errMsg = "Customer suspend failed.";
      } else {
        bstatus = confirm("Are you sure Un-Suspend this customer?");
        successMsg = "Customer un-suspended successfully.";
        errMsg = "Customer un-suspend failed.";
      }
      if (bstatus == true) {
        this.myDebug("Suspend customer", id, isSuspend);
        let cachescope = this;
        let postJson = {
            id: id,
            isSuspend: isSuspend,
            partnerId:this.partnerId
        }
        this.$store
          .dispatch(`customer/isSuspend`, postJson)
          .then(function (res) {
            let idx = cachescope.rows.findIndex((ele) => ele.id == id);
            if (idx >= 0) {
              cachescope.rows[idx].isSuspended = !cachescope.rows[idx].isSuspended;
            }
            cachescope.$toast.open({
              message: successMsg,
              type: "success",
              duration: 2000,
              dismissible: true,
              position: "top",
            });
          })
          .catch(function (err) {
            cachescope.$toast.open({
              message: errMsg,
              type: "error",
              duration: 3000,
              dismissible: true,
              position: "top",
            });
          });
      }
    },
    handleActivateItem: function (id, isActive) {
      let bstatus = "";
      let successMsg = "";
      let errMsg = "";
      if(isActive) {
        bstatus = confirm("Are you sure activate this customer?");
        successMsg = "Customer activateded successfully.";
        errMsg = "Customer activate failed.";
      } else {
        bstatus = confirm("Are you sure De-activate this customer?");
        successMsg = "Customer de-activated successfully.";
        errMsg = "Customer de-activate failed.";
      }
      if (bstatus == true) {
        this.myDebug("Activate customer", id);
        let cachescope = this;
        let postJson = {
            id: id,
            isActive: isActive,
            partnerId:this.partnerId
        }
        this.$store
          .dispatch(`customer/isActivate`, postJson)
          .then(function (res) {
            let idx = cachescope.rows.findIndex((ele) => ele.id == id);
            if (idx >= 0) {
              cachescope.rows[idx].isActive = !cachescope.rows[idx].isActive;
            }
            cachescope.$toast.open({
              message: successMsg,
              type: "success",
              duration: 2000,
              dismissible: true,
              position: "top",
            });
          })
          .catch(function (err) {
            cachescope.$toast.open({
              message: errMsg,
              type: "error",
              duration: 3000,
              dismissible: true,
              position: "top",
            });
          });
      }
    },
    handleFileUpload() {
      this.fileError = false;
      this.importFile = this.$refs.file.files[0];
     // console.log(this.importFile["type"]);
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
            console.log("check file")
            if(this.importFile.type ==="application/vnd.ms-excel"||this.importFile.type === "text/csv"){
      let formData = new FormData();
      $("#importModal").modal("hide");
      formData.append("file", this.importFile);
      let cachescope = this;
      this.isLoading = true;
      let postJson={
        partnerId:this.partnerId
      }
      axios
        .post(`${process.env.VUE_APP_API_LOCATION}customer/import?partnerId=${postJson.partnerId}`,formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            
          },
           method: 'post',
          responseType: 'blob',
        })
        .then(function (res) {
          if (cachescope.fileError == false) {
            console.log("ok",res.data);
         
          var fileURL = window.URL.createObjectURL(new Blob([res.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'Customers.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
        cachescope.isLoading = false;





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
             console.log("gghjhghjg");
             $("#popup").show();

             
     
 }
        
      /* TODO :: Move this to store dispatch */
    },
    getDateFormattedString(date) {
      return date
        ? moment(date, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]").format("YYYY-MM-DD")
        : "";
    },
  },
  mounted() {
    $(".nav-customer").addClass("active");
     // this.isLoading = true;
       // let cache_obj = this;


    let cache_obj = this;
       cache_obj.partnerId  = this.$store.getters["account/getuserid"];
       cache_obj.userRoles  = this.$store.getters["account/getuserroles"];
      // console.log("check email");
       cache_obj.role=cache_obj.userRoles[0].resourcePrivilegeDtoList
      console.log("role check",cache_obj.role);
       var i;
       var f=0;
       for(i=0;i<cache_obj.role.length;i++)
      {
        let val;
       // console.log("check the roles");
        if(cache_obj.role[i].resourceName=='customers'){
          f=1;
          cache_obj.setvalue=cache_obj.role[i].privilegeName
         // console.log("check",cache_obj.setvalue.includes("add"));

          cache_obj.add=cache_obj.setvalue.includes("add")
          cache_obj.addall=cache_obj.setvalue.includes("add_all")
          cache_obj.modify=cache_obj.setvalue.includes("modify")
          cache_obj.delete=cache_obj.setvalue.includes("delete")
          cache_obj.view=cache_obj.setvalue.includes("view")
          cache_obj.viewall=cache_obj.setvalue.includes("view_all")
          cache_obj.import=cache_obj.setvalue.includes("import")
          cache_obj.export=cache_obj.setvalue.includes("export")
          cache_obj.suspend=cache_obj.setvalue.includes("suspend_unsuspend")
          cache_obj.activate=cache_obj.setvalue.includes("activate_deactivate")
         // console.log("check all the values",cache_obj.add,cache_obj.addall,cache_obj.modify,cache_obj.delete);
        }


       /* if( cache_obj.add==true){
          console.log("checkif")
          $("").hide();
        }*/
      }
              if(f == 0){
          Vue.router.push({ path: `/notfound` });
        }
   // console.log("nbksk",this.partnerId);
    if (this.$route.query) {
      let obj = this.$route.query;
      if (Object.prototype.hasOwnProperty.call(obj, "customer")) {
        this.customerId = this.$route.query.customer;
        
      }
    }
    if (this.$route.query) {
      let obj = this.$route.query;
      if (Object.prototype.hasOwnProperty.call(obj, "tier")) {
        this.tierId = this.$route.query.tier;
      }
    }

    this.getTiersList();
    this.getCustomerList(this.partnerId);
  },
};
</script>
