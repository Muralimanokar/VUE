<template>
 <app-layout>
   <div class="broadcastcampaign_container">

   </div>
   <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'merchantcustomer.index' }">Customer</router-link>
                        </li>

                        <li class="breadcrumb-item active" aria-current="page">Invite Customer</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="form-section pt-3">
        <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i>Invite Customer</h2>
                 </div>
            </div>
        </div>
        <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.inviteType.$error }">
                                <label class="col-sm-6 col-form-label text-right">Invite Type</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.inviteType.$model">
                                        <option value="" selected>Select</option>
                                        <option value="EMAIL">Email</option>
                                      <!-- <option value="SMS">SMS</option>
                                        <option value="SOCIAL_CONNECT">Social Connect</option>
                                        <option value="WHATSAPP">Whatsapp</option>-->
                                    </select>
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.inviteType.$error && !$v.inviteType.required">Please select a invite type</div>
                              </div>
                         </div>
                         <!--<div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.socialConnectType.$error }">
                                <label class="col-sm-6 col-form-label text-right">Social Connect Type</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.socialConnectType.$model">
                                        <option value="" selected>Select</option>
                                        <option value="FACEBOOK">Facebook</option>
                                        <option value="TWITTER">Twitter</option>
                                        <option value="INSTAGRAM">Instagram</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.socialConnectType.$error && !$v.socialConnectType.required">Please select a social connect type</div>
                              </div>
                         </div>-->
                         <div class="col-md-6">
                             <div class="form-group row" :class="{ 'form-group--error': $v.rows.$error }">
                                <label class="col-sm-4 col-form-label text-right">Invitees</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" placeholder="Invitees" v-model="invitees">
                                </div>
                                <div class="col-sm-2" style="padding: 0px">
                                   <a class="btn icon-btn btn-sm plus text-success" @click="addInvitee()">
                                      <i class="fa fa-plus"></i>
                                   </a>
                                </div>

                                <div class="error col-md-12 text-left" style="margin-left:34%" v-if="$v.rows.$error && !$v.rows.required">Please enter a invitee</div>
                              </div>
                         </div>
                     </div>

                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.inviteCode.$error }">
                                <label class="col-sm-6 col-form-label text-right">Invite Code</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" placeholder="Code" v-model="$v.inviteCode.$model">
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.inviteCode.$error && !$v.inviteCode.required">Please enter a invite code</div>
                              </div>
                         </div>

                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.inviteDate.$error }">
                                <label class="col-sm-6 col-form-label text-right">Invite Date</label>
                                <div class="col-sm-6 input-group">
                                  <flat-pickr class="form-control" v-model="inviteDate" :config="dateConfig"></flat-pickr>
                                  <div class="input-group-append">
                                    <div class="input-group-text" title="Toggle" data-toggle>
                                      <i class="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
                                  </div>
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.inviteDate.$error && !$v.inviteDate.required">Please select a invite date</div>
                              </div>
                         </div>

                         <!--<div class="col-md-4">
                             <div class="form-group row">
                                <label class="col-sm-4 col-form-label text-right">Upload</label>
                                <div class="col-sm-6">
                                     //<div class="upload-btn-wrapper">
                                          <button class="btn btn-primary">File Upload</button><input type="file" name="fileexclude" ref="fileexclude" accept=".xlsx, .xls"/>
                                        </div>//
                                    <div class="upload-btn-wrapper">
                                       <button class="btn btn-primary">File Upload</button><input type="file" ref="file" v-on:change="handleFileUpload()"/>
                                    </div>
                                    <div class="form-group">
                                        <label v-if="!fileError">File Format : csv</label>
                                        <label class="text-danger" v-else>Invalid file Format. Please choose a csv file</label>
                                    </div>
                                </div>
                              </div>
                         </div>-->
                     </div>

                     <div class="row">
                         <div class="col-md-8">
                             <div class="form-group row" :class="{ 'form-group--error': $v.inviteContent.$error }">
                                <label class="col-sm-3 col-form-label text-right">Invite Content</label>
                                <div class="col-sm-9">
                                    <textarea class="form-control" placeholder="Type invite content" v-model.trim="$v.inviteContent.$model"></textarea>
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:25%" v-if="$v.inviteContent.$error && !$v.inviteContent.required">Please enter the Content</div>
                              </div>
                              <div class="form-group row" style="padding-top: 20px;">
                                <div class="d-flex mb-5">
                                  <button type="button" class="btn btn-success" @click="submit">Add Invite</button>
                                  <button type="button" class="btn btn-danger" @click="handleCancel">Cancel</button>
                                </div>
                              </div>
                         </div>

                         <div class="col-md-4">
                             <div class="form-group row">
                                <div class="col-sm-12">
                                  <div class="table_container">
                                    <DataTable :rows="rows" :columns="columns" :config="config">
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
                                </div>
                              </div>
                         </div>
                     </div>
                 </div>
 </app-layout>
