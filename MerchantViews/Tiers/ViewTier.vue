<template>
  <app-layout>
    <div class="table_container tier_container">
                              <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'merchanttiers.index' }">Tiers</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">View Tiers</li>
                    </ol>
                </nav>
            </div>
        </div>
      <DataTable
        :rows="rows"
        :columns="columns"
        :config="config"
        :actions="actions"
        @on-export="handleExport"
         :dtName="'TierList'"
      >
        <template slot="cusCntLink" slot-scope="props">
          <a
            class="mx-2 action-icon-btn"
            title="View customer"
            style="color:#87CEEB!important;cursor:pointer"
            v-on:click="redirectToCus(props.row['id'])"
          >
            {{ props.row["customersCount"] }}
          </a>
        </template>
        <template slot="txnCntLink" slot-scope="props">
          <a
            class="mx-2 action-icon-btn"
            title="View transaction"
            style="color:#87CEEB!important;cursor:pointer"
            v-on:click="redirectToTxn(props.row['id'])"
          >
            {{ props.row["transactionsCount"] }}
          </a>
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
  width: 100px;
}
.tier_container .table-active td:nth-child(4) input {
  width: 160px;
}
.tier_container .table-active td:nth-child(5) input {
  width: 180px;
}
.tier_container .table-active td:nth-child(6) input {
  width: 180px;
}
.tier_container .table-active td:nth-child(7) input {
  width: 270px;
}
.tier_container .table-active td:nth-child(8) input {
  width: 270px;
}
.tier_container .table-active td:nth-child(9) input {
  width: 280px;
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
  name: "ViewTierIndex",
  components: {
    AppLayout,
    DataTable,
    Loading
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
          label: "Name",
          name: "name",
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
          label: "Transactions count",
          name: "transactionsCount",
          slot_name: "txnCntLink",
          filter: {
            type: "simple",
            placeholder: "Transactions Count",
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
          label: "Transaction Count In Last 30 Days",
          name: "transactionCountInLast30Days",
          filter: {
            type: "simple",
            placeholder: "Transaction Count In Last 30 Days",
            showClearButton: false
          }
        },
        {
          label: "Average Trasaction Value",
          name: "avgTransactionValue",
          filter: {
            type: "simple",
            placeholder: "Average Trasaction Value",
            showClearButton: false
          }
        },
        {
          label: "Customer Upgraded in Last 30 days",
          name: "customersUpgraded",
          filter: {
            type: "simple",
            placeholder: "Customer Upgraded in Last 30 days",
            showClearButton: false
          }
        },
      ],
      actions: [
        {
          btn_text: "Download",
          event_name: "on-export",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg",
          },
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
    redirectToCus: (id) => {
      let path = `/merchantcustomer/?action=view&tier=${id}`;
      Vue.router.push({ path: path });
    },
    redirectToTxn: (id) => {
     // console.log("ndbjbdjbd");
      let path = `/merchanttransactions/?action=view&txn=${id}`;
      Vue.router.push({ path: path });
    },
    handleExport: function () {
      this.isLoading = true;
      let cachescope = this;
      axios({
        url: `${process.env.VUE_APP_API_LOCATION}partner/view-tiers/export?partnerId=${this.partnerId}`,
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "tiers.csv");
          document.body.appendChild(fileLink);
          fileLink.click();
          cachescope.isLoading = false;
        })
        .catch(({ response }) => {
          cachescope.isLoading = false;
          cachescope.$toast.open({
            message: "Export failed.",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "top",
          });
        });
    },
      getCouponList(name) {
      let cachescope = this;
        let cache_obj = this;
      //let res = this;
      //console.log(name);
      var dataobj={
        partnerId:this.partnerId,
        tierName:name,
        //tierId:this.tierId
      }
     
      
      //console.log(dataobj)
      this.$store
        .dispatch("merchantTiers/getcustomercount", dataobj)
        .then(function (res) {
         // cachescope.myDebug(JSON.stringify(res));
         // console.log("custcount",res);
          if (res.data != undefined) //cachescope.redemptionRows = res.totalCount;
          //console.log("12",res.totalCount);
          cache_obj.rows[0]["count"]=res.totalCount;
          // console.log("check123sucess",cache_obj.rows[0]["count"]);
        })
        
        .catch(function (err) {
          cachescope.$toast.open({
            message:
              "getcustomercount get failed. Please try again after sometime",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "top",
          });
        });
    },
          gettransactionCount(id) {
      let cachescope = this;
      let cache_obj = this;

      //let res = this;
      //console.log(name);
      var dataobj={
        partnerId:this.partnerId,
        tierId:id
      }
     
      
      //console.log("transactioncountcheck",dataobj)
      this.$store
        .dispatch("merchantTiers/gettransactioncount", dataobj)
        .then(function (res) {
        //  cachescope.myDebug(JSON.stringify(res));
          //console.log("Transcount",res);
          if (res.data != undefined) //cachescope.redemptionRows = res.data;
          cache_obj.rows[0]["transcount"]=res.totalCount;
        })
        .catch(function (err) {
          cachescope.$toast.open({
            message:
              "get Transactions count get failed. Please try again after sometime",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "top",
          });
        });
    },
  },

  mounted() {
    
    
    $(".nav-tiers").addClass("active");
    let cache_obj = this;
    let cachescope = this;
        if (this.$route.query) {
      let obj = this.$route.query;
      if (Object.prototype.hasOwnProperty.call(obj, "customer")) {
        this.customerId = this.$route.query.customer;
      }
    }
              if (this.$route.query) {
      let obj = this.$route.query;
      if (Object.prototype.hasOwnProperty.call(obj, "tier")) {
        cache_obj.tierId = this.$route.query.tier;
      }
    }
    cache_obj.partnerId = this.$store.getters["account/getuserid"];
    this.$store
      .dispatch("merchantTiers/getViewTiers", {
        partnerId: cache_obj.partnerId,
         // tierId:cache_obj.tierId,
        pageNumber: 1,
        pageSize: 2000,
      })
      .then(function (res) {
        cache_obj.isLoading = false;
      //  cache_obj.myDebug(JSON.stringify(res));
        let name=res.data[0].name;
        //cache_obj.getCouponList(name);
      
        if (res.data) {
          cache_obj.rows = res.data;
         
        }
        //console.log("rowsdata",cache_obj.rows);
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
      
      //this.gettransactionCount(this.tierId);
  },
  
};
</script>
