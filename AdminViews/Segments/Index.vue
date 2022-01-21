<template>
 <app-layout>
     <div class="table_container">
       <DataTable :rows="rows" :columns="columns" :config="config" :actions="actions" :dtName="'earnList'" @on-addsegment="handleAddNew">
            <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="View"  v-on:click='handleViewItem(props.row["id"])'>
                              <i class="fa fa-eye"></i>
                          </a>
                          <a class="mx-2 action-icon-btn" title="Edit"  v-on:click='handleEditItem(props.row["id"])'>
                              <i class="fa fa-pencil-square-o"></i>
                          </a>
                          <a class="mx-2 action-icon-btn" title="Rewards" v-on:click='handleRewardAction(props.row["id"])'>
                              <i class="fa fa-gift"></i>
                          </a>
                          <a class="mx-2 action-icon-btn" title="Customers" v-on:click='handleCustomerAction(props.row["id"])'>
                              <i class="fa fa-user-o"></i>
                          </a>
                      </div>
                   </div>
            </template>
                    <template slot="sno" slot-scope="props">
          <div>
            {{ props.row.vbt_id }}
          </div>
        </template>
            <template slot="lastRefreshedDateSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["lastRefreshedDate"]) }}</div>
            </template>
            <template slot="lastUpdatedDateSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["lastUpdatedDate"]) }}</div>
            </template>
            <template slot="statuspnl"  slot-scope="props">
               <a class="mx-2 action-icon-btn" title="Suspend" v-if="props.row['status']" v-on:click='handleSuspendItem(props.row["id"])'>
                  <i class="fa fa-toggle-on" style="color: green"></i>
               </a>
               <a class="mx-2 action-icon-btn" title="Re-activate" v-else v-on:click='handleReactivateItem(props.row["id"])'>
                  <i class="fa fa-toggle-off" style="color: red"></i>
               </a>
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
  color: #7f7f7f !important;
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
  width: 200px;
}
.table-active td:nth-child(4) input {
  width: 150px;
}
.table-active td:nth-child(5) input {
  width: 150px;
}
.table-active td:nth-child(6) input {
  width: 150px;
}
.table-active td:nth-child(7) input {
  width: 75px;
}
.table-active td:nth-child(8) input {
  width: 100px;
  padding: 5px !important;
}
.filter_status {
  background: #eaeaea;
  border-radius: 2px;
}
.modal-header{
  background: #34b8df;
    border-radius: 0px;
    color: white;
    font-size: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
}
.modal-header .close{
  color: white !important;
  background: transparent;
  font-size: 24px;
  opacity:1;
}
.modal-header .close i{
  text-shadow: none;
}
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.upload-btn-wrapper input[type=file] {
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
import moment from "moment";
import DebugMixin from '@/mixins/debug';
import AppLayout from "@/layouts/Admin.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import $ from "jquery";
export default {
  name: "SegmentIndex",
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
          label: "S.No",
          slot_name: "sno",
          filter: {
            type: "simple",
            placeholder: "S.No",
            showClearButton: false
          }
        },
       /* {
          label: "ID",
          name: "id",
          filter: {
            type: "simple",
            placeholder: "ID",
            showClearButton: false
          }
        },*/
        {
          label: "Name",
          name: "segmentName",
          filter: {
            type: "simple",
            placeholder: "Name",
            showClearButton: false
          }
        },
        {
          label: "Description",
          name: "description",
          filter: {
            type: "simple",
            placeholder: "Description",
            showClearButton: false
          }
        },
        {
          label: "Last refresh date",
          name: "lastRefreshedDate",
          slot_name: "lastRefreshedDateSlot",
           filter: {
            type: "simple",
            placeholder: "Date",
            showClearButton: false
          }
        },
        {
          label: "Last updated date",
          name: "lastUpdatedDate",
          slot_name: "lastUpdatedDateSlot",
           filter: {
            type: "simple",
            placeholder: "Date",
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
          btn_text: "Add Segment",
          event_name: "on-addsegment",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg"
          }
        }
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
    

    },
    handleAddNew: function() {
      Vue.router.push({ path: `/manageSegment/?action=create` });
    },
    handleEditItem: function(id) {
     // this.myDebug("Edit Item", id);
      let path = `/manageSegment/?action=edit&segment=${id}`;
      Vue.router.push({ path: path });
    },
     handleViewItem: function(id) {
     // this.myDebug("Edit Item", id);
      let path = `/manageSegment/?action=view&segment=${id}`;
      Vue.router.push({ path: path });
    },
    handleRewardAction: function(id) {
     // this.myDebug("Show rewards for tier", id);
      let path = `/rewardcampaign/?action=view&segment=${id}`;
      Vue.router.push({ path: path });
    },
    handleCustomerAction: function(id) {
      //this.myDebug("Show customer for tier", id);
      let path = `/customer/?action=view&segment=${id}`;
      Vue.router.push({ path: path });
    },
    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD"):"" );
    }
  },
  mounted() {
    $(".nav-segment").addClass("active");
    let cache_obj = this;
     cache_obj.partnerId  = this.$store.getters["account/getuserid"];
    this.isLoading=true;
    this.$store.dispatch("segment/allsegment",cache_obj.partnerId).then(function(res) {
     /*cache_obj.TestSegment= res.data.sort(function sortID(a,b){
        if(a.id > b.id)
          return 1;
        return -1;
      })*/
      cache_obj.isLoading = false;
     // cache_obj.myDebug(JSON.stringify(res));
     // cache_obj.rows = cache_obj.TestSegment;
      cache_obj.rows = res.data;
    });

  }
};
</script>
