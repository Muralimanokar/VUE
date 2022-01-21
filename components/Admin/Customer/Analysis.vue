<template>
  <div>
    <div class="row" :dtName="'earnList'">
        <div class="col-md-3">
            <div style="padding:10px;width:280px;">
            <div class="card">
                <div class="card-header" style="background: #188ae2;">
                    <h2 class="mb-0" style="font-size:13px;">Customer Value</h2>
                </div>
                <div class="card-body px-0" style="padding-top:0px;">
                    <div class="profile_details_list">
                        <div class="row" style="padding:10px;">
                            <div class="col-md-12">
                                <label>Total Transactions Value</label><br>
                                <span>{{customer.totalTransactions}}</span>
                            </div>
                        </div>
                        <div class="row" style="padding:10px;">
                            <div class="col-md-12">
                                <label>Average Transaction Value</label><br>
                                <span>{{customer.averageValueOfTransaction}}</span>
                            </div>
                        </div>
                        <div class="row" style="padding:10px;">
                            <div class="col-md-12">
                                <label>Number of orders</label><br>
                                <span>{{customer.orders}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div style="padding:10px width:280px;margin-top:10px">
            <div class="card">
                <div class="card-header" style=" background: #188ae2;  ">
                    <h2 class="mb-0" style="font-size:13px;">Upcoming Tier Details</h2>
                </div>
                <div class="card-body px-0" style="padding-top:0px;height:215px;">
                    <ul class="profile_details_list">
                        <li>Name:<br> <span>{{customer.upcomingTiers}}</span></li>
                        <li>Condition Value:<br> <span>{{customer.fromRange}}</span></li>
                        <li>Condition Type: <br><span>{{customer.TierType}}</span></li>
                       <!--<li>Loyalty: <span v-for="(card,idx) in customer.upcomingTiers" :key="card"><br>Card {{idx + 1}}: {{card}}</span></li>-->
                        <!--li>Condition Type: <span>{{customer.tierType}}</span></!--li-->
                        <!--<li>Reward code: <span>{{rewardCode}}</span></li>
                        <li>Reward value: <span>{{rewardValue}}</span></li>-->
                    </ul>
                </div>
                </div>
            </div>
        </div>
    </div>
    <br>
     <div class="card-header" style="background: #188ae2;">
                    <h2 class="mb-0" style="font-size:13px;">Segment Analysis</h2>
                </div>
                <br/>
    <div class="table_container" :dtName="'earnList'">
      <div class="card-header" id="headingOne">
          <h2 class="mb-0">Segments</h2>
      </div>
       <DataTable :rows="rows" :columns="columns" :config="config"         :dtName="'txnList'"
       >
            <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="View" v-on:click='handleViewItem(props.row["id"])'>
                              <i class="fa fa-eye"></i>
                          </a>
                      </div>
                   </div>
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
              <div class="modal fade" id="popupModal" tabindex="-1">
        <div class="modal-dialog modal-xl">
          <div class="modal-content" style="border-radius: 0px">
            <div class="modal-header">
              <h5 class="modal-title" style="font-size: 16px">Purchases</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i class="fa fa-times-circle-o" aria-hidden="true"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
               <!-- <div class="col-md-8">-->
                 <div class="col-md-12">
                  <DataTable
                    :rows="productRows"
                    :columns="productColumns"
                    :config="productConfig"
                    :actions="productActions"
                   :dtName="'earnList'"
                  >
                    <template slot="sno" slot-scope="props">
                      <div>
                        {{ props.row.vbt_id }}
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
           
                             </DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
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
.modal-header {
  background: #34b8df;
  border-radius: 0px;
  color: white;
  font-size: 13px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.modal-header .close {
  color: white !important;
  background: transparent;
  font-size: 24px;
  opacity: 1;
}
.modal-header .close i {
  text-shadow: none;
}
.modal-xl {
  max-width: 1350px !important;
}
</style>
<script>
import Vue from "vue";
import axios from "axios";
import DebugMixin from '@/mixins/debug';
import AppLayout from "@/layouts/Admin.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import moment from "moment";
import DataTable from "@/components/DataTable/DataTable.vue";
import $ from "jquery";
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
  props: [
    'customer'
  ],
  data: function() {
    return {
      customerId: null,
      conditionValue: null,
      rewardCode: null,
      rewardValue: null,
      rows: [],
      columns: [
        {
          label: "Segment ID",
          name: "id",
          filter: {
            type: "simple",
            placeholder: "Segment ID",
            showClearButton: false
          }
        },
        {
          label: "Segment Name",
          name: "segmentName",
          filter: {
            type: "simple",
            placeholder: "Segment Name",
            showClearButton: false
          }
        },
        {
          label: "Merchant Name",
          name: "partnerName",
          filter: {
            type: "simple",
            placeholder: "Merchant Name",
            showClearButton: false
          }
        },
       /* {
          label: "Txn. Count",
          name: "transactionCount",
          filter: {
            type: "simple",
            placeholder: "count",
            showClearButton: false
          }
        },
        {
          label: "Last Txn. Date",
          name: "lastTransactionDate",
          slot_name: "statuspnl",
          filter: {
            type: "simple",
            placeholder: "Date",
            showClearButton: false
          }
        },*/
        {
          label: "Show Txn.",
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
      },
            productRows: [],
      productColumns: [
        {
          label: "S.No",
          slot_name: "sno",
        },
        {
          label: "Product name",
          name: "productName",
        },
        {
          label: "Product value",
          name: "quantity",
        },
        {
          label: "Product Label",
          name: "productLabel",
        },
        {
          label: "Product Category",
          name: "productCategory",
        },
        {
          label: "Custom Label",
          name: "productCustomLabel",
        },
        {
          label: "Price",
          name: "price",
        },
        {
          label: "Sell Price",
          name: "productSellPrice",
        },
      ],
      productActions: [],
      productConfig: {
        checkbox_rows: false,
        rows_selectable: false,
        show_refresh_button: false,
        show_reset_button: false,
        highlight_row_hover: false,
        per_page: 10,
        global_search: {
          visibility: false,
          placeholder: "Search",
          showClearButton: false,
        },
      },
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
        handleViewItem: function (id) {
                this.myDebug("View customer", id);
      let path = `/manageSegment/?action=view&segment=${id}`;
      Vue.router.push({ path: path });
     /* this.isLoading = false;
      this.productRows = [];
      this.myDebug("View transaction", id);
      $("#popupModal").modal("toggle");
     this.getPurchaseList(id);*/
    },
        getPurchaseList(id) {
          //console.log("ID CHECK",id);
      let cachescope = this;
      cachescope.isLoading = true;
      this.$store
        .dispatch("transaction/getTransactionlistOne", id)
        .then(function (res) {
         // cachescope.myDebug(JSON.stringify(res));
         // console.log("check data",res.data)
        })
        .catch(function (err) {
          cachescope.$toast.open({
            message:
              "Purchase Product get failed. Please try again after sometime",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "top",
          });
          cachescope.isLoading = false;
          cachescope.$router.push({ path: `/customer` });
        });
    },
    getCustomerAnalysisInfo(id) {
      let cachescope = this;
        cachescope.isLoading = true;
      cachescope.submitStatus = "LOADING";
       let dataobj={
      customerId:this.customerId,
  partnerId:this.partnerId
      }
      this.$store.dispatch("customer/getAnalysis", dataobj).then(function(res) {
        cachescope.rows = res.data.map(function(row){
          row.lastTransactionDate = moment(row.lastTransactionDate).format("DD-MM-YYYY");
          return row;
        });

        cachescope.submitStatus = "IDLE";
       // cachescope.myDebug("Analisys", JSON.stringify(res));
        cachescope.totalTransactionalValue = res.totalTransactionalValue;
        cachescope.averageTransactionValue = res.averageTransactionValue;
        cachescope.totalNoOfTransactions = res.totalNoOfTransactions;


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
 
  },
  mounted() {
    /* TODO:
       Get and show Tier details
       Get and show segment list
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
      this.getCustomerAnalysisInfo(this.customerId);
    }
  }
};
</script>
