<template>
  <div>
    <div class="table_container">
       <DataTable :rows="rows" :columns="columns" :config="config"         :dtName="'txnList'" >
            <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="View" v-on:click='handleViewItem(props.row["id"])'>
                              <i class="fa fa-eye"></i>
                          </a>
                      </div>
                   </div>
            </template>
            <template slot="isDebtSlot"  slot-scope="props">
               <div v-if="props.row['isDebt']">Sell</div>
               <div v-else>Purchase</div>
            </template>
            <template slot="transactionDateSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["transactionDate"]) }}</div>
            </template>
            <template slot="filter_dob">
                 <div class="dropdown" style="margin-top: 5px;">
                    <a class="drp-dwn-link text-underline" style="color: #000!important;"  href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      DOB
                    </a>
                  </div>
            </template>
             <template slot="filter_noofpos">
                 <div class="dropdown" style="margin-top: 5px;">
                    <a class="drp-dwn-link text-underline" style="color: #000!important;"  href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      No.of POS
                    </a>
                  </div>
            </template>
            <template slot="filter_status">
                 <select class="form-control filter_status">
                    <option>Status</option>
                    <option></option>
                </select>
            </template>
            <template slot="paginataion-previous-button">
                <i class="fa fa-arrow-left" style="color:#188ae3;" aria-hidden="true"></i>
            </template>
            <template slot="paginataion-next-button">
                <i class="fa fa-arrow-right" style="color:#188ae3;" aria-hidden="true"></i>
            </template>
           
        </DataTable>
     </div>
      
  </div>
</template>
<style>
.profile_details_list{
    list-style: none;
    padding: 0px;
    margin: 0px;
    font-size: 13px;
}
.profile_details_list li{
  padding: 10px;
  padding-right: 0px;
}
.profile_details_list span{
    font-weight: 600;
}
.profile_details_summary label{
    font-size: 13px;
}
.profile_details_summary span{
    font-weight: 600;
    padding: 5px;
    font-size: 20px;
}
</style>
<script>
import Vue from "vue";
import axios from "axios";
import DebugMixin from '@/mixins/debug';
import AppLayout from "@/layouts/Admin.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import DataTable from "@/components/DataTable/DataTable.vue";
import $ from "jquery";
import moment from "moment";
export default {
  name: "SegmentIndex",
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
      customerId: null,
      rows: [],
      columns: [
        {
          label: "ID",
          name: "id",
          filter: {
            type: "simple",
            placeholder: "ID",
            showClearButton: false
          }
        },
        {
          label: "Type",
          name: "isDebt",
          slot_name: "isDebtSlot",
          filter: {
            type: "simple",
            placeholder: "Type",
            showClearButton: false
          }
        },
        {
          label: "Date",
          name: "transactionDate",
          slot_name: "transactionDateSlot",
          filter: {
            type: "simple",
            placeholder: "Date",
            showClearButton: false
          }
        },
        {
          label: "Amount",
          name: "amount",
          filter: {
            type: "simple",
            placeholder: "Amount",
            showClearButton: false
          }
        },
        {
          label: "Merchant",
          name: "initiatedBy",
          //slot_name: "statuspnl",
          filter: {
            type: "simple",
            placeholder: "Merchant",
            showClearButton: false
          }
        },
        {
          label: "Points",
          name: "points",
          //slot_name: "statuspnl",
          filter: {
            type: "simple",
            placeholder: "Points",
            showClearButton: false
          }
        },
        {
          label: "View Txn.",
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
    }
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
    getCustomerMerchantInfo(id) {
      let cachescope = this;
        let dataobj={
      customerId:this.customerId,
       partnerId:this.partnerId
      }
      this.$store.dispatch("customer/getCustomerMerchantTransactions", dataobj).then(function(res) {
        //console.log("checkdata");
       // cachescope.myDebug("Merchant History:", JSON.stringify(res));
        cachescope.rows = res.data;
        
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Customer merchant history failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/customer` });
      });
    },
    handleViewItem(id) {
      this.myDebug("View transaction", id);
      let path = `/managetransaction/?action=view&transaction=${id}`;
      Vue.router.push({ path: path });
    },
    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD"):"" );
    }
  },
  mounted() {
     let cache_obj = this;
       cache_obj.partnerId  = this.$store.getters["account/getuserid"];
   
    if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'customer')) {
        /* View or Edit action */
        this.customerId = this.$route.query.customer;
      }
    }

    if(this.customerId != undefined) {
      this.getCustomerMerchantInfo(this.customerId);
    }
  }
};
</script>
