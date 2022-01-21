<template>
  <app-layout>
     <div class="table_container roles_container">
        <DataTable :rows="rows" :columns="columns" :config="config" :actions="actions" @on-addmerchant="handleAddNew">
            <template slot="actionpnl" slot-scope="props">
              <div class="d-flex action-btn-main justify-content-center">
                <a class="mx-2 action-icon-btn" title="Edit" v-on:click='handleEditItem(props.row["id"])'>
                     <i class="fa fa-pencil-square-o"></i>
                </a>
                <a class="mx-2 action-icon-btn" title="Delete" v-on:click='handleDeleteItem(props.row["id"])'>
                     <i class="fa fa-trash-o"></i>
                </a>
              </div>
            </template>
            <template slot="filter_userassigned"  slot-scope="props">
                <select class="form-control filter_userassigned"  @change="handleSelectFilter($event,props)">
                    <option value="">Number of users assigned</option>
                    <option v-for="row in [1,2,3,4,5,6,7,8,9,10]" :value="row" v-bind:key="row.id">{{row}}</option>
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
     <div class="modal fade" id="chooseRole" tabindex="-1" style="top:150px;">
        <div class="modal-dialog">
          <div class="modal-content" style="border-radius:0px;">
            <div class="modal-header">
              <h5 class="modal-title" style="font-size: 16px;">Select new role</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <i class="fa fa-times-circle-o" aria-hidden="true"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="row justify-content-md-center">
                   <div class="col-md-auto">
                     <div class="form-group">
                        <div class="col-sm-12">
                            <select class="form-control" v-model="newRoleId">
                                <option value="" selected>Select role</option>
                                <option v-for="role in rows" :value="role.id" v-bind:key="role.id">{{role.roleName}}</option>
                            </select>
                            <div class="text-danger col-sm-12 text-right" v-if='newRoleId == ""'>Please select alternative role</div>
                        </div>
                     </div>
                     <div class="form-group">
                        <button type="button" class="btn btn-success" @click="setNewRoleAndDelete">Confirm Delete</button>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     </div>
     <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true" :color="loadingbgcolor"></loading>
  </app-layout>
</template>

<style>
.roles_container .table-active td:nth-child(2) input {
  width: 150px;
}
.roles_container .table-active td:nth-child(3) input {
  width: 155px;
}
.roles_container .table-active td:nth-child(4) select {
  width: 250px;
}
</style>


<script>
import Vue from 'vue';
import $ from 'jquery';
import AppLayout from "@/layouts/Admin.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import map from "lodash/map";
import EventBus from "@/utils/event-bus.js";

export default {
  name: "RoleManagementIndex",
  components: {
    AppLayout,
    DataTable,
    Loading
  },
  data: function() {
    return {
      roleId: "",
      newRoleId: "",
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
          label: "Role Name",
          name: "roleName",
          filter: {
            type: "simple",
            placeholder: "Role Name",
            showClearButton: false
          }
        },
        {
          label: "Number of users assigned",
          name: "numberOfUsersAssigned",
          filter: {
            type: "custom",
            slot_name : "filter_userassigned",
            validator: function(rowvalue, filtervalue) {
              if (rowvalue  == filtervalue) {
                return true;
              }
              return false;
            }
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
          btn_text: "Add Role",
          event_name: "on-addmerchant",
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
  methods: {
    handleEditItem : function(sid){
      Vue.router.push({ path: `/manageroles/?roleid=${sid}` });
    },
    handleAddNew : function(){
      Vue.router.push({ path: `/manageroles1` });
    },
    setNewRoleAndDelete: function() {
        var cachescope = this;
        cachescope.isLoading = true;
        var dataobj = {
          roleId : this.roleId,
          newRoleId: this.newRoleId
        }
        this.$store.dispatch("roles/deleterole",dataobj).then(function(res) {
          cachescope.$toast.open({
              message: "Role deleted successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          $('#chooseRole').modal('toggle')
          cachescope.isLoading = false;
          cachescope.loadrolelist();
        });
    },
    handleDeleteItem : function(roleId){
      var bstatus = confirm("Are you sure want to delete?");
      if(bstatus == true) {
        this.roleId = roleId;
        $('#chooseRole').modal('toggle')
      }
    },
    handleSelectFilter : function(event,payload) {
      let filtervalue = event.target.value;
      EventBus.$emit("custom-filter", {
        value: filtervalue,
        column: payload.column
      });
    },
    loadrolelist(){
      var cache_obj = this;
      cache_obj.isLoading = true;
      this.$store.dispatch("roles/init").then(function(res) {
        cache_obj.isLoading = false;
        cache_obj.rows = res.data[0];
      });
    }
  },
  created(){
   // console.log("created");
    this.loadrolelist();
  },
  mounted(){

  }
};
</script>
