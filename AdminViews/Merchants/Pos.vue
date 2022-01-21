<template>
 <app-layout>
     <div class="table_container">
       <DataTable :rows="rows" :columns="columns" :config="config" :actions="actions" @on-addmerchant="handleAddNew">
            <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="Edit"  v-on:click='handleEditItem(props.row["id"])'>
                              <i class="fa fa-pencil-square-o"></i>
                          </a>
                          <a class="mx-2 action-icon-btn" title="Setting">
                              <i class="fa fa-list-alt"></i>
                          </a>
                          <a class="mx-2 action-icon-btn" title="Delete">
                              <i class="fa fa-trash-o"></i>
                          </a>
                          <a class="mx-2 action-icon-btn" title="Download">
                              <i class="fa fa-download"></i>
                          </a>
                          <a class="mx-2 action-icon-btn" title="Print">
                              <i class="fa fa-print"></i>
                          </a>
                      </div>
                   </div>
            </template>
            <template slot="filter_enron">
                 <div class="dropdown" style="margin-top: 5px;">
                    <a class="drp-dwn-link text-underline" style="color: #000!important;"  href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Enr On
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
           <template slot="empty-results" v-if="isLoading"> Fetching records... </template>
           <template slot="empty-results" v-else> No record found! </template>
        </DataTable>
     </div>
 </app-layout>
</template>

<style>
.table_container .card {
  border: none;
}
.vbt-table-tools th {
  border-top: none !important;
  border-bottom: none !important;
}
.vbt-table-tools .form-control {
  border: 1px solid #34b8df !important;
  width: 145px;
  height: 31px !important;
}

.has-clear-right .form-control-feedback {
  top: -4px;
  right: -4px;
}

input.form-control[placeholder="ID"] {
  width: 100px;
}
.table_container .card-header {
  display: none;
}
.table_container .card-body {
  padding: 0px;
}
.vbt-column-header {
  border-top: none;
  border-bottom: none;
  background: #34b8df;
  vertical-align: bottom;
  text-align: center;
  font-size: 13px !important;
  border: none !important;
  box-shadow: none;
  font-weight: 500;
}
.card-body tbody tr {
  -webkit-box-shadow: 0 15px 31px #f2f2f2 inset !important;
  box-shadow: 0 15px 31px #f2f2f2 inset !important;
  text-align: center;
  font-size: 13px !important;
  border: none !important;
  font-weight: 400;
}
.action-btn-main .action-icon-btn {
  cursor: pointer;
}
.action-btn-main .action-icon-btn i {
  color: #7f7f7f !important;
  font-size: 18px;
}
.card-footer {
  padding: 0px;
  background-color: inherit;
  border-top: none;
}
.vbt-per-page-dropdown {
  display: none;
}
.vbt-per-page-dropdown ~ .input-group {
  display: none;
}
.page-item {
  color: #000 !important;
  border: none !important;
}
.page-item .page-link {
  color: #000;
  border: none !important;
  background: none !important;
}
.page-link:focus {
  background: none !important;
  box-shadow: none !important;
}
.page-item.active {
  background: #188ae3 !important;
  border-radius: 50%;
  border: none !important;
  /*width: 28px;*/
  height: 28px;
  top: 5px;
  font-size: 11px;
  position: relative;
}
.page-item.disabled .fa-arrow-left,
.page-item.disabled .fa-arrow-right {
  opacity: 0.5 !important;
}
.table-active td {
  padding: 10px 0px;
}
.table-active td .form-group {
  margin: 0px;
}
.table-active td .form-group input {
  background: #eaeaea;
  border-radius: 2px;
}
.filter_status {
  background: #eaeaea;
  border-radius: 2px;
}
</style>

<script>
import Vue from "vue";
import AppLayout from "@/layouts/Admin.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import $ from "jquery";
export default {
  name: "MerchantIndex",
  components: {
    AppLayout,
    DataTable
  },
  data: function() {
    return {
      rows: [],
      columns: [
        {
          label: "ID",
          name: "name",
        },
        {
          label: "POS Name",
          name: "merchant",
        },
        {
          label: "Type",
          name: "pos"
        },
        {
          label: "Currency",
          name: "rulecount"
        },
        {
          label: "Status",
          name: "status"
        },
        {
          label: "Last Transaction Date",
          name: "status"
        },
        {
          label: "Actions",
          name: "lastdate"
        }
      ],
      actions: [
        {
          btn_text: "Add POS",
          event_name: "on-addmerchant",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg"
          }
        },
      ],
      config: {
        checkbox_rows: false,
        rows_selectable: false,
        show_refresh_button: false,
        show_reset_button: false,
        highlight_row_hover: false,
        per_page: 3,
        global_search: {
          placeholder: "Search",
          showClearButton: false
        }
      }
    };
  },
  methods: {
    handleAddNew: function() {
      Vue.router.push({ path: `/managepos/?posid=123` });
    }
  },
  mounted() {
     $(".nav-merchant").addClass("active");
  }
};
</script>
