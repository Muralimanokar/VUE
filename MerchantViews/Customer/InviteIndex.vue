<template>
  <app-layout>
    <div class="row align-items-center">
      <div class="col-md-6">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-white m-0 p-0">
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'merchantcustomer.index' }">Customer</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Invite Summary</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="form-section pt-3">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h2 class="mb-0"><i class="icon icon-rewardcampaigns"></i>Invite Summary</h2>
        </div>
      </div>
    </div>
    <div style="padding:10px;"></div>
    <div class="customer_container">
      <div class="table_container">
        <DataTable
          :rows="rows"
          :columns="columns"
          :config="config"
        >
          <template slot="inviteDateSlot" slot-scope="props">
            <div>{{ getDateFormattedString(props.row["inviteDate"]) }}</div>
          </template>
          <template slot="signUpDateSlot" slot-scope="props">
            <div>{{ getDateFormattedString(props.row["signUpDate"]) }}</div>
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
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      :color="loadingbgcolor"
    ></loading>
  </app-layout>
</template>

<style>
.customer_container .table-active td:nth-child(2) input {
  width: 75px;
}
.customer_container .table-active td:nth-child(3) input {
  width: 85px;
}
.customer_container .table-active td:nth-child(4) input {
  width: 75px;
}
.customer_container .table-active td:nth-child(5) input {
  width: 100px;
}
.customer_container .table-active td:nth-child(6) input {
  width: 75px;
}
.customer_container .table-active td:nth-child(7) input {
  width: 75px;
}
.customer_container .table-active td:nth-child(8) input {
  width: 100px;
  padding: 5px !important;
}
.customer_container .filter_status {
  background: #eaeaea;
  border-radius: 2px;
}
.customer_container .modal-header {
  background: #34b8df;
  border-radius: 0px;
  color: white;
  font-size: 13px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.customer_container .modal-header .close {
  color: white !important;
  background: transparent;
  font-size: 24px;
  opacity: 1;
}
.customer_container .modal-header .close i {
  text-shadow: none;
}
.customer_container .upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.customer_container .upload-btn-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
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
import moment from "moment";
export default {
  name: "CustomerInviteIndex",
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
      importFile: null,
      rows: [],
      columns: [
        {
          label: "Invite Date",
          name: "inviteDate",
          slot_name: "inviteDateSlot",
          filter: {
            type: "simple",
            placeholder: "Date",
            showClearButton: false,
          },
        },
        {
          label: "Invite Type",
          name: "inviteType",
          filter: {
            type: "simple",
            placeholder: "Type",
            showClearButton: false,
          },
        },
        {
          label: "Invite Code",
          name: "inviteCode",
          filter: {
            type: "simple",
            placeholder: "Code",
            showClearButton: false,
          },
        },
        {
          label: "Invited From",
          name: "invitedFrom",
          filter: {
            type: "simple",
            placeholder: "Invited From",
            showClearButton: false,
          },
        },
        {
          label: "Invitee",
          name: "invitee",
          filter: {
            type: "simple",
            placeholder: "Invitee",
            showClearButton: false,
          },
        },
        {
          label: "Sign Up Date",
          name: "signUpDate",
          slot_name: "signUpDateSlot",
          filter: {
            type: "simple",
            placeholder: "Date",
            showClearButton: false,
          },
        },
        {
          label: "Status",
          name: "status"
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
          visibility: false,
          placeholder: "Search",
          showClearButton: false,
        },
      },
    };
  },
  methods: {
    getInviteList(id) {
      let cache_obj = this;
      this.isLoading = true;

      this.$store.dispatch("invite/summary", id).then(function (res) {
          cache_obj.isLoading = false;
         // cache_obj.myDebug(JSON.stringify(res));
          if (res.data) {
            cache_obj.rows = res.data;
            cache_obj.isLoading = false;
          }
        });
    },
    getDateFormattedString(date) {
      return date
        ? moment(date, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]").format("YYYY-MM-DD")
        : "";
    },
  },
  mounted() {
    $(".nav-customer").addClass("active");
    let partnerId = this.$store.getters["account/getuserid"];
    this.getInviteList(partnerId);
  },
};
</script>
