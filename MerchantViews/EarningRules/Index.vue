<template>
 <app-layout>
   <div class="earningrule_container">
     <!-- <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'merchantearningrules.index' }">Earning Rule</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">View Rule</li>
                    </ol>
                </nav>
            </div>
        </div>-->
                <!--div class="form-section pt-3">
        <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i>View Rules</h2>
                 </div>
            </div>
        </!--div-->
  
  <div class="table_container tier_container">
       <DataTable :rows="rows" :columns="columns" :config="config"
         :actions="actions"
        :dtName="'earnList'"
        :totalRows="totalRows"
         @on-addrule="handleAddNew"
         @on-importrules="handleImportRules"
         @on-reviewrule="handleReviewrule">
            <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="Edit"  v-on:click='handleEditItem(props.row["ruleId"])'>
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
            <template slot="startDateSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["startDate"]) }}</div>
            </template>
            <template slot="endDateSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["endDate"]) }}</div>
            </template>
            <template>
                      <template slot="empty-results" v-if="isLoading"> Fetching records</template>
        <template slot="empty-results" v-else> No record found! </template>
            </template>
        </DataTable>
     </div>
           <div class="modal fade" id="importModal" tabindex="-1" style="top: 150px">
        <div class="modal-dialog">
          <div class="modal-content" style="border-radius: 0px">
            <div class="modal-header">
              <h5 class="modal-title" style="font-size: 16px">
                Update Rules
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
                         <button
                        type="button"
                        class="btn btn-danger"
                        @click="handleExportRules"
                      >
                        Export
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
        <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      :color="loadingbgcolor"
    ></loading>
 </app-layout>
</template>

