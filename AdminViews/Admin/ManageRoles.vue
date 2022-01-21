<template>
  <app-layout>
    <div class="manageroles_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'roles.index' }">Role Management</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">{{ action }} Role</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> {{ action }} Role</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.rolename.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Name</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model="$v.rolename.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.rolename.$error && !$v.rolename.required">Role name should not be empty</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Description</label>
                                <div class="col-sm-6">
                                    <textarea class="form-control" v-model="roledesc"></textarea>
                                </div>
                              </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
        <div class="form-section">
            <div class="card">
                <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Permission Object</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row" style="margin-left:20px;">
                         <table class="table table-bordered" style="width:650px;"  :class="{ 'permission_error': permission_error }">
                             <thead>
                                <tr>
                                  <th scope="col" style="font-weight:500;text-align:center;">Resource To Access</th>
                                  <th scope="col" style="font-weight:500;text-align:center;">Permission Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in permission" :key="row.id">
                                   <td>{{ row.name }}</td>
                                    <td>
                                        <treeselect :options="getpermissionobj(row.id)" v-model.trim="row.priviledge" :multiple="true" placeholder="Select"
                                        @select="handleSelectChange" @deselect="handleDeSelectChange">
                                             <div slot="value-label" slot-scope="{ node }" >{{ node.raw.customLabel }}</div>
                                         </treeselect>
                                    </td>
                                </tr>
                            </tbody>
                         </table>
                     </div>
                 </div>
            </div>
        </div>
        <div>
            <div class="d-flex mb-5">
                <button type="button" class="btn btn-danger" style="display:none;">Add Access</button>
                <button type="button" @click="save" class="btn btn-success">Submit</button>
                <button type="button" @click="cancel" class="btn btn-danger">Cancel</button>
            </div>
        </div>
    </div>
     <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true" :color="loadingbgcolor"></loading>
  </app-layout>
</template>

<style>
.manageroles_container .col-form-label {
  padding-top: 7px !important;
}
.vue-treeselect__control{
   border: 1px solid #7e7e7e !important;
}
.permission_error{
   border: 2px solid #f79483 !important;
}
.vue-treeselect__control-arrow,.vue-treeselect__placeholder{
    color : #7e7e7e;
}
.form-group--error .error {
  font-size: 13px;
  color: #f79483;
  margin-top: 4px;
}
</style>

