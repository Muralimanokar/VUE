<template>
  <app-layout>
    <div class="table_container transaction_container">
           <!-- <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'merchanttransactions.index' }">Transactions</router-link>
                        </li>
                       <li class="breadcrumb-item active" aria-current="page">Transaction List</li>
                    </ol>
                </nav>
            </div>
        </div>-->
      <DataTable
        :rows="rows"
        :columns="columns"
        :config="config"
        :actions="actions"
        :dtName="'txnList'"
        :totalRows="totalRows"
        @on-downloadTransaction="handleDownloadTransaction"
        @on-generateTransaction="handleGenerateTransaction"
        @on-exportTransaction="handleExportTransaction"
      >
        <template slot="actionpnl" slot-scope="props">
          <div>
            <div class="d-flex action-btn-main justify-content-center">
              <a
                class="mx-2 action-icon-btn"
                title="View"
                v-on:click="handleViewItem(props.row['id'])"
              >
                <i class="fa fa-eye" ></i>
              </a>
                          <a class="mx-2 action-icon-btn " title="Edit" v-if="(props.row['isSettled']) === false && (props.row['transactionType']) === 'PURCHASE'"  v-on:click='handleEditItem(props.row["id"])'  >
                              <i class="fa fa-pencil-square-o" ></i>
                          </a>
                           <a class="mx-2 action-icon-btn test"  title="Edit" v-else  >
                              <i class="fa fa-pencil-square-o disabled" ></i>

                          </a>
            </div>
          </div>
        </template>
       <!---- <template slot="txnDatepnl" slot-scope="props">
          <div>{{ getDateFormattedString(props.row["transactionDate"]) }}</div>
        </template>---->
               <!-- <template slot="settleDatepnl" slot-scope="props">
          <div>{{ getDateFormattedString(props.row["settledOn"]) }}</div>
        </template>-->
        <template slot="filter_dob">
          <div class="dropdown" style="margin-top: 5px">
            <a
              class="drp-dwn-link text-underline"
              style="color: #000 !important"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              DOB
            </a>
          </div>
        </template>
        <template slot="filter_noofpos">
          <div class="dropdown" style="margin-top: 5px">
            <a
              class="drp-dwn-link text-underline"
              style="color: #000 !important"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              No.of POS
            </a>
          </div>
        </template>
    <!-----     <template slot="filter_Date" slot-scope="props" >
                 <flat-pickr class="form-control filter_Date" @on-change="handleSelect($event,props)"  >
                                    </flat-pickr>
                                        <div  title="Toggle"  data-toggle>
                                   </div>
            </template>-->
              <template slot="filter_status" slot-scope="props">
                 <select class="form-control filter_status" @change="handleSelectFilter($event,props)">
                    <option value="">Type</option>
                    <option value="PURCHASE">PURCHASE</option>
                    <option value="REFUND">REFUND</option>
                </select>
            </template>
        <template slot="filter_status">
          <select class="form-control filter_status">
            <option>Status</option>
            <option></option>
          </select>
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

        <template slot="empty-results" v-if="isLoading"> Fetching records...</template>
        <template slot="empty-results" v-else> No record found! </template>

      </DataTable>

      <!-- View Purchases -->
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
                     :dtName="'productList'"
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
                 <template slot="empty-results" v-if="isLoading"> Fetching records... </template>
                  <template slot="empty-results" v-else> No record found! </template>
                             </DataTable>
                </div>
                <!--<div class="col-md-4">
                  <DataTable
                    :rows="redemptionRows"
                    :columns="redemptionColumns"
                    :config="redemptionConfig"
                    :actions="redemptionActions"
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
                    <template slot="empty-results"> No record found! </template>
                  </DataTable>
                </div>-->
                <!--<div class="col-md-4">-->
                <div class="col-md-12">
                  <DataTable
                    :rows="redemptionRows"
                    :columns="redemptionColumns"
                    :config="redemptionConfig"
                    :actions="redemptionActions"
                    :dtName="'redemptionList'"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    
    
    
    
    
     <div class="modal fade" id="importModal" tabindex="-1">
        <div class="modal-dialog modal-md">
          <div class="modal-content" style="border-radius: 0px">
            <div class="modal-header">
              <h5 class="modal-title" style="font-size: 16px">
                Generate
              </h5>
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
           
                <div class="row ">
                  <div class="col-md-6">
                    <div class="form-group row" :class="{ 'form-group--error': $v.account.$error }">
                                                      <label for="name" class="col-md-8
                                    col-form-label text-left">Select Account</label>
                           <div class="col-md-12">
                                    <multiselect
                                     open-direction="bottom"
                                        :multiple="true"
                                        :searchable="true"
                                        :internal-search="true"
                                        :options-limit="300"
                                        :max-height="200"
                                        :show-no-results="false"
                                        :show-labels="false"
                                        :hide-selected="false"
                                        :preserve-search="true"

                                         :options="merchantList"
                                         :close-on-select="true"
                                         :clear-on-select="false"
                                         placeholder="Select one"
                                         label="label"
                                         track-by="id"
                                         v-model="account" >
                                    </multiselect>
                           </div>
                           </div>
                           </div>
                           </div>

                    
                         <div class="row">
                           <div class="col-md-6">
                             <div class="form-group row" style="margin-left:-27px">
                                <label for="name" class="col-sm-6
                                    col-form-label text-left" style="margin-left:20px">Active From</label>
                                <div class="col-sm-8 input-group" style="margin-left:100px;margin-top:-30px">
                                  <flat-pickr class="form-control"
                                  style="background-color:white;"
                                    v-model="activeFrom" :config="startDateConfig" @on-change="setMinEndDate()">
                                  </flat-pickr>
                                  <div class="input-group-append" style="margin-right:0px">
                                    <div class="input-group-text" title="Toggle" data-toggle>
                                      <i class="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
                                   </div>
                                
                               
                              </div>
                         </div>
                           </div>
                         <div class="col-md-6" >
                              <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-left" style="margin-left:25px">Active To</label>
                                <div class="col-sm-8 input-group" style="margin-left:90px;margin-top:-30px">
                                  <flat-pickr class="form-control"
                                  style="background-color:white;"
                                    v-model="activeTo" :config="endDateConfig" >
                                  </flat-pickr>
                                  <div class="input-group-append">
                                    <div class="input-group-text" title="Toggle" data-toggle>
                                      <i class="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
                                   </div>
                                
                               
                                </div>
                              </div>
                         </div>
                      </div>
                    <div class="row">
                      <div class=" col-md-6">
                      <div class="form-group">
                      <button
                        type="button"
                        class="btn btn-success"
                        @click="submit"
                      >
                        Submit
                      </button>
                      </div>
                      </div>
                  </div>



                </div>
              
            </div>
          </div>
        </div>

 <div class="modal fade" id="importsettle" tabindex="-1">
        <div class="modal-dialog modal-md">
          <div class="modal-content" style="border-radius: 0px">
            <div class="modal-header">
              <h5 class="modal-title" style="font-size: 16px">
               Settle
              </h5>
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
           
                <div class="row ">
                                         <div class="col-md-6">
                    <div class="form-group row" :class="{ 'form-group--error': $v.customer.$error }">
                                                      <label for="name" class="col-md-8
                                    col-form-label text-left">User Type</label>
                           <div class="col-md-12">
                                    <multiselect
                                     open-direction="bottom"
                                        :multiple="true"
                                        :searchable="true"
                                        :internal-search="true"
                                        :options-limit="300"
                                        :max-height="200"
                                        :show-no-results="false"
                                        :show-labels="false"
                                        :hide-selected="false"
                                        :preserve-search="true"

                                         :options="customers"
                                         :close-on-select="true"
                                         :clear-on-select="false"
                                         placeholder="Select one"
                                         label="name"
                                         track-by="name"
                                         v-model="customer" >
                                    </multiselect>
                           </div>
                           </div>
                           </div>
                       <div class="col-md-6">
                    <div class="form-group row" :class="{ 'form-group--error': $v.tree.$error }">
                                                      <label for="name" class="col-md-8
                                    col-form-label text-left"> Customer Name</label>
                           <div class="col-md-12">
                                    <multiselect
                                     open-direction="bottom"
                                        :multiple="true"
                                        :searchable="true"
                                        :internal-search="true"
                                        :options-limit="300"
                                        :max-height="200"
                                        :show-no-results="false"
                                        :show-labels="false"
                                        :hide-selected="false"
                                        :preserve-search="true"

                                         :options="NameList"
                                         :close-on-select="true"
                                         :clear-on-select="false"
                                         placeholder="Select one"
                                         label="Name"
                                         track-by="Name"
                                         v-model="tree" 
                                        >
                                    </multiselect>
                           </div>
                           </div>
                           </div>


                             
                        


                           </div>

                    
                         <div class="row">
                           <div class="col-md-6">
                             <div class="form-group row" style="margin-left:-27px">
                                <label for="name" class="col-sm-6
                                    col-form-label text-left" style="margin-left:20px">From Date</label>
                                <div class="col-sm-8 input-group" style="margin-left:100px;margin-top:-30px">
                                  <flat-pickr class="form-control"
                                  style="background-color:white;"
                                    v-model="activeFrom" :config="startDateConfig" @on-change="setMinEndDate()">
                                  </flat-pickr>
                                  <div class="input-group-append" style="margin-right:0px">
                                    <div class="input-group-text" title="Toggle" data-toggle>
                                      <i class="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
                                   </div>
                                
                               
                              </div>
                         </div>
                           </div>
                         <div class="col-md-6" >
                              <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-left" style="margin-left:25px">To Date</label>
                                <div class="col-sm-8 input-group" style="margin-left:90px;margin-top:-30px">
                                  <flat-pickr class="form-control"
                                  style="background-color:white;"
                                    v-model="activeTo" :config="endDateConfig" >
                                  </flat-pickr>
                                  <div class="input-group-append">
                                    <div class="input-group-text" title="Toggle" data-toggle>
                                      <i class="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
                                   </div>
                                
                               
                                </div>
                              </div>
                         </div>
                      </div>
                    <div class="row">
                      <div class=" col-md-6">
                      <div class="form-group">
                      <button
                        type="button"
                        class="btn btn-success"
                        @click="Submitevent()"
                      >
                        Submit
                      </button>
                      </div>
                      </div>
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
.transaction_container .table-active td:nth-child(2) input {
  width: 180px !important;
}
.transaction_container .table-active td:nth-child(3) input {
  width: 155px !important ;
}
.transaction_container .table-active td:nth-child(4) input {
  width: 150px !important;
}
.transaction_container .table-active td:nth-child(5) input {
  width: 110px !important;
}
.transaction_container .table-active td:nth-child(6) input {
  width: 110px !important;
}
.transaction_container .table-active td:nth-child(7) input {
  width: 100px !important;
}
.transaction_container .table-active td:nth-child(8) input {
  width: 100px !important;
  padding: 5px !important;
}
.transaction_container .table-active td:nth-child(9) input {
  width: 100px !important;
}
.transaction_container .table-active td:nth-child(10) input {
  width: 120px !important;
}
.transaction_container .table-active td:nth-child(11) input {
  width: 115px !important;
}
.test{
  visibility: hidden;
}
.transaction_container .filter_status , .filter_Date {
  background: #eaeaea;
  border-radius: 2px;
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
import DebugMixin from "@/mixins/debug";
import {

} from "vuelidate/lib/validators";
import filter from "lodash/filter";
import AppLayout from "@/layouts/Merchant.vue";
import flatPickr from "vue-flatpickr-component";
import { required, maxLength, numeric, helpers,minValue,between, regex } from "vuelidate/lib/validators";
import 'flatpickr/dist/flatpickr.css';
import DataTable from "@/components/DataTable/DataTable.vue";
import $ from "jquery";
import moment from "moment";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import EventBus from "@/utils/event-bus.js";

export default {
  name: "TransactionsIndex",
  components: {
    AppLayout,
    DataTable,
    Multiselect,
    Loading,
    flatPickr,
  },
  mixins: [DebugMixin],
  data: function () {
    return {
      customers: [
        { name: 'Agency',value:"AGENCY" },
        { name: 'Agent',value:"AGENT" },
        { name: 'Customer',value:"CUSTOMER" },
           ],  
      isLoading:true,
      pageNumber:1,
      totalRows:0,
      loadingbgcolor: "#0069d9",
      importFile: null,
      account:"",
      customer:null,
      tree:null,
      fromdate:"",
      todate:"",
      name:"",
      value:"",
      test:"",
      activeFrom:"",
      merchantList:[],
      customerList:[],
     NameList:[],
      final:[],
      finalist:[],
     finalResult:[],
      EfinalResult:{},
      activeTo:"",
      rows: [],
      columns: [
        {
          label: "Transaction Number",
          name: "id",
          filter: {
            type: "simple",
            placeholder: "Transaction Number",
            showClearButton: false,
          },
        },
        {
          label: "Customer",
          name: "customerName",
          filter: {
            type: "simple",
            placeholder: "Customer",
            showClearButton: false,
          },
        },
        {
          label: "Email",
          name: "email",
          filter: {
            type: "simple",
            placeholder: "Email",
            showClearButton: false,
          },
        },
        {
          label: "Txn. type",
          name: "transactionType",
          filter: {
            name: "status",
            type: "custom",
            slot_name: "filter_status",
            validator: function(rowvalue, filtervalue) {
              if (rowvalue  == filtervalue) {
                return true;
              }
              return false;
            }
          }
        },
        {
          label: "Txn. Date",
          name: "transactionDate",
          slot_name: "txnDatepnl",
          filter: {
            type: "simple",
            placeholder: "Date",
            showClearButton: false,
          },
        /*  filter: {
            name: "status",
            type: "simple",
            showClearButton: false,
            slot_name: "filter_Date",
            validator: function(rowvalue, filtervalue) {
              if (rowvalue  == filtervalue) {
                return true;
              }
              return false;
            }
          }*/
        },
       /* {
          label: "POS",
          name: "pos",
          filter: {
            type: "simple",
            placeholder: "POS",
            showClearButton: false,
          },
        },*/
        {
          label: "Amount",
          name: "amount",
          filter: {
            type: "simple",
            placeholder: "Amount",
            showClearButton: false,
          },
        },
        {
          label: "Points",
          name: "points",
          filter: {
            type: "simple",
            placeholder: "Points",
            showClearButton: false,
          },
        },
        {
          label: "Status",
          name: "transactionStatus",
          filter: {
            type: "simple",
            placeholder: "Status",
            showClearButton: false
          }
        },
        {
          label: "Initiated By",
          name: "initiatedBy",
          filter: {
            type: "simple",
            placeholder: "Initiated By",
            showClearButton: false,
          },
        },
        /* {
          label: "Settled on",
          name: "settledOn",
          slot_name: "settleDatepnl",
          filter: {
            type: "simple",
            placeholder: "Settled on",
            showClearButton: false,
          },
        },*/
        {
          label: "Actions",
          name: "action",
          slot_name: "actionpnl",
        },
      ],
      actions: [
                {
          btn_text: "Generate",
          event_name: "on-generateTransaction",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg",
          },
        },
        {
          btn_text: "Export",
          event_name: "on-exportTransaction",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg",
          },
        },
                        {
          btn_text: "Settle",
          event_name: "on-downloadTransaction",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg",
          },
        },
      ],
      config: {
        server_mode:true,
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
      /*  {
          label: "Custom Label",
          name: "productCustomLabel",
        }, */
        {
          label: "Price",
          name: "totalPrice",
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
     /*redemptionRows: [],
      redemptionColumns: [
        {
          label: "Coupon/voucher code",
          name: "couponCode",
        },
        {
          label: "Points redeemed",
          name: "pointsRedeemed",
        },
        {
          label: "Redemption value",
          name: "redemptionValue",
        },
      ],
      redemptionActions: [],
      redemptionConfig: {
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
      },*/
           redemptionRows: [],
      redemptionColumns: [
        {
          label: "Txn Number",
          name: "transactionId",
        },
        {
          label: "Source Account Name",
          name: "sourceUserName",
        },
        {
          label: "Destination Account Name",
          name: "targetUserName",
        },
        {
          label: "Type",
          name: "transactionType",
        },
        {
          label: "Points",
          name: "amount",
        },
        {
          label: "Status",
          name: "transactionStatus",
        },
      ],
      redemptionActions: [],
      redemptionConfig: {
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
            startDateConfig: {
          wrap: true,
          maxDate:"today"
        },
        endDateConfig: {
          wrap: true,
          maxDate:"today",
          minDate:"today"
        },
    }

  },
      validations:{
      account:{

      },
      customer:{

      },
      tree:{

      },
    },
        watch : {
    "account": function(newValue,oldValue){
      
      let cachescope = this;
      let cacheScope=this;
      cachescope.test=newValue;

     },
    
     
    "customer": function(newValue,oldValue){
      let cachescope = this;
   cachescope.names=newValue;
   this.get(this.names)

     },
     "tree": function(newValue,oldValue){
      let cachescope = this;
   cachescope.select=newValue;

     }  
  },
 provide:function(){
    return{
      handlePageSelected: this.handlePageSelected,
      updatedfilter:this.updatedfilter,
    //  GlobalSearchHandler:this.GlobalSearchHandler

    }
  },
  methods: {
   /*  GlobalSearchHandler(value){
      let cachescope=this;
            let cacheScope=this;

            let cache_obj=this;

      cachescope.value=value
//console.log("ffff",this.value);


 let param = {
               name:this.value,
               value:this.rows,
            partnerId:this.partnerId,
            pageNumber: this.pageNumber,
            pageSize: 10,
            data:{

                }
             }
          
        //console.log("22222", param );
        //console.log("22222", this.rows );

      cacheScope.isLoading = true;
         this.$store.dispatch("merchantTxn/TxnList",param)
              
           .then(function (res) {
         cache_obj.isLoading = false;
         // cache_obj.myDebug(JSON.stringify(res));
          cache_obj.rows = res.data;

         // cache_obj.totalRows=res.totalCount;
        //console.log("customer name chsbk",  res.data);
          cache_obj.isLoading=false;
         
        });
    },
   */
   
   updatedfilter(Epayload,pageNumber){
var Data="";
this.EfinalResult[Epayload.name]=Epayload.value;
for (var key in this.EfinalResult)
  if(this.EfinalResult[key]!="")
  Data+=key+"="+this.EfinalResult[key]+"&";
let cacheScope=this;
   let cache_obj=this;
  let param = {
           Name:Data,
          partnerId: this.partnerId,
          pageNumber: this.pageNumber,
          pageSize: 10,
          data:{

          }
             }
             console.log("param",param)
      cacheScope.isLoading = true;
         this.$store.dispatch("merchantTxn/TxnList",param)
              
           .then(function (res) {  
             // cache_obj.myDebug(JSON.stringify(res));
              for(let i=0;i<res.data.length;i++){
            
     res.data[i]["transactionDate"]=res.data[i].transactionDate.substring(0,10);
     }
      cache_obj.rows = res.data;
       cache_obj.totalRows=res.totalCount;
          cache_obj.isLoading=false;
         
        }); 
},
handleSelectFilter : function(event,payload) {
     let  filtervalue = event.target.value;
      EventBus.$emit("custom-filter", {
        value: filtervalue,
        column: payload.column
      });
    },
   
   handleselect(event,payload){
     let date=event[0];
     var result = "" + date.getFullYear()+"-" + ((date.getMonth() + 1) > 9 ? '' : '0') +(date.getMonth() + 1)+"-" + (date.getDate() > 9 ? '' : '0') + date.getDate();
     let filtervalue =result;
      EventBus.$emit("custom-filter", {
        value: filtervalue,
        column: payload.column
      });
   },
 handlePageSelected(dtName,value){
      this.pageNumber=value;
  if(this.EfinalResult!=""){
this.updatedfilter(this.pageNumber);
  }
else{
this.getTransaction();

}

    },

    get(){
        let cachescope = this;
      let cacheScope=this;
    
       this.names;

       var ruleobj=[];
       for(let i=0;i<this.names.length;i++){
            
                ruleobj[i] = this.names[i].value
              
            }
            cachescope.list=ruleobj
 var resobj=[];

for(let i=0;i<this.customerList.length;i++){

    for(let j=0;j<this.names.length;j++)
    {

        if(this.customerList[i].label == this.names[j].value)
          {
            resobj.push({
           Name:this.customerList[i].id,
            uuid:this.customerList[i].uuid
            })
             
          }
    }    
  }  
             cachescope.NameList=resobj

   
    },
  

          setMinEndDate: function() {
        let startDate = "";
        startDate = this.activeFrom;
        if((startDate != null) && (startDate != "")) {
            //this.endDate = moment(startDate).format("YYYY-MM-DD").toString() + " 23:59:59";
            this.endDateConfig.minDate = startDate;
        }
      },
        handleEditItem: function(id) {
      this.myDebug("Edit Item", id);
      let path = `/merchantEditTransactions/?action=edit&transaction=${id}`;
      Vue.router.push({ path: path });
    },

      getUTCDateFormat(dateVal) {
        return (dateVal != "" && dateVal != null)?(moment(dateVal).format("YYYY-MM-DD 00:00:00")):"";
      },

       getUTC1DateFormat(dateVal) {
        return (dateVal != "" && dateVal != null)?(moment(dateVal).format("YYYY-MM-DD 23:59:59")):"";
      },
   submit(){
              let cachescope = this;
              this.isLoading=true;
      let cache_obj=this;
      let cacheScope=this;
        $("#importModal").modal("hide");
           var resobj=[];
          for(var i=0;i<this.test.length;i++){
               
              resobj[i]= this.test[i].uuid

              
            }
                    cacheScope.finalist = resobj;
                   
      cachescope.submitStatus = "LOADING";
      let postJson={
        partnerId: this.partnerId,
        
         fromdate: this.activeFrom?this.getUTCDateFormat(this.activeFrom):"",
        todate:this.activeTo?this.getUTC1DateFormat(this.activeTo):"",
        data:{
          "uuid":this.finalist,

        }
        
      }
       this.myDebug("JSON:", JSON.stringify(postJson));
      
    this.$store
    
      .dispatch("partner/generateTransaction", postJson)
      .then(function (res) {
         // cache_obj.myDebug(JSON.stringify(res));
          cache_obj.rows = res.data;
            cachescope.$toast.open({
              message: "success",
              type: "success",
              duration: 3000,
              dismissible: true,
              position: "top",
            });
            // cachescope.$router.push({ path: `/merchanttransactions` });
            cachescope.isLoading = false;
           
          
         
      })
      .catch(function(err){
        cachescope.$toast.open({
          message: "Transaction list get failed",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
       // cachescope.$router.push({ path: `/merchanttransactions` });
        cachescope.isLoading = false;
      });
      //cachescope.$router.push({ path: `/merchanttransactions` });

    },


    Submitevent(){
          let cachescope = this;
          this.isLoading=true;
      let cache_obj=this;
      let cacheScope=this;
        $("#importsettle").modal("hide");

           var resobj=[];
          for(var i=0;i<this.select.length;i++){
               
            resobj[i]=this.select[i].uuid

              
            }
                    cacheScope.final = resobj;
      cachescope.submitStatus = "LOADING";
      let postJson={
       partnerId: this.partnerId,
         fromdate: this.activeFrom?this.getUTCDateFormat(this.activeFrom):"",
        todate:this.activeTo?this.getUTC1DateFormat(this.activeTo):"",
        data:{
          "uuid":this.final,

        },
        
      }
       this.myDebug("JSON:", JSON.stringify(postJson));
    var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("demo").innerHTML = xhttp.responseText;
    }
};
xhttp.open("GET", "filename", true);
xhttp.send();

    
    
    
    
    
    /*       axios({
        url: `${process.env.VUE_APP_API_LOCATION}partner/transaction/export-settle?partnerId=${postJson.partnerId}&startDate=${postJson.fromdate}&endDate=${postJson.todate}`,
        method: 'POST',
        data:{
         "uuid":this.final,
        },
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'Customers.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
        cachescope.isLoading = false;
      }).catch(function(err){
        //console.log("error",err);
       // let message=err.message;
        cachescope.$toast.open({
          message: "All transaction has been settled already",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
          
        });
        cachescope.getTransaction();
       // cachescope.$router.push({ path: `/merchanttransactions` });
       
       // cachescope.isLoading = false;
      });*/
   /*  this.$store
    
     .dispatch("partner/gettransactions", postJson)
      .then(function (res) {
         var fileURL = window.URL.createObjectURL(new Blob([res.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'transactions.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
        cachescope.isLoading = false
        //console.log("console")
          cache_obj.myDebug(JSON.stringify(res));
          //console.log("1234",res)
          cache_obj.rows = res.data;
       
            cachescope.$toast.open({
              message: "success",
              type: "success",
              duration: 3000,
              dismissible: true,
              position: "top",
            });
             cachescope.$router.push({ path: `/merchanttransactions` });
            cachescope.isLoading = false;
           
          
         cachescope.getTransaction();
      })
      .catch(function(err){
        let msg=err.message;
        cachescope.$toast.open({
          message: msg,
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
          
        });
        cachescope.getTransaction();
       // cachescope.$router.push({ path: `/merchanttransactions` });
       
        cachescope.isLoading = false;
      });*/
      //cachescope.$router.push({ path: `/merchanttransactions` });

    },  
            handleGenerateTransaction: function () {
      $("#importModal").modal("toggle");
    },
    handleViewItem: function (id) {
      this.isLoading = false;
      this.productRows = [];
      this.redemptionRows = [];
      this.myDebug("View transaction", id);
      $("#popupModal").modal("toggle");
      this.getPurchaseList(id);
      this.getCouponList(id);
    },
        handleExportTransaction : function() {
      this.isLoading = true;
      let cachescope = this;
      let a={
        uuid:this.finalist,
      }
        cachescope.fromdate= this.activeFrom?this.getUTCDateFormat(this.activeFrom):"",
        cachescope.todate=this.activeTo?this.getUTC1DateFormat(this.activeTo):"",
      axios({
        url: `${process.env.VUE_APP_API_LOCATION}partner/transactions/export?partnerId=${this.partnerId}&transactionDateFrom=${this.fromdate}&transactionDateTo=${this.todate}`,
        method: 'POST',
        data:a,
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'transactions.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
        cachescope.isLoading = false;
      })

          .catch((response) =>{
            cachescope.isLoading = false;
           // let res = response.message;
            cachescope.$toast.open({
              message: "All Transactions has been settled already",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: "top",
            });
          });
    },
     handleDownloadTransaction: function () {
      $("#importsettle").modal("toggle");
            this.customer="";
            this.tree="";
            this.activeFrom="";
            this.activeTo="";


    },  
/* handleDownloadTransaction : function() {
     $("#importsettle").modal("toggle");
            this.customer="";
            this.tree="";
            this.activeFrom="";
            this.activeTo="";

      this.isLoading = true;
      let cachescope = this;
      let a={
        uuid:this.finalist,
      }
     this.$store.dispatch("merchantTxn/getTxnList").then((response) => {
       //console.log("12344",response)
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'transactions.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
        cachescope.isLoading = false;
      })

          .catch((response) =>{
         // //console.log("errormessage 1:",JSON.stringify(response));
            cachescope.isLoading = false;
           // let res = response.message;
            cachescope.$toast.open({
              message: "All Transactions has been settled already",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: "top",
            });
          });
    }, */
    getPurchaseList(id) {
      console.log("check transaction id",id);
      let cachescope = this;
      cachescope.isLoading = true;
      var dataobj={
        id:id
      }
      this.$store
        .dispatch("purchases/init", dataobj)
        .then(function (res) {
         // cachescope.myDebug(JSON.stringify(res));
          cachescope.productRows = res.data;
          cachescope.isLoading = false;
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
         // cachescope.isLoading = false;
          cachescope.$router.push({ path: `/merchanttransactions` });
        });
    },
    getCouponList(id) {
      let cachescope = this;
      cachescope.isLoading = true;
      var dataobj={
        id:id,
        partnerId:this.partnerId
      }
      this.$store
        .dispatch("points/getMerchantPoint", dataobj)
        .then(function (res) {
         // cachescope.myDebug(JSON.stringify(res));
          if (res.data != undefined) cachescope.redemptionRows = res.data;
          cachescope.isLoading = false;
        })
        .catch(function (err) {
          cachescope.$toast.open({
            message:
              "Purchase Redemption get failed. Please try again after sometime",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "top",
          });
          cachescope.isLoading = false;
          cachescope.$router.push({ path: `/merchanttransactions` });
        });
    },
  /*  getDateFormattedString(date) {
      return date
        ? moment(date, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]").format("YYYY-MM-DD HH:mm")
        : "";
    },*/
              gettransactionCount() {

      let cachescope = this;
      let cache_obj = this;

      //let res = this;
      var dataobj={
        partnerId:this.partnerId,
        tierId:this.id,
        data:{

        }
      }


      this.$store
        .dispatch("merchantTiers/gettransactioncount", dataobj)
        .then(function (res) {
        //  cachescope.myDebug(JSON.stringify(res));
          cache_obj.rows = res.data;

        })
        .catch(function (err) {

          cachescope.$toast.open({
            message:
              "get Transactions count get failed. Please try again after sometime",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "top",
          });
        });
    },
  getTransaction(){
           //   this.isLoading=true;
        let cacheScope=this;
        let cache_obj=this;
        let dataobj={
          partnerId: this.partnerId,
          pageNumber: this.pageNumber,
          pageSize: 10,
          data:{

          }

        }
        this.$store.dispatch("merchantTxn/getTxnList", dataobj).then(function (res) {
       //  cache_obj.isLoading = false;
        //  cache_obj.myDebug(JSON.stringify(res));
           for(let i=0;i<res.data.length;i++){
            
     res.data[i]["transactionDate"]=res.data[i].transactionDate.substring(0,10);
     }
          cache_obj.rows = res.data;
          cache_obj.totalRows=res.totalCount;
          var resobj=[];
          for(var i=0;i<res.data.length;i++){
            
                resobj.push({
              id: res.data[i].customerName,
              uuid:res.data[i].uuid,
              label: res.data[i].customerName,
                });
            }
        cacheScope.merchatList = resobj;
        cacheScope.merchantList=[...new Map(cacheScope.merchatList.map(item => [item.id, item])).values()];
         cache_obj.isLoading=false;
         
        });
       // cache_obj.isLoading=false;


    },
    getTransactionList() {
      let cacheScope = this;
      let cachescope = this;
        let cache_obj = this;
         let dataobj={
           pageNumber:this.pageNumber,
          partnerId: this.partnerId,
         }
    //  cacheScope.isLoading = true;
         this.$store.dispatch("merchantTxn/getcustomerList",dataobj).then(function (res) {
           
           
         // cache_obj.isLoading = false;
        //  cache_obj.myDebug(JSON.stringify(res));
          var resobj=[];
          for(var i=0;i<res.data.length;i++){
            
                resobj.push({
              id: res.data[i].customerName,
              uuid:res.data[i].uuid,
              label: res.data[i].accountType,
                });
            }
        cacheScope.customerList = resobj;
        cacheScope.customerList=[...new Map(cacheScope.customerList.map(item => [item.id, item])).values()];
         // let result =  cacheScope.customerList.filter(res=>res.data[i].label).map(ele=>ele.id);
         // cache_obj.isLoading=false;
          
        }).catch(function(err){
        cacheScope.$toast.open({
          message: "Customer List for Generate",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
       // cachescope.$router.push({ path: `/rewardcampaign` });
       // cachescope.isLoading = false;
      });
    },
        
   
  },

  mounted() {
    $(".nav-transaction").addClass("active");
    this.partnerId  = this.$store.getters["account/getuserid"];
    let cache_obj = this;

        if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }
      if(this.action == "view" && Object.prototype.hasOwnProperty.call(obj, 'txn')) {
        /* View or Edit action */
        this.id = this.$route.query.txn;
        this.gettransactionCount(); 
     //   this.updatedfilter();  
  //  this.GlobalSearchHandler();

      }
      else {
        this.getTransaction();
            this.updatedfilter();

      }
    }
   // this.partnerId = this.$store.getters["account/getuserid"];
    this.getTransactionList();
  //  this.GlobalSearchHandler();
  },
};
</script>