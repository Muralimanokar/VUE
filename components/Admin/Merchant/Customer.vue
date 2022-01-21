<template>
   <div style="padding:10px 0px;">
       <div class="table_container"   :dtName="'earnList'">
         <DataTable :rows="rows" :columns="columns" :config="config" :dtName="'earnList'">
            <template slot="paginataion-previous-button">
                <i class="fa fa-arrow-left" style="color:#188ae3;" aria-hidden="true"></i>
            </template>
            <template slot="paginataion-next-button">
                <i class="fa fa-arrow-right" style="color:#188ae3;" aria-hidden="true"></i>
            </template>
         
                       <template slot="datecreateSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["lastOrderedDate"]) }}</div>
            </template>
         </DataTable>
       </div>
   </div>
</template>

<script>
import DataTable from "@/components/DataTable/DataTable.vue";
import moment from "moment";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Vue from "vue";
export default {
  name: "MechnatCustomerIndex",
  props : ["merchantid"],
  components: {
    DataTable
  },
  data: function() {
    return {
      rows: [],
      columns: [
        {
          label: "Customer Name",
          name: "customerName",
          filter: {
            type: "simple",
            placeholder: "Name",
            showClearButton: false
          }
        },
        {
          label: "Last Txn",
          name: "lastOrderedDate",
          slot_name: "datecreateSlot",
          filter: {
            type: "simple",
            placeholder: "Value",
            showClearButton: false
          }
        },
        {
          label: "Total Txn",
          name: "totalTransactionalValue",
          filter: {
            type: "simple",
            placeholder: "Value",
            showClearButton: false
          }
        },
        {
          label: "No.of.Txn",
          name: "numberOfTransactions",
          filter: {
            type: "simple",
            placeholder: "No.of-Txn",
            showClearButton: false
          }
        },
        {
          label: "Points earned",
          name: "pointsEarned",
          filter: {
            type: "simple",
            placeholder: "Points",
            showClearButton: false
          }
        },
        {
          label: "Points burned",
          name: "pointsBurned",
          filter: {
            type: "simple",
            placeholder: "Points",
            showClearButton: false
          }
        },
        {
          label: "Top POS",
          name: "toppos"
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
        getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD').format("YYYY-MM-DD"):"" );
    },
     updatedfilter(payload){
},

    handlePageSelected(dtName,value){
},
    loadmerchantcustomer() {
      var cache_obj = this;
      var dataobj = {
       
        partnerId:this.merchantid
      };
      this.$store
        .dispatch("merchant/viewcustomer",this.merchantid)
        .then(function(res) {
           cache_obj.rows = res.data;
          // console.log("123455",res.data)
        });
    }
  },
  created() {
    let cache_obj=this;
        cache_obj.partnerId  = this.$store.getters["account/getuserid"];

      this.loadmerchantcustomer();
  }
};
</script>

