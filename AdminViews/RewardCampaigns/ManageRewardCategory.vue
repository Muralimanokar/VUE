<template>
  <app-layout>
    <div class="managemerchant_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'rewardcategory.index' }">Reward Category</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page" v-if="action=='edit'">Edit Rewards Category</li>
                        <li class="breadcrumb-item active" aria-current="page" v-else>Add Rewards Category</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0" v-if="action=='edit'"><i class="icon
                            icon-rewardcampaigns"></i> Edit Rewards Category</h2>
                    <h2 class="mb-0" v-else><i class="icon
                            icon-rewardcampaigns"></i> Add Rewards Category</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.name.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Name *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="$v.name.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.name.$error && !$v.name.required">Please enter reward category name</div>
                                <div class="error col-sm-12 text-right" v-if="$v.name.$error && !$v.name.maxLength">Maximum allowed length is 20 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.name.$error && !$v.name.regex">Please enter a valid name</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.businessType.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Business Type *</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.businessType.$model">
                                        <option value="" selected>Select</option>
                                        <option value="RETAIL">Retail</option>
                                        <option value="TRAVEL">Travel</option>
                                        <option value="MEDICAL">Medical</option>
                                        <option value="GOVERNMENT">Government</option>
                                        <option value="BANKING">Banking</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.businessType.$error && !$v.businessType.required">Please select a business type</div>
                              </div>
                         </div>
                          <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Status</label>
                                <div class="col-sm-6">
                                    <div class="custom-control custom-switch">
                                      <input type="checkbox" id="customSwitch2" class="custom-control-input"
                                       v-model="$v.isActive.$model">
                                      <label for="customSwitch2" class="custom-control-label"></label>
                                    </div>
                                </div>
                              </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
        <div>
            <div class="d-flex mb-5">
              <button type="button" class="btn btn-success" @click="handleSubmit">Submit</button>
              <button type="button" class="btn btn-danger" @click="handleCancel">Cancel</button>
            </div>
        </div>
    </div>
  </app-layout>
</template>

<style>
.input-group i {
  cursor: pointer;
}

</style>

<script>
import AppLayout from "@/layouts/Admin.vue";
import $ from "jquery";
import DebugMixin from '@/mixins/debug';
import { required, maxLength, numeric, helpers, regex } from "vuelidate/lib/validators";
export default {
  name: "ManageRewardCategory",
  components: {
    AppLayout
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
      action: "create",
      id : null,
      name: "",
      businessType: "",
      isActive: true,
      isLoading: true
    };
  },
  validations: {
    name: {
      required,
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
      maxLength: maxLength(20)
    },
    businessType: {
      required
    },
    isActive: {
      required,
    }
  },
  methods: {
    getRewardCategoryInfo(id) {
      let cachescope = this;
      let dataobj={
        id:this.id,
        partnerId:this.partnerId
      }
      this.$store.dispatch("reward/getCategory", dataobj).then(function(res) {
       // cachescope.myDebug(JSON.stringify(res));
       console.log("123455",res)
        cachescope.name = res.data[0].name;
        cachescope.businessType = res.data[0].businessType;
        cachescope.isActive = res.data[0].isActive;
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Reward category edit failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/rewardcategory` });
      });
    },
    handleSubmit() {
      if(this.isFormValid()) {
        let postJson = {
          name: this.name,
          businessType: this.businessType,
          isActive: this.isActive
        }

        let storeAction = "";

        this.isLoading = true;
        let cachescope = this;

        if(this.action == "create") {
          storeAction = "reward/createCategory";

          this.$store.dispatch(storeAction, postJson).then(function(res) {
          cachescope.$toast.open({
              message: "Reward Category created successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.$router.push({ path: `/rewardcategory` });
        }).catch(function(err){
          cachescope.isLoading = false;
          cachescope.$toast.open({
              message: "Reward category creation failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
        });
        } else if(this.action == "edit") {
          postJson.id = this.id;
          storeAction = "reward/updateCategory";

          this.$store.dispatch(storeAction, postJson).then(function(res) {
          cachescope.$toast.open({
              message: "Reward Category Updated successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.$router.push({ path: `/rewardcategory` });
        }).catch(function(err){
          cachescope.isLoading = false;
          cachescope.$toast.open({
              message: "Reward category Updated failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
        });
        } else {
            this.myDebug("Invalid action");
            return;
        }
      }
    },
    handleCancel() {
      this.$router.push({ path: `/rewardcategory` });
    },
    isFormValid() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    $(".nav-reward").addClass("active");
     let cache_obj = this;
    cache_obj.partnerId  = this.$store.getters["account/getuserid"];
   
    if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }
      if(this.action == "edit" && Object.prototype.hasOwnProperty.call(obj, 'rewardcategory')) {
        this.id = this.$route.query.rewardcategory;
      }
    }

    if((this.action == "edit") && (this.id != undefined)) {
        this.getRewardCategoryInfo(this.id);
    }
  }
};
</script>