<script>
import AppLayout from "@/layouts/Admin.vue";
import treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import map from "lodash/map";
import filter from "lodash/filter";
import has from "lodash/has";
import findIndex from "lodash/findIndex";
import {
  required,
  minLength,
  maxLength,
  email,
  alpha,
  numeric,
  alphaNum,
  helpers,
  regex
} from "vuelidate/lib/validators";
export default {
  name: "ManageRoles",
  components: {
    AppLayout,
    treeselect,
    Loading
  },
  data: function() {
    return {
        isLoading: true,
        loadingbgcolor: "#0069d9",
        action: "Add",
        roleid : null,
        rolename : null,
        roledesc : null,
        permissionlist : [],
        permission : [],
        permissionedit : [],
        permission_error : false
    };
  },
  validations: {
    rolename: {
      required
    }
  },
  methods : {
     loadresourcelist(){
         var cachescope = this;
         this.$store.dispatch("roles/getresourcelist").then(function(res) {
             var resobj = map(res, function (row) {
                let  priviledgearr = [];
                if(cachescope.permissionedit.length > 0){
                  let index = findIndex(cachescope.permissionedit,{id:row.id});
                 // console.log("mewo"+index);
                  if (index > -1) {
                      priviledgearr = cachescope.permissionedit[index].priviledge;
                  }
                }
                return {
                    id : row.id,
                    name : row.name,
                    priviledge : priviledgearr
                }
            });
            cachescope.permission = resobj;
       });
     },
     loadprivilegelist(){
         var cachescope = this;
         this.$store.dispatch("roles/getprivilegelist").then(function(res) {
            /*var resobj = [];
            var resobj = map(res, function (row) {
                return {
                    id : row.id,
                    label: row.name,
                    customLabel: row.name
                }
            });*/
            var resobj = [{
                id : "0",
                label: "All",
                customLabel: "All",
            }];
            for(var i=0;i<res.length;i++){
                resobj.push({
                    id : res[i].id,
                    label: res[i].name,
                    customLabel: res[i].name
                });
            }
            cachescope.permissionlist = resobj;
           // console.log("PermissionList:", JSON.stringify(cachescope.permissionlist));
         });
     },
     checkpermissionvalid(){
        this.permission_error = true;
        var bpermssionvalid = false;
         for(var i=0;i< this.permission.length;i++){
            if(this.permission[i].priviledge){
                if(this.permission[i].priviledge.length >0){
                   bpermssionvalid = true;
                   this.permission_error = false;
                   break;
                }
            }
        }
        return bpermssionvalid;
     },
     isFormValid() {
        this.$v.$touch();
      //  console.log(this.checkpermissionvalid());
        if (!this.$v.$invalid && this.checkpermissionvalid()) {
            return true;
        }
        return false;
     },
     save(){
         if(this.isFormValid()){
            let resourceobj = [];
            for(var i=0;i< this.permission.length;i++){
                if(this.permission[i].priviledge){
                    if(this.permission[i].priviledge.length >0){
                    let row =  this.permission[i];
                    resourceobj.push({
                        "resourceId" : row.id,
                        "privilegeId" : row.priviledge
                    });
                 }
                }
            }
            let suserid  = this.$store.getters["account/getuserid"];
            let dataobj = {
                "roleName" : this.rolename,
                "roleDescription" : this.roledesc,
                "userId" : suserid,
                "resourcePrivilegeDtoList" : resourceobj
            }
            let cacheScope = this;
            let storeAction = "roles/createrole";
            let successMsg = "Role created successfully";
            if(this.action == "Edit"){
                storeAction = "roles/updaterole";
                dataobj["id"] = this.roleid;
                successMsg = "Role edited successfully";
            }
            this.$store.dispatch(storeAction, dataobj).then(function(res) {
                cacheScope.$toast.open({
                    message: successMsg,
                    type: "success",
                    duration: 2000,
                    dismissible: true,
                    position: "top"
                });
                cacheScope.$router.push({ path: `/roles` });
            }).catch(function(err){
                cacheScope.$toast.open({
                    message: "Error while processing record",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top"
                });
            });
         }
     },
     handleSelectChange(node, instanceId){
      // console.log(node.resourceid);
      // console.log("NotAll:", JSON.stringify(this.permission));
         if(node.label == "All"){
           //  console.log("hit-firstall");
             var selectids = map(this.permissionlist, function (row) {
                return row.id;
             });
             for(var i=0;i<this.permission.length;i++){
                 if(this.permission[i].id == node.resourceid){
                    this.$nextTick(() => {
                      //  console.log("nextclick");
                      this.permission[i].priviledge = selectids;
                     // console.log(JSON.stringify(this.permission));
                    });
                    break;
                 }
             }
         }
        // console.log("notworkloop");
     },
     handleDeSelectChange : function(node, instanceId){
         if(node.label == "All"){
             for(var i=0;i< this.permission.length;i++){
                 if(this.permission[i].id == node.resourceid){
                    this.$nextTick(() => {
                      this.permission[i].priviledge = [];
                    });
                    break;
                 }
             }
         } else{
              for(var k=0;k<this.permission.length;k++){
                   if(this.permission[k].id == node.resourceid){
                      var index = this.permission[k].priviledge.indexOf('0');
                      if(index > -1){
                          this.$nextTick(() => {
                             this.permission[k].priviledge.splice(index, 1);
                          });
                      }
                      break;
                   }
              }
         }
     },
     getpermissionobj(resourceid){
         var resobj = map(this.permissionlist, function (row) {
              row.resourceid = resourceid;
              return row;
          });
         return JSON.parse(JSON.stringify(resobj));
     },

     loadroledetails(sroleid){
        let cacheScope = this;
        this.$store.dispatch("roles/getroledetails", sroleid).then(function(res) {
            cacheScope.isLoading = false;
           // console.log("dbbd",res.data[0][0]);
            cacheScope.roleid = res.data[0][0].id;
            cacheScope.rolename = res.data[0][0].roleName;
            cacheScope.roledesc = res.data[0][0].roleDescription;
            if(cacheScope.permission.length > 0){
                for(var i=0;i<cacheScope.permission.length;i++){
                  let index = findIndex(res.data[0][0].resourcePrivilegeDtoList,{resourceId:cacheScope.permission[i].id});
                  if (index > -1) {
                      cacheScope.permission[i].priviledge = res.data[0][0].resourcePrivilegeDtoList[index].privilegeId;
                  }
                }
            }else{
              cacheScope.permissionedit = map(res.data[0][0].resourcePrivilegeDtoList, function (row) {
                    return {
                        id : row.resourceId,
                        name : row.resourceName,
                        priviledge : row.privilegeId
                    }
              });
            }
        });
     },
     cancel(){
         this.$router.push({ path: `/roles` });
     }
  },
  created(){
      if (this.$route.query) {
      let obj = this.$route.query;
            if (Object.prototype.hasOwnProperty.call(obj, "roleid")) {
                this.roleid = this.$route.query.roleid;
                this.action = "Edit";
            }
      }
      this.loadresourcelist();
      this.loadprivilegelist();
      if (this.action == "Edit") {
          this.loadroledetails(this.roleid);
      }else{
          this.isLoading = false;
      }
  },
  mounted() {
   // console.log("Manageroles");
  }
};
</script>
