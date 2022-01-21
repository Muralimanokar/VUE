<template>
 <app-layout>
     <div class="table_container tier_container">
       <DataTable :rows="rows" :columns="columns" :config="config"
         :actions="actions"
         :dtName="'earnList'"
         @on-add-tier="handleAddNew">
            <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
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
            <template slot="statusSlot"  slot-scope="props">
               <a class="mx-2 action-icon-btn" v-if="props.row['status']">
                  <i class="fa fa-toggle-on" style="color: green"></i>
               </a>
               <a class="mx-2 action-icon-btn" v-else>
                  <i class="fa fa-toggle-off" style="color: red"></i>
               </a>
            </template>
            <!--<template slot="filter_status">
                 <select class="form-control filter_status">
                    <option>Select status</option>
                    <option value=true>Active</option>
                    <option value=false>Deactive</option>
                </select>
            </template>  -->

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
/*.tier_container .table-active td:nth-child(2) input {
  width: 100px;
}
.tier_container .table-active td:nth-child(4) input {
  width: 100px;
}
.tier_container .table-active td:nth-child(5) input {
  width: 100px;
}
.tier_container .table-active td:nth-child(6) input {
  width: 100px;
}*/
</style>

<script>
import Vue from "vue";
import DebugMixin from '@/mixins/debug';
import AppLayout from "@/layouts/Admin.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import $ from "jquery";
export default {
  name: "TierIndex",
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
          label: "ID",
          name: "id",
          filter: {
            type: "simple",
            placeholder: "id",
            showClearButton: false
          }
          //sort: true
        },
        {
          label: "Name",
          name: "name",
          filter: {
            type: "simple",
            placeholder: "Name",
            showClearButton: false
          }
          //sort: true
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
          label: "Threshold Type",
          name: "tierType",
          filter: {
            type: "simple",
            placeholder: "Type",
            showClearButton: false
          }
        },
        {
          label: "Threshold Value",
          name: "fromRange",
          filter: {
            type: "simple",
            placeholder: "Value",
            showClearButton: false
          }
        },
        {
          label: "Status",
          name: "active",
         // slot_name: "statusSlot",
          //filter: {
          //  type: "select",	//TODO:: Fix filters
          //}
        },
        {
          label: "Actions",
          name: "action",
          slot_name: "actionpnl"
        }
      ],
      actions: [
        {
          btn_text: "Add Tiers",
          event_name: "on-add-tier",
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
     // console.log("check transaction",dtName,value);
      //this.pageNumber=value;
      //this.getLoadEarningRuleList();

    },
    handleAddNew: function() {
      Vue.router.push({ path: `/manageTiers/?action=create` });
    },
    handleEditItem: function(id) {
      //this.myDebug("Edit Item", id);
      let path = `/manageTiers/?action=edit&tier=${id}`;
      Vue.router.push({ path: path });
    },
    handleRewardAction: function(id) {
     // this.myDebug("Show rewards for tier", id);
      let path = `/rewardcampaign/?action=view&tier=${id}`;
      Vue.router.push({ path: path });
    },
    handleCustomerAction: function(id) {
     // this.myDebug("Show customer for tier", id);
      let path = `/customer/?action=view&tier=${id}`;
      Vue.router.push({ path: path });
    }
  },
  mounted() {
    $(".nav-tiers").addClass("active");
  let cache_obj = this;
     cache_obj.partnerId  = this.$store.getters["account/getuserid"];
         this.$store.dispatch("tiers/getTierList",cache_obj.partnerId ).then(function(res) {
      cache_obj.isLoading = false;
     // cache_obj.myDebug(JSON.stringify(res));
      if(res.data) {
        cache_obj.rows = res.data;
      }
    });

  }
};
</script>
