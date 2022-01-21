<template>
    <div class="row" :dtName="'earnList'">
        <div class="col-md-3">
            <div style="padding:10px 0px;">
            <div class="card">
                <div class="card-header" style="background: #188ae2;">
                    <h2 class="mb-0" style="font-size:13px;">Profile Details</h2>
                </div>
                <div class="card-body px-0" style="padding-top:0px;">
                    <ul class="profile_details_list">
                        <li>Name: <span>{{customer.username}}</span></li>
                        <li>Current Tier: <span>{{customer.tierName}}</span></li>
                        <li>Loyalty card number: <span v-for="(card,idx) in customer.loyaltyCardNumber" :key="card"><br>Card {{idx + 1}}: {{card}}</span></li>
                        <li>Email Address: <span>{{customer.emailId}}</span></li>
                        <li>Phone Number: <span>{{customer.mobileNum}}</span></li>
                    </ul>
                </div>
                </div>    
            </div>
        </div> 
        <div class="col-md-5">
            <div style="padding:10px;">
            <div class="card">
                <div class="card-header" style="background: #188ae2;">
                    <h2 class="mb-0" style="font-size:13px;">Loyalty Summary</h2>
                </div>
                <div class="card-body px-0" style="padding-top:0px;">
                    <div class="profile_details_summary">
                        <div class="row" style="padding:10px;">
                            <div class="col-md-4">
                                <label>Earned Points</label><br>
                                <span style="background:#50B9DF">{{points.earnedPoints}}</span>
                            </div>
                            <div class="col-md-4">
                                <label>Active Points</label><br>
                                <span style="background:#64C56B">{{points.activePoints}}</span>
                            </div>
                        </div>
                        <div class="row" style="padding:10px;">
                            <div class="col-md-4">
                                <label>Points used</label><br>
                                <span style="background:#2B8AE2">{{points.pointsUsed}}</span>
                            </div>
                            <div class="col-md-4">
                                <label>Expired points</label><br>
                                <span style="background:#EA5757">{{points.expiredPoints}}</span>
                            </div>
                            <div class="col-md-4">
                                <label>Blocked points</label><br>
                                <span style="background:#E53D32">{{points.blockedPoints}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>    
            </div>
        </div>
    </div>
</template>
<style>
.profile_details_list{
    list-style: none;
    padding: 0px;
    margin: 0px;
    font-size: 13px;
}
.profile_details_list li{
  padding: 10px;
  padding-right: 0px;
}
.profile_details_list span{
    font-weight: 600;
}
.profile_details_summary label{
    font-size: 13px;
}
.profile_details_summary span{
    font-weight: 600;
    padding: 5px;
    font-size: 20px;
}
</style>
<script>
import Vue from "vue";
import DebugMixin from '@/mixins/debug';
import "vue-loading-overlay/dist/vue-loading.css";
import $ from "jquery";
export default {
  name: "SegmentIndex",
  components: {
  },
  mixins: [
    DebugMixin,
  ],
  props: [
    'customer',
    'points'
  ],
  data: function() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  }
};
</script>
