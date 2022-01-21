<template>
   <div style="padding:10px 0px;">
       <div class="table_container">
         <DataTable :rows="rows" :columns="columns" :config="config"   :dtName="'earnList'">
           <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="View" v-on:click='handleViewItem(props.row["id"])'>
                              <i class="fa fa-eye"></i>
                          </a>
                      </div>
                   </div>
            </template>
            <template slot="dtSlot" slot-scope="props">
                <div>{{ getDateFormattedString(props.row["transactionDate"]) }}</div>
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
           <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      :color="loadingbgcolor"
    ></loading>
   </div>
   
</template>

<script>
import Vue from "vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import DataTable from "@/components/DataTable/DataTable.vue";
import moment from "moment";
export default {
  name: "MechnatCustomerIndex",
  props: ["merchantid"],
  components: {
    DataTable,
    Loading
  },
  data: function() {
    return {
       isLoading: true,
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
        },
        {
          label: "Type",
          name: "transactionType",
          filter: {
            type: "simple",
            placeholder: "type",
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
          label: "Date",
          name: "transactionDate",
          slot_name: "dtSlot",
          filter: {
            type: "simple",
            placeholder: "date",
            showClearButton: false
          }
        },
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
          label: "Customer",
          name: "customerName",
          filter: {
            type: "simple",
            placeholder: "customer",
            showClearButton: false
          }
        },
       /* {
          label: "POS",
          name: "POS",
          filter: {
            type: "simple",
            placeholder: "pos",
            showClearButton: false
          }
        },*/
        {
          label: "Points",
          name: "points",
          filter: {
            type: "simple",
            placeholder: "points",
            showClearButton: false
          }
        },
        /*{
          label: "Status",
          name: "isDebt"
        },*/
       /* {
          label: "View Transaction",
          name: "rulecount"
        },*/
        {
          label: "View Transaction",
          name: "action",
          slot_name: "actionpnl"
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
          visibility: false
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
     updatedfilter(payload){
},

    handlePageSelected(dtName,value){
},

    handleViewItem(id) {
      let path = `/managetransaction/?action=view&transaction=${id}`;
      Vue.router.push({ path: path });
    },
    loadmerchanttransaction() {
      var cache_obj = this;
      var cachescope=this;
      this.isLoading=true;
      let dataobj = {
      
        partnerId:this.merchantid,
        data:{

        }
      };
      this.$store
        .dispatch("merchant/getMerchantTransactionPage", dataobj)
        .then(function(res) {
          cachescope.isLoading=false;
          cache_obj.rows = res.data;
        });
    },
    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD"):"" );
    }
  },
  created() {
     let cache_obj=this;
        cache_obj.partnerId  = this.$store.getters["account/getuserid"];
      this.loadmerchanttransaction();
  }
};
</script>

