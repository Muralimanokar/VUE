<template>
 <app-layout>
     <div class="table_container merchant_container">
       <DataTable :rows="rows" :columns="columns" :config="config" :actions="actions"
       :dtName="'earnList'" @on-addmerchant="handleAddNew">
            <template slot="actionpnl" slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="View" v-on:click='handleViewItem(props.row["id"])'>
                              <i class="fa fa-eye"></i>
                          </a>

                          <a class="mx-2 action-icon-btn" title="Edit"  v-on:click='handleEditItem(props.row["id"])'>
                              <i class="fa fa-pencil-square-o"></i>
                          </a>

                          <a class="mx-2 action-icon-btn" title="Business Config" v-on:click='handleBusinessConfig(props.row["id"])'>
                              <i class="fa fa-cogs"></i>
                          </a>
                      </div>
                   </div>
            </template>
            <template slot="filter_enron" slot-scope="props">
                 <div class="dropdown" style="margin-top: 5px;">
                    <a class="drp-dwn-link text-underline" style="color: #000!important;"  href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Enr On
                    </a>
                    <div class="arrow-up">
                        <div class="dropdown-menu" style="position: absolute; transform: translate3d(0px, 21px, 0px); top: 0px; left: 0px; will-change: transform;" x-placement="bottom-start">
                            <div>
                                <div class="slidecontainer" style="padding: 0px 5px;">
                                    <input type="range" min="0" max="1000" value="0" class="slider" style="width:100%;" v-model="filterenron">
                                    <p class="mb-0" style="text-align:center;">{{ filterenron }}</p>
                                </div>
                            </div>
                          <div class="d-flex justify-content-between custm-srch-wrap">
                            <a class="dropdown-item text-underline">Cancel</a>
                            <a class="dropdown-item text-underline" href="javascript:void(0);" @click="handleFilterEnron(props)">Apply</a>
                          </div>
                        </div>
                     </div>
                  </div>
            </template>
             <template slot="filter_noofpos">
                 <div class="dropdown" style="margin-top: 5px;">
                    <a class="drp-dwn-link text-underline" style="color: #000!important;"  href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      No.of POS
                    </a>
                  </div>
            </template>
            <template slot="filter_totaltxn">
                 <div class="dropdown" style="margin-top: 5px;">
                    <a class="drp-dwn-link text-underline" style="color: #000!important;"  href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Total Txn
                    </a>
                  </div>
            </template>

            <template slot="filter_avgtxn">
                 <div class="dropdown" style="margin-top: 5px;">
                    <a class="drp-dwn-link text-underline" style="color: #000!important;"  href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       Avg.Txn
                    </a>
                  </div>
            </template>
            <template slot="filter_orders">
                 <div class="dropdown" style="margin-top: 5px;">
                    <a class="drp-dwn-link text-underline" style="color: #000!important;"  href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Orders
                    </a>
                  </div>
            </template>

            <template slot="paginataion-previous-button">
                <i class="fa fa-arrow-left" style="color:#188ae3;" aria-hidden="true"></i>
            </template>
            <template slot="paginataion-next-button">
                <i class="fa fa-arrow-right" style="color:#188ae3;" aria-hidden="true"></i>
            </template>
           <template slot="empty-results" v-if="isLoading"> Fetching records... </template>
           <template slot="empty-results" v-else> No record found! </template>
             <template slot="eronSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["enrolledDate"]) }}</div>
            </template>
            <template slot="lsonSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["lastOrderedDate"]) }}</div>
            </template>
        </DataTable>
     </div>
     <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true" :color="loadingbgcolor"></loading>
 </app-layout>
</template>

<style>
.merchant_container .table-active td:nth-child(2) input {
  width: 75px;
}
.merchant_container .table-active td:nth-child(3) input {
  width: 110px;
}
.merchant_container .table-active td:nth-child(4) input {
  width: 100px;
}
.merchant_container .table-active td:nth-child(5) input {
  width: 210px;
}
.merchant_container .table-active td:nth-child(6) input {
  width: 95px;
}
.merchant_container .table-active td:nth-child(7) input {
  width: 95px;
}
.merchant_container .table-active td:nth-child(10) input {
  width: 95px;
}
.merchant_container .table-active td:nth-child(11) input {
  width: 144px;
}
.merchant_container .filter_status {
  background: #eaeaea;
  border-radius: 2px;
}
.merchant_container .filterslider{
  width:100%;
}
.merchant_container .custm-srch-wrap a{
  cursor: pointer;
}
</style>

