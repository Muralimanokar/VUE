<template>
  <app-layout>
    <div class="table_container tier_container">
                     <!--   <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'tiers.index' }">Tiers</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">List Tiers</li>
                    </ol>
                </nav>
            </div>
        </div>-->
      <DataTable
        :rows="rows"
        :columns="columns"
        :config="config"
        :actions="actions"
        :dtName="'TierList'"
        @on-downloadtiers="handleDownloadTiers"
      >
        <template slot="actionpnl" slot-scope="props">
          <div>
            <div class="d-flex action-btn-main justify-content-center">
              <a
                class="mx-2 action-icon-btn"
                title="View"
                v-on:click="redirectToViewTier(props.row['id'])"
              >
                <i class="fa fa-eye"></i>
              </a>
            </div>
          </div>
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
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      :color="loadingbgcolor"
    ></loading>
  </app-layout>
</template>

<style>
.tier_container .table-active td:nth-child(2) input {
  width: 110px;
}
.tier_container .table-active td:nth-child(3) input {
  width: 160px;
}
.tier_container .table-active td:nth-child(4) input {
  width: 165px;
}
.tier_container .table-active td:nth-child(5) input {
  width: 265px;
}
.tier_container .table-active td:nth-child(6) input {
  width: 220px;
}
</style>


<script>
import Vue from "vue";
import axios from "axios";
import DebugMixin from "@/mixins/debug";
import AppLayout from "@/layouts/Merchant.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import $ from "jquery";
export default {
  name: "TierIndex",
  components: {
    AppLayout,
    DataTable,
    Loading,
  },
  mixins: [DebugMixin],
  data: function () {
    return {
      isLoading: true,
      loadingbgcolor: "#0069d9",
      partnerId: null,
      rows: [],
      columns: [
        {
          label: "Tier Name",
          name: "name",
          filter: {
            type: "simple",
            placeholder: "Tier Name",
            showClearButton: false
          }
        },
        {
          label: "Customer Count",
          name: "customersCount",
          slot_name: "cusCntLink",
          filter: {
            type: "simple",
            placeholder: "Customer Count",
            showClearButton: false
          }
        },
        {
          label: "Transaction Value",
          name: "transactionsValue",
          filter: {
            type: "simple",
            placeholder: "Transaction Value",
            showClearButton: false
          }
        },
        {
          label: "Transaction Count In Last 30 days",
          name: "transactionCountInLast30Days",
          filter: {
            type: "simple",
            placeholder: "Transaction Count In Last 30 days",
            showClearButton: false
          }
        },
        {
          label: "Average Transaction Value",
          name: "avgTransactionValue",
          filter: {
            type: "simple",
            placeholder: "Average Transaction Value",
            showClearButton: false
          }
        },
        {
          label: "Actions",
          name: "action",
          slot_name: "actionpnl",
        },
      ],
      actions: [
       /* {
          btn_text: "Export Tiers",
          event_name: "on-downloadtiers",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg"
          }
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
    redirectToViewTier: function (id) {
      let path = `/merchantViewTiers?tier=${id}`;
      Vue.router.push({ path: path });
    },
    handleDownloadTiers : function() {
      this.isLoading = true;
      let cachescope = this;
      axios({
        url: `${process.env.VUE_APP_API_LOCATION}partner/view-tiers/export?partnerId=${this.partnerId}`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'tiers.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
        cachescope.isLoading = false;
      });
    }
  },
  mounted() {
    $(".nav-tiers").addClass("active");
    let cache_obj = this;
    cache_obj.partnerId = this.$store.getters["account/getuserid"];
    this.$store
      .dispatch("merchantTiers/getViewTiers", {
        partnerId: cache_obj.partnerId,
        pageNumber: 1,
        pageSize: 2000,
      })
      .then(function (res) {
        cache_obj.isLoading = false;
       // cache_obj.myDebug(JSON.stringify(res));
        if (res.data) {
          cache_obj.rows = res.data;
        }
      })
      .catch(({ response }) => {
        cache_obj.isLoading = false;
        cache_obj.$toast.open({
          message: "Get List failed.",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: "top",
        });
      });
  },
};
</script>
