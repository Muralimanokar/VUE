<template>
 <app-layout>
     <div class="table_container points_container">
       <DataTable :rows="rows" :columns="columns" :config="config"
         :actions="actions"
         :dtName="'earnList'"
         @on-addtransfer="handleAddNew">
            <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="View" v-on:click='handleViewItem(props.row["transactionId"])'>
                              <i class="fa fa-eye"></i>
                          </a>
                          <a class="mx-2 action-icon-btn " title="Edit" v-if="(props.row['transactionType']) == 'TRANSFER' || (props.row['transactionType']) == 'SPEND'"  v-on:click='handleEditItem(props.row["transactionId"])'  >
                              <i class="fa fa-pencil-square-o" ></i>
                          </a>
                           <a class="mx-2 action-icon-btn test"  title="Edit" v-else  >
                              <i class="fa fa-pencil-square-o disabled" ></i>

                          </a>
                      </div>
                   </div>
            </template>
            <template slot="dateSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["dateCreated"]) }}</div>
            </template>
            <template slot="remarksSlot"  slot-scope="props">
               <div style="width:120px; white-space:nowrap;overflow: hidden;text-overflow: ellipsis;" :title="props.row['remarks']"> {{ props.row["remarks"] }}</div>
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
/*.points_container .table-active td:nth-child(2) input {
  width: 100px;
}
.points_container .table-active td:nth-child(3) input {
  width: 110px;
}
.points_container .table-active td:nth-child(4) input {
  width: 90px;
}
.points_container .table-active td:nth-child(5) input {
  width: 100px;
}
.points_container .table-active td:nth-child(6) input {
  width: 90px;
}
.points_container .table-active td:nth-child(7) input {
  width: 120px;
}
.points_container .table-active td:nth-child(8) input {
  width: 120px;
}
.points_container .table-active td:nth-child(9) input {
  width: 100px;
}
.points_container .table-active td:nth-child(10) input {
  width: 75px;
}
.points_container .table-active td:nth-child(11) input {
  width: 75px;
}
.points_container .table-active td:nth-child(12) input {
  width: 85px;
}
.points_container .table-active td:nth-child(13) input {
  width: 100px;
}
.points_container .table-active td:nth-child(14) input {
  width: 100px;
}*/
.test{
  visibility: hidden;
}
</style>

<script>
import Vue from "vue";
import DebugMixin from '@/mixins/debug';
import AppLayout from "@/layouts/Admin.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import $ from "jquery";
import moment from "moment";
export default {
  name: "CustomerIndex",
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
      rows: [],
      columns: [
        {
          label: "Source Account",
          name: "sourceAccount",
          filter: {
            type: "simple",
            placeholder: "Account",
            showClearButton: false
          }
        },
        {
          label: "Source Account Type",
          name: "sourceUserType",
          filter: {
            type: "simple",
            placeholder: "Type",
            showClearButton: false
          }
        },
        {
          label: "Source Account Name",
          name: "sourceUserName",
          filter: {
            type: "simple",
            placeholder: "Name",
            showClearButton: false
          }
        },
        {
          label: "Destination Account",
          name: "targetAccount",
          filter: {
            type: "simple",
            placeholder: "Account",
            showClearButton: false
          }
        },
        {
          label: "Destination Account Type",
          name: "targetUserType",
          filter: {
            type: "simple",
            placeholder: "Type",
            showClearButton: false
          }
        },
        {
          label: "Destination Account Name",
          name: "targetUserName",
          filter: {
            type: "simple",
            placeholder: "Name",
            showClearButton: false
          }
        },
        {
          label: "Type",
          name: "transactionType",
          filter: {
            type: "simple",
            placeholder: "Type",
            showClearButton: false
          }
        },
        {
          label: "Txn Number",
          name: "transactionId",
          filter: {
            type: "simple",
            placeholder: "Txn Id",
            showClearButton: false
          }
        },
        {
          label: "Points",
          name: "amount",
          filter: {
            type: "simple",
            placeholder: "Points",
            showClearButton: false
          }
        },
      /*  {
          label: "POS",
          name: "POS",
          filter: {
            type: "simple",
            placeholder: "POS",
            showClearButton: false
          }
        },*/
        {
          label: "Status",
          name: "transactionStatus",
          filter: {
            type: "simple",
            placeholder: "Status",
            showClearButton: false
          }
        },
        {
          label: "Created By",
          name: "createdBy",
          filter: {
            type: "simple",
            placeholder: "Created by",
            showClearButton: false
          }
        },
        {
          label: "Created Date",
          name: "dateCreated",
          slot_name: "dateSlot",
          filter: {
            type: "simple",
            placeholder: "Date",
            showClearButton: false
          }
        },
        {
          label: "Remarks",
          name: "remarks",
          slot_name: "remarksSlot",
          filter: {
            type: "simple",
            placeholder: "Remarks",
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
          btn_text: "Add Transfer",
          event_name: "on-addtransfer",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg"
          }
        },
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
     // console.log("check transaction",dtName,value);
      //this.pageNumber=value;
      //this.getLoadEarningRuleList();

    },
    handleAddNew: function() {
      Vue.router.push({ path: `/managetransfer/?action=create` });
    },
    handleViewItem: function(id) {
      //this.myDebug("View customer", id);
      let path = `/managetransfer/?action=view&transfer=${id}`;
      Vue.router.push({ path: path });
    },
    handleEditItem: function(id) {
     // this.myDebug("Edit customer", id);
      let path = `/managetransfer/?action=edit&transfer=${id}`;
      Vue.router.push({ path: path });
    },
    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD HH:mm"):"" );
    }
  },
  mounted() {
    $(".nav-transfer").addClass("active");
    let cache_obj = this;
     cache_obj.partnerId  = this.$store.getters["account/getuserid"];
    this.$store.dispatch("points/init",  cache_obj.partnerId ).then(function(res) {
      cache_obj.isLoading = false;
      //cache_obj.myDebug(JSON.stringify(res));
      cache_obj.rows = res.data;
    });
  }
};
</script>
