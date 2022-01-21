<template>
 <app-layout>
     <div class="table_container">
       <DataTable :rows="rows" :columns="columns" :config="config" :actions="actions"  @on-addmerchant="handleAddNew"
       :dtName="'earnList'" :totalRows="totalRows">
            <template slot="actionpnl"  slot-scope="props">
                 <div>
                      <div class="d-flex action-btn-main justify-content-center">
                          <a class="mx-2 action-icon-btn" title="Edit"  v-on:click='handleEditItem(props.row["id"])'>
                              <i class="fa fa-pencil-square-o"></i>
                          </a>
                      </div>
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
            <template slot="startdateSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["startDate"]) }}</div>
            </template>
            <template slot="enddateSlot"  slot-scope="props">
               <div>{{ getDateFormattedString(props.row["endDate"]) }}</div>
            </template>
        </DataTable>
     </div>
    <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true" :color="loadingbgcolor"></loading>
 </app-layout>
</template>

<style>
</style>

<script>
import Vue from "vue";
import AppLayout from "@/layouts/Admin.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import Loading from 'vue-loading-overlay';
import moment from "moment";
import 'vue-loading-overlay/dist/vue-loading.css';
import $ from "jquery";
export default {
  name: "TransactionIndex",
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
      pageNumber:1,
       totalRows:0,
      EfinalResult:{},
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
          label: "Rule Name",
          name: "ruleName",
          filter: {
            type: "simple",
            placeholder: "Name",
            showClearButton: false
          }
        },
        {
          label: "Type",
          name: "earningRuleType",
          filter: {
            type: "simple",
            placeholder: "Type",
            showClearButton: false
          }
        },
        {
          label: "Start Date",
          name: "startDate",
          slot_name: "startdateSlot",
          filter: {
            type: "simple",
            placeholder: "Date",
            showClearButton: false
          }
        },
        {
          label: "End Date",
          name: "endDate",
          slot_name: "enddateSlot",
          filter: {
            type: "simple",
            placeholder: "Date",
            showClearButton: false
          }
        },
        {
          label: "Usage Count",
          name: "usageCount",
          filter: {
            type: "simple",
            placeholder: "Count",
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
          btn_text: "Add Rule",
          event_name: "on-addmerchant",
          class: "btn btn-red",
          event_payload: {
            msg: "my custom msg"
          }
        },
      ],
      config: {
         server_mode:true,
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
     provide:function(){
    return{
      handlePageSelected: this.handlePageSelected,
      updatedfilter:this.updatedfilter

    }
  },
  methods: {
updatedfilter(Epayload){
var Data="";
this.EfinalResult[Epayload.name]=Epayload.value;
for (var key in this.EfinalResult)
  if(this.EfinalResult[key]!="")
  Data+=key+"="+this.EfinalResult[key]+"&";
let cacheScope=this;
   let cache_obj=this;
  let param = {
          
          "partnerId" : this.partnerid,
        "templateId" : this.templateid,
         Name:Data,
         pageNumber: this.pageNumber,
          pageSize: 10,
             }
             console.log("payload",param)
      cacheScope.isLoading = true;
         this.$store.dispatch("earningrule/listRules",param)
              
           .then(function (res) {  
             // cache_obj.myDebug(JSON.stringify(res));
      cache_obj.rows = res.data;
       cache_obj.totalRows=res.totalCount;
          cache_obj.isLoading=false;
         
        }); 
},
 
 handlePageSelected(dtName,value){
      this.pageNumber=value;
     console.log(this.filter)
  if(this.EfinalResult!=""){
this.updatedfilter(this.pageNumber);
  }
else{
this.loadrulelist();
}

    },
      
    handleAddNew: function() {
      let surl = `/managerules/?action=create&templateid=${this.templateid}&partnerid=${this.partnerid}`;
      Vue.router.push({ path: surl });
    },
    handleEditItem: function(sid) {
      let surl = `/managerules/?action=edit&earningrule=${sid}&partnerid=${this.partnerid}`;
      Vue.router.push({ path: surl });
    },
    loadrulelist(){
      let cacheScope = this;
       let cache_obj = this;
 cache_obj.isLoading=true;
      let payload = {
        "partnerId" : this.partnerid,
        "templateId" : this.templateid,
         pageNumber: this.pageNumber,
          pageSize: 10,
      }
      cacheScope.$store.dispatch("earningrule/listRule",payload).then(function(res) {
          cacheScope.isLoading = false;
          cacheScope.rows = res.data;
         cache_obj.totalRows=res.totalCount;

      });
       cache_obj.isLoading=false;
    },
    getDateFormattedString(date) {
      return (date?moment(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format("YYYY-MM-DD"):"" );
    },
  },
  created(){
    if (this.$route.query) {
      let obj = this.$route.query;
      if (Object.prototype.hasOwnProperty.call(obj, "templateid")) {
        this.templateid = this.$route.query.templateid;
      }
      if (Object.prototype.hasOwnProperty.call(obj, "partnerid")) {
        this.partnerid = this.$route.query.partnerid;
      }
    }
    this.loadrulelist();
  },
  mounted() {
    $(".nav-earningrule").addClass("active");
    this.updatedfilter();
  }
};
</script>