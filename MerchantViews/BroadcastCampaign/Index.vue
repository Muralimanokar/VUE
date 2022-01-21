<template>
  <app-layout>
   <!-- <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'merchanthome.index' }">Broadcast Campaign</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Campaign List</li>
                    </ol>
                </nav>
            </div>
        </div>-->
     <div class="table_container tier_container">
       <DataTable :rows="rows" :columns="columns" :config="config"
         :actions="actions"
         @on-addcampaign="handleAddNew"
         @on-schedule="handleSchedule"
           :dtName="'earnList'">
         <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="Edit"  v-on:click='handleEditItem(props.row["id"])'>
                              <i class="fa fa-pencil-square-o"></i>
                          </a>
                          <a class="mx-2 action-icon-btn" title="Delete" v-on:click='handleDeleteItem(props.row["id"])'>
                              <i class="fa fa-trash-o" style="color: red"></i>
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
            <template slot="statuspnl" slot-scope="props">
               <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" v-model="props.row.status"  v-bind:id="'chk_' + props.row.id" disabled>
                  <label class="custom-control-label" v-bind:for="'chk_' + props.row.id"></label>
               </div>
            </template>
        </DataTable>
     </div>

  <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true" :color="loadingbgcolor"></loading>
  </app-layout>
</template>

<style>
.tier_container .table-active td:nth-child(2) input {
  width: 100px;
}
.tier_container .table-active td:nth-child(4) input {
  width: 100px;
}
.tier_container .table-active td:nth-child(5) input {
  width: 100px;
}
.tier_container .table-active td:nth-child(6) input {
  width: 75px;
}
</style>


<script>
import AppLayout from '@/layouts/Merchant.vue';
import Vue from "vue";
import axios from "axios";
import DebugMixin from '@/mixins/debug';
import DataTable from "@/components/DataTable/DataTable.vue";
import Loading from 'vue-loading-overlay';
import moment from "moment";
import 'vue-loading-overlay/dist/vue-loading.css';
import $ from "jquery";

export default {
  name: 'BroadcastCampaignIndex',
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
      isLoading: true,
      loadingbgcolor : '#0069d9',
      rows: [],
      columns: [
        {
          label: "Campaign Name",
          name: "name",
          filter: {
            type: "simple",
            placeholder: "CampaignName",
            showClearButton: false
          }
        },
        {
          label: "Campaign Type",
          name: "campaignType",
          filter: {
            type: "simple",
            placeholder: "Campaign Type",
            showClearButton: false
          }
        },
        {
          label: "Content",
          name: "content",
         filter: {
            type: "simple",
            placeholder: "Content",
            showClearButton: false
          }
        },
        {
          label: "Broadcast Type",
          name: "broadCastType",
          filter: {
            type: "simple",
            placeholder: "Broadcast Type",
            showClearButton: false
          }
        },
        {
          label: "Last run date",
          name: "lastRunDate",
          filter: {
            type: "simple",
            placeholder: "date",
            showClearButton: false
          }
        },
        {
          label: "Status",
          name:"status",
          slot_name: "statuspnl"
        },
       /* {
          label: "Last Run",
          name: "lastrun",
          filter: {
            type: "simple",
            placeholder: "Last Run",
            showClearButton: false
          },*/
        {
          label: "Actions",
          name: "action",
          slot_name: "actionpnl"
        }
      ],
      actions: [
        {
          btn_text: "Add Campaign Template",
          event_name: "on-addcampaign",
          class: "btn btn-red"
        },
        {
          btn_text: "Schedule Campaign",
          event_name: "on-schedule",
          class: "btn btn-red"
        }
      ],
      config: {
        checkbox_rows: false,
        rows_selectable: false,
        show_refresh_button: false,
        show_reset_button: false,
        highlight_row_hover: false,
        per_page: 15,
        global_search: {
          placeholder: "Search",
          showClearButton: false
        }
      }
    };
  },
  methods: {

    handleAddNew: function() {
      Vue.router.push({ path: `/managebroadcastcampaign/?action=create` });
    },

    handleEditItem: function(id) {
      this.myDebug("Edit Item", id);
      let path = `/managebroadcastcampaign/?action=edit&broadcastcampaign=${id}`;
      Vue.router.push({ path: path });
    },
   /* handleDeleteItem: function(id) {
      this.myDebug("Delete Broadcast", id);
      let cachescope = this;
      this.$store.dispatch(`broadcastcampaign/deletecampaign`, id).then(function(res) {
        cachescope.rows = cachescope.rows.filter(function(item) {
          return item.id !== id;
        });
        cachescope.$toast.open({
          message: "Broadcast Campaign deleted successfully",
          type: "success",
          duration: 2000,
          dismissible: true,
          position: 'top'
        });
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Broadcast Campaign deletion failed",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
      });
    },*/
    handleDeleteItem : function(id){
      var token = (sessionStorage.getItem('id_token')) ? (sessionStorage.getItem('id_token')) : (localStorage.getItem('id_token'));
      var headers = {};
      headers.Authorization = `Bearer ${token}`;

  axios
    .delete(`${process.env.VUE_APP_API_LOCATION}broadcast/delete?id=${id}`, {headers: headers})
    .then(response => {
    });
},/*
    handleDeleteItem : function(id){
       var bstatus = confirm("Are you sure want to delete?");
       if(bstatus == true) {
         var cachescope = this;
         this.isLoading = true;
         this.$store.dispatch("broadcastcampaign/deletecampaign",id).then(function(res) {
            cachescope.isLoading = true;
            cachescope.rows = cachescope.rows.filter(function(item) {
              return item.id !== id;
            });
            cachescope.$toast.open({
                message: "Broadcast Campaign Template deleted successfully",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: 'top'
            });
         });
         this.isLoading = false;
       }
    },*/

    handleSchedule: function() {
      Vue.router.push({ path: `/schedulecampaign` });
    },
  },
  mounted() {
    $(".nav-broadcastcampaign").addClass("active");
    this.partnerId  = this.$store.getters["account/getuserid"];
    if(this.partnerId != undefined && this.partnerId != "") {
        let cache_obj = this;
        let row
        this.$store.dispatch("broadcastcampaign/partner", {
            partnerId: cache_obj.partnerId,
            data: { pageNumber: 1, pageSize: 2000 },
        }).then(function(res) {
            cache_obj.rows = res.data.map(function(row) {
                row.lastRunDate = moment(row.lastRunDate).format("DD-MM-YYYY");
                return row;
            });
            cache_obj.isLoading = false;
           // cache_obj.myDebug(JSON.stringify(res));
            if(res.data) {
                cache_obj.rows = res.data;
            }
        });
    }
  }
};
</script>
