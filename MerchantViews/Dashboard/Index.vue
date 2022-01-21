<template>
  <app-layout>
    <div class="home_content_container">
        <div class="row align-items-center">
            <!--<div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
                    </ol>
                </nav>
            </div>-->
        </div>
        <div class="form-section pt-3">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h2 class="mb-0"><i class="fa fa-bar-chart"></i>Dashboard</h2>
              </div>
              <div class="card-body px-0 row" style="padding-top:0px;">
                <div class="col-md-8">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="comp" v-if="!isLoading">
                        <div>
                          <Profile :id="partnerId"></Profile>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col-md-12">
                      <div class="comp" v-if="!isLoading">
                        <div>
                          <Search :id="partnerId"></Search>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div>
                    <Charts :id="partnerId"></Charts>
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
.input-group i {
  cursor: pointer;
}

.comp .card{
   border: 1px solid #34b8df!important;
   border-radius: 0px;
   height: 515px;
}
</style>

<script>
import AppLayout from '@/layouts/Merchant.vue';
import Loading from 'vue-loading-overlay';
import $ from "jquery";
import DebugMixin from "@/mixins/debug";
const Profile = () => import('@/components/Merchant/Dashboard/Profile');
const Search = () => import('@/components/Merchant/Dashboard/Search');
const Charts = () => import('@/components/Merchant/Dashboard/Charts');


export default {
  name: 'DashboardIndex',
  components: {
    AppLayout,
    Loading,
    Profile,
    Search,
    Charts
  },
  mixins: [DebugMixin],
  data: function() {
    return {
      partnerId: "",
      loadingbgcolor : '#0069d9',
      isLoading: false
    };
  },
  methods: {
  },
  mounted() {
    $(".nav-dashboard").addClass("active");

    this.partnerId  = this.$store.getters["account/getuserid"];

    if(this.partnerId != undefined && this.partnerId != "") {
        return;
    }
  }
};
</script>
