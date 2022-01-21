<template>
 <app-layout>
     <div class="table_container earningtemplate_container">
       <DataTable :rows="rows" :columns="columns" :config="config" :actions="actions"
       :dtName="'earnList'" @on-addruletemplate="handleAddNew">
            <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="Edit"  v-on:click='handleEditItem(props.row["id"])'>
                              <i class="fa fa-pencil-square-o"></i>
                          </a>
                          <a class="mx-2 action-icon-btn" title="Manage Rules" v-on:click='handleRuleItem(props.row["id"],props.row["partnerId"])'>
                              <i class="fa fa-list-alt"></i>
                          </a>
                          <a class="mx-2 action-icon-btn" title="Delete" v-on:click='handleDeleteItem(props.row["id"],props.row["partnerId"])'>
                              <i class="fa fa-trash-o"></i>
                          </a>
                          <a class="mx-2 action-icon-btn" title="Download" v-on:click='handleDownloadItem(props.row["id"],props.row["partnerId"])'>
                              <i class="fa fa-download"></i>
                          </a>
                      <!---    <a class="mx-2 action-icon-btn" title="Print">
                              <i class="fa fa-print"></i>
                          </a> -->
                      </div>
                   </div>
            </template>
         <!--   <template slot="statuspnl" slot-scope="props">
               <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" v-model="props.row.status" @click="handleChkStatus($event)"  v-bind:id="'chk_' + props.row.id" 
                  
                  >
                  <label class="custom-control-label" v-bind:for="'chk_' + props.row.id"></label>
               </div>
            </template>
            <template slot="filter_rulecount">
                 <div class="dropdown" style="margin-top: 5px;">
                    <a class="drp-dwn-link text-underline" style="color: #000!important;"  href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Rule Count
                    </a>
                  </div>
            </template>-->
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
.earningtemplate_container .table-active td:nth-child(2) input {
  width: 75px;
}
.earningtemplate_container .table-active td:nth-child(3) input {
  width: 200px;
}
.earningtemplate_container .table-active td:nth-child(4) input {
  width: 140px;
}
.earningtemplate_container .table-active td:nth-child(5) input {
  width: 120px;
}
.earningtemplate_container .table-active td:nth-child(7) input {
  width: 130px;
}
</style>

<script>
import Vue from "vue";
import axios from "axios";
import AppLayout from "@/layouts/Admin.vue";
import $ from "jquery";
import DataTable from "@/components/DataTable/DataTable.vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import moment from "moment";
import { saveAs } from 'file-saver';
export default {
  name: "EarningRuleIndex",
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
          }
        },
        {
          label: "Template Name",
          name: "name",
          filter: {
            type: "simple",
            placeholder: "Template Name",
            showClearButton: false
          }
        },
        {
          label: "Merchant",
          name: "partner",
          filter: {
            type: "simple",
            placeholder: "Merchant",
            showClearButton: false
          }
        },
       /* {
          label: "POS",
          name: "pos",
          filter: {
            type: "simple",
            placeholder: "POS",
            showClearButton: false
          }
        },*/
        {
          label: "Rule Count",
          name: "ruleCount",
            filter: {
            type: "simple",
            placeholder: "Rule Count",
            showClearButton: false
          }
         /* filter: {
            name: "rulecount",
            type: "custom",
            slot_name: "filter_rulecount"
               slot_name: "statuspnl"
          }*/
        },
        {
          label: "Status",
          name: "activeStatus",
        filter: {
            type: "simple",
            placeholder: "Status",
            showClearButton: false
          }
        },
        {
          label: "Last run date",
          name: "lastRunDate",
          filter: {
            type: "simple",
            placeholder: "Last run date",
            showClearButton: false
          }
        },
        {
          label: "Action",
          name: "action",
          slot_name: "actionpnl"
        },
      ],
      actions: [
        {
          btn_text: "Add Template",
          event_name: "on-addruletemplate",
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
        /*global_search: {
          placeholder: "Search",
          showClearButton: false
        }*/
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
            handlePageSelected(dtName,value){
     // console.log("check transaction",dtName,value);
      //this.pageNumber=value;
      //this.getLoadEarningRuleList();

    },
    handleAddNew: function() {
      Vue.router.push({ path: `/manageearningrule/?action=create` });
    },
    
    handleEditItem: function(id) {
      Vue.router.push({ path: `/manageearningrule/?action=edit&earningrule=${id}` });
    },
    handleRuleItem : function(sid,spartner){
      Vue.router.push({ path: `/rule/?templateid=${sid}&partnerid=${spartner}`});
    },
    handleDeleteItem : function(sid,spartner){
       var bstatus = confirm("Are you sure want to delete?");
       if(bstatus == true) {
         var cachescope = this;
         var dataobj = {
           "ruleTemplateId" : sid ,
           "partnerId" : spartner
         };
         //this.isLoading = true;
         this.$store.dispatch("earningrule/deleteTemplate",dataobj).then(function(res) {
            //cachescope.isLoading = true;
            cachescope.rows = cachescope.rows.filter(function(item) {
              return item.id !== sid;
            });
            cachescope.$toast.open({
                message: "Rule Template deleted successfully",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: 'top'
            });
            cachescope.$router.push({ path: `/earningrule` });
         });
       }
    },
    handleDownloadItem : function(id,partnerId){
     /* var fileToSave = new Blob([JSON.stringify(row)], {
          type: 'application/json',
          name: "template.json"
      });
      saveAs(fileToSave,"template.json");*/
      this.isLoading = true;
      let cachescope = this;
      axios({
        url: `${process.env.VUE_APP_API_LOCATION}rule/template/export?templateId=${id}&partnerId=${this.partnerId}`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'EarningruleTemplate.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
        cachescope.isLoading = false;
      });
    },
    loadearningrulelist(){
      var cacheScope = this;

      this.$store.dispatch("earningrule/earningrulelistAdmin",this.partnerId).then(function(res) {
        cacheScope.isLoading = false;
        cacheScope.rows = res.data.map(function(row){
          row.pos = null;
          row.rulecount = 0;
          row.lastRunDate = moment(row.lastRunDate).format("DD-MM-YYYY");
          return row;
        });
      });
      //cacheScope.$router.push({ path: `/earningrule` });
    }
  },
  created(){
    this.partnerId  = this.$store.getters["account/getuserid"];
    if(this.partnerId == undefined || this.partnerId == "") {
        return;
    }
        this.loadearningrulelist();

      if (this.$route.query) {
      let obj = this.$route.query;
      if (Object.prototype.hasOwnProperty.call(obj, "adminid")) {
        this.adminid = this.$route.query.adminid;
       
      }
    }
  }
};
</script>
