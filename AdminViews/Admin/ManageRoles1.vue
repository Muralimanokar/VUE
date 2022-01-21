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
                                    col-form-label text-right">Name *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="$v.rolename.$model">
                                </div>
                                <div class="error col-sm-12 text-left " style="margin-left:50%" v-if="$v.rolename.$error && !$v.rolename.required">Role name should not be empty</div>
                                <div class="error col-sm-12 text-left " style="margin-left:50%"  v-if="$v.rolename.$error && !$v.rolename.regex">Please give the valid role name</div>
                                <div class="error col-sm-12 text-left " style="margin-left:50%"  v-if="$v.rolename.$error && !$v.rolename.maxLength">Maximum allowed character is 20</div>
                                <div class="error col-sm-12 text-left " style="margin-left:50%"  v-if="$v.rolename.$error && !$v.rolename.minLength">Minimum character is 4</div>
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
            </div>
            <div :list="list" class="form-section" v-for="(item, idx) in list" v-bind:key="item.id">
              <div class="card-body px-0">
                <div class="row">
                         <div class="col-md-12">
                             <div class="form-group row" :class="{ 'form-group--error': $v.list.$each[idx].resourcelist.$error }">
                                <label for="name" class="col-sm-2
                                    col-form-label text-right">Resource to Access *</label>
                                <div class="col-sm-6" v-if="list[idx].resourcelist==''">
                                    <select class="form-control" @change="handleFieldSelection($event,idx)">
                                        <option value="" selected>Select</option>
                                        <option v-for="row in activepermission" v-bind:value="row.name" v-bind:key="row.name">{{row.name}}</option>
                                    </select>
                                     <div class="error col-md-12 text-left" style="margin-left:-3%" v-if="$v.list.$each[idx].resourcelist.$error && !$v.list.$each[idx].resourcelist.required">Please select a Resource</div>
                                </div>
                                <div class="col-sm-10" v-else>
                                   <label class="font-weight-bold"> {{ getFieldText(list[idx].resourcelist) }} </label>
                                   <a class="btn icon-btn btn-sm ml-2 bg-light" @click="editField(idx)">
                                     <i class="fa fa-pencil"></i>
                                   </a>
                                </div>
                                <div class="col-md-2 text-right">
                                  <a class="btn icon-btn btn-sm minus text-danger ml-2 bg-light" @click="removeRule(idx)" v-if="list.length != 1">
                                    <i class="fa fa-minus"></i>
                                  </a>
                              </div>
                              </div>
                         </div>
                     </div>
              </div>
              <div class="card-body px-0">
                <div class="row">
                         <div class="col-md-12">
                             <div class="form-group row">
                                <label for="name" class="col-sm-2
                                    col-form-label text-right">Permission Level</label>
                                <div class="col-sm-6">
                                    <treeselect :options="permissionlist" v-model="list[idx].rulelist" :multiple="true" placeholder="Select"
                                        @select="handleSelectChange($event,idx)" @deselect="handleDeSelectChange(idx)">
                                        <option value="" selected>Select</option>
                                        <option v-for="row in permissionlist" v-bind:value="row.name" v-bind:key="row.name">{{row.name}}</option>
                                    </treeselect>
                                </div>
                                <!--div class="error col-sm-12 text-right" v-if="$v.list.$each[idx].rulelist.$error && !$v.list.$each[idx].rulelist.required">Please select a Permission</!--div-->
                              </div>
                         </div>
                     </div>
              </div>
            </div>
        </div>
        <div>
            <div class="d-flex mb-5">
                <button type="button" class="btn btn-danger" @click="addRule()">Add Access</button>
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
import $ from "jquery";
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
       // resourcelist: [],
        //rulelist: [],
       // id: "0",
        isLoading: true,
        loadingbgcolor: "#0069d9",
        action: "Add",
        roleid : null,
        rolename : null,
        roledesc : null,
        permissionlist : [],
        permission : [],
        permissionedit : [],
        list: [],
        numOfRules: -1,
        lable: "All",
        rId: null,
        pId: [],

    };
  },
  validations: {
    rolename: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(20),
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
    },
    list: {
      $each: {
        resourcelist: {
          required
        },
        /*rulelist: {
          required
        }*/
      }
    }
  },
  methods : {
    addRule() {
      let id = ++this.numOfRules;

      let rule = {
        id: id,
        resourcelist: "",
        rulelist: [],

      }
      this.list.push(rule);
    },
    handleFieldSelection(event,idx) {
      //console.log("event", JSON.stringify(event));
     // console.log(idx);
      let newVal = event.target.value;
     // console.log("Newvalue:",newVal);
      let oldVal = this.list[idx].resourcelist;
     // console.log("oldvalue:",JSON.stringify(oldVal));
     // console.log(JSON.stringify(newVal),idx);
      this.list[idx].resourcelist = newVal;
      let newField = this.permission.find(ele => {
        return ele.name == newVal;
      })
      newField.active = false;
    //  console.log("Newfield", JSON.stringify(newField));
      this.rId = newField.id;
     // console.log("Hi",this.rId);
      if(oldVal != "") {
        let oldField = this.permission.find(ele => {
          return ele.name == oldVal;
        })
        oldField.active = true;
       // console.log("OldFeild", JSON.stringify(oldField));
      }
      return this.rId;
    },
    getFieldText(val) {
      if(val != "") {
        let resourcelist = this.permission.find(ele => {
          return ele.name == val;
        })
        return resourcelist.name;
      }
    },
    editField(idx) {
      let val = this.list[idx].resourcelist;
     // console.log("val", val);
      this.list[idx].resourcelist = "";
      if(val != "") {
        let resourcelist= this.permission.find(ele => {
          return ele.name == val;
        })
        resourcelist.active = true;
      }
    },
    removeRule(idx) {
      let oldVal = this.list[idx].resourcelist;
      if(oldVal != "") {
        let oldField = this.permission.find(ele => {
          return ele.name == oldVal;
        })
        oldField.active = true;
      }
      this.$delete(this.list, idx);
    },
//////////////////////Permission Select Methods start//////////////////////
handleSelectChange(event,idx){

//console.log("Indexval:",idx);
//console.log("eventname:", event.label);
//console.log(event.id);
//console.log("NotAll:", JSON.stringify(this.permission));
  if(event.label == "All"){
   // console.log("hi");
    var selectids = map(this.permissionlist, function (row) {
                return row.id;
             });
             for(var i=0;i<this.permission.length;i++){
                 if(this.permission[i].name == this.list[idx].resourcelist){
                    this.$nextTick(() => {
                      this.permission[i].priviledge = selectids;
                      this.list[idx].rulelist = this.permission[i].priviledge;
                     // console.log("rule:", JSON.stringify(this.list[idx].rulelist));
                      this.pId = this.list[idx].rulelist;
                      //console.log("PID:", JSON.stringify(this.pId));
                      //console.log("after1", JSON.stringify(this.permission));
                    });
                    break;
                 }
             }
  }/*else {
    var j=0;
    while(j<this.permission.length){
      this.permission[idx].priviledge = this.list[idx].rulelist;
      j++;
      console.log("works");
    }
    console.log("rule:", JSON.stringify(this.list[idx].rulelist));
    console.log("after", JSON.stringify(this.permission));
  }*/
  this.permission[idx].priviledge = this.list[idx].rulelist;
 // console.log("after2", JSON.stringify(this.permission));

/* if(this.rulelist == ""){
    console.log(JSON.stringify(this.rulelist))
    var selectids = map(this.permissionlist, function (row) {
                return row.id;
      });
      for(this.permission.id=0;this.permission.id<this.permission.length; this.permission.id++){
        console.log(JSON.stringify(this.permission));
        console.log("IDXValue:",idx);
        if(this.permission.id == idx){
          console.log("IDXValue:",idx);
          console.log("permissionvalue:", JSON.stringify(this.permission.id));
          this.$nextTick(() => {
          var i = this.permission.id;
          this.permission[i].priviledge = selectids;
          console.log(JSON.stringify(this.permission));

        });
        break;
      }
      }
  }*/
 /* console.log(idx);
      let newVal = this.rulelist;
      console.log("Newvalue:",JSON.stringify(newVal));
      let oldVal = this.list[idx].rulelist;
      console.log("oldvalue:",JSON.stringify(oldVal));
      console.log(JSON.stringify(newVal),idx);
      this.list[idx].rulelist = newVal;
  for(this.permission.id=0;this.permission.id<this.permission.length; this.permission.id++){
        console.log(JSON.stringify(this.permission));
        console.log("IDXValue:",idx);
        if(this.permission.id == idx){
          console.log("IDXValue:",idx);
          console.log("permissionvalue:", JSON.stringify(this.permission.id));
          this.$nextTick(() => {
          var i = this.permission.id;
          this.permission[i].priviledge = newVal;
          console.log(JSON.stringify(this.permission));

        });
        break;
      }
      }*/
      //this.rulelist = [];
      return this.pId;
      },

     handleDeSelectChange(idx){
      if(this.label == "All"){
             for(var i=0;i< this.permission.length;i++){
                 if(this.permission[i].id == idx){
                    this.$nextTick(() => {
                      this.permission[i].priviledge = [];
                    });
                    break;
                 }
             }
         } else{
              for(var k=0;k<this.permission.length;k++){
                   if(this.permission[k].id == idx){
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
     loadresourcelist(){//resource list api call
         var cachescope = this;
         this.$store.dispatch("roles/getresourcelist").then(function(res) {
             var resobj = map(res, function (row) {
                let  priviledgearr = [];
                let active = true;
                if(cachescope.permissionedit.length > 0){
                  let index = findIndex(cachescope.permissionedit,{id:row.id});
                  //console.log("mewo"+index);
                  if (index > -1) {
                      priviledgearr = cachescope.permissionedit[index].priviledge;
                  }
                }
                return {
                    id : row.id,
                    name : row.name,
                    priviledge : priviledgearr,
                    active: active
                }
            });
            cachescope.permission = resobj;
           // console.log(JSON.stringify(cachescope.permission));
       });
     },
     loadprivilegelist(){//privilege List api call
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

            }];
            for(var i=0;i<res.length;i++){
                resobj.push({
                    id : res[i].id,
                    label: res[i].name,


                });
            }
            cachescope.permissionlist = resobj;
         });
     },
     isFormValid() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
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
                        "privilegeId" : this.pId
                    });
                 }
                }
            }
           /* resourceobj.push({
              "resourceId": this.rId,
              "privilegeId": this.pId
                   // "list" : this.list
                    });*/
            let suserid  = this.$store.getters["account/getuserid"];
            let dataobj = {
                "roleName" : this.rolename,
                "roleDescription" : this.roledesc,
                "userId" : suserid,
                "resourcePrivilegeDtoList" : resourceobj
            }
            let cacheScope = this;
            let storeAction = "roles/createrole";//role add api call
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
     loadroledetails(sroleid){//edit role api call
        let cacheScope = this;
        this.$store.dispatch("roles/getroledetails", sroleid).then(function(res) {
            cacheScope.isLoading = false;
            cacheScope.roleid = res.id;
            cacheScope.rolename = res.roleName;
            cacheScope.roledesc = res.roleDescription;
            if(cacheScope.permission.length > 0){
                for(var i=0;i<cacheScope.permission.length;i++){
                  let index = findIndex(res.resourcePrivilegeDtoList,{resourceId:cacheScope.permission[i].id});
                  if (index > -1) {
                      cacheScope.permission[i].priviledge = res.resourcePrivilegeDtoList[index].privilegeId;
                  }
                }
            }else{
              cacheScope.permissionedit = map(res.resourcePrivilegeDtoList, function (row) {
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
   computed: {
    activepermission() {
      return this.permission.filter(function(ele) {
        return ele.active;
      })
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
      this.addRule();
      if (this.action == "Edit") {
          this.loadroledetails(this.roleid);
      }else{
          this.isLoading = false;
      }
  },

  mounted() {
  //  console.log("Manageroles");
  }
};
</script>
