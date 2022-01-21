<template>
  <app-layout>
    <div class="table_container tier_container">
                  <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'merchantsegments.index' }">Segment</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page" >View Segment</li>
                        
                    </ol>
                </nav>
            </div>
      <DataTable
        :rows="rows"
        :columns="columns"
        :config="config"
        :actions="actions"
         :dtName="'earnList'"
      >
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
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      :color="loadingbgcolor"
    ></loading>
  </app-layout>
</template>

<style>
.tier_container .table-active td:nth-child(2) input {
  width: 100px;
}
.tier_container .table-active td:nth-child(4) input {
  width: 130px;
}
.tier_container .table-active td:nth-child(5) input {
  width: 170px;
}
.tier_container .table-active td:nth-child(6) input {
  width: 190px;
}
.tier_container .table-active td:nth-child(7) input {
  width: 180px;
}
.tier_container .table-active td:nth-child(8) input {
  width: 175px;
}
.tier_container .table-active td:nth-child(9) input {
  width: 175px;
}
</style>


<script>
import Vue from "vue";
import DebugMixin from "@/mixins/debug";
import AppLayout from "@/layouts/Merchant.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import $ from "jquery";
export default {
  name: "ReviewSegment",
  components: {
    AppLayout,
    DataTable,
    Loading,
  },
  mixins: [DebugMixin],
  data: function () {
    return {
      isLoading: true,
      loadingbgcolor: "#0069d9",
      partnerId: null,
      rows: [],
      columns: [
        {
          label: "Name",
          name: "userName",
          filter: {
            type: "simple",
            placeholder: "Name",
            showClearButton: false
          }
        },
        {
          label: "Points earned",
          name: "pointsEarned",
          filter: {
            type: "simple",
            placeholder: "Points earned",
            showClearButton: false
          }
        },
        {
          label: "Customer ID",
          name: "id",
          filter: {
            type: "simple",
            placeholder: "Customer ID",
            showClearButton: false
          }
        },
        {
          label: "Transaction value",
          name: "totalTransactionsValue",
          filter: {
            type: "simple",
            placeholder: "Transaction value",
            showClearButton: false
          }
        },
        {
          label: "Max transaction Value",
          name: "maxTransactionValue",
          filter: {
            type: "simple",
            placeholder: "Max transaction Value",
            showClearButton: false
          }
        },
        {
          label: "Average transaction",
          name: "averageTransactionValue",
          filter: {
            type: "simple",
            placeholder: "Average transaction",
            showClearButton: false
          }
        },
        {
          label: "Redemptions points",
          name: "redeemedPoints",
          filter: {
            type: "simple",
            placeholder: "Redemptions points",
            showClearButton: false
          }
        },
      ],
      actions: [],
      config: {
        checkbox_rows: false,
        rows_selectable: false,
        show_refresh_button: false,
        show_reset_button: false,
        highlight_row_hover: false,
        per_page: 10,
        global_search: {
          visibility: false,
        },
      },
      segmentId: 0,
    };
  },
    provide:function(){
    return{
      handlePageSelected: this.handlePageSelected,
            updatedfilter:this.updatedfilter

    }
  },
  methods: {
          updatedfilter(){

          },
            handlePageSelected(dtName,value){
     // console.log("check transaction",dtName,value);
      //this.pageNumber=value;
      //this.getLoadEarningRuleList();

    },
  },
  mounted() {
    $(".nav-segment").addClass("active");
    let cache_obj = this;
    this.partnerId = this.$store.getters["account/getuserid"];
    if (this.$route.query) {
      let obj = this.$route.query;
      if (Object.prototype.hasOwnProperty.call(obj, "segment")) {
        cache_obj.segmentId = this.$route.query.segment;
      }
    }
    this.$store
      .dispatch("merchantSegment/getReviewSegment", {
        partnerId: this.partnerId,
        data: {
          segmentId: cache_obj.segmentId,
          pageNumber: 1,
          pageSize: 2000,
        },
      })
      .then(function (res) {
        cache_obj.isLoading = false;
      //  cache_obj.myDebug(JSON.stringify(res));
        if (res.data) {
          cache_obj.rows = res.data;
        }
      })
      .catch(({ response }) => {
        cache_obj.isLoading = false;
        cache_obj.$toast.open({
          message: "Get List failed.",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: "top",
        });
      });
  },
};
</script>
