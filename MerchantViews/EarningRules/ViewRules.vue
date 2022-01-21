<template>
 <app-layout>
   <div class="earningrule_container">
      <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'merchantearningviewrules.index' }">Earning Rule</router-link>
                        </li>
                                                <li class="breadcrumb-item">
                            <router-link :to="{ name: 'reviewrules.index' }">Review Rule</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">View</li>
                    </ol>
                </nav>
            </div>
        </div>
                <!--div class="form-section pt-3">
        <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i>Review Rules</h2>
                 </div>
            </div>
        </!--div-->
     <div class="table_container reviewrule_container">
       <DataTable :rows="rows" :columns="columns" :config="config" :actions="actions"
         @on-export="handleExport">
            <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="View"  v-on:click='handleViewItem(props.row["ruleId"])'>
                              <i class="fa fa-eye"></i>
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
            <template slot="ActivedateSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["startDate"]) }}</div>
            </template>
            <template slot="enddateSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["productPurchasedDate"]) }}</div>
            </template>
          <!--  <template slot="tierSlot" slot-scope="props">
               <div v-for="item in props.row['tiersList']" :key="item">{{ item }}</div>
            </template>
            <template slot="segSlot" slot-scope="props">
               <div v-for="item in props.row['segmentsList']" :key="item">{{ item }}</div>
            </template>-->
        </DataTable>
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
.reviewrule_container .table-active td:nth-child(2) input {
  width: 200px;
}
.reviewrule_container .table-active td:nth-child(3) input {
  width: 165px;
}
.reviewrule_container .table-active td:nth-child(4) input {
  width: 155px;
}
.reviewrule_container .table-active td:nth-child(5) input {
  width: 130px;
}
.reviewrule_container .table-active td:nth-child(6) input {
  width: 150px;
}
.reviewrule_container .table-active td:nth-child(7) input {
  width: 150px;
}
.reviewrule_container .table-active td:nth-child(8) input {
  width: 100px;
  padding: 5px !important;
}
.reviewrule_container .table-active td:nth-child(9) input {
  width: 120px;
}
.reviewrule_container .filter_status {
  background: #eaeaea;
  border-radius: 2px;
}
.reviewrule_container .modal-header{
  background: #34b8df;
    border-radius: 0px;
    color: white;
    font-size: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
}
.reviewrule_container .modal-header .close{
  color: white !important;
  background: transparent;
  font-size: 24px;
  opacity:1;
}
.reviewrule_container .modal-header .close i{
  text-shadow: none;
}
.reviewrule_container .upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.reviewrule_container .upload-btn-wrapper input[type=file] {
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
export default {
  name: "ReviewRulesIndex",
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
      fileError: false,
      loadingbgcolor : '#0069d9',
      importFile: null,
      rows: [],
      reViewruleId: "",
      id: 0,
      columns: [
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
          label: "PNR",
          name: "pnr",
          filter: {
            type: "simple",
            placeholder: "PNR",
            showClearButton: false
          }
        },
        {
          label: "Product Name",
          name: "productName",
          filter: {
            type: "simple",
            placeholder: "Product Name",
            showClearButton: false
          }
        },
        {
          label: "Product Label",
          name: "productLabel",
          filter: {
            type: "simple",
            placeholder: "Product Label",
            showClearButton: false
          }
        },
        {
          label: "Date",
          name: "productPurchasedDate",
          slot_name: "enddateSlot",
          filter: {
            type: "simple",
            placeholder: "Date",
            showClearButton: false
          }
        },
        {
          label: "Price",
          name: "amount",
         // slot_name: "ActivedateSlot",
          filter: {
            type: "simple",
            placeholder: "Price",
            showClearButton: false
          }
        },
        {
          label: "Points",
          name: "points",
          //slot_name: "enddateSlot",
          filter: {
            type: "simple",
            placeholder: "Points",
            showClearButton: false
          }
        },
      /*  {
          label: "POS",
          name: "pos",
          filter: {
            type: "simple",
            placeholder: "pos",
            showClearButton: false
          }
        },*/
      
      ],
      actions: [
        {
          btn_text: "Download",
          event_name: "on-export",
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
  methods: {

    handleViewItem: function(ruleId) {
      this.myDebug("View Item", ruleId);
      let path = `/merchantreviewrules/?action=view&reviewrule=${ruleId}`;
      Vue.router.push({ path: path });
    },
    handleExport: function(partnerId) {
      partnerId = this.partnerId;
      this.isLoading = true;
      let cachescope = this;
      axios({
        url: `${process.env.VUE_APP_API_LOCATION}purchases/${this.reViewruleId}/export`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'reviewrules.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
        cachescope.isLoading = false;
      });
    },

    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD"):"" );
    },
    getViewRules(id){
            if(this.partnerId != undefined && this.partnerId != "") {
    let cache_obj = this;
    this.isLoading=true;
    let data_obj={
        id:id,
    }
    this.$store.dispatch("purchases/rulepurchases", data_obj
).then(function(res) {

      cache_obj.isLoading = false;
     // cache_obj.myDebug(JSON.stringify(res));
      if(res.data) {
        cache_obj.rows = res.data;
      }
      cache_obj.isLoading = false;
    });
    }

    },
  /*  loadearningrulelist(){
      var cacheScope = this;
      this.$store.dispatch("earningrule/earningrulelist").then(function(res) {
        cacheScope.isLoading = false;
        cacheScope.rows = res.data.map(function(row){
          //row.pos = "Retail";
          row.rulecount = 0;
          row.lastRunDate = moment(row.lastRunDate).format("DD-MM-YYYY");
          return row;
        });
      });
    }*/
  },
  /*created(){
    this.loadearningrulelist();
  }*/

  mounted() {
    $(".nav-merchantearningviewrules").addClass("active");
    this.partnerId  = this.$store.getters["account/getuserid"];
   this.myDebug("check1", this.partnerId);

    if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }

      if(this.action == "view" && Object.prototype.hasOwnProperty.call(obj, 'reviewrule')) {
        /* View or Edit action */
        this.reViewruleId = this.$route.query.reviewrule;
        this.getViewRules(this.reViewruleId);
      }
    }

  }
};
</script>