</template>

<style>
.broadcastcampaign_container .table-active td:nth-child(2) input {
  width: 75px;
}
.broadcastcampaign_container .table-active td:nth-child(3) input {
  width: 85px;
}
.broadcastcampaign_container .table-active td:nth-child(4) input {
  width: 75px;
}
.broadcastcampaign_container .table-active td:nth-child(5) input {
  width: 100px;
}
.broadcastcampaign_container .table-active td:nth-child(6) input {
  width: 75px;
}
.broadcastcampaign_container .table-active td:nth-child(7) input {
  width: 75px;
}
.broadcastcampaign_container .table-active td:nth-child(8) input {
  width: 100px;
  padding: 5px !important;
}
.broadcastcampaign_container .filter_status {
  background: #eaeaea;
  border-radius: 2px;
}
.broadcastcampaign_container .modal-header{
  background: #34b8df;
    border-radius: 0px;
    color: white;
    font-size: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
}
.broadcastcampaign_container .modal-header .close{
  color: white !important;
  background: transparent;
  font-size: 24px;
  opacity:1;
}
.broadcastcampaign_container .modal-header .close i{
  text-shadow: none;
}
.broadcastcampaign_container .upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.broadcastcampaign_container .upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>

<script>
import DebugMixin from '@/mixins/debug';
import AppLayout from "@/layouts/Merchant.vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import flatPickr from "vue-flatpickr-component";
import 'flatpickr/dist/flatpickr.css';
import $ from "jquery";
import moment from "moment";
import { required, maxLength  } from "vuelidate/lib/validators";

export default {
  name: "inviteCustomerIndex",
  components: {
    AppLayout,
    DataTable,
    flatPickr
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
      inviteType: "",
      //socialConnectType: "",
      invitees: "",
      inviteCode: "",
      inviteDate: "",
      inviteContent: "",
      fileError: false,
    // importFile: "",
      uuid: "",
      rows: [],
      columns: [
        {
          label: "Invitees",
          name: "invitee",
          filter: {
            type: "simple",
            placeholder: "Invitee",
            showClearButton: false
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
          visibility: false,
          placeholder: "Search",
          showClearButton: false
        }
      },
      dateConfig: {
        wrap: true,
        minDate: "today"
      }
    }
  },
  validations: {
    inviteType: {
      required,
    },
    /*socialConnectType: {
      required,
    },*/
    inviteCode: {
      required,
    },
    inviteDate: {
      required
    },
    rows: {
      required
    },
    inviteContent: {
      required
    }
  },
  methods: {
    addInvitee() {
        let invitee = { invitee: this.invitees };
        if(!(this.rows.some(e => e.invitee == this.invitees))) {
            this.rows.push(invitee);
        }
    },
    handleFileUpload(){
      this.fileError = false;
      this.importFile = this.$refs.file.files[0];
      if(this.importFile && this.importFile['type']!=='text/csv') {
        this.fileError = true;
      }
    },
    submit() {
      this.$v.$touch();
      if(!this.$v.$invalid) {
        let postJson = {
          inviteType: this.inviteType,
          //socialConnectType: this.socialConnectType,
          inviteCode: this.inviteCode,
          inviteDate: (this.inviteDate != "" && this.inviteDate != null)?(moment(this.inviteDate).format("YYYY-MM-DD[T]HH:mm:ss.SSS") + "Z"):"",
          inviteContent: this.inviteContent,
          invitingUuid: this.uuid,
          invitees: []
        }

        this.rows.forEach((ele) => {
            postJson.invitees.push(ele.invitee);
        });

        let storeAction = "";
        storeAction = "invite/create";
        let cachescope = this;
        this.$store.dispatch(storeAction, postJson).then(function(res) {
         cachescope.$toast.open({
              message: "Customer invite success",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
        }).catch(function(err){
          cachescope.submitStatus = "IDLE";
          cachescope.$toast.open({
              message: "Invite customer failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
        });
        cachescope.$router.push({ path: `/merchantcustomer` });
      }

    },
    handleCancel() {
       this.$router.push({ path: `/merchantcustomer` });
    }
  },
  mounted() {
    this.uuid = this.$store.getters["account/getuseruuid"];
  }


};
</script>
