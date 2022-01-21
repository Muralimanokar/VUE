<template>
 <app-layout>
     <div class="table_container transaction_container">
       <DataTable :rows="rows" :columns="columns" :config="config" :actions="actions"
        :dtName="'transList'" :totalRows="totalRows">
            <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                         <!-- <a class="mx-2 action-icon-btn" title="View" v-on:click='handleViewItem(props.row["transactionId"])'>
                              <i class="fa fa-eye"></i>
                          </a>-->
                          <a class="mx-2 action-icon-btn" title="Edit"  v-on:click='handleEditItem(props.row["transactionId"])'>
                              <i class="fa fa-pencil-square-o"></i>
                          </a>
                         <!-- <a class="mx-2 action-icon-btn" title="Match Transaction" v-on:click='handleMatchItem(props.row["transactionId"])'>
                              <i class="fa fa-list-alt"></i>
                          </a>-->
                          <!--<a class="mx-2 action-icon-btn" title="Match" v-on:click='handleMatchItem(props.row["transactionId"])'>
                              <i class="fa fa-share"></i>
                          </a>-->
                      </div>
                   </div>
            </template>
            <template slot="txnDatepnl"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["transactionDate"]) }}</div>
            </template>
            <template slot="filter_dob">
                 <div class="dropdown" style="margin-top: 5px;">
                    <a class="drp-dwn-link text-underline" style="color: #000!important;"  href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      DOB
                    </a>
                  </div>
            </template>
            <template slot="filter_noofpos">
                 <div class="dropdown" style="margin-top: 5px;">
                    <a class="drp-dwn-link text-underline" style="color: #000!important;"  href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                <i class="fa fa-arrow-left" style="color:#188ae3;" aria-hidden="true"></i>
            </template>
            <template slot="paginataion-next-button">
                <i class="fa fa-arrow-right" style="color:#188ae3;" aria-hidden="true"></i>
            </template>
               <template slot="empty-results" v-if="isLoading"> Fetching records... </template>
           <template slot="empty-results" v-else> No record found! </template>
        </DataTable>

     </div>
     <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true" :color="loadingbgcolor"></loading>
 </app-layout>
</template>

<style>
.transaction_container .table-active td:nth-child(2) input {
  width: 90px;
}
.transaction_container .table-active td:nth-child(3) input {
  width: 120px;
}
.transaction_container .table-active td:nth-child(4) input {
  width: 210px;
}
.transaction_container .table-active td:nth-child(5) input {
  width: 100px;
}
.transaction_container .table-active td:nth-child(6) input {
  width: 120px;
}
.transaction_container .table-active td:nth-child(7) input {
  width: 100px;
}
.transaction_container .table-active td:nth-child(8) input {
  width: 100px;
  padding: 5px !important;
}
</style>

<script>
import Vue from "vue";
import axios from "axios";
import DebugMixin from '@/mixins/debug';
import AppLayout from "@/layouts/Admin.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import $ from "jquery";
import moment from "moment";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  name: "TransactionIndex",
  components: {
    AppLayout,
   DataTable,
    Loading
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
      isLoading : true,
      loadingbgcolor : '#0069d9',
      importFile: null,
      pageNumber:1,
      totalRows:0,
  EfinalResult:{},
      rows: [],
      columns: [
        {
          label: "Txn NO",
          name: "transactionId",
          filter: {
            type: "simple",
            placeholder: "Txn No",
            showClearButton: false
          }
        },
        {
          label: "Loyalty ID",
          name: "loyaltyId",
          filter: {
            type: "simple",
            placeholder: "Loyalty Id",
            showClearButton: false
          }
        },
        {
          label: "E-mail",
          name: "emailId",
          filter: {
            type: "simple",
            placeholder: "Email",
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
          label: "Txn. type",
          name: "transactionType",
          filter: {
            type: "simple",
            placeholder: "Type",
            showClearButton: false
          }
        },
        {
          label: "Txn. Date",
          name: "transactionDate",
          slot_name: "txnDatepnl",
          filter: {
            type: "simple",
            placeholder: "Date",
            showClearButton: false
          }
        },
      /*  {
          label: "POS",
          name: "pos",
          filter: {
            type: "simple",
            placeholder: "POS",
            showClearButton: false
          }
        },*/
        {
          label: "Amount",
          name: "amount",
          filter: {
            type: "simple",
            placeholder: "amount",
            showClearButton: false
          }
        },
        {
          label: "Status",
          name: "status",
          filter: {
            type: "simple",
            placeholder: "Status",
            showClearButton: false
          }
        },
        {
          label: "Initiated By",
          name: "initiatedBy",
          filter: {
            type: "simple",
            placeholder: "Initiated By",
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
      ],
      config: {
         server_mode:true,
        checkbox_rows: false,
        rows_selectable: false,
        show_refresh_button: false,
        show_reset_button: false,
        highlight_row_hover: false,
        per_page: 10,
     
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
           Name:Data,
          partnerId: this.partnerId,
          pageNumber: this.pageNumber,
          pageSize: 10,
             }
             console.log("payload",param)
      cacheScope.isLoading = true;
         this.$store.dispatch("transaction/inits",param)
              
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
this.getEarningRuleList();

}

    },
            
   /* handleViewItem: function(id) {
      this.myDebug("View transaction", id);
      let path = `/managetransaction/?action=view&transaction=${id}`;
      Vue.router.push({ path: path });
    },*/
    handleEditItem: function(id) {
      //this.myDebug("Edit transaction", id);
      let path = `/managetransaction/?action=edit&transaction=${id}`;
      Vue.router.push({ path: path });
    },
   /* handlePurchase: function(transactionId) {
      this.myDebug("Purchase", transactionId);
      let path = `/managepurchase/?action=edit&pur=${transactionId}`;
      Vue.router.push({ path: path });
    },*/

    handleMatchItem: function(id) {
      this.myDebug("Match transaction", id);
      let path = `/matchtransaction`;
      Vue.router.push({ path: path });
    },

    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD HH:mm"):"" );
    },
    getEarningRuleList(){
      let cache_obj = this;

      let dataobj={
 partnerId: this.partnerId,
          pageNumber: this.pageNumber,
          pageSize: 10,
      }
 this.$store.dispatch("transaction/init",dataobj).then(function(res) {
      cache_obj.isLoading = false;
     // cache_obj.myDebug(JSON.stringify(res));
      cache_obj.rows = res.data;
       cache_obj.totalRows=res.totalCount;
    });
    }
  },
  mounted() {
    $(".nav-transaction").addClass("active");
    let cache_obj = this;
           this.partnerId  = this.$store.getters["account/getuserid"];
   this.getEarningRuleList();
   this.updatedfilter();
  }
};
</script>