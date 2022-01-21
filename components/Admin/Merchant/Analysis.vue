<template>
   <div style="padding:10px 0px;">
       <div class="table_container">
         <DataTable :rows="rows" :columns="columns" :config="config" :dtName="'earnList'">
            <template slot="paginataion-previous-button">
                <i class="fa fa-arrow-left" style="color:#188ae3;" aria-hidden="true"></i>
            </template>
            <template slot="paginataion-next-button">
                <i class="fa fa-arrow-right" style="color:#188ae3;" aria-hidden="true"></i>
            </template>
           <template slot="empty-results" v-if="isLoading"> Fetching records... </template>
           <template slot="empty-results" v-else> No record found! </template>
            <template slot="pointsPurchasedSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["pointsPurchased"]) }}</div>
            </template>
         </DataTable>
       </div>
   </div>
</template>

<script>
import DataTable from "@/components/DataTable/DataTable.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import moment from "moment";
export default {
  name: "MechantAnalysisIndex",
  props: ["merchantid"],
  components: {
    DataTable,
    Loading
  },
  data: function() {
    return {
       isLoading : true,
      rows: [],
      columns: [

        {
          label: "Segment ID",
          name: "segmentId",
          filter: {
            type: "simple",
            placeholder: "Code",
            showClearButton: false
          }
        },
                {
          label: "Segments Name",
          name: "segmentName",
          filter: {
            type: "simple",
            placeholder: "Name",
            showClearButton: false
          }
        },
        {
          label: "Txn. Period",
          name: "transactionPeriod",
          filter: {
            type: "simple",
            placeholder: "TxnPeriod",
            showClearButton: false
          }
        },
        {
          label: "Total customers",
          name: "totalCustomers",
          filter: {
            type: "simple",
            placeholder: "Customer",
            showClearButton: false
          }
        },
        {
          label: "Total Txn. value",
          name: "totalTransactionValue",
          filter: {
            type: "simple",
            placeholder: "Value",
            showClearButton: false
          }
        },
        {
          label: "No of Txn",
          name: "numberOfTransactions",
            filter: {
            type: "simple",
            placeholder: "No of Txn",
            showClearButton: false
          }
        },
        {
          label: "Points Purchased",
          name: "pointsPurchased",
          slot_name: "pointsPurchasedSlot",
          filter: {
            type: "simple",
            placeholder: "date",
            showClearButton: false
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
    loadmerchantanalysis() {
      var cache_obj = this;
      cache_obj. isLoading =true;
      var dataobj = {
        partnerId: this.merchantid
      };
      this.$store
        .dispatch("merchant/viewanalysis", this.merchantid)
        .then(function(res) {
          cache_obj.rows = res.data;
                cache_obj. isLoading =false;

        });
    },
    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD"):"N/A" );
    },
  },
  created() {
    this.loadmerchantanalysis();
  }
};
</script>

