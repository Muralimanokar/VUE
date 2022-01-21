<template>
    <header class="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-light bg-light p-0 flex-wrap">
            <div class="w-100 header-top-sec">
                <div class="container-fluid">
                    <div class="d-flex w-100 justify-content-between align-items-center">
                       <!-- <a class="navbar-brand" href="#">-->
                           <a class="navbar-brand">
                                    <img
                                        src="../../assets/images/claritysso-points.png"
                                        alt=""
                                        />
                          </a>
                          <div class="d-flex justify-content-between align-items-center">
                            <ul class="list-unstyled d-flex m-0 header-top-menu">
                                <!--<li><i class="fa fa-search"
                                        aria-hidden="true"></i></li>
                                <li><i class="fa fa-bell"
                                        aria-hidden="true"></i></li>
                                <li>
                                     <router-link :to="{ name: 'programconfigure.index' }"><i class="fa fa-cog"
                                        aria-hidden="true"></i></router-link>
                                </li>
                                <li><i class="fa fa-th"
                                        aria-hidden="true"></i></li>-->
                            </ul>
                            <button class="navbar-toggler" type="button"
                                data-toggle="collapse"
                                data-target="#navbarNav"
                                aria-controls="navbarNav"
                                aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                          </div>
                    </div>
                    <div class="collapse navbar-collapse w-100" id="navbarNav">
                        <div class="header-btm-menu w-100">
                            <div class="container-fluid">
                            <ul class="navbar-nav" >
                                <router-link v-if="customers== true" 
                                    :to="{ name: 'customer.index' }"
                                    active-class="active"
                                    class="nav-item nav-customer"
                                    tag="li"
                                >
                                <a class="nav-link" href="#" style="padding:10px 30px 10px 20px">
                                    <span class="d-block text-center menuicon"><i class="icon icon-customer" aria-hidden="true"></i></span>
                                    Customer
                                </a>
                                </router-link>
                                <router-link
                                    :to="{ name: 'tiers.index' }"
                                    active-class="active"
                                    class="nav-item nav-tiers"
                                    tag="li"
                                >
                                <a class="nav-link" href="#" style="padding:10px 30px 10px 20px">
                                        <span class="d-block text-center menuicon"><i class="icon icon-tier" aria-hidden="true"></i></span>
                                        Tiers</a>
                                </router-link>
                                <router-link
                                    :to="{ name: 'pointstransfer.index' }"
                                    active-class="active"
                                    class="nav-item nav-transfer"
                                    tag="li"
                                >
                                <a class="nav-link" href="#" style="padding:10px 30px 10px 20px">
                                        <span class="d-block text-center menuicon"><i class="icon icon-pointtransfer" aria-hidden="true"></i></span>
                                        Points Transfers</a>
                                </router-link>
                                <router-link
                                    :to="{ name: 'transaction.index' }"
                                    active-class="active"
                                    class="nav-item nav-transaction"
                                    tag="li"
                                >
                                <a class="nav-link" href="#"  style="padding:10px 30px 10px 20px">
                                        <span class="d-block text-center menuicon"><i class="icon icon-transactions" aria-hidden="true"></i></span>
                                        Transactions</a>
                                </router-link>
                                <router-link
                                    :to="{ name: 'earningrule.index' }"
                                    active-class="active"
                                    class="nav-item  nav-earningrule"
                                    tag="li"
                                >
                                <a class="nav-link" href="#"  style="padding:10px 30px 10px 20px">
                                        <span class="d-block text-center menuicon"><i class="icon icon-earningrules" aria-hidden="true"></i></span>
                                        Earning rules</a>
                                        <ul class="dropdown-menu" style="top:72px;left: -10px;display:none;" aria-labelledby="navbarDropdownMenuLink">
                                            <li>
                                                <router-link :to="{ name: 'earningrule.index' }" class="dropdown-item">Earning Rule Template</router-link>
                                            </li>
                                            <li>
                                                <router-link :to="{ name: 'rule.index' }" class="dropdown-item">Manage Rules</router-link>
                                            </li>
                                       </ul>
                                </router-link>
                                <router-link
                                    :to="{ name: 'merchant.index' }"
                                    active-class="active"
                                    class="nav-item nav-merchant"
                                    tag="li"
                                >
                                    <a class="nav-link" href="#" style="padding:10px 30px 10px 20px">
                                            <span class="d-block text-center menuicon"><i class="icon icon-merchants" aria-hidden="true"></i></span>
                                            Merchants</a>
                                    <!--ul class="dropdown-menu" style="top:72px;left: -10px;" aria-labelledby="navbarDropdownMenuLink">
                                            <li style="display:none;">
                                                <router-link :to="{ name: 'merchant.index' }" class="dropdown-item">Manage Merchants</router-link>
                                            </li>
                                            <li style="display:none;">
                                                 <router-link :to="{ name: 'pos.index' }" class="dropdown-item">Manage POS</router-link>
                                            </li>
                                    </!--ul-->
                                </router-link>
                                <router-link
                                    :to="{ name: 'segment.index' }"
                                    active-class="active"
                                    class="nav-item nav-segment"
                                    tag="li"
                                >
                                 <a class="nav-link" href="#" style="padding:10px 30px 10px 20px">
                                        <span class="d-block text-center menuicon"><i class="icon icon-segments" aria-hidden="true"></i></span>
                                        Segments</a>
                                </router-link>
                                <router-link
                                    :to="{ name: 'rewardcampaign.index' }"
                                    active-class="active"
                                    class="nav-item nav-reward"
                                    tag="li"
                                >
                                <a class="nav-link" href="#" style="padding:10px 30px 10px 20px">
                                        <span class="d-block text-center menuicon"><i class="icon icon-rewardcampaigns" aria-hidden="true"></i></span>
                                        Reward campaigns</a>
                                      <ul class="dropdown-menu" style="top:72px;left: -10px;" aria-labelledby="navbarDropdownMenuLink">
                                            <li>
                                                <router-link :to="{ name: 'rewardcampaign.index' }" class="dropdown-item">Reward campaigns</router-link>
                                            </li>
                                            <li>
                                                <router-link :to="{ name: 'redeem.index' }" class="dropdown-item">Redeemed rewards</router-link>
                                            </li>
                                            <li>
                                                <router-link :to="{ name: 'rewardcategory.index' }" class="dropdown-item">Campaign categories</router-link>
                                            </li>
                                       </ul>
                                </router-link>
                            </ul>
                            <div>
                                <div class="profile-icon m-0 dropdown">
                                    <a href="#" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img
                                            src="../../assets/images/favicon.png"
                                            alt=""
                                            />
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-md-right" aria-labelledby="dropdownMenu2">
                                        <router-link :to="{ name: 'admin.index' }" class="dropdown-item">Admin</router-link>
                                        <router-link :to="{ name: 'roles.index' }" class="dropdown-item">Role Management</router-link>
                                        <router-link :to="{ name: 'programconfigure.index' }" class="dropdown-item">Program Configuration</router-link>
                               <router-link :to="{ name: 'resetpassword.index' }" class="dropdown-item">Reset Password</router-link>
                              <!-- <router-link :to="{ name: 'verification.index' }" class="dropdown-item">Verification</router-link>-->
                
                                        <a class="dropdown-item" href="#"  @click.prevent="logout">Logout</a>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
  name: "AdminHeader",
    data: function() {
    return {
      isLoading : true,
      loadingbgcolor : '#0069d9',
      customers:false,
    };
    },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  },
  mounted(){
      let cache_obj=this;
            cache_obj.userRoles  = this.$store.getters["account/getuserroles"];
      console.log("che ck", cache_obj.userRoles);
             cache_obj.role=cache_obj.userRoles[0].resourcePrivilegeDtoList
      console.log("role check",cache_obj.role);
       var i;
       for(i=0;i<cache_obj.role.length;i++)
      {
        let val;
       // console.log("check the roles");
        if(cache_obj.role[i].resourceName=='customers'){
             cache_obj.customers=true;
        }


       /* if( cache_obj.add==true){
          console.log("checkif")
          $("").hide();
        }*/
      }

  }
};
</script>