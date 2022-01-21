<template>
  <div>
    <div class="card-header" style="background: #34b8df;">
      <h2 class="mb-0" style="font-size:13px;">Rewards Redeemed</h2>
    </div>
    <div class="table_container">
       <DataTable :rows="rows" :columns="columns" :config="config" :dtName="'earnList'">
            <!--template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="View" v-on:click='handleViewItem(props.row["id"])'>
                              <i class="fa fa-eye"></i>
                          </a>
                      </div>
                   </div>
            </!--template-->
            <template slot="filter_dob">
                 <div class="dropdown" style="margin-top: 5px;">
                    <a class="drp-dwn-link text-underline" style="color: #000!important;"  href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      DOB
                    </a>
                  </div>
            </template>
            <template slot="redeemedDateSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["redeemed"]) }}</div>
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
import moment from "moment";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import DataTable from "@/components/DataTable/DataTable.vue";
import $ from "jquery";
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
          label: "Transaction ID",
          name: "redeemTransactionId",
          filter: {
            type: "simple",
            placeholder: "Transaction ID",
            showClearButton: false
          }
        },
        {
          label: "Reward Name",
          name: "name",
          filter: {
            type: "simple",
            placeholder: "RewardName",
            showClearButton: false
          }
        },
        {
          label: "Reward Type",
          name: "rewardType",
          filter: {
            type: "simple",
            placeholder: "Reward Type",
            showClearButton: false
          }
        },
         {
          label: "Date redeemed",
          name: "redeemed",
          slot_name: "redeemedDateSlot",
          filter: {
            type: "simple",
            placeholder: "Date redeemed",
            showClearButton: false
          }
        },
        {
          label: "Cost in points",
          name: "points",
          filter: {
            type: "simple",
            placeholder: "Cost in points",
            showClearButton: false
          }
        },
                {
          label: "Coupon code",
          name: "couponCode",
          filter: {
            type: "simple",
            placeholder: "Coupon code",
            showClearButton: false
          }
        },
          {
          label: "Coupon Status",
          name: "couponStatus",
          filter: {
            type: "simple",
            placeholder: "Coupon Status",
            showClearButton: false
          }
        },
                          {
          label: "Redeem Status",
          name: "rewardStatus",
          filter: {
            type: "simple",
            placeholder: "Redeem Status",
            showClearButton: false
          }
        },
                  {
          label: "Delivery Status",
          name: "deliveryStatus",
          filter: {
            type: "simple",
            placeholder: "Delivery Status",
            showClearButton: false
          }
        },
        


       /*         {
          label: "Transaction ID",
          name: "transactionId",
          //slot_name: "redeemedDateSlot",
          filter: {
            type: "simple",
            placeholder: "Transaction ID",
            showClearButton: false
          }
        },*/
        {
          label: "Reward Status",
          name: "status",
          filter: {
            type: "simple",
            placeholder: "Reward Status",
            showClearButton: false
          }
        },

       /* {
          label: "Action",
          name: "action",
          slot_name: "actionpnl"
        }*/
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
     getCustomerRewardsRedeemed(id) {
       console.log("customerid",id)
      let cachescope = this;
      cachescope.submitStatus = "LOADING";
        let dataobj={
     customerId:this.customerId,
  partnerId:this.partnerId
      }
      
      this.$store.dispatch("customer/getRewardsRedeemeds", dataobj).then(function(res) {
        //cachescope.myDebug("Rewards Available", JSON.stringify(res));
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
    },
    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD"):"" );
    },
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
      this.getCustomerRewardsRedeemed();
    }
  }
};
</script>
