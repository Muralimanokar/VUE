<template>
  <app-layout>
    <div class="managemerchant_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'merchantearningrules.index' , query: { 'templateid' : ruleTemplateId , 'partnerId' : partnerId }}">Earning Rules</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page" v-if="action=='edit'">Edit Rule</li>
                        <li class="breadcrumb-item active" aria-current="page" v-else>Add Rules</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Basic Details</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.ruleTemplateId.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Template Name *</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model="$v.ruleTemplateId.$model">
                                        <option value="">Select</option>
                                        <option v-for="row in templateList" :value="row.id" v-bind:key="row.id">{{row.name}}</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.ruleTemplateId.$error && !$v.ruleTemplateId.required">Please select the Category</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.category.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Category *</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model="$v.category.$model">
                                        <option value="">Select</option>
                                        <option value="TRANSACTIONAL">TRANSACTIONAL</option>
                                        <!--<option value="EVENTS">EVENTS</option>-->
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.category.$error && !$v.category.required">Please select the Template Name</div>
                              </div>
                         </div>
                          <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Description</label>
                                <div class="col-sm-6">
                                    <textarea class="form-control" v-model="description"></textarea>
                                </div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.name.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Name *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model="$v.name.$model"
                                    
                                    >
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.name.$error && !$v.name.required">Please Enter the Name</div>
                                <!-- <div class="error col-sm-12 text-right" v-if="$v.name.$error && !$v.name.regex">Please Enter the Valid Name</div>-->
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.ruleType.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Type *</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model="$v.ruleType.$model" @change="handleAddRule()">
                                        <option value="">SELECT</option>
                                        <option value="GENERAL">GENERAL</option>
                                        <option value="PRODUCT_PURCHASE">PRODUCT_PURCHASE</option>
                                       <!-- <option value="MULTIPLY_EARNED_REWARDS">MULTIPLY_EARNED_REWARDS</option>
                                        <option value="INSTANT_REWARD">INSTANT_REWARD</option>
                                        <option value="DEBUT_PURCHASE">DEBUT_PURCHASE</option>
                                        <option value="GEO_LOCATION">GEO_LOCATION</option>-->

                                        <!--<option value="REFERRAL">REFERRAL</option>
                                        <option value="ACCOUNT_SIGN_UP">ACCOUNT_SIGN_UP</option>
                                        
                                        <option value="NEWS_LETTER_SUBSCRIPTION">NEWS_LETTER_SUBSCRIPTION</option>
                                        <option value="QR_CODE">QR_CODE</option>-->
                                    </select>
                                </div>
                                 <div class="error col-sm-12 text-right" v-if="$v.ruleType.$error && !$v.ruleType.required">Please Select the Type</div>
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
                            icon-rewardcampaigns"></i> Rule Details</h2>
                 </div>
                 <div class="card-body px-0">
                     <!--div class="row" style="display:none;">
                         <div class="col-md-6">
                             <div class="form-group row">
                                <label for="name" class="col-sm-4
                                    col-form-label text-right">Rule Type</label>
                                <div class="col-sm-6" :class="{ 'form-group--error': ruleTypeerror }">
                                    <select class="form-control" style="width:160px;float:left;" ref="selrulecollectiontype">
                                        <option value="">Select</option>
                                        <option value="General">General</option>
                                        <option value="Specific Product Purchase">Specific Product Purchase</option>
                                        <option value="Multiply Earned points">Multiply Earned points</option>
                                        <option value="Instant reward">Instant reward</option>
                                        <option value="Referral">Referral</option>
                                        <option value="Account Signup">Account Signup</option>
                                        <option value="Debut purchase">Debut purchase</option>
                                        <option value="Newsletter subscription">Newsletter subscription</option>
                                        <option value="QR Code">QR Code</option>
                                    </select>
                                    <input type="button" value="Add Rule" style="float:right;" @click="handleAddRule()"/>
                                </div>
                              </div>
                         </div>
                     </!--div-->
                     <div class="row" >
                         <div class="col-md-12">
                           <table class="table table-bordered">
                                <tr v-for="row in rulecollection" v-bind:key="row.id">
                                    <td  style="width:100%;">
                                        <div class="row" v-if="row['name'] === 'GENERAL'">
                                             <div class="col-3">
                                                <div class="form-group row" style="margin-bottom:0px;" :class="{ 'form-group--error': !row['condition'].points }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right">Points *</label>
                                                    <div class="col-sm-6">
                                                        <input type="number" min="0" oninput="validity.valid||(value='');" class="form-control" v-model="row['condition'].points"/>
                                                    </div>
                                                </div>
                                             </div>
                                             <div class="col-3">
                                                <div class="form-group row" style="margin-bottom:0px;" :class="{ 'form-group--error': !row['condition'].minimumOrderValue }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right">Minimum order value *</label>
                                                    <div class="col-sm-6">
                                                        <input type="number" min="0" oninput="validity.valid||(value='');" class="form-control" v-model="row['condition'].minimumOrderValue">
                                                    </div>
                                                </div>
                                             </div>
                                         </div>

                                         <div class="row" v-else-if="row['name'] === 'PRODUCT_PURCHASE'">                        
                                             <div class="col-3">
                                                <div class="form-group row" style="margin-bottom:0px;" :class="{ 'form-group--error': !row['condition'].pointsValueToEarn }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right">Points value to earn</label>
                                                        <!--<div class="col-sm-6">-->
                                                   <div class="col-sm-6" @change="handleInstantRewardchange($event)">
                                                        <select class="form-control" v-model="row['condition'].pointsValueToEarn"   >
                                                            <option value=null disabled selected hidden>Select</option>
                                                            <option value="Fixed">Fixed</option>
                                                            <option value="PercentageInProductValues">Percentage in Product values</option>
                                                        </select>
                                                    </div>
                                                       <!-- </div>-->
                                                </div>
                                            </div>
                                               <!--<div  class="form-group row" style="margin-bottom:0px;" :class="{ 'form-group--error': !row['condition'].points }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right">points *</label>
                                                    <div class="col-sm-6">
                                                        <input type="number"  min="1" oninput="validity.valid||(value='');" class="form-control" v-model="row['condition'].points" >
                                                    </div></div>-->
                                           <div>
                                           <div v-for="row in collection" v-bind:key="row.id">
                                                <div   v-if="row['condition'].pointsValueToEarn === 'Fixed' " >
                                               
                                               <div  class="form-group row" style="margin-bottom:0px;" :class="{ 'form-group--error': !row['condition'].points }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right">points *</label>
                                                    <div class="col-sm-6">
                                                        <input type="number"  min="1" oninput="validity.valid||(value='');" class="form-control" v-model="row['condition'].points" >
                                                    </div></div>
                                            
                                              </div>
                                             <div class="row" v-else-if="row['condition'].pointsValueToEarn === 'PercentageInProductValues'" >            
                                            
                                         
                                                  
                                                <div class="col-6 form-group row" style="margin-bottom:0px;" :class="{ 'form-group--error': !row['condition'].percentage }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right"> percentage *</label>
                                                    <div class="col-sm-6">
                                                        <input type="number" min="1" oninput="validity.valid||(value='');" class="form-control" v-model="row['condition'].percentage">
                                                    </div>
                                                 </div>
                                        
                                                  <div class="col-6 form-group row" style="margin-bottom:0px;" >
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right">Maximum Points</label>
                                                    <div class="col-sm-6">
                                                        <input type="number" min="1" oninput="validity.valid||(value='');" class="form-control" v-model="row['condition'].maximumPoints">
                                                    </div>
                                                </div>

                                                
                                               </div>
                                             </div> 
                                           </div>

                                         </div>

                                         <div class="row" v-else-if="row['name'] === 'MULTIPLY_EARNED_REWARDS'">
                                             <div class="col-3">
                                                <div class="form-group row" style="margin-bottom:0px;" :class="{ 'form-group--error': !row['condition'].multiplier }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right" style="padding-right: 5px;">Multiplier(X)</label>
                                                    <div class="col-sm-6">
                                                        <input type="text" class="form-control" v-model="row['condition'].multiplier"/>
                                                    </div>
                                                </div>
                                             </div>
                                         </div>

                                         <div class="row" v-else-if="row['name'] === 'INSTANT_REWARD'">
                                             <div class="col-3">
                                                <div class="form-group row" style="margin-bottom:0px;" :class="{ 'form-group--error': !row['condition'].rewardType }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right" style="padding-right: 5px;">Reward Type</label>
                                                    <div class="col-sm-6">
                                                        <select class="form-control"  v-model="row['condition'].rewardType">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                             </div>
                                         </div>

                                         <div class="row" v-else-if="row['name'] === 'REFERRAL'">
                                             <div class="col-3">
                                                <div class="form-group row" style="margin-bottom:0px;"  :class="{ 'form-group--error': !row['condition'].name }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right" style="padding-right: 5px;">Name</label>
                                                    <div class="col-sm-6">
                                                        <input type="text" class="form-control" v-model="row['condition'].name">
                                                    </div>
                                                </div>
                                             </div>
                                             <div class="col-3">
                                                <div class="form-group row" style="margin-bottom:0px;" :class="{ 'form-group--error': !row['condition'].eventCode }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right" style="padding-right: 5px;">Event Code</label>
                                                    <div class="col-sm-6">
                                                        <input type="text" class="form-control" v-model="row['condition'].eventCode">
                                                    </div>
                                                </div>
                                             </div>
                                             <div class="col-3">
                                                <div class="form-group row" style="margin-bottom:0px;" :class="{ 'form-group--error': !row['condition'].points }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right" style="padding-right: 5px;">Points</label>
                                                    <div class="col-sm-6">
                                                        <input type="number" min="0" oninput="validity.valid||(value='');" class="form-control" v-model="row['condition'].points">
                                                    </div>
                                                </div>
                                             </div>
                                             <div class="col-3">
                                                <div class="form-group row" style="margin-bottom:0px;">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right" style="padding-right: 5px;">Limit per customer</label>
                                                    <div class="col-sm-6">
                                                        <input type="number" min="0" oninput="validity.valid||(value='');" class="form-control" v-model="row['condition'].limitPerCustomer">
                                                    </div>
                                                </div>
                                             </div>
                                         </div>

                                         <div class="row" v-else-if="row['name'] === 'ACCOUNT_SIGN_UP' || row['name'] === 'DEBUT_PURCHASE' || row['name'] === 'NEWS_LETTER_SUBSCRIPTION'">
                                             <div class="col-3">
                                                <div class="form-group row" style="margin-bottom:0px;" :class="{ 'form-group--error': !row['condition'].points }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right" style="padding-right: 5px;">Points</label>
                                                    <div class="col-sm-6">
                                                        <input type="number" min="0" oninput="validity.valid||(value='');" class="form-control" v-model="row['condition'].points">
                                                    </div>
                                                </div>
                                             </div>
                                         </div>
                                        <div class="row" v-else-if="row['name'] === 'GEO_LOCATION'">
                                             <div class="col-3">
                                                <div class="form-group row" style="margin-bottom:0px;" :class="{ 'form-group--error': !row['condition'].points }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right" style="padding-right: 5px;">Points *</label>
                                                    <div class="col-sm-6">
                                                        <input type="number" min="1" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" class="form-control" v-model="row['condition'].points">
                                                    </div>
                                                </div>
                                              </div>
                                             <div class="col-3">
                                                <div class="form-group row" style="margin-bottom:0px;" :class="{ 'form-group--error': !row['condition'].address }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right" style="padding-right: 5px;">Address *</label>
                                                    <div class="col-sm-6">
                                                         <input type="text" class="form-control" v-model="row['condition'].address">
                                                    </div>
                                                </div>
                                             </div>
                                         </div>


                                         <div class="row" v-else-if="row['name'] === 'QR_CODE'">
                                             <div class="col-3">
                                                <div class="form-group row" style="margin-bottom:0px;" :class="{ 'form-group--error': !row['condition'].code }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right" style="padding-right: 5px;">Code</label>
                                                    <div class="col-sm-6">
                                                        <input type="text" class="form-control" v-model="row['condition'].code">
                                                    </div>
                                                </div>
                                             </div>
                                             <div class="col-3">
                                                <div class="form-group row" style="margin-bottom:0px;" :class="{ 'form-group--error': !row['condition'].points }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right" style="padding-right: 5px;">Points</label>
                                                    <div class="col-sm-6">
                                                        <input type="number" min="0" oninput="validity.valid||(value='');" class="form-control" v-model="row['condition'].points">
                                                    </div>
                                                </div>
                                             </div>
                                             <div class="col-3">
                                                <div class="form-group row" style="margin-bottom:0px;" :class="{ 'form-group--error': !row['condition'].limitPerCustomer }">
                                                    <label for="name" class="col-sm-6
                                                        col-form-label text-right" style="padding-right: 5px;">Benefits</label>
                                                    <div class="col-sm-6">
                                                         <input type="text" class="form-control" v-model="row['condition'].limitPerCustomer">
                                                    </div>
                                                </div>
                                             </div>
                                         </div>
                                        <div class="row" v-else>
                                             <div class="col-12">
                                                <div class="form-group row" style="margin-bottom:0px;">
                                                    <span class="col-sm-6">Please select 'Type' to provide rule details.</span>
                                                </div>
                                             </div>
                                         </div>

                                    </td>
                                </tr>
                           </table>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
         <div class="form-section">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Target</h2>
                 </div>
                <div class="card-body px-0">
                     <div class="row">
                        <!-- <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">POS</label>
                                <div class="col-sm-6">
                                   <select class="form-control" v-model="pos">
                                        <option>Select</option>
                                    </select>
                                </div>
                              </div>
                         </div>-->
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.tier.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Tiers </label>
                                <div class="col-sm-6">
                                   <multiselect
                                     open-direction="bottom"
                                        :multiple="true"
                                        :searchable="true"
                                        :internal-search="false"
                                        :options-limit="300"
                                        :max-height="600"
                                        :show-no-results="false"
                                        :show-labels="false"
                                        :hide-selected="false"
                                        :preserve-search="true"

                                         :options="tierList"
                                         :close-on-select="true"
                                         :clear-on-select="false"
                                         placeholder="Select one"
                                         label="name"
                                         track-by="name"
                                         v-model="$v.tier.$model"
                                          >
                               </multiselect>
                                </div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.segment.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Segments </label>
                                <div class="col-sm-6">
                                      <multiselect
                                     open-direction="bottom"
                                        :multiple="true"
                                        :searchable="true"
                                        :internal-search="false"
                                        :options-limit="300"
                                        :max-height="600"
                                        :show-no-results="false"
                                        :show-labels="false"
                                        :hide-selected="false"
                                        :preserve-search="true"

                                         :options="segmentList"
                                         :close-on-select="true"
                                         :clear-on-select="false"
                                         placeholder="Select one"
                                         label="segmentName"
                                         track-by="id"
                                         v-model="$v.segment.$model"
                                          >
                               </multiselect>
                                </div>
                              </div>
                         </div>
                                         <i class="fa fa-info-circle" style="font-size:15px;cursor:pointer;color:#00BFFF" aria-hidden="true" title=" Segment will be updated only at every 15mins once"></i>

                     </div>
                 </div>
            </div>
        </div>
         <div class="form-section">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i>Expiry</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         
                         <!--<div v-if="neverExpires != true" class="col-md-4">-->

                         <!--</div>-->
                             <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Never Expires</label>
                                <div class="col-sm-6">
                                     <input type="checkbox" class="form-control" v-model="neverExpires" style="width: 20px;">
                                </div>
                                
                              </div>
                         </div>
                      <!--  <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Points Expires</label>
                                <div class="col-sm-6  input-group">
                                    <flat-pickr class="form-control" v-model="pointsExpiry" :config="pointsExpiryDateConfig">
                                    </flat-pickr>
                                    <div class="input-group-append">
                                        <div class="input-group-text" title="Toggle" data-toggle>
                                        <i class="fa fa-calendar" aria-hidden="true"></i>
                                        </div>
                                   </div>
                                </div>
                              </div>
                         </div>-->
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Start Date</label>
                                <div class="col-sm-6 input-group">
                                    <flat-pickr class="form-control" style="background-color:white;" v-model="startDate" :config="startDateConfig" @on-open="handlemindate()" @on-change="setMinEndDate()">
                                    </flat-pickr>
                                    <div class="input-group-append">
                                        <div class="input-group-text" title="Toggle" data-toggle>
                                        <i class="fa fa-calendar" aria-hidden="true"></i>
                                        </div>
                                   </div>
                                </div>
                              </div>
                         </div>
                            <div v-if="neverExpires != true" class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">End Date</label>
                                <div class="col-sm-6  input-group">
                                    <flat-pickr class="form-control" style="background-color:white;" v-model="endDate" :config="endDateConfig" >
                                    </flat-pickr>
                                    <div class="input-group-append">
                                        <div class="input-group-text" title="Toggle" data-toggle>
                                        <i class="fa fa-calendar" aria-hidden="true"></i>
                                        </div>
                                   </div>
                                                       <i class="fa fa-info-circle" style="font-size:15px;cursor:pointer;color:#00BFFF" aria-hidden="true" title=" Rule will end at time on selected date"></i>
       
                                </div>

                              </div>
                         </div>
                     </div>
                     <div class="row">
                        <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Points Expires</label>
                                <div class="col-sm-6  input-group">
                                    <flat-pickr class="form-control" style="background-color:white;" v-model="pointsExpiry" :config="pointsExpiryDateConfig">
                                    </flat-pickr>
                                    <div class="input-group-append">
                                        <div class="input-group-text" title="Toggle" data-toggle>
                                        <i class="fa fa-calendar" aria-hidden="true"></i>
                                        </div>
                                   </div>
                                </div>
                              </div>
                         </div>
                      <div class="col-md-4">

                             <div class="form-group row" :class="{ 'form-group--error': $v.limit.$error }">

                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Limit Required *</label>
                                <div class="col-sm-6">
                                   <select class="form-control" v-model="limit" @change="handlerule()">
                                       <option value="">Select</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>

                                    </select>
                                </div>
                                 <div class="error col-sm-12 text-right" v-if="$v.limit.$error && !$v.limit.required">Select the Yes or No</div>
                              </div>
                         </div>
                                              
                      <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Set As LastRun</label>
                                <div class="col-sm-6">
                                     <input type="checkbox" class="form-control" v-model="setAsLastRun" style="width: 20px;">
                                </div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                        <div class="col-md-4" id="customer"  style="display:none;">
                             <div class="form-group row" >
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Usage Limit Per customer </label>
                                <div class="col-sm-6">
                                    <input type="number" min="1" oninput="validity.valid||(value='');"  class="form-control" v-model="Usage" @keyup="handlerule()" 
                                   
                                    >
                                </div>

                              </div>

                         </div>
                      
                          <div class="col-md-4" id="number"  style="display:none;">
                             <div class="form-group row" >
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Number of Transactions </label>
                                <div class="col-sm-6">
                                    <input type="number" min="1" oninput="validity.valid||(value='');"   class="form-control" v-model="Transactions" @keyup="handlerule()"  style="border-color:red" 
                                   
                                    >
                                </div>
                              </div>
                         <span class="TWO" id="type2" >Please Enter the any one of the details</span>

                         </div>
                          <div class="col-md-4" id="value"  style="display:none;">
                             <div class="form-group row" >
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Total Transaction Value </label>
                                <div class="col-sm-6">
                                    <input type="number" min="1"    onkeyup="value=value.replace(/^(0+)|[^\d]+[1-9]+\.[0-9]{1-5}/g,'')"    class="form-control" v-model="Value"  @keyup="handlerule()" >
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
                            icon-rewardcampaigns"></i> Match Rules</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                        <!-- <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Product Categories</label>
                                <div class="col-sm-6">
                                    <div class="form-group" style="margin-bottom: 0px;">
                                        <div class="upload-btn-wrapper">
                                          <button class="btn btn-primary">File Upload</button><input type="file" name="filecategory" ref="filecategory" accept=".xlsx, .xls"/>
                                        </div>
                                    </div>
                                </div>
                              </div>
                         </div>-->
                         <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Product Labels</label>
                                <div class="col-sm-6">
                                    <div class="form-group" style="margin-bottom: 0px;">
                                        <div class="upload-btn-wrapper">
                                          <button class="btn btn-primary">File Upload</button><input type="file" name="filelable" ref="filelable" accept="text/csv"/>
                                        </div>
                                       <a class="mx-2 action-icon-btn" title="ProductSampleFile" v-on:click='handleDownloadItem()'>
                              <i class="fa fa-download" style="font-size:30px;cursor:pointer"></i>
                          </a> 
                                    </div>
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                        <button type="button" class="btn btn-primary" style="margin-left:-50px" @click="handleImportRules()">Add</button>
                       <!-- <button type="button" class="btn btn-primary" style="margin-left:30px" @click="handleView()">View</button>-->
                        </div>
                     </div>
                     <div class="row">
                         <!-- <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Excludes</label>
                                <div class="col-sm-6">
                                    <div class="form-group" style="margin-bottom: 0px;">
                                        <div class="upload-btn-wrapper">
                                          <button class="btn btn-primary">File Upload</button><input type="file" name="fileexclude" ref="fileexclude" accept=".xlsx, .xls"/>
                                        </div>
                                    </div>
                                </div>
                              </div>
                         </div>-->
                          <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Status</label>
                                <div class="col-sm-6">
                                    <div class="custom-control custom-switch">  <!--:disabled="action=='Add'"-->
                                        <input type="checkbox" id="chk_15836853" class="custom-control-input" v-model="status">
                                        <label for="chk_15836853" class="custom-control-label"></label>
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
                <button type="button" class="btn btn-success" @click="handleSumbit()">Submit</button>
                <button type="button" class="btn btn-danger" @click="handleCancel()">Cancel</button>
            </div>
        </div>
            <div class="modal fade" id="importModal" tabindex="-1">
        <div class="modal-dialog modal-md">
          <div class="modal-content" style="border-radius: 0px">
            <div class="modal-header">
              <h5 class="modal-title" style="font-size: 16px">
                Add Label
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i class="fa fa-times-circle-o" aria-hidden="true"></i>
              </button>
            </div>
            <div class="modal-body">
           
                <div class="row ">
                  <div class="col-md-12">
                    <div class="form-group row" :class="{ 'form-group--error': $v.account.$error }">
                                                      <label for="name" class="col-md-6
                                    col-form-label text-left" style="margin-bottom:-130px" >Labels</label>
                           <div class="col-md-10" style="margin-left:50px">
                                    <multiselect
                                    class="one"
                                     open-direction="bottom"
                                        :multiple="true"
                                        :searchable="true"
                                        :internal-search="true"
                                        :options-limit="300"
                                        :max-height="200"
                                        :show-no-results="false"
                                        :show-labels="false"
                                        :hide-selected="false"
                                        :preserve-search="true"

                                         :options="sourceAccountList"
                                         @search-change="asyncFind($event, 'DA', 1)"
                                         :close-on-select="true"
                                         :clear-on-select="false"
                                         placeholder="Select one"
                                         label="label"
                                         track-by="id"
                                         v-model="account" >
                                    </multiselect>
                           </div>
                           </div>
                           </div>
                           </div>

                    
                    <div class="row">
                      <div class=" col-md-6">
                      <div class="form-group">
                      <button
                        type="button"
                        class="btn btn-success"
                        @click="submit"
                      >
                        Submit
                      </button>
                      </div>
                      </div>
                  </div>



                </div>
              
            </div>
          </div>
        </div> 
                    <div class="modal fade" id="importModal1" tabindex="-1">
        <div class="modal-dialog modal-md">
          <div class="modal-content" style="border-radius: 0px">
            <div class="modal-header">
              <h5 class="modal-title" style="font-size: 16px">
                View Label
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i class="fa fa-times-circle-o" aria-hidden="true"></i>
              </button>
            </div>
            <div class="modal-body">
           
                <div class="row ">
                  <div class="col-md-12">
                    <div class="form-group row" :class="{ 'form-group--error': $v.testlabel.$error }">
                                                      <label for="name" class="col-md-6
                                    col-form-label text-left" style="margin-bottom:-130px">Labels</label>
                           <div class="col-md-10" style="margin-left:50px">
                                    <multiselect
                                    class="one"
                                     open-direction="bottom"
                                        :multiple="true"
                                        :searchable="true"
                                        :internal-search="true"
                                        :options-limit="300"
                                        :max-height="200"
                                        :show-no-results="false"
                                        :show-labels="false"
                                        :hide-selected="false"
                                        :preserve-search="true"
                                         :options="testlabel"
                                         :close-on-select="true"
                                         :clear-on-select="false"
                                         placeholder=""
                                         label="label"
                                         track-by="id"
                                         v-model="account" >
                                    </multiselect>
                           </div>
                           </div>
                           </div>
                           </div>

                    
                    <div class="row">
                      <div class=" col-md-6">
                      <div class="form-group">
                      <button
                        type="button"
                        class="btn btn-success"
                        @click="submit"
                      >
                        Submit
                      </button>
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
.input-group i {
  cursor: pointer;
}
.test{
    color:red;
}
.managemerchant_container .upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.managemerchant_container .upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.modal-header {
  background: #34b8df;
  border-radius: 0px;
  color: white;
  font-size: 13px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.modal-header .close {
  color: white !important;
  background: transparent;
  font-size: 24px;
  opacity: 1;
}
.one{
    min-height: 0px;
}
.modal-header .close i {
  text-shadow: none;
}
.modal-xl {
  max-width: 1350px !important;
}

.TWO{
color: red;
display: none;
float: right;
margin-top: -10px;

}


</style>

<script>
import AppLayout from "@/layouts/Merchant.vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { validationMixin } from "vuelidate";
import { required, requiredIf , minLength, between, email , numeric , maxLength,helpers} from "vuelidate/lib/validators";
import flatPickr from "vue-flatpickr-component";
import 'flatpickr/dist/flatpickr.css';
import findIndex from "lodash/findIndex";
import moment from "moment";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import axios from 'axios';
import $ from "jquery";
export default {
  name: "ManageRules",
  components: {
    AppLayout,
    Loading,
    flatPickr,
    Multiselect
  },
  data: function() {
    return {
       isLoading : false,
        loadingbgcolor : '#0069d9',
        action: "Add",
              importFile: null,
      account:[],
        ruleId : null,
       // partnerid : null,
       labelcheck:"",
        spartnerId: null,
        partnerId: this.partnerId,
        ruleTemplateId: "",
        category : "",
        name: "",
        description : "",
        ruleType : "",
        pointsValueToEarn:"",
        pos : null,
        tier : [],
        segment: [],
        merchantList:[],
        startDate: new Date(),
        endDate : "",
        neverExpires:true,
        pointsExpiry : "",
        status :true,
        setAsLastRun:"",
        sourceAccountList:[],
        templateList : [],
        tierList : [],
        testlabel:[],
        segmentList : [],
        ruleTypeerror : false,
        rulecollection : [],
        collection : [],
        ruleIdcounter : 1,
        getlabel:"",
       Transactions:null,
        //falseUsage:null,
        limit:"",
       Value:null,
       Usage:null,
        pointsValueToEarnIdcounter:1,
        ruleAttachDtoList:null,
        startDateConfig: {
          wrap: true,
          minDate : "",
        },
        endDateConfig: {
          wrap: true,
          minDate : "today",
        },
        pointsExpiryDateConfig: {
          wrap: true,
          minDate : "today",
        },
    };
  },
  validations : {
    ruleTemplateId: {
      required
    },
    category: {
      required
    },
    limit:{
        required

    },
          account:{

      },
      testlabel:{

      },
    name: {
      required,
     // regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]+[a-zA-Z-$&+,_:;=?@#|"'<>.-^*()%!][a-zA-Z-$&+,_:;=?@#|"'<>.-^*()%!\s]*$/),
    },
   
    ruleType : {
      required
    },
    tier: {
        
    },
    segment: {
        
    },
    status : {
      required
    },
    
    startDate: {
    
    },
    endDate: {
       

    },
    pointsExpiry: {

    },
    description: {

    },
   
    
  },
  methods : {
      limitrule(){
      $('#type2').show();
      },
      handlerule(){
           let cacheScope=this;
          if(this.limit == "false"||cacheScope.limit==false||cacheScope.limit=="select")
          {
          
     
     $('#number').hide();
          $('#customer').hide();
     $('#value').hide();
     this.Value=null;
     this.Transactions=null;
     this.Usage=null;
          }
          else{
              $('#number').show();
          $('#customer').show();
     $('#value').show();
          }
          $('#type2').hide();
     
    
      },
     
          handleImportRules: function () {
      $("#importModal").modal("toggle");
  //    this.account="";
    //  this.sourceAccountList=[];
    },
              handleView: function () {
      this.fileError = false;
      $("#importModal1").modal("toggle");
    },
         handleDownloadItem : function(id,partnerId){
      this.isLoading = true;
      let cachescope = this;
      let url = "";
      if(this.partnerId == undefined || this.partnerId == "") {
        url = `${process.env.VUE_APP_API_LOCATION}reward/redeemed/export`;
      } else {
        url = `${process.env.VUE_APP_API_LOCATION}rule/identifier/file`;
      }
      axios({
        url: url,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'ProductSample.csv');
        document.body.appendChild(fileLink);
        fileLink.click();
        cachescope.isLoading = false;
      });
 
    },
       submit(){
              let cachescope = this;
      let cache_obj=this;
      let cacheScope=this;
        $("#importModal").modal("hide");
        $("#importModal1").modal("hide");
        cachescope.testlabel=this.account;

        //console.log("Checkdata",cacheScope.account);

    },
    loadruledetails(ruleId){
         let cacheScope = this;
         let dataobj={
            ruleId:this.ruleId,
            partnerId:this.partnerId 
         }

         this.$store.dispatch("earningrule/getRule", dataobj).then(function(res) {
             cacheScope.isLoading = false;
             //console.log("uuuuu",res)
            // //console.log("check the data label",res.productIdentifierDtoList[0].labelName)
             cacheScope.ruleTemplateId = res.ruleTemplateId;
             cacheScope.category = res.category;
             cacheScope.description = res.description;
             cacheScope.limit=res.limitRequired;
             cacheScope.Usage=res.usageLimitByCustomer;
             cacheScope.handlerule();
              cacheScope.Transactions=res.numberOfTransactions;
             cacheScope.Value=res.totalTransactionValue;
             cacheScope.name = res.name;
             cacheScope.ruleType = res.ruleType;
             cacheScope.startDate = res.startDate;
             cacheScope.endDate = res.endDate;
             cacheScope.neverExpires = res.neverExpires;
             cacheScope.pointsExpiry = res.pointsExpiry;
             cacheScope.status=res.status;
             cacheScope.setAsLastRun=res.setAsLastRun;
           //cacheScope.startDateConfig.minDate=res.startDate;
              let DateCheck=new Date();

            if(res.startDate>=DateCheck.toISOString().slice(0, 10)){
                // console.log("startDate",res.startDate,DateCheck.toISOString().slice(0, 10));
               // console.log("high start date");
                 cacheScope.startDateConfig.minDate=DateCheck.toISOString().slice(0, 10);
             }
             else{
                 console.log("lowDate",res.startDate,new Date());
                 console.log("low start date",DateCheck.toISOString().slice(0, 10));
                 cacheScope.startDateConfig.minDate=res.startDate;
             }
             res.ruleAttachDtoList.forEach(function(ele){
                
                if(ele.ruleAttachType == "TIER"){
                    console.log("check tier",cacheScope.segmentList);
                     var TierData=[];
                    for(let i=0;i<cacheScope.tierList.length;i++){
                        for(let j=0;j<ele.ruleAttachTypeId.length;j++){
                            if(cacheScope.tierList[i].id==ele.ruleAttachTypeId[j])
                            TierData.push(cacheScope.tierList[i])
                        }

                    }
                    var resobj=[];
             for(var i=0;i<TierData.length;i++){
            
                resobj.push({
              id: TierData[i].id,
              name: TierData[i].name,
                });
            }
                    cacheScope.tier = resobj;

                }else {
                    (ele.ruleAttachType == "SEGMENT")
                     console.log("check Segment",cacheScope.segmentList);
                    console.log("check idddn",ele.ruleAttachTypeId);
                    var segmentData=[];
                    for(let i=0;i<cacheScope.segmentList.length;i++){
                        for(let j=0;j<ele.ruleAttachTypeId.length;j++){
                            if(cacheScope.segmentList[i].id==ele.ruleAttachTypeId[j])
                            segmentData.push(cacheScope.segmentList[i])
                        }

                    }
                    console.log("djndjnd",segmentData);
                    var resSegmentobj=[];
             for(let i=0;i<segmentData.length;i++){
            
                resSegmentobj.push({
              id: segmentData[i].id,
              segmentName: segmentData[i].segmentName,
                });
            }
                   
                    cacheScope.segment = resSegmentobj;
                }
             }
             );
                     var resobj=[];
          for(var i=0;i<res.productIdentifierDtoList.length;i++){
            
                resobj.push({
              id: (cacheScope.ruleIdcounter++),
              label: res.productIdentifierDtoList[i].labelName,
                });
            }
             cacheScope.testlabel = resobj;
             cacheScope.account=cacheScope.testlabel
            // //console.log("for loop data",cacheScope.account )
             let ruleobj = {
                  id : (cacheScope.ruleIdcounter++),
                  name : res.ruleType,
                  condition : JSON.parse(res.ruleDefinition)
             };
             cacheScope.rulecollection = [ruleobj];
          let rule = {
               id : (cacheScope.pointsValueToEarnIdcounter++),
               name :res.ruleType,
               condition : JSON.parse(res.ruleDefinition)
          };
         if(rule.name==="PRODUCT_PURCHASE"){
          if(rule.condition.maximumPoints==0){
              rule.condition.maximumPoints=null

          }
          }

          cacheScope.collection = [rule];        
         });
      },
     asyncFind (query, type, minLen) {
        if(query.length < minLen) {
            return;
        }

        let opts = [];

        let cachescope = this;
        let cacheScope=this;
        let param = {
             query:query,
            partnerId:this.partnerId
        }
          //  //console.log("snhbnksbks",param);
 
        this.$store.dispatch("rule/getLabel", param).then(function(res) {
           // //console.log("check",res);
          var resobj=[];
          for(var i=0;i<res.data.length;i++){
            
                resobj.push({
              id: res.data[i].id,
              label: res.data[i].labelName,
                });
            }
        cacheScope.sourceAccountList = resobj;
        cacheScope.sourceAccountList=[...new Map(cacheScope.sourceAccountList.map(item => [item.id, item])).values()];
        // //console.log("chekjdkd",cacheScope.sourceAccountList);
           // //console.log("optsgbbb",res);
               // cachescope.sourceAccountList = opts;
              //  cachescope.srcAccountDataisLoading = false;

        });
    },
      setMinEndDate: function() {
         // console.log("check mind end date");
        let startDate = "";
        startDate = this.startDate;
        if((startDate != null) && (startDate != "")) {
            //this.endDate = moment(startDate).format("YYYY-MM-DD").toString() + " 23:59:59";
            this.endDateConfig.minDate = startDate;
            this.pointsExpiryDateConfig.minDate = startDate;
        }
      },
      handlemindate(){
       let DateCheck=new Date();
       this.startDateConfig.minDate=DateCheck.toISOString().slice(0, 10);
        if(this.pointsExpiryDateConfig.minDate==""|| this.pointsExpiryDateConfig.minDate!=""){
            this.startDate=new Date();
        }
          
          
    },
      openMinDate: function(){
          let cacheScope = this;
          let DateCheck=new Date();
          cacheScope.startDateConfig.minDate=DateCheck.toISOString().slice(0, 10);
          console.log("consoledata check ",cacheScope.startDateConfig.minDate);
      },
      getconditionobjshape(stype){
          let condiobj;
          if(stype == "GENERAL"){
              condiobj = {
                  "points" : null,
                  "minimumOrderValue" : null
              };
          } else if(stype == "PRODUCT_PURCHASE"){
              condiobj = {   
                     
                  "pointsValueToEarn" : null,
              };
          } else if(stype == "MULTIPLY_EARNED_REWARDS"){
               condiobj = {
                  "multiplier" : null
              };
          } else if(stype == "INSTANT_REWARD"){
              condiobj = {
                  "rewardType" : null
              };
          } else if(stype == "REFERRAL"){
              condiobj = {
                  "name" : null,
                  "eventCode" : null,
                  "points" : null,
                  "limitPerCustomer" : null
              };
          } else if(stype == "ACCOUNT_SIGN_UP" || stype == "DEBUT_PURCHASE" || stype == "NEWS_LETTER_SUBSCRIPTION"){
              condiobj = {
                  "points" : null
              };
          } else if(stype == "QR_CODE"){
              condiobj = {
                  "code" : null ,
                  "points" : null,
                  "limitPerCustomer" : null
              };
          }
          else if(stype == "GEO_LOCATION"){
              condiobj = {
                  "points" : null,
                  "address" : null
              };
          }
          return condiobj;
      },

      handleAddRule(){
          //let stype = this.$refs.selrulecollectiontype.value;
          let stype = this.ruleType;
          if(stype){
              //this.ruleTypeerror = false;
              let condiobj = this.getconditionobjshape(stype);
              let ruleobj = {
                  id : (this.ruleIdcounter++),
                  name : stype,
                  condition : condiobj
              };
              //this.$refs.selrulecollectiontype.value = "";
              //this.rulecollection.push(ruleobj);
              this.rulecollection = [ruleobj];
          }else{
              this.ruleTypeerror = true;
          }
      },
   
  conditionobjshape(ttype,stype){
      stype = this.ruleType;
     let condiobj;
  if(ttype  == "Fixed"){
         condiobj = {
                "points" : null,
                 "pointsValueToEarn" : "Fixed",
              }; 

              }
 else if(ttype == "PercentageInProductValues")
                 {
       
          condiobj = {
                "percentage" : null,
                "maximumPoints" : null,
                 "pointsValueToEarn" : "PercentageInProductValues",
              }; 
               }
                return condiobj;
},
  handleInstantRewardchange(event){
          //console.log(JSON.stringify(this.rulecollection[0].condition.pointsValueToEarn));
        //console.log(JSON.stringify(event.target.value))
                //console.log("wwww",this.rulecollection[0].condition.pointsValueToEarn);
                let ttype=this.rulecollection[0].condition.pointsValueToEarn;
                          if(ttype){
              
              let condiobj = this.conditionobjshape(ttype);
              let rule = {
                  id : (this.pointsValueToEarnIdcounter++),
                  name :ttype,
                  condition : condiobj,
                  
              };
            
               //console.log("count",this.pointsValueToEarnIdcounter++),
                //console.log("selecttype",ttype),
              //console.log("NEW",rule)
              this.collection = [rule];
          }else{
              this.ruleTypeerror = true;
          }
      },  
     /* handleRemovedRule(selectid){
           let index = findIndex(this.rulecollection,{id: selectid});
           if (index > -1) {
               this.rulecollection.splice(index, 1);
           }
      },*/
      islimit(){
                    let cacheScope = this;
                    //console.log("trans",this.Transactions);
                    //console.log("value",this.value);
                    //console.log("usage",this.Usage);
 if((this.limit ==true||this.limit=="true")&&(this.Transactions!=null||this.Value!=null||this.Usage!=null)){
              //console.log("checkloop")
      return true;

          }
          else if(this.limit=="false"||this.limit==false){
              return true;
          }


           else
         this.limitrule();
              return false;   
      },
      isFormValid() {
            this.$v.$touch();
            if (!this.$v.$invalid) {

                
                if(this.rulecollection.length == 0){
                    this.$toast.open({
                        message: "Rule Details should not be empty",
                        type: "error",
                        duration: 2000,
                        dismissible: true,
                        position: "top"
                    });
                    return false;
                }else{
                    let berror = false;
                    for(let i=0;i<this.rulecollection.length;i++){
                        let row = this.rulecollection[i];
                        for (var key of Object.keys(row.condition)) {
                            if(row.name !="Referral" || key!="limitPerCustomer"){
                              if(!row.condition[key]){
                                  berror = true;
                                  break;
                              }
                            }
                        }
                    }
                    if(berror){
                        this.$toast.open({
                            message: "Please fill all the fields in the rule details",
                            type: "error",
                            duration: 2000,
                            dismissible: true,
                            position: "top"
                        });
                        return false;
                    }
                }
                return true;
            }
            return false;
      },
            getUTCDateFormat(dateVal) {
               // //console.log("ebdatfdayfayf",dateVal);
        return (dateVal != "" && dateVal != null)?(moment(dateVal).format("YYYY-MM-DD")):"";
      },
                  getUTC1DateFormat(dateVal) {
                ////console.log("chack",dateVal);
               // return (dateVal != "" && dateVal != null)?(moment(dateVal)._i.format("YYYY-MM-DD")):"";
        return moment(dateVal)._i;
      },

     handleSumbit(){ 
          let cacheScope = this;
          cacheScope.segmentArray=[];
          cacheScope.tierArray=[];
          console.log("chekck",this.segment);
          console.log("chekck",this.tier);
         for(let i=0;i<this.segment.length;i++){
            this.segmentArray[i]=this.segment[i].id;
          }
          for(let i=0;i<this.tier.length;i++){
            this.tierArray[i]=this.tier[i].id;

          }
          if(this.neverExpires ===true||this.neverExpires ===false&&this.endDate!=null){
         if((this.isFormValid())&&(this.islimit())){
           let cacheScope = this;
           let ruleobj;

           this.rulecollection.forEach(function (row) {
                //ruleobj.push(row.condition);
                ruleobj = row.condition;
           });
           this.collection.forEach(function (row) {
                ruleobj = row.condition;
                //console.log("ruke",ruleobj)
           });
          // //console.log("dbbdbndk",ruleobj);
         // //console.log("check rule collection",cacheScope.rulecollection[0].condition.pointsValueToEarn=="PercentageInProductValues");
          // //console.log("ABCDEFGH",ruleobj.maximumPoints=="");
           if(cacheScope.rulecollection[0].condition.pointsValueToEarn=="PercentageInProductValues"){
           if(ruleobj.maximumPoints==""||ruleobj.maximumPoints==null){
               ruleobj.maximumPoints="0";
           }

           }

         //  //console.log("chekc the rules",ruleobj)
                      let cachescope=this;
                     // //console.log("check rule collection",cacheScope.rulecollection);

          if(cacheScope.rulecollection[0].name=="PRODUCT_PURCHASE"){
             // //console.log("check product",cachescope.testcollection=ruleobj)
            // //console.log("bhhhhhhh",  this.rulecollection[0].condition.maximumPoints==null);
               cachescope.testcollection=ruleobj;
               ////console.log("test purchase",this.testcollection);


           }
           else{
             //console.log("cvhfgf",cachescope.testcollection=0);
               ////console.log("testdata",cacheScope.rulecollection[0].condition);
              // this.testcollection=0;
               cachescope.testcollection=cacheScope.rulecollection[0].condition;
               ////console.log("we check it product and other rules",this.testcollection);
           }
          // //console.log("ruledata",this.test);
                     var resobj=[];
          for(var i=0;i<this.account.length;i++){
            
                resobj.push({
                  labelName: this.account[i].label,
                });
            }
           
             if(this.Transactions==""){
                this.Transactions=null;
            }
               if(this.Value==""){
                  this.Value=null;
                
            }
            if(this.Usage=="")
            {
                this.Usage=null;
            }
            if(cacheScope.limit == false || cacheScope.limit== "false")
            {
                cacheScope.Us=null;
                cacheScope.Val=null;
                cacheScope.Trans=null;
            }
            else{
                
                cacheScope.Us=cacheScope.Usage;
                cacheScope.Val=cacheScope.Value;
                cacheScope.Trans=cacheScope.Transactions;

            }
        cacheScope.test = resobj;
        cacheScope.account=cacheScope.test;
           let dataobj = {
                //"partnerId": this.partnerId,
                "ruleTemplateId": this.ruleTemplateId,
                "name": this.name,
                "description": this.description,
                "category": this.category,
                "ruleType": this.ruleType,
                "startDate": this.startDate?this.getUTCDateFormat(this.startDate):"",
                "endDate":  (this.endDate && !this.neverExpires)?this.getUTC1DateFormat(this.endDate):"",
                //"pointexire": this.pointexire,
               // "pointsExpiry": this.pointsExpiry?this.getUTCDateFormat(this.pointsExpiry):"",
                "neverExpires":this.neverExpires,
             "ruleAttachDtoList": [
                    {
                    "ruleAttachType": "TIER",
                    "ruleAttachTypeId": this.tierArray,

                    },
                    {
                    "ruleAttachType": "SEGMENT",
                    "ruleAttachTypeId": this.segmentArray
                    }
                ],
                "ruleAssociationTypeId": 0,
                 "limitRequired": this.limit,
              "totalTransactionValue": this.Val,
              "numberOfTransactions": this.Trans,
              "usageLimitByCustomer": this.Us,
                "productIdentifierDtoList":this.account,
                "ruleDefinition": JSON.stringify(this.testcollection),
                "pointsExpiry": this.pointsExpiry?this.getUTCDateFormat(this.pointsExpiry):"",
                "status":this.status,
                 "setAsLastRun":this.setAsLastRun
           };
           //console.log("123",this.Value)
           let spartnerId  = this.partnerId;
           /*let payload = {
               "partnerid" : suserid,
               "payload" : dataobj
           }
           cacheScope.isLoading = true;
           this.$store.dispatch("earningrule/addRule",payload).then(function(res) {
               cacheScope.isLoading = false;
           });*/

           let surl =  `${process.env.VUE_APP_API_LOCATION}rule/partner/${spartnerId}/add`;
          // let slisturl = "/partner/?templateid=" + this.tempplatename  + "&partnerId=" + spartnerId;
           let smessage = "Rule created successfully";

           if (this.action == "edit") {
               dataobj["id"] = this.ruleId;
               surl = `${process.env.VUE_APP_API_LOCATION}rule/partner/${spartnerId}/update-rule`;
                smessage = "Rule updated successfully";
           }
           let formobj = new FormData();
           /*for (var key of Object.keys(dataobj)) {
                formobj.append(key , dataobj[key]);
            }*/
            formobj.append("json", JSON.stringify(dataobj));
            formobj.append("partnerId", this.partnerId);
            //formobj.append("productCategories", this.$refs.filecategory.files[0]);
            //formobj.append("productExcludes" , this.$refs.fileexclude.files[0]);
            formobj.append("productLabels" , this.$refs.filelable.files[0]);
            cacheScope.isLoading = true;
            axios.post( surl , formobj, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function(res){
                 cacheScope.isLoading = false;
                 cacheScope.$toast.open({
                    message: smessage,
                    type: "success",
                    duration: 2000,
                    dismissible: true,
                    position: "top"
                });
                //cacheScope.$router.push({ path: slisturl});
                cacheScope.$router.push({ path: `/merchantearningrules` });
            })
                                  .catch(function (err) {
                                   cacheScope.isLoading = false;   
                         // console.log("rejected",err);
            cachescope.$toast.open({
              message: "RuleName already exist in selected template",
              type: "error",
              duration: 5000,
              dismissible: true,
              position: "top",
            });

           //  window.location.reload();
            cacheScope.loadruledetails();
            cacheScope.$router.push({ path: `/merchantaddrules` });

          });
         }
          }
          else
                           cacheScope.$toast.open({
                    message:"Please Select the EndDate",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top"
                });
         // ///console.log("hedhhekhkhdbkhb")
      },
      loadtemplatelist(){
        let cacheScope = this;
         this.$store.dispatch("earningrule/earningrulelist",cacheScope.partnerId).then(function(res) {
            cacheScope.templateList = res.data;
         });
      },
      loadtierlist(id){
        let cacheScope = this;
        console.log("id check",id);
        cacheScope.$store.dispatch("tiers/initActive",id).then(function(res) {
            cacheScope.tierList = res.data;
        });
      },
      loadsegmentlist(id){
          
        let cacheScope = this;

        cacheScope.$store.dispatch("segment/init",id).then(function(res) {
            cacheScope.segmentList = res.data;
            console.log("chjeck sdendndn",cacheScope.segmentList);
        });
      },
      handleCancel(){
          /*let surl = "/rule/?templateid=" + this.tempplatename  + "&partnerid=" + this.partnerid;
          this.$router.push({ path: surl });*/
          this.$router.push({ path: `/merchantearningrules` });
      },

  },
 /* created(){
      if (this.$route.query) {
      let obj = this.$route.query;
        if (Object.prototype.hasOwnProperty.call(obj, "templateid")) {
            this.ruleTemplateId = (this.$route.query.templateid);
        }
       if (Object.prototype.hasOwnProperty.call(obj, "partnerId")) {
            this.partnerId = this.$route.query.partnerId;
        }
       if (Object.prototype.hasOwnProperty.call(obj, "ruleId")) {
            this.ruleId = this.$route.query.ruleId;
            this.action = "Edit";
        }
      }
      this.loadtemplatelist();
      this.loadtierlist();
      this.loadsegmentlist();

      if (this.action == "Edit") {
         this.loadruledetails(this.ruleId);
      } else {

        this.isLoading = false;
      }
       this.handleAddRule();

  },*/
  created() {
      this.partnerId  = this.$store.getters["account/getuserid"];
      this.loadtierlist(this.partnerId);
       
      this.loadsegmentlist(this.partnerId);
  },
  mounted() {
    $(".nav-merchantearningrules").addClass("active");
    this.partnerId  = this.$store.getters["account/getuserid"];
    if(this.partnerId == undefined || this.partnerId == "") {
        return;
    }
    this.loadtemplatelist();
    if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }
      if (Object.prototype.hasOwnProperty.call(obj, "templateid")) {
            this.ruleTemplateId = (this.$route.query.templateid);
        }
      if(this.action == "edit" && Object.prototype.hasOwnProperty.call(obj, 'earningrule')) {
        this.ruleId = parseInt(this.$route.query.earningrule);
      }
    }

    if((this.action == "edit") && (this.ruleId != undefined)) {
        this.loadruledetails(this.ruleId);
    }else{
      this.handleAddRule();
    }




  }
};
</script>
          if((this.limit =="TRUE")&&(this.Transactions!=""||this.Value!=""||this.falseUsage!="")){
