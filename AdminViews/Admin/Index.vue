<template>
 <app-layout>
     <div class="table_container admin_container">
       <DataTable :rows="rows" :columns="columns" :config="config" :actions="actions" @on-addadmin="handleAddNew"
       :dtName="'earnList'"
       >
            <template slot="statuspnl" slot-scope="props">
               <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" v-model="props.row.isActive" v-bind:id="'chk_' + props.row.id" @click="handleChkStatus($event)" >
                  <label class="custom-control-label" v-bind:for="'chk_' + props.row.id"></label>
               </div>
                           <!--    <a
                  class="mx-2 action-icon-btn"
                  title="Active"
                  v-if="props.row['isActive']"
                  v-on:click="handleSuspendItem(props.row['id'], false)"
                >
                  <i class="fa fa-toggle-on" style="color: green !important;font-size:30px"></i>
                </a>
                <a
                  class="mx-2 action-icon-btn"
                  title="InActive"
                  v-if="!props.row['isActive']"
                  v-on:click="handleSuspendItem(props.row['id'], true)"
                >
                  <i class="fa fa-toggle-off" style="color: red !important;font-size:30px"></i>
                </a>-->
            </template>
            <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="Edit"  v-on:click='handleEditItem(props.row["id"])'>
                              <i class="fa fa-pencil-square-o"></i>
                          </a>
                      </div>
                   </div>
            </template>
            <template slot="filter_status" slot-scope="props">
                 <select class="form-control filter_status" @change="handleSelectFilter($event,props)">
                    <option value="">Active</option>
                    <option value="Active">Active</option>
                    <option value="Deactive">Deactive</option>
                </select>
            </template>
            <template slot="filter_external" slot-scope="props">
                 <select class="form-control filter_external" @change="handleSelectFilter($event,props)">
                    <option value="">IsExternal</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
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
     <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true" :color="loadingbgcolor"></loading>
 </app-layout>
</template>

<style>
.admin_container .table-active td:nth-child(2) input {
  width: 150px;
}
.admin_container .table-active td:nth-child(3) input {
  width: 150px;
}
.admin_container .table-active td:nth-child(4) input {
  width: 150px;
}
.admin_container .table-active td:nth-child(7) input {
  width: 125px;
}
.admin_container .table-active td:nth-child(5) select {
  width: 125px;
}
.admin_container .table-active td:nth-child(6) select {
  width: 125px;
}
.admin_container .filter_status , .filter_external {
  background: #eaeaea;
  border-radius: 2px;
}
</style>

<script>
import Vue from "vue";
import AppLayout from "@/layouts/Admin.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import EventBus from "@/utils/event-bus.js";
import $ from "jquery";
export default {
  name: "AdminIndex",
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
      // adminid: 1,
      columns: [
        {
          label: "ID",
          name: "id",
          filter: {
            type: "simple",
            placeholder: "ID",
            showClearButton: false
          }
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
          label: "Email",
          name: "emailId",
          filter: {
            type: "simple",
            placeholder: "Email",
            showClearButton: false
          }
        },
        {
          label: "Active",
          name: "isActive",
          slot_name: "statuspnl",
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
          label: "isExternal",
          name: "isExternalUser",
          filter: {
            name: "status",
            type: "custom",
            slot_name: "filter_external",
            validator: function(rowvalue, filtervalue) {
              if (rowvalue  == filtervalue) {
                return true;
              }
              return false;
            }
          }
        },
        {
          label: "APIKey",
          name: "apiKey",
          filter: {
            type: "simple",
            placeholder: "APIKey",
            showClearButton: false
          }
        },
        {
          label: "Actions",
          name: "action",
          slot_name: "actionpnl"
        }
      ],
      actions: [
        {
          btn_text: "Add Admin",
          event_name: "on-addadmin",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg"
          }
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
          placeholder: "Search",
          showClearButton: false
        }
      }
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
      /*  handleSuspendItem: function (id, isSuspend) {
          console.log("check",id,isSuspend);
          let cachescope = this;
          if(id){
    let cacheScope=this;
      let bstatus = "";
      let successMsg = "";
      let errMsg = "";
        let cachescope = this;
               let postJson = {
                      adminid: id,
            isActive: isSuspend
        }
        this.$store
          .dispatch(`admin/Activate`, postJson)
          .then(function (res) {
            /*let idx = cachescope.rows.findIndex((ele) => ele.id == id);
            if (idx >= 0) {
              cachescope.rows[idx].isSuspended = !cachescope.rows[idx].isSuspended;
            }
        cacheScope.isLoading = false;
       // cacheScope.rows = res.data;
          })
          }
          console.log("check admin");
          cachescope.loadadminlist();
   
    },*/
           handlePageSelected(dtName,value){
     // console.log("check transaction",dtName,value);
      //this.pageNumber=value;
      //this.getLoadEarningRuleList();

    },
    handleEditItem: function(sid) {
      Vue.router.push({ path: `/manageadmin/?adminid=${sid}` });
    },
    handleAddNew: function(sid) {
      Vue.router.push({ path: `/manageadmin` });
    },
    handleSelectFilter : function(event,payload) {
      let filtervalue = event.target.value;
      EventBus.$emit("custom-filter", {
        value: filtervalue,
        column: payload.column
      });
    },
    handleChkStatus : function(event,adminid){
      var num=event.target.id.charAt(4);
     // console.log("check123",event.target);
       let bstatus = $(event.target).prop("checked");
      // console.log(bstatus);
       // console.log("1234",this.id)
        var cacheScope = this;
         let postJson = {
            adminid: parseInt(event.target.id.charAt(4)),
            isActive: bstatus
        }
     // console.log("1234",postJson)
      this.$store.dispatch("admin/Activate",postJson).then(function(res) {
        cacheScope.isLoading = false;
        cacheScope.rows = res.data;
      });
    },
    loadadminlist(){
      var cacheScope = this;
      this.$store.dispatch("admin/init").then(function(res) {
        cacheScope.isLoading = false;
        cacheScope.rows=0;
       // console.log("checkrows",cacheScope.rows)
        cacheScope.rows = res.data;
       // console.log(res.data[0].id);
        cacheScope.idcheck=res.data[0].id;
      });
    }
  },
  created(){
      if (this.$route.query) {
      let obj = this.$route.query;
      if (Object.prototype.hasOwnProperty.call(obj, "adminid")) {
        this.adminid = this.$route.query.adminid;
       
      }
    }
     this.partnerId  = this.$store.getters["account/getuserid"];
    if(this.partnerId == undefined || this.partnerId == "") {
        return;
    }
    this.loadadminlist();
  }
};
</script>
