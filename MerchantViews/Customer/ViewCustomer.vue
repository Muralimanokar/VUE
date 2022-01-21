<template>
  <app-layout>
    <div class="viewcustomer_container"   :dtName="'earnList'">
      <div class="row align-items-center">
        <div class="col-md-6">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-white m-0 p-0">
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'merchantcustomer.index' }"
                  >Customer</router-link
                >
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                View Customer
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="form-section pt-3">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <i class="icon icon-customer"></i> View Customer
            </h2>
          </div>
          <div class="card-body px-0" style="padding-top: 0px">
            <ul class="nav nav-tabs customerviewpnl">
              <li>
                <a data-toggle="tab" class="active" href="#tab_profile"
                  >Profile Details</a
                >
              </li>
              <li>
                <a data-toggle="tab" href="#tab_summary">Analysis</a>
              </li>
              <li><a data-toggle="tab" href="#tab_txn">Transaction</a></li>
              <li>
                <a data-toggle="tab" href="#tab_redeemed">Rewards</a>
              </li>
              <li>
                <a data-toggle="tab" href="#tab_points">Points Transferred</a>
              </li>
            </ul>
            <div class="tab-content" v-if="!isLoading">
              <div id="tab_profile" class="tab-pane fade in active show">
                <div class="row">
                  <div class="col-md-3">
                    <div style="padding: 10px 0px">
                      <div class="card">
                        <div class="card-header" style="background: #188ae2">
                          <h2 class="mb-0" style="font-size: 13px">
                            Profile Details
                          </h2>
                        </div>
                        <div class="card-body px-0" style="padding-top: 0px">
                          <ul class="profile_details_list">
                            <li>
                              Name: <span>{{ customer.username }}</span>
                            </li>
                            <li>
                              Current Tier: <span>{{ customer.tierName }}</span>
                            </li>
                            <li>
                              Loyalty card number:
                              <span
                                v-for="(
                                  card, idx
                                ) in customer.loyaltyCardNumber"
                                :key="card"
                                ><br />Card {{ idx + 1 }}: {{ card }}</span
                              >
                            </li>
                            <li>
                              Email Address: <span>{{ customer.emailId }}</span>
                            </li>
                            <li>
                              Phone Number:
                              <span>{{ customer.mobileNum }}</span>
                            </li>
                                                        <li>
                              Active Points:
                              <span>{{ customer.activePoints }}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab_summary" class="tab-pane fade">
                <div class="row">
                  <div class="col-md-3">
                    <div style="padding: 10px">
                      <div class="card">
                        <div class="card-header" style="background: #188ae2">
                          <h2 class="mb-0" style="font-size: 13px">
                            Loyalty Summary
                          </h2>
                        </div>
                        <div class="card-body px-0" style="padding-top: 0px">
                          <div class="profile_details_summary">
                            <div class="row" style="padding: 10px">
                              <div class="col-md-12">
                                <label>Earned Points</label><br />
                                <span>{{ points.earnedPoints }}</span>
                              </div>
                              <div class="col-md-12">
                                <label>Total Transactions value</label><br />
                                <span>{{ customer.totalTransactions }}</span>
                              </div>
                            </div>
                            <div class="row" style="padding: 10px">
                              <div class="col-md-12">
                                <label>Average Transaction value</label><br />
                                <span>{{
                                  customer.averageValueOfTransaction
                                }}</span>
                              </div>
                              <div class="col-md-12">
                                <label>Number of orders</label><br />
                                <span>{{ customer.orders }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div style="padding: 10px 0px">
                      <div class="card">
                        <div class="card-header" style="background: #188ae2">
                          <h2 class="mb-0" style="font-size: 13px">
                         Upcoming Tier Details
                          </h2>
                        </div>
                        <div class="card-body px-0" style="padding-top:0px;">
                    <ul class="profile_details_list">
                        <li>Name: <span>{{customer.upcomingTiers}}</span></li>
                        <li>Condition Value: <span>{{customer.FromRange}}</span></li>
                        <li>Condition Type: <span>{{customer.TyreType}}</span></li>
                        <!--<li>Reward code: <span>{{rewardCode}}</span></li>
                        <li>Reward value: <span>{{rewardValue}}</span></li>-->
                    </ul>
                </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="table_container">
                      <div class="card-header" id="headingOne">
                        <h2 class="mb-0">Segments</h2>
                      </div>
                      <DataTable
                        :rows="segment.rows"
                        :columns="segment.columns"
                        :config="segment.config"
                                :dtName="'txnList'"
                      >
                        <template slot="txnDateSlot" slot-scope="props">
                            <div>{{ getDateFormattedString(props.row["lastTransactionDate"]) }}</div>
                        </template>
                                  <template slot="actionpnl" slot-scope="props">
           
                                 <div class="d-flex action-btn-main justify-content-center">
                <a
                  class="mx-2 action-icon-btn"
                  title="View"
                  v-on:click="handleViewSegmentItem(props.row['id'])"
                >
                                  <i class="fa fa-eye"></i>
                </a>
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
                       <template slot="empty-results" v-if="isLoading"> Fetching records... </template>
           <template slot="empty-results" v-else> No record found! </template>
                      </DataTable>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab_txn" class="tab-pane fade">
                <Transaction :merchantid="customerId"></Transaction>
              </div>
              <div id="tab_redeemed" class="tab-pane fade">
                <Rewards>

                </Rewards>
              </div>
              <div id="tab_points" class="tab-pane fade">
                <PointsTransfer :merchantid="customerId"></PointsTransfer>

            </div>
          </div>
        </div>
      </div>
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
.input-group i {
  cursor: pointer;
}
.customerviewpnl li a {
  color: black;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
  padding: 10px 25px;
  display: block;
}
.customerviewpnl li a.active {
  background: #f5b008;
}
.tab-content .card {
  border: 1px solid #34b8df !important;
  border-radius: 0px;
}
</style>

<script>
import Vue from "vue";
import "vue-loading-overlay/dist/vue-loading.css";
import AppLayout from "@/layouts/Merchant.vue";
import Loading from "vue-loading-overlay";
import $ from "jquery";
import moment from "moment";
import DebugMixin from "@/mixins/debug";
import DataTable from "@/components/DataTable/DataTable.vue";
const Transaction = () => import("@/components/Merchant/Customer/TransactionList");
const PointsTransfer = () =>import("@/components/Merchant/Customer/PointsTransfer");
const Rewards = () => import("@/components/Merchant/Customer/Rewards");

export default {
  name: "ViewCustomer",
  components: {
    AppLayout,
    Loading,
    Transaction,
    PointsTransfer,
    Rewards,
    DataTable
  },
  mixins: [DebugMixin],
  data: function () {
    return {
      loadingbgcolor: "#0069d9",
      conditionValue: null,
      rewardCode: null,
      rewardValue: null,
      customer: {
        customerId: null,
        username: null,
        mobileNum: null,
        loyaltyCardNumber: null,
        countryCode: null,
        city: null,
        emailId: null,
        gender: null,
        dob: null,
        tierName: null,
        tierType: null,
        fromRange: null,
        totalTransactions: null,
        averageValueOfTransaction: null,
        orders: null,
        lastOrderedDate: null,
        uuid: "",
        upcomingTiers:null,
        FromRange:null,
        TyreType:null,
      },
      points: {
        earnedPoints: 0,
        expiredPoints: 0,
        pointsUsed: 0,
        activePoints: 0,
        blockedPoints: 0
      },
      segment: {
        rows: [],
        columns: [
                    {
            label: "Segment ID",
            name: "id",
            filter: {
            type: "simple",
            placeholder: "ID",
            showClearButton: false,
          },
          },
          {
            label: "Segment Name",
            name: "segmentName",
            filter: {
            type: "simple",
            placeholder: "Segment Name",
            showClearButton: false,
          },
          },

          {
            label: "Segment Name",
            name: "partnerName",
            filter: {
            type: "simple",
            placeholder: "Segment Name",
            showClearButton: false,
          },
          },
        /*  {
            label: "Txn. Count",
            name: "transactionCount",
            filter: {
            type: "simple",
            placeholder: "Txn Count",
            showClearButton: false,
          },



          },
          {
            label: "Last Txn. Date",
            name: "lastTransactionDate",
            slot_name: "txnDateSlot",
            filter: {
            type: "simple",
            placeholder: "Last Txn Date",
            showClearButton: false,
          },
          },*/
                  {
          label: "Actions",
          name: "action",
          slot_name: "actionpnl",
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
          showClearButton: false,
        },
      },
      },
      isLoading: true
    };
  },
   provide:function(){
    return{
      handlePageSelected: this.handlePageSelected,
      updatedfilter:this.updatedfilter

    }
  },
  methods: {
        handleViewSegmentItem: function (id) {
      this.myDebug("View customer", id);
      let path = `/merchantmanagesegments/?action=view&segment=${id}`;
      Vue.router.push({ path: path });
    },
      updatedfilter(payload){
},

    handlePageSelected(dtName,value){
},
    getCustomerInfo(id) {
      let cachescope = this;
        let dataobj={
        customerId:this.customerId,
        partnerId:this.partnerId
      }
      this.$store
        .dispatch("customer/getProfile", dataobj)
        .then(function (res) {
       //   cachescope.myDebug("Profile:", JSON.stringify(res));
          cachescope.customer.username = res.data.userName;
          cachescope.customer.mobileNum = res.data.mobileNumber;
          cachescope.customer.loyaltyCardNumber = res.data.loyaltyCardNumber;
          cachescope.customer.countryCode = res.data.countryCode;
          cachescope.customer.city = res.data.city;
          cachescope.customer.emailId = res.data.emailId;
          cachescope.customer.gender = res.data.gender;
          cachescope.customer.dob = res.data.dob;
          cachescope.customer.fromRange = res.data.tierFromRange;
          cachescope.customer.tierType = res.data.tierType;
          cachescope.customer.tierName = res.data.tierName;
          cachescope.customer.totalTransactions = res.data.totalTransactions;
          cachescope.customer.averageValueOfTransaction = res.data.averageTransaction;
          cachescope.customer.orders = res.data.orders;
          cachescope.customer.activePoints = res.data.activePoints;
          cachescope.customer.lastOrderedDate = res.data.lastOrderedDate;
          cachescope.customer.uuid = res.data.uuid;
        cachescope.customer.upcomingTiers=res.data.upcomingTiers.name
        cachescope.customer.FromRange=res.data.upcomingTiers.fromRange
        cachescope.customer.TyreType=res.data.upcomingTiers.tierType
          cachescope.getCustomerPointsInfo(cachescope.customer.uuid);
        })
        .catch(function (err) {
          cachescope.$toast.open({
            message: "Customer view failed. Please try again after sometime",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "top"
          });
          cachescope.$router.push({ path: `/merchantcustomer` });
        });
    },
    getCustomerPointsInfo(id) {
      let cachescope = this;
      this.isLoading = true;
         let dataobj={
        id,
        partnerId:this.partnerId
      }
            console.log('checkid',id)

      this.$store
        .dispatch("points/getPoints", dataobj)
        .then(function (res) {
        //  cachescope.myDebug("Points:", JSON.stringify(res));
          cachescope.points.earnedPoints = res.earnedPoints;
          cachescope.points.expiredPoints = res.expiredPoints;
          cachescope.points.pointsUsed = res.pointsUsed;
          cachescope.points.activePoints = res.activePoints;
          cachescope.points.blockedPoints = res.blockedPoints;
          cachescope.isLoading = false;
        })
        .catch(function (err) {
          cachescope.$toast.open({
            message:
              "Customer point summary failed. Please try again after sometime",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "top"
          });
          cachescope.$router.push({ path: `/merchantcustomer` });
        });
    },
    getCustomerSegmentInfo(id) {
      let cachescope = this;
      this.isLoading = true;
       let dataobj={
        customerId:this.customerId,
        partnerId:this.partnerId
      }
      this.$store
        .dispatch("customer/getAnalysis", dataobj)
        .then(function (res) {
        //  cachescope.myDebug("Segment:", JSON.stringify(res));
          cachescope.segment.rows = res.data;

          cachescope.isLoading = false;
        })
        .catch(function (err) {
          cachescope.$toast.open({
            message:
              "Customer segment failed. Please try again after sometime",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "top"
          });
          cachescope.$router.push({ path: `/merchantcustomer` });
        });
    },
    getDateFormattedString(date) {
      return date
        ? moment(date, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]").format("YYYY-MM-DD")
        : "";
    }
  },
  mounted() {
    $(".nav-customer").addClass("active");
    let cache_obj=this;
    cache_obj.partnerId = this.$store.getters["account/getuserid"];

    if (this.$route.query) {
      let obj = this.$route.query;
      if (Object.prototype.hasOwnProperty.call(obj, "customer")) {
        this.customerId = this.$route.query.customer;
      }
    }

    if (this.customerId != undefined) {
      this.getCustomerInfo(this.customerId);
      this.getCustomerSegmentInfo(this.customerId);
    }
  }
};
</script>
