<template>
 <app-layout>
     <div class="table_container">
       <DataTable :rows="rows" :columns="columns" :config="config"  :dtName="'earnList'" :actions="actions" @on-addrewardcategory="handleAddNew">
            <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="Edit"  v-on:click='handleEditItem(props.row["id"])'>
                              <i class="fa fa-pencil-square-o"></i>
                          </a>
                      </div>
                   </div>
            </template>
            <template slot="isActiveSlot"  slot-scope="props">
               <a class="mx-2 action-icon-btn" v-if="props.row['isActive']">
                  <i class="fa fa-toggle-on" style="color: green"></i>
               </a>
               <a class="mx-2 action-icon-btn" v-else>
                  <i class="fa fa-toggle-off" style="color: red"></i>
               </a>
            </template>
            <template slot="createdAtSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["createdAt"]) }}</div>
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
.filter_status {
  background: #eaeaea;
  border-radius: 2px;
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
  name: "RewardCategoryIndex",
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
          label: "Name",
          name: "name",
          filter: {
            type: "simple",
            placeholder: "Name",
            showClearButton: false
          }
        },
        {
          label: "Business Type",
          name: "businessType",
          filter: {
            type: "simple",
            placeholder: "Type",
            showClearButton: false
          }
        },
        {
          label: "Status",
          name: "isActive",
          slot_name: "isActiveSlot",
          filter: {
            type: "simple",
            placeholder: "Status",
            showClearButton: false
          }
        },
        {
          label: "Created Date",
          name: "createdAt",
          slot_name: "createdAtSlot",
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
          btn_text: "Add Reward category",
          event_name: "on-addrewardcategory",
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
      Vue.router.push({ path: `/managerewardcategory/?action=create` });
    },
    handleEditItem: function(id) {
     // this.myDebug("Edit Item", id);
      let path = `/managerewardcategory/?action=edit&rewardcategory=${id}`;
      Vue.router.push({ path: path });
    },
    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD"):"" );
    }
  },
  mounted() {
    $(".nav-reward").addClass("active");
    let cache_obj = this;
    cache_obj.partnerId  = this.$store.getters["account/getuserid"];
   
    this.$store.dispatch("reward/initCategory",this.partnerId).then(function(res) {
      cache_obj.isLoading = false;
     // cache_obj.myDebug(JSON.stringify(res));
      if(res.data) {
        cache_obj.rows = res.data;
      }
      cache_obj.isLoading = false;
    });

  }
};
</script>
