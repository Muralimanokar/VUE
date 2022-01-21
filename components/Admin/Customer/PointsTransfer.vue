<template>
  <div>
    <div class="table_container">
       <DataTable :rows="rows" :columns="columns" :config="config" :dtName="'earnList'">
            <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="View" v-on:click='handleViewItem(props.row["transactionId"])'>
                              <i class="fa fa-eye"></i>
                          </a>
                      </div>
                   </div>
            </template>
            <template slot="createdAtSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["createdAt"]) }}</div>
            </template>
            <template slot="expieryDateSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["expiresOn"]) }}</div>
            </template>
           <!-- <template slot="isDebtSlot"  slot-scope="props">
               <div v-if="props.row['isDebt']">Send</div>
               <div v-else>Receive</div>
            </template>-->
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import AppLayout from "@/layouts/Admin.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import $ from "jquery";
import moment from "moment";
export default {
  name: "SegmentIndex",
  components: {
    AppLayout,
    DataTable
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
          label: "Date Created",
          name: "createdAt",
          slot_name: "createdAtSlot",
          filter: {
            type: "simple",
            placeholder: "Date",
            showClearButton: false
          }
        },
        {
          label: "Type",
          name: "transferType",
         // slot_name: "isDebtSlot",
          filter: {
            type: "simple",
            placeholder: "Type",
            showClearButton: false
          }
        },
        {
          label: "Points",
          name: "points",
          filter: {
            type: "simple",
            placeholder: "Points",
            showClearButton: false
          }
        },
        {
          label: "Source Account",
          name: "sourceAccount",
          filter: {
            type: "simple",
            placeholder: "Source Account",
            showClearButton: false
          }
        },
        {
          label: "Target Account",
          name: "targetAccount",
         // slot_name: "statuspnl",
          filter: {
            type: "simple",
            placeholder: "Target Account",
            showClearButton: false
          }
        },
        {
          label: "Expires On",
          name: "expiresOn",
          slot_name: "expieryDateSlot",
          filter: {
            type: "simple",
            placeholder: "Date",
            showClearButton: false
          }
        },
        /*{
          label: "Transaction Status",
          name: "transactionStatus",
          //slot_name: "statuspnl",
          filter: {
            type: "simple",
            placeholder: "status",
            showClearButton: false
          }
        },*/
        {
          label: "Action",
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
  methods: {
    getCustomerPointsTransferInfo(id) {
      let cachescope = this;
      cachescope.submitStatus = "LOADING";
     let dataobj=
     {
       customerId:this.customerId,
       partnerId:this.partnerId
     }
      this.$store.dispatch("customer/getPointsTransfer",id ).then(function(res) {
       // cachescope.myDebug("Points Transfer:", JSON.stringify(res));
        cachescope.rows = res.data;
        cachescope.submitStatus = "IDLE";
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Customer view failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/customer` });
      });
    },
    handleViewItem(id) {
      this.myDebug("View Points Transfer", id);
      let path = `/managetransfer/?action=view&transfer=${id}`;
      Vue.router.push({ path: path });
    },
    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD"):"" );
    }
  },
  mounted() {
    /* TODO:
       Get and show merchant list
    */
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
      this.getCustomerPointsTransferInfo(this.customerId);
    }
  }
};
</script>
