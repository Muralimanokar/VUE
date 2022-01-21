<template>
  <app-layout>
    <div class="managemerchant_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'pos.index' }">Manage POS</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Add POS</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Add POS</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">POS Name</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" value="">
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">POS Type</label>
                                <div class="col-sm-6">

                                    <select class="form-control">
                                        <option>Select</option>
                                    </select>
                                </div>
                              </div>
                         </div>
                          <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">URl</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" value="">
                                </div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Address Line1</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" value="">
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">City</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" value="">
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Province</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" value="">
                                </div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Country</label>
                                <div class="col-sm-6">
                                    <select class="form-control">
                                        <option>Select</option>
                                    </select>
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Zip/Postal Code</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" value="">
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Province</label>
                                <div class="col-sm-6">
                                  <div class="input-group"><div class="input-group-prepend"><button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-outline-secondary dropdown-toggle">+91</button><div class="dropdown-menu"><a href="#" class="dropdown-item">+90</a><a href="#" class="dropdown-item">+80</a><a href="#" class="dropdown-item">+12</a></div></div><input type="text" aria-label="Text input with dropdown button" class="form-control"></div>
                                </div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Email</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" value="">
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Currency</label>
                                <div class="col-sm-6">
                                     <select class="form-control">
                                        <option>Select</option>
                                    </select>
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">APIKey</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" value="">
                                </div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Password</label>
                                <div class="col-sm-6">
                                    <input type="password" class="form-control" value="">
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Status</label>
                                <div class="col-sm-6">
                                    <div class="custom-control custom-switch"><input type="checkbox" id="chk_15836853" class="custom-control-input"><label for="chk_15836853" class="custom-control-label"></label></div>
                                </div>
                              </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
        <div>
            <div class="d-flex mb-5">
                <button type="button" class="btn btn-success">Submit</button>
                <button type="button" class="btn btn-danger">Cancel</button>
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
export default {
  name: "ManageRules",
  components: {
    AppLayout
  },
  data: function() {
    return {};
  },
  mounted() {
    $(".nav-merchant").addClass("active");
    $("#togglePassword").click(function() {
      var stype =
        $("#txtpassword").attr("type") == "password" ? "text" : "password";
      $("#txtpassword").attr("type", stype);
      $(this).toggleClass("fa-eye-slash");
    });
  }
};
</script>
