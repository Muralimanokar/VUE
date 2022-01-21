<template>
  <div>
    <div class="row" :dtName="'earnList'">
      <div class="col-md-12">
        <RewardsAvailable></RewardsAvailable>
      </div>
      <div class="col-md-12">
        <RewardsRedeemed></RewardsRedeemed>
      </div>
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
import RewardsAvailable from "@/components/Admin/Customer/RewardsAvailable.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import RewardsRedeemed from "@/components/Admin/Customer/RewardsRedeemed.vue";
import $ from "jquery";
export default {
  name: "SegmentIndex",
  components: {
    RewardsAvailable,
    RewardsRedeemed
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
          name: "date",
          filter: {
            type: "simple",
            placeholder: "Date",
            showClearButton: false
          }
        },
        {
          label: "Type",
          name: "type",
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
          name: "account",
          filter: {
            type: "simple",
            placeholder: "Source Account",
            showClearButton: false
          }
        },
        {
          label: "Target Account",
          name: "target",
          slot_name: "statuspnl",
          filter: {
            type: "simple",
            placeholder: "Target Account",
            showClearButton: false
          }
        },
        {
          label: "Expires On",
          name: "expiry",
          slot_name: "statuspnl",
          filter: {
            type: "simple",
            placeholder: "Date",
            showClearButton: false
          }
        },
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
      this.$store.dispatch("customer/getPointsTransfer", id).then(function(res) {
       // cachescope.myDebug(JSON.stringify(res));
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
    }
  },
  mounted() {
    /* TODO:
       Get and show merchant list
    */
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