<style>
.tier_container .table-active td:nth-child(1) input {
  width: 100px;
}
.tier_container .table-active td:nth-child(2) input {
  width: 100px;
}
.tier_container .table-active td:nth-child(3) input {
  width: 280px;
}
.tier_container .table-active td:nth-child(4) input {
  width: 100px;
}
.tier_container .table-active td:nth-child(5) input {
  width: 100px;
}
.tier_container .table-active td:nth-child(6) input {
  width: 100px;
}
.earningrule_container .table-active td:nth-child(2) input {
  width:100px;
}
.earningrule_container .table-active td:nth-child(3) input {
  width: 280px;
}
.earningrule_container .table-active td:nth-child(4) input {
  width: 150px;
}
.earningrule_container .table-active td:nth-child(5) input {
  width: 110px;
}
.earningrule_container .table-active td:nth-child(6) input {
  width: 110px;

}
.earningrule_container .table-active td:nth-child(7) input {
  width: 130px;
}
.earningrule_container .table-active td:nth-child(8) input {
  width: 130px;
  padding: 5px !important;
}
.earningrule_container .table-active td:nth-child(9) input {
  width: 164px;
}
.earningrule_container .table-active td:nth-child(10) input {
  width: 150px;
}
.earningrule_container .table-active td:nth-child(11) input {
  width: 130px;
  padding: 5px !important;
}
.earningrule_container .filter_status {
  background: #eaeaea;
  border-radius: 2px;
}
.earningrule_container .modal-header{
  background: #34b8df;
    border-radius: 0px;
    color: white;
    font-size: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
}
.earningrule_container .modal-header .close{
  color: white !important;
  background: transparent;
  font-size: 24px;
  opacity:1;
}
.earningrule_container .modal-header .close i{
  text-shadow: none;
}
.earningrule_container .upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.earningrule_container .upload-btn-wrapper input[type=file] {
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
import DebugMixin from '@/mixins/debug';
import AppLayout from "@/layouts/Merchant.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import $ from "jquery";
import moment from "moment";
import Pagination from '../../../components/DataTable/Pagination.vue';
export default {
  name: "MerchantEarningRulesIndex",
  components: {
    AppLayout,
    DataTable,
    Loading,
    Pagination,
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
      isLoading: true,
            pageNumber:1,
      totalRows:0,
      fileError: false,
      loadingbgcolor : '#0069d9',
      tierList: [],
      importFile: null,
     
      rows: [],
     EfinalResult:{},
      columns: [
                {
          label: "Rule ID",
          name: "ruleId",
          filter: {
            type: "simple",
            placeholder: "Rule ID",
            showClearButton: false
          }
        },
        {
          label: "Rule Name",
          name: "ruleName",
          filter: {
            type: "simple",
            placeholder: "Rule Name",
            showClearButton: false
          }
        },
        {
          label: "Rule Type",
          name: "ruleType",
          filter: {
            type: "simple",
            placeholder: "Rule Type",
            showClearButton: false
          }
        },
        {
          label: "Start Date",
          name: "startDate",
         slot_name: "startDateSlot",
          filter: {
            type: "simple",
            placeholder: "Start Date",
            showClearButton: false
          }
        },
        {
          label: "End Date",
          name: "endDate",
          slot_name: "endDateSlot",
          filter: {
            type: "simple",
            placeholder: "End Date",
            showClearButton: false
          }
        },
         {
          label: "Usage Count",
          name: "usageCount",
          filter: {
            type: "simple",
            placeholder: "Usage Count",
            showClearButton: false
          }
        },
        {
          label: "Total Points Used",
          name: "totalPoints",
          filter: {
            type: "simple",
            placeholder: "Total Points Used",
            showClearButton: false
          }
        },
        /*{
          label: "Avg Points Per Txn",
          name: "avgPoints",
          filter: {
            type: "simple",
            placeholder: "Avg Points Per Txn",
            showClearButton: false
          }
        },
        {
          label: "Total Txn Value",
          name: "totalValue",
          filter: {
            type: "simple",
            placeholder: "Total Txn Value",
            showClearButton: false
          }
        },*/
        {
          label: "Last Used Date",
          name: "lastRunDate",
          filter: {
            type: "simple",
            placeholder: "Last Used date",
            showClearButton: false
          }
        },
        {
          label: "Actions",
          name: "action",
          slot_name: "actionpnl"
        }
      ],
      actions: [
        {
          btn_text: "Add Rule",
          event_name: "on-addrule",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg"
          }
        },
       {
          btn_text: "Update Rules",
          event_name: "on-importrules",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg",
          },
        },
        {
          btn_text: "Review Rule",
          event_name: "on-reviewrule",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg"
          }
        }
      ],
      config: {
                server_mode:true,
        checkbox_rows: false,
        rows_selectable: false,
        show_refresh_button: false,
        show_reset_button: false,
        highlight_row_hover: false,
        per_page: 10,
       /* global_search: {
          placeholder: "Search",
          showClearButton: false
        }*/
      }
    };
  },
   provide:function(){
    return{
      handlePageSelected: this.handlePageSelected,
      updatedfilter:this.updatedfilter,

    }
  },
  methods: {
updatedfilter(Epayload,pageNumber){
var Data="";
this.EfinalResult[Epayload.name]=Epayload.value;
for (var key in this.EfinalResult)
  if(this.EfinalResult[key]!="")
  Data+=key+"="+this.EfinalResult[key]+"&";
console.log(Data);
let cacheScope=this;
   let cache_obj=this;
 let param = {
               name:Data,
            partnerId:this.partnerId,
            pageNumber: this.pageNumber,
            pageSize: 10,
          
             }
          
             console.log("payload",param)
      cacheScope.isLoading = true;
         this.$store.dispatch("merchant/filter",param)
              
           .then(function (res) {  
             // cache_obj.myDebug(JSON.stringify(res));
      cache_obj.rows = res.data;
       cache_obj.totalRows=res.totalCount;
          cache_obj.isLoading=false;
         
        }); 
},
 
 handlePageSelected(dtName,value){
      this.pageNumber=value;
     console.log(this.filter)
  if(this.EfinalResult!=""){
this.updatedfilter(this.pageNumber);
  }
else{
 this.getLoadEarningRuleList();
}

    },
    handleImportRules: function () {
      this.fileError = false;
      $("#importModal").modal("toggle");
      this.importFile=null;
      this.$refs.file.value=null
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
      
       if(this.importFile != null){
         if(this.importFile.type ==="application/vnd.ms-excel"||this.importFile.type === "text/csv"){
      let formData = new FormData();
      $("#importModal").modal("hide");
      formData.append("file", this.importFile);
      let cachescope = this;
      this.isLoading = true;
      axios
        .post(`${process.env.VUE_APP_API_LOCATION}rule/import?partnerId=${this.partnerId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        
        .then(function (res) {
          //console.log("check",res.data.message)
          let msg=res.data.message;
          if (cachescope.fileError == false) {
            cachescope.$toast.open({
              message: msg,
              type: "success",
              duration: 3000,
              dismissible: true,
              position: "top",
            });
            cachescope.isLoading = true;
            cachescope.importFile = null;
          }
        })
        .catch(function (err) {
          
          cachescope.$toast.open({
            message: "Rules import failed",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "top",
          });
          cachescope.isLoading = false;
          cachescope.importFile = null;
        });
       }
       
       }
       else{
         $("#popup").show();

       }

       this.getLoadEarningRuleList();
      /* TODO :: Move this to store dispatch */
    },
         handleExportRules : function() {
      this.isLoading = true;
      let cachescope = this;
      axios({
        url: `${process.env.VUE_APP_API_LOCATION}rule/export?partnerId=${this.partnerId}`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'Rules.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
        cachescope.isLoading = false;
      });
    },
    gettest:function(){
      
               if(this.partnerId != undefined && this.partnerId != "") {
    let cache_obj = this;
    this.$store.dispatch("merchant/merchantearningruleList", {
        partnerId: cache_obj.partnerId,
       // data: { pageNumber: 1, pageSize: 2000 },
      }
).then(function(res) {
  

  cache_obj.rows = res.data.map(function(row){
          row.lastRunDate = moment(row.lastRunDate).format("DD-MM-YYYY");
          return row;
        });

      cache_obj.isLoading = false;
    //  cache_obj.myDebug(JSON.stringify(res));
      if(res.data) {
        cache_obj.rows =null;
        //console.log("check",cache_obj.rows);
        cache_obj.rows = res.data;
        //console.log("check data",cache_obj.rows )
      }

    });
    }
    },
    handleAddNew: function() {
      let surl = "/merchantaddrules/?partnerId=" + this.partnerId;
      Vue.router.push({ path: surl });
     // Vue.router.push({ path: `/merchantaddrules` });
    },
    handleReviewrule: function() {
      Vue.router.push({ path: `/merchantreviewrules` });
    },
    handleEditItem: function(ruleId) {
      this.myDebug("Edit item", ruleId);
      Vue.router.push({ path: `/merchantaddrules/?action=edit&earningrule=${ruleId}` });
    },
    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD"):"" );
    },
    getLoadEarningRuleList(){
          let cache_obj = this;
          let cachescope=this;
          this.isLoading=true;
    this.$store.dispatch("merchant/getEarningRulePage", {
        partnerId: cache_obj.partnerId,
        pageNumber: this.pageNumber,
         pageSize: 10
      }
).then(function(res) {
  cache_obj.totalRows=res.totalCount;
  cache_obj.rows = res.data.map(function(row){
          row.lastRunDate = moment(row.lastRunDate).format("DD-MM-YYYY");
          return row;
        });

       
     // cache_obj.myDebug(JSON.stringify(res));
      if(res.data) {
        cache_obj.rows = res.data;
        cache_obj.isLoading = false;
      }
     

    });
     //cache_obj.isLoading = false;
  
    }
 /* loadearningrulelist(){
      var cacheScope = this;
      this.$store.dispatch().then(function(res) {
        cacheScope.isLoading = false;
        cacheScope.rows = res.data.map(function(row){
          row.startDate = moment(row.startDate).format("DD-MM-YYYY");
          row.endDate = moment(row.endDate).format("DD-MM-YYYY");
          row.usageCount = "";
          row.totalPointsUsed ="";
          row.averagePointsPerTransaction = "";
          row.totalTransactionsValue ="";
          row.lastUsedDate = moment(row.lastUsedDate).format("DD-MM-YYYY");
          return row;
        });
      });
    }*/

  },
  mounted() {
    $(".nav-merchantearningrules").addClass("active");
    this.partnerId  = this.$store.getters["account/getuserid"];
   this.myDebug("check", this.partnerId);
  //  if(this.partnerId != undefined && this.partnerId != "") {
     this.getLoadEarningRuleList();
   this.updatedfilter();
    }
    
 // },



  /*created(){
    if (this.$route.query) {
      let obj = this.$route.query;
      if (Object.prototype.hasOwnProperty.call(obj, "templateid")) {
        this.templateid = this.$route.query.templateid;
      }
      if (Object.prototype.hasOwnProperty.call(obj, "partnerId")) {
        this.partnerId = this.$route.query.partnerId;
      }
    }
    this.loadearningrulelist();
  },*/
  /*mounted() {
    $(".nav-earningrule").addClass("active");
  }*/
};
</script>