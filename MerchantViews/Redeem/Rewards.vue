<template>
 <app-layout>
     <div class="table_container">
       <DataTable :rows="rows" :columns="columns" :config="config"
         :actions="actions"
         :dtName="'earnList'"
         @on-exportredeem="handleExport">
          <!--  <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="View"  v-on:click='handleViewItem(props.row["id"], props.row["uuid"])'>
                              <i class="fa fa-eye"></i>
                          </a>
                           <a class="mx-2 action-icon-btn" title="Download"  v-on:click='handleExport(props.row["id"])'>
                              <i class="fa fa-download"></i>
                          </a>
                      </div>
                   </div>
            </template>-->
            <template slot="rewardTypeSlot"  slot-scope="props">
               <div>{{ rewardTypeTxt[(props.row["rewardType"])] }}</div>
            </template>
            <template slot="redeemedDateSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["redeemedDate"]) }}</div>
            </template>
            <template slot="redeemedid"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["usedDate"]) }}</div>
            </template>
            <template slot="isActiveSlot"  slot-scope="props">
               <a class="mx-2 action-icon-btn" v-if="props.row['isActive']">
                  <i class="fa fa-toggle-on" style="color: green"></i>
               </a>
               <a class="mx-2 action-icon-btn" v-else>
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
.table-active td:nth-child(2) input {
  width: 150px!important;
}
.table-active td:nth-child(3) input {
  width: 130px!important;
}
.table-active td:nth-child(4) input {
  width: 170px!important;
}
.table-active td:nth-child(5) input {
  width: 170px!important;
}
.table-active td:nth-child(6) input {
  width: 220px!important;
}
.table-active td:nth-child(7) input {
  width: 205px!important;
}
.table-active td:nth-child(8) input {
  width: 152px!important;
}

.table-active td:nth-child(9) input {
  width: 150px!important;
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
import axios from "axios";
import DebugMixin from '@/mixins/debug';
import AppLayout from "@/layouts/Merchant.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import $ from "jquery";
import moment from "moment";
export default {
  name: "RewardRedeem",
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
      partnerId: null,
      rewardTypeTxt: {
        CASH_BACK: "Cash back",
        GEO_LOCATION: "Geolocation",
        COUPON: "Coupon code",
        DISCOUNT: "Percentage discount"
      },
      rows: [],
      columns: [
        {
          label: "Redeemed Date",
          name: "availedDate",
          slot_name: "redeemedDateSlot",
          filter: {
            type: "simple",
            placeholder: "Redeemed Date",
            showClearButton: false
          }
        },
       /* {
          label: "Used Date",
          name: "usedDate",
          slot_name: "redeemedid",
          filter: {
            type: "simple",
            placeholder: "Used Date",
            showClearButton: false
          }
        },*/
        {
          label: "Points for reward",
          name: "points",
          filter: {
            type: "simple",
            placeholder: "Points for reward",
            showClearButton: false
          }
        },
        {
          label: "Customer Name",
          name: "customerName",
          filter: {
            type: "simple",
            placeholder: "Customer Name",
            showClearButton: false
          }
        },
        {
          label: "Customer email",
          name: "emailId",
          filter: {
            type: "simple",
            placeholder: "Customer email",
            showClearButton: false
          }
        },
        {
          label: "Reward name",
          name: "rewardName",
          filter: {
            type: "simple",
            placeholder: "Reward name",
            showClearButton: false
          }
        },
        {
          label: "Reward Type",
          name: "rewardType",
          slot_name: "rewardTypeSlot",
          filter: {
            type: "simple",
            placeholder: "Reward Type",
            showClearButton: false
          }
        },
        {
          label: "Reward value",
          name: "rewardValue",
          filter: {
            type: "simple",
            placeholder: "Reward Value",
            showClearButton: false
          }
        },
        /*{
          label: "Actions",
          name: "action",
          slot_name: "actionpnl"
        }*/
      ],
      actions: [
        {
          btn_text: "Download",
          event_name: "on-exportredeem",
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
     getRedeemdRewardList() {
      let cache_obj = this;
      this.isLoading = true;

          this.$store.dispatch("reward/initRedeem",this.partnerId).then(function(res) {
            cache_obj.isLoading = false;
          //  cache_obj.myDebug(JSON.stringify(res));
            if(res.data) {
              cache_obj.rows = res.data;
                //console.log("checkdata",res.data)
              cache_obj.isLoading = false;
            }
          });
    },
    handleViewItem: function(id) {
      this.myDebug("View Item", id);
      let path = `/manageRedeem/?action=view&redeem=${id}`;
      Vue.router.push({ path: path });
    },
    handleExport: function() {
      this.isLoading = true;
      let cachescope = this;
      let url = "";
      if(this.partnerId == undefined || this.partnerId == "") {
        url = `${process.env.VUE_APP_API_LOCATION}reward/redeemed/export`;
      } else {
        url = `${process.env.VUE_APP_API_LOCATION}reward/redeemed/export?partnerId=${this.partnerId}`;
      }
      axios({
        url: url,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'Rewards Redeemed.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
        cachescope.isLoading = false;
      });
    },
    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD"):"" );
    }
  },
  mounted() {
    $(".nav-reward").addClass("active");
      let cachescope = this;
  cachescope.partnerId = this.$store.getters["account/getuserid"];

    this.getRedeemdRewardList();
  }
};
</script>