<script>
import Vue from "vue";
import AppLayout from "@/layouts/Admin.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import Loading from 'vue-loading-overlay';
import moment from "moment";
import 'vue-loading-overlay/dist/vue-loading.css';
import EventBus from "@/utils/event-bus.js";
export default {
  name: "MerchantIndex",
  components: {
    AppLayout,
    DataTable,
    Loading
  },
  data: function() {
    return {
      isLoading : true,
      loadingbgcolor : '#0069d9',
      rows: [],
      columns: [
        {
          label: "ID",
          name: "id",
          filter: {
            type: "simple",
            placeholder: "ID",
            showClearButton: false
          },
          sort: true
        },
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
          label: "Country",
          name: "countryCode",
          filter: {
            type: "simple",
            placeholder: "Country",
            showClearButton: false
          }
        },
         {
          label: "Email",
          name: "emailId",
          filter: {
            type: "simple",
            placeholder: "Email",
            showClearButton: false
          }
        },
        {
          label: "Phone",
          name: "mobileNumber",
          filter: {
            type: "simple",
            placeholder: "Phone",
            showClearButton: false
          }
        },
        {
          label: "Enr On",
          name: "enrolledDate",
          slot_name: "eronSlot",
           filter: {
            type: "simple",
            placeholder: "Enr On",
            showClearButton: false
          }
         /* filter: {
            name: "enron",
            type: "custom",

            //slot_name: "filter_enron",
            validator: function(rowvalue, filtervalue) {
              if (rowvalue >= filtervalue) {
                return true;
              }
              return false;
            }
          }*/
        },

        {
          label: "Total Txn",
          name: "totalTransactions",
                    filter: {
            type: "simple",
            placeholder: "Total Txn",
            showClearButton: false
          }
         /* filter: {
            name: "totalTransactions",
            type: "custom",
            slot_name: "filter_totaltxn"
          }*/
        },
                {
          label: "Avg.Txn",
          name: "averageValueOfTransaction",
                    filter: {
            type: "simple",
            placeholder: "Avg Txn",
            showClearButton: false
          }
         /* filter: {
            name: "avgtxn",
            type: "custom",
            slot_name: "filter_avgtxn"
          }*/
        },
        {
          label: "Orders",
          name: "orders",
                    filter: {
            type: "simple",
            placeholder: "Orders",
            showClearButton: false
          }
        /*  filter: {
            name: "orders",
            type: "custom",
            slot_name: "filter_orders"
          }*/
        },

        {
          label: "Last order date",
          name: "lastOrderedDate",
          slot_name: "lsonSlot",
                    filter: {
            type: "simple",
            placeholder: "Last order date",
            showClearButton: false
          }
          /*filter: {
            name: "lson",
            type: "custom",

            //slot_name: "filter_enron",
            validator: function(rowvalue, filtervalue) {
              if (rowvalue >= filtervalue) {
                return true;
              }
              return false;
            }
          }*/
        },

        {
          label: "Actions",
          name: "action",
          slot_name: "actionpnl"
        }
      ],
      actions: [
        {
          btn_text: "Add Merchant",
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
        per_page: 10,
        global_search: {
          placeholder: "Search",
          showClearButton: false
        }
      },
      filterenron : 0
    };
  },
  computed : {
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
    handleAddNew: function() {
      Vue.router.push({ path: `/managemerchant/?action=create` });
    },
    handleEditItem : function(merchantid){
      Vue.router.push({ path: `/managemerchant/?action=edit&merchantid=${merchantid}`});
    },
    handleViewItem : function(merchantid){
      Vue.router.push({ path: `/viewmerchant?merchantid=${merchantid}`});
    },

    handleBusinessConfig : function(merchantid){
      Vue.router.push({ path: `/businessconfigurarion?merchantid=${merchantid}&action=edit`});
    },
    handleSuspendItem : function(id){
       var bstatus = confirm("Are you sure Suspend this Merchant?");
      if(bstatus == true){
        let cachescope = this;
      cachescope.isLoading = true;
      this.$store.dispatch(`merchant/deactivate`, id).then(function(res) {
        cachescope.isLoading = false;
        let idx = cachescope.rows.findIndex(ele => ele.id == id);
        if(idx >=0) {
          cachescope.rows[idx].isActive = !(cachescope.rows[idx].isActive);
        }
        cachescope.$toast.open({
          message: "Merchant suspended successfully",
          type: "success",
          duration: 2000,
          dismissible: true,
          position: 'top'
        });
      });
      }
    },
    handleReactivateItem : function(id){
      var bstatus = confirm("Are you sure Reactivate this Merchant?");
      if(bstatus == true){
        let cachescope = this;
      cachescope.isLoading = true;
      this.$store.dispatch(`merchant/reactivate`, id).then(function(res) {
        cachescope.isLoading = false;
        let idx = cachescope.rows.findIndex(ele => ele.id == id);
        if(idx >=0) {
          cachescope.rows[idx].isActive = !(cachescope.rows[idx].isActive);
        }
        cachescope.$toast.open({
          message: "Merchant reactivated successfully",
          type: "success",
          duration: 2000,
          dismissible: true,
          position: 'top'
        });
      });
      }
    },
    loadmerchantlist(){
       var cache_obj = this;
       this.$store.dispatch("merchant/adminMerchantList",this.partnerId).then(function(res) {
          cache_obj.isLoading = false;
          cache_obj.rows = res.data;
          //console.log("CHECK THE DATA",res.data)
      });
    },
    handleStatusFilter : function(event,payload) {
      let filtervalue = event.target.value;
      EventBus.$emit("custom-filter", {
        value: filtervalue,
        column: payload.column
      });
    },
    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD"):"" );
    },
    handleFilterEnron : function(payload){
      EventBus.$emit("custom-filter", {
        value: this.filterenron,
        column: payload.column
      });
      return false;
    }
  },
  created(){
    let cache_obj = this;
     cache_obj.partnerId  = this.$store.getters["account/getuserid"];
    this.loadmerchantlist();
  }
};
</script>
