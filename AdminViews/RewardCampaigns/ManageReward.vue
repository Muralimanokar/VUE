<template>
  <app-layout>
    
    <div class="managemerchant_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'rewardcampaign.index' }">Reward</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page" v-if="action=='edit'">Edit Reward</li>
                        <li class="breadcrumb-item active" aria-current="page" v-else-if="action=='view'">View Reward</li>
                        <li class="breadcrumb-item active" aria-current="page" v-else>Add Reward</li>
                    </ol>
                </nav>
            </div>
        </div>
          <div class="d-flex justify-content-end">
             <!-- <button type="button" class="btn btn-danger">Upload Coupon Code</button>
              <button type="button" class="btn btn-danger">Add Label</button>-->
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
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.name.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Name *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="$v.commonDto.name.$model" :disabled="this.action =='view'">
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.commonDto.name.$error && !$v.commonDto.name.required">Please enter reward name</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.commonDto.name.$error && !$v.commonDto.name.maxLength">Maximum allowed length is 60 characters</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.commonDto.name.$error && !$v.commonDto.name.regex">Please enter a valid reward name</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.rewardCategoryId.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Reward Category *</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.commonDto.rewardCategoryId.$model" :disabled="this.action =='view'">
                                        <option value="">Select</option>
                                        <option v-for="rewardCategory in rewardCategoryList" :value="rewardCategory.id" v-bind:key="rewardCategory.id">{{rewardCategory.name}}</option>
                                    </select>
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.commonDto.rewardCategoryId.$error && !$v.commonDto.rewardCategoryId.required">Please select a reward category</div>
                              </div>
                         </div>
                          <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.description.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Description</label>
                                <div class="col-sm-6">
                                    <textarea class="form-control" v-model="$v.commonDto.description.$model" :disabled="this.action =='view'"></textarea>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.commonDto.description.$error && !$v.commonDto.description.maxLength">Maximum allowed length is 100 characters</div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.brandName.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Brand Name *</label>
                                           <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model.trim="$v.commonDto.brandName.$model" :disabled="this.action =='view'">
                                        <option v-for="template in rewardBrandList" :value="template.name" v-bind:key="template.id">{{template.name}}</option>
                                    </select>
                                </div>
                               <!-- <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="$v.commonDto.brandName.$model" :disabled="this.action =='view'">
                                </div>-->
                                <div class="error col-md-12 text-left" style="margin-left:50%"  v-if="$v.commonDto.brandName.$error && !$v.commonDto.brandName.maxLength">Maximum allowed length is 60 characters</div>
                                <div class="error col-md-12 text-left" style="margin-left:50%"  v-if="$v.commonDto.brandName.$error && !$v.commonDto.brandName.required">Please select a brand name</div>
                                <!--<div class="error col-sm-12 text-right" v-if="$v.commonDto.brandName.$error && !$v.commonDto.brandName.isNameValid">Brand name should not contain special characters</div>-->
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.rewardType.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Reward Type</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                      v-model="$v.commonDto.rewardType.$model" :disabled="this.action =='view'">
                                        <option value="">Select</option>
                                        <option value="CASH_BACK">Cash back</option>
                                        <option value="GEO_LOCATION">Geolocation</option>
                                        <option value="COUPON">Coupon code</option>
                                        <option value="DISCOUNT">Percentage discount</option>
                                    </select>
                                </div>
                                <div class="error col-md-12 text-left" style="margin-left:50%" v-if="$v.commonDto.rewardType.$error && !$v.commonDto.rewardType.required">Please select a reward type </div>
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
                            icon-rewardcampaigns"></i> Reward Details</h2>
                 </div>
                 <div class="card-body px-0" v-if="commonDto.rewardType=='CASH_BACK'">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.cashBackDto.pointsValue.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Points Value *</label>
                                <div class="col-sm-6">
                                     <input type="text" readonly class="form-control" v-model.trim="$v.cashBackDto.pointsValue.$model" :disabled="this.action =='view'">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.cashBackDto.pointsValue.$error && !$v.cashBackDto.pointsValue.required">Please enter points</div>
                                <div class="error col-sm-12 text-right" v-if="$v.cashBackDto.pointsValue.$error && !$v.cashBackDto.pointsValue.maxLength">Maximum allowed length is 20 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.cashBackDto.pointsValue.$error && !$v.cashBackDto.pointsValue.numeric">Please enter a valid point</div>
                              </div>
                         </div>
                        <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.cashBackDto.rewardValue.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Reward Value *</label>
                                <div class="col-sm-6">
                                     <input type="text" class="form-control" v-model.trim="$v.cashBackDto.rewardValue.$model" :disabled="this.action =='view'">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.cashBackDto.rewardValue.$error && !$v.cashBackDto.rewardValue.required">Please enter Reward <Details></Details></div>
                                <div class="error col-sm-12 text-right" v-if="$v.cashBackDto.rewardValue.$error && !$v.cashBackDto.rewardValue.maxLength">Maximum allowed length is 20 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.cashBackDto.rewardValue.$error && !$v.cashBackDto.rewardValue.numeric">Please enter a valid value</div>
                              </div>
                         </div>
                     </div>
                 </div>
                 <div class="card-body px-0" v-else-if="commonDto.rewardType=='GEO_LOCATION'">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.geoLocationDto.ruleTemplateId.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Rule Template *</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.geoLocationDto.ruleTemplateId.$model" :disabled="this.action =='view'">
                                        <option v-for="template in ruleTemplateList" :value="template.id" v-bind:key="template.id">{{template.name}}</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.geoLocationDto.ruleTemplateId.$error && !$v.geoLocationDto.ruleTemplateId.required">Please select a rule template</div>
                                
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.geoLocationDto.rule.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Rule Name *</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.geoLocationDto.rule.$model" :disabled="this.action =='view'">
                                        <option v-for="rule in ruleList" :value="rule" v-bind:key="rule.id">{{rule.name}}</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.geoLocationDto.rule.$error && !$v.geoLocationDto.rule.required">Please select a rule</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.geoLocationDto.rewardValue.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Reward Value *</label>
                                <div class="col-sm-6">
                                     <input type="text" class="form-control" v-model.trim="$v.geoLocationDto.rewardValue.$model" :disabled="this.action =='view'">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.geoLocationDto.rewardValue.$error && !$v.geoLocationDto.rewardValue.required">Please enter Reward value</div>
                                <div class="error col-sm-12 text-right" v-if="$v.geoLocationDto.rewardValue.$error && !$v.geoLocationDto.rewardValue.maxLength">Maximum allowed value in 20 character</div>
                                <div class="error col-sm-12 text-right" v-if="$v.geoLocationDto.rewardValue.$error && !$v.geoLocationDto.rewardValue.numeric">Please enter valid Reward value</div>
                              </div>
                         </div>
                     </div>
                 </div>
                 <div class="card-body px-0" v-else-if="commonDto.rewardType=='DISCOUNT'">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.instantDiscountDto.percentageValue.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Percentage Value *</label>
                                <div class="col-sm-6">
                                     <input type="text" class="form-control" v-model.trim="$v.instantDiscountDto.percentageValue.$model" :disabled="this.action =='view'">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.instantDiscountDto.percentageValue.$error && !$v.instantDiscountDto.percentageValue.required">Please enter discount percentage</div>
                                <div class="error col-sm-12 text-right" v-if="$v.instantDiscountDto.percentageValue.$error && !$v.instantDiscountDto.percentageValue.maxLength">Maximum allowed length is 20 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.instantDiscountDto.percentageValue.$error && !$v.instantDiscountDto.percentageValue.numeric">Please enter a valid value</div>
                              </div>
                         </div>
                            <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.instantDiscountDto.maxAmount.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Maximum Discount *</label>
                                <div class="col-sm-6">
                                     <input type="text" class="form-control" v-model.trim="$v.instantDiscountDto.maxAmount.$model" :disabled="this.action =='view'">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.instantDiscountDto.maxAmount.$error && !$v.instantDiscountDto.maxAmount.required">Please enter discount percentage</div>
                                <div class="error col-sm-12 text-right" v-if="$v.instantDiscountDto.maxAmount.$error && !$v.instantDiscountDto.maxAmount.numeric">Please enter a valid value</div>
                              </div>
                         </div>
                     </div>
                 </div>
                 <div class="card-body px-0" v-else-if="commonDto.rewardType=='COUPON'">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.couponDto.couponLink.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Coupon Information *</label>
                                <div class="col-sm-6">
                                     <input type="text" class="form-control" v-model.trim="$v.couponDto.couponLink.$model" :disabled="this.action =='view'">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.couponDto.couponLink.$error && !$v.couponDto.couponLink.url">Please enter a valid URL</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.couponDto.couponCost.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Points required *</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control" min="1" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"  v-model.trim="$v.couponDto.couponCost.$model" :disabled="this.action =='view'">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.couponDto.couponCost.$error && !$v.couponDto.couponCost.required">Please enter points</div>
                                <div class="error col-sm-12 text-right" v-if="$v.couponDto.couponCost.$error && !$v.couponDto.couponCost.maxLength">Maximum allowed length is 20 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.couponDto.couponCost.$error && !$v.couponDto.couponCost.numeric">Please enter a valid point</div>
                              </div>
                         </div>
                          <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.couponDto.couponType.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Coupon Type *</label>
                                <div class="col-sm-6">
                                   <select class="form-control" v-model="$v.couponDto.couponType.$model" :disabled="this.action =='view'">
                                        <option value="" selected>Select</option>
                                        <option value="DISCOUNT_CODE">Discount</option>
                                        <option value="VALUE_CODE">Value Code</option>
                                        <option value="FREE_DELIVERY_CODE">Free Delivery</option>
                                        <option value="GIFT_CODE">Gift</option>
                                        <option value="EVENT_INVITATION_CODE">Event Invitation</option>
                                        <option value="CASH_BACK">Cash back</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.couponDto.couponType.$error && !$v.couponDto.couponType.required">Please select a coupon type</div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                        
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.couponDto.coupons.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Coupons *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" min="1" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" v-model.trim="$v.couponDto.coupons.$model" :disabled="this.action =='view'">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.couponDto.coupons.$error && !$v.couponDto.coupons.required">Please enter coupon</div>
                              </div>
                         </div>
                          <div class="col-md-4">
                     <button class="btn btn-danger" style="text-align:center;margin-left:110px" @click="handleImportCustomer">Upload file</button>
                     <button class="btn btn-danger form-group row" style="margin-right:-60px;text-align:left;margin-left:30px" @click="getCouponCodeInfo">Generate
                    
                             </button>
                             
                              </div>  
                     <div class=" form-group row" :class="{ 'form-group--error': $v.couponDto.couponcode.$error }" style="margin-left:-100px" >
                        
                             <input style="margin-left:90px;width:40px;height:40px" v-model.trim="$v.couponDto.couponcode.$model"  >                        

                     <div class="error col-sm-12 text-right one" style="font-size:14px;margin-right:-150px;color:rgb(247, 114, 114);" v-if="$v.couponDto.couponcode.$error && !$v.couponDto.couponcode.numeric">Please enter a valid code</div>
                              </div>
                            
                            
                                        
                        <div class="col-md-4" v-if="couponDto.couponType =='GIFT_CODE'">
                             <div class="form-group row" :class="{ 'form-group--error': $v.couponDto.points.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">points *</label>
                                <div class="col-sm-6">
                                    <input type="text" min="1" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" class="form-control" v-model.trim="$v.couponDto.points.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.couponDto.points.$error && !$v.couponDto.points.required">Please enter coupon</div>
                              </div>
                         </div>
                          </div>
                         <div class="row">
                  <div class="col-md-4">
              <div class="test">
                           
    <div class="modal fade" id="importModal">
        <div class="modal-dialog">
          <div class="modal-content" style="border-radius: 0px">
                        <div class="modal-header">
              <h5 class="modal-title" style="font-size: 16px">
                Upload Coupon Code
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
              <div class="container">
                <div class="row justify-content-md-center">
                  <div class="col-md-auto">
                    <div class="form-group">
                      <div class="upload-btn-wrapper">
                        <button class="btn btn-primary">File Upload</button>
                        <input
                          type="file"
                          ref="file"
                          v-on:change="handleFileUpload()"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label v-if="importFile"
                        >File chosen : {{ importFile["name"] }}</label
                      ><br />
                      <label v-if="!fileError">File Format : csv</label>
                      <label class="text-danger" v-else
                        >Invalid file Format. Please choose a csv file</label
                      >
                    </div>
                    <div class="form-group">
                      <button
                        type="button"
                        class="btn btn-success"
                        @click="submitImportFile"
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
                         </div>
                         </div>
                        
                         </div>
                          
                    <br>

                     <div class="row">
                      <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.couponDto.couponUsageType.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Coupon Usage Type *</label>
                                <div class="col-sm-6">
                                     <select class="form-control" v-model="$v.couponDto.couponUsageType.$model" :disabled="this.action =='view'">
                                        <option value="" selected>Select</option>
                                        <option value="SINGLE">Single Use</option>
                                        <option value="SHARED">Shared</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.couponDto.couponUsageType.$error && !$v.couponDto.couponUsageType.required">Please select a coupon usage type</div>
                              </div>
                         </div>
                                <div class="col-md-4" v-if="couponDto.couponUsageType =='SINGLE'">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Usage Limit *</label>
                                    
                                <div class="col-sm-6">
                                    <input type="number" placeholder="1" class="form-control" value="1" v-model.trim="$v.couponDto.usageLimit.$model" :disabled="this.action =='view'" readonly>
                                </div>
                              </div>
                         </div>
                          <div class="col-md-4" v-if="couponDto.couponUsageType =='SINGLE'">
                             <div class="form-group row" >
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Usage Limit by customer *</label>
                                <div class="col-sm-6">
                                    <input type="text" placeholder="1" class="form-control" value="1" v-model.trim="$v.couponDto.usageLimitByCustomer.$model" :disabled="this.action =='view'" readonly>
                                </div>
                              </div>
                         </div>
                          <div class="col-md-4" v-if="couponDto.couponUsageType =='SHARED'">
                             <div class="form-group row" :class="{ 'form-group--error': $v.couponDto.usageLimit.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Usage Limit *</label>
                                <div class="col-sm-6">
                                    <input type="text" min="1" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" class="form-control" v-model.trim="$v.couponDto.usageLimit.$model" :disabled="this.action =='view'">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.couponDto.usageLimit.$error && !$v.couponDto.usageLimit.maxLength">Maximum allowed length is 20 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.couponDto.usageLimit.$error && !$v.couponDto.usageLimit.numeric">Please enter a valid usage limit</div>
                              </div>
                         </div>
                          <div class="col-md-4" v-if="couponDto.couponUsageType =='SHARED'">
                             <div class="form-group row" :class="{ 'form-group--error': $v.couponDto.usageLimitByCustomer.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Usage Limit by customer *</label>
                                <div class="col-sm-6">
                                    <input type="text" min="1" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" class="form-control" v-model.trim="$v.couponDto.usageLimitByCustomer.$model" :disabled="this.action =='view'">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.couponDto.usageLimitByCustomer.$error && !$v.couponDto.usageLimitByCustomer.maxLength">Maximum allowed length is 20 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.couponDto.usageLimitByCustomer.$error && !$v.couponDto.usageLimitByCustomer.numeric">Please enter a valid usage limit</div>
                              </div>
                         </div>
                     </div>
                    <!-- <div class="row">
                         <div class="col-md-12">
                             <p class="horizontalline"><span style="padding-left:10px;padding-right:10px;">Limitation and Expiry</span></p>
                         </div>
                     </div>-->
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.couponDto.limitIsRequired.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Limit Required</label>
                                <div class="col-sm-6">
                                   <select class="form-control" v-model="$v.couponDto.limitIsRequired.$model" :disabled="this.action =='view'" @change="handlelimit()">
                                        <option value="" selected>Select</option>
                                        <option  value="1">Yes</option>
                                        <option  value="0">No</option>
                                    </select>
                                </div>
                              </div>
                         </div>
                       
                      <div class="col-md-4" v-if="couponDto.limitIsRequired =='1'" id="one">
                             <div class="form-group row" :class="{ 'form-group--error': $v.couponDto.expiryInDays.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Expire in days *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="$v.couponDto.expiryInDays.$model" :disabled="this.action =='view'">
                                </div>
                  <div class="error col-sm-12 text-right" v-if="$v.couponDto.expiryInDays.$error && !$v.couponDto.expiryInDays.required">Please select expiry day</div>
                                <div class="error col-sm-12 text-right" v-if="$v.couponDto.expiryInDays.$error && !$v.couponDto.expiryInDays.numeric">Please enter a valid day</div>
                              </div>
                         </div>
                         <div class="col-md-4" v-if="couponDto.limitIsRequired =='1'" id="two">
                             <div class="form-group row" :class="{ 'form-group--error': $v.couponDto.validAfterDays.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Valid after x days *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="$v.couponDto.validAfterDays.$model" :disabled="this.action =='view'">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.couponDto.validAfterDays.$error && !$v.couponDto.validAfterDays.required">Please select valid after day</div>
                                <div class="error col-sm-12 text-right" v-if="$v.couponDto.validAfterDays.$error && !$v.couponDto.validAfterDays.numeric">Please enter a valid day</div>
                              </div>
                            </div>  
                         
                        
                     </div>
                   
                    
                     
                 </div>
            </div>
        </div>
        <!-- <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Reward Cost</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.rewardValue.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Reward value *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="$v.commonDto.rewardValue.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.commonDto.rewardValue.$error && !$v.commonDto.rewardValue.numeric">Please enter a valid reward value</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.taxType.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Tax Type *</label>
                                <div class="col-sm-6">
                                   <select class="form-control" v-model="$v.commonDto.taxType.$model">
                                        <option value="" selected>Select</option>
                                        <option value="PERCENTAGE">Percentage</option>
                                        <option value="VALUE">Value</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.commonDto.taxType.$error && !$v.commonDto.taxType.required">Please Select Tax Type</div>
                              </div>
                         </div>
                          <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.taxValue.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Tax Value *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="$v.commonDto.taxValue.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.commonDto.taxValue.$error && !$v.commonDto.taxValue.required">Please enter a tax value</div>
                                <div class="error col-sm-12 text-right" v-if="$v.commonDto.taxValue.$error && !$v.commonDto.taxValue.numeric">Please enter a valid tax value</div>
                              </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>-->
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Target</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                        <!-- <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.pos.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">POS</label>
                                <div class="col-sm-6">
                                    <select class="form-control" v-model="$v.commonDto.pos.$model">
                                        <option>Select</option>
                                    </select>
                                </div>
                              </div>
                         </div>-->
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.tier.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Tiers</label>
                                <div class="col-sm-6">
                                  <select class="form-control" v-model="$v.commonDto.tier.$model" :disabled="this.action =='view'">
                                       <option value="" selected>Select</option>
                                        <option v-for="tier in tierList" :value="tier.id" v-bind:key="tier.id">{{tier.name}}</option>
                                                                          <!-- <multiselect

                                                         v-model="selected"
                                                        mode="CheckBox"

                                                         :multiple="true"

                                                         :options="options">

                                                         </multiselect>-->
    

                                    </select>
     
                                   <!-- <multiselect
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
                                         v-model="$v.commonDto.tier.$model"
                                          >
                                    </multiselect>-->
 


                                </div>
                              </div>
                         </div>
                          <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.segment.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Segments</label>
                                <div class="col-sm-6">
                                   <select class="form-control" v-model="$v.commonDto.segment.$model" :disabled="this.action =='view'">
                                        <option value="" selected>Select</option>
                                        <option v-for="segment in segmentList" :value="segment.id" v-bind:key="segment.id">{{segment.name}}</option>
                                    </select>
                                </div>
                              </div>
                         </div>
                     </div>
                    <!--<div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.rewardLabel.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Reward Label *</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control" v-model.trim="$v.commonDto.rewardLabel.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.commonDto.rewardLabel.$error && !$v.commonDto.rewardLabel.maxLength">Maximum allowed length is 20 characters</div>
                                <div class="error col-sm-12 text-right" v-if="$v.commonDto.rewardLabel.$error && !$v.commonDto.rewardLabel.regex">Please enter a valid label</div>
                              </div>
                         </div>
                    </div>-->
                 </div>
            </div>
        </div>
       <!-- <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Notification</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.informationLink.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Information Link *</label>
                                <div class="col-sm-6">
                                     <input type="text" class="form-control" v-model.trim="$v.commonDto.informationLink.$model">
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.commonDto.informationLink.$error && !$v.commonDto.informationLink.url">Please enter a valid URL</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.notificationContent.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Push Notification Content *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model.trim="$v.commonDto.notificationContent.$model">
                                    <label style="margin-top:10px;font-size:11px;color:#7f7f7f;">Max 120 Characters</label>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.commonDto.notificationContent.$error && !$v.commonDto.notificationContent.maxLength">Maximum allowed length is 120 characters</div>
                              </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>-->
        <div class="form-section pt-3">
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Active</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.allTimeActive.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">All time Active</label>
                                <div class="col-sm-6">
                                     <input type="checkbox" class="form-control" style="width: 20px;" v-model="$v.commonDto.allTimeActive.$model" :disabled="this.action =='view'">
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.isActive.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Status</label>
                                <div class="col-sm-6">
                                    <div class="custom-control custom-switch">
                                      <input type="checkbox" id="chk_15836853" class="custom-control-input" v-model="$v.commonDto.isActive.$model" :disabled="this.action =='view'">
                                      <label for="chk_15836853" class="custom-control-label"></label>
                                    </div>
                                </div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.isPublic.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Public</label>
                                <div class="col-sm-6">
                                    <div class="custom-control custom-switch">
                                      <input type="checkbox" id="chk_15836854" class="custom-control-input" v-model="$v.commonDto.isPublic.$model" :disabled="this.action =='view'">
                                      <label for="chk_15836854" class="custom-control-label"></label>
                                    </div>
                                </div>
                              </div>
                         </div>
                     </div>
                      <div class="row" v-if="!commonDto.allTimeActive">
                           <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.activeFrom.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Active From</label>
                                <div class="col-sm-6 input-group">
                                  <flat-pickr class="form-control"
                                    v-model="$v.commonDto.activeFrom.$model"
                                    style="background-color:white;"
                                    :config="activeFromDateConfig"
                                    
                                    @on-change="setMinEndDate('ACTIVE_FROM')"
                                    :disabled="this.action =='view'">
                                  </flat-pickr>
                                  <div class="input-group-append">
                                    <div class="input-group-text" title="Toggle" data-toggle>
                                      <i class="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
                                   </div>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.commonDto.activeFrom.$error && !$v.commonDto.activeFrom.required">Please select a date</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.activeTo.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Active To</label>
                                <div class="col-sm-6 input-group">
                                  <flat-pickr class="form-control"
                                    v-model="$v.commonDto.activeTo.$model"
                                    style="background-color:white;"
                                    :disabled="this.action =='view'"
                                    :config="activeToDateConfig">
                                  </flat-pickr>
                                  <div class="input-group-append">
                                    <div class="input-group-text" title="Toggle" data-toggle>
                                      <i class="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
                                   </div>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.commonDto.activeTo.$error && !$v.commonDto.activeTo.required">Please select a date</div>
                              </div>
                         </div>
                      </div>
                       <div class="row">
                           <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.visibleFrom.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Visible From</label>
                                <div class="col-sm-6 input-group">
                                  <flat-pickr class="form-control"
                                    v-model="$v.commonDto.visibleFrom.$model"
                                    style="background-color:white;"
                                    :config="visibleFromDateConfig"
                                    @on-change="setMinEndDate('VISIBLE_FROM')"
                                     :disabled="this.action =='view'">
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
                             <div class="form-group row" :class="{ 'form-group--error': $v.commonDto.visibleTo.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Visible To</label>
                                <div class="col-sm-6 input-group">
                                  <flat-pickr class="form-control"
                                    v-model="$v.commonDto.visibleTo.$model"
                                   style="background-color:white;"
                                    :config="visibleToDateConfig"
                                     :disabled="this.action =='view'">
                                  </flat-pickr>
                                  <div class="input-group-append">
                                    <div class="input-group-text" title="Toggle" data-toggle>
                                      <i class="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
                                   </div>
                                </div>
                              </div>
                           </div>

                       </div>
                 </div>
            </div>
        </div>
        <div v-if="this.action!='view'">
            <div class="d-flex mb-5">
                <button type="button" class="btn btn-success" @click="handleSubmit">Submit</button>
                <button type="button" class="btn btn-danger" @click="handleCancel">Cancel</button>
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
#one{
  float:left ;
   color:rgb(rgb(247, 114, 114) ),
}

.horizontalline {
  overflow: hidden;
  color: #188ae2;
  font-size: 13px;
}


.horizontalline:before,
.horizontalline:after {
  background-color: #188ae2;
  content: "";
  display: inline-block;
  height: 1px;
  position: relative;
  vertical-align: middle;
}

.horizontalline:before {
  width: 5%;
}

.horizontalline:after {
   width:95%;
   margin-right: -50%;
}
.test{
  padding-left: 100px;
 
}
.managemerchant_container .modal-header{
  background: #34b8df;
    border-radius: 0px;
    color: white;
    font-size: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
}
.managemerchant_container .modal-header .close{
  color: white !important;
  background: transparent;
  font-size: 24px;
  opacity:1;
}
.managemerchant_container .modal-header .close i{
  text-shadow: none;
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
.modal-header .close i {
  text-shadow: none;
}
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.upload-btn-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

</style>

<script>
import AppLayout from "@/layouts/Admin.vue";
import $ from "jquery";
import axios from "axios"
import DebugMixin from '@/mixins/debug';
import { required, requiredIf, maxLength, numeric, url, helpers, regex } from "vuelidate/lib/validators";
import flatPickr from "vue-flatpickr-component";
import 'flatpickr/dist/flatpickr.css';
import moment from "moment";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import filter from "lodash/filter";

export default {
  name: "ManageReward",
  components: {
    AppLayout,
    flatPickr,
    //MultiSelect,
    Loading
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
      //selected:null,
      //options: ['Laravel', 'Laravel 5', 'Vue JS', 'HDTuto.com', 'HDTuto.com'],
      fileError:false,
      importFile: null,
      action: "create",
      isLoading: true,
      loadingbgcolor : '#0069d9',
      commonDto: {
        id : null,
        name: null,
        description: "",
        
        rewardCategoryId: "",
        rewardBrandListID:"",
        //points:null,
        brandName: "",
        rewardType: "",
        //rewardValue: "",
        taxType: "",
        taxValue: "",
        pos: "",
        tier: "",
        segment: "",
        programId: "",
        
        //rewardLabel: "",
        //informationLink: "",
        //notificationContent: "",
        allTimeActive: false,
        isActive: true,
        isPublic: true,
        activeFrom:new Date(),
        activeTo: "",
        visibleFrom: "",
        visibleTo: ""
      },
      instantDiscountDto: {
        percentageValue: "",
      maxAmount:""
      },
      cashBackDto: {
        pointsValue: 1,
        rewardValue:""
      },
      geoLocationDto: {
        ruleTemplateId: {},
        rule: {},
        rewardValue:""
     
      },
      couponDto: {
        couponLink: "",
        couponCost: "",
        couponType: "",
        couponUsageType: "",
        coupons: "",
        points:"",
        limitIsRequired: "",
        usageLimit: "",
        usageLimitByCustomer: "",
         couponcode:"",
        expiryInDays: "",
        validAfterDays: ""
      },
      
      tierList: "",
      rewardCategoryList: "",
      segmentList: "",
      ruleTemplateList: "",
      rewardBrandList:"",
      ruleList: "",
      activeFromDateConfig: {
        wrap: true,
        minDate : "today",
      },
      activeToDateConfig: {
        wrap: true,
        minDate : "today",
      },
      visibleFromDateConfig: {
        wrap: true,
        minDate : "today",
        maxDate:"today",
      },
      visibleToDateConfig: {
        wrap: true,
        minDate:"today",
        maxDate : "today",
      }
    };
  },
  validations: {
    commonDto: {
      name: {
        required,
        regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
        maxLength: maxLength(60)
      },
      rewardCategoryId: {
        required
      },
      description: {
        maxLength: maxLength(100)
      },
      brandName: {
        required,
        maxLength: maxLength(60),
       // isNameValid: helpers.regex('isNameValid',/^[a-z0-9]*$/i),
      },
      rewardType: {
        required
      },
 /*     rewardValue: {
        numeric
      },*/
      taxType: {
      },
      taxValue: {
        numeric,
      },
      pos: {
      },
      tier: {
      },
      segment: {
      },
      rewardLabel: {
        regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
        maxLength: maxLength(20)
      },
      informationLink: {
        url
      },
      notificationContent: {
        maxLength: maxLength(120)
      },
      allTimeActive: {
      },
      isActive: {
      },
      isPublic: {
      },
      activeFrom: {
        required: requiredIf(function(obj) {
          return (!this.commonDto.allTimeActive)
        }),
      },
      activeTo: {
        required: requiredIf(function(obj) {
          return (!this.commonDto.allTimeActive)
        }),
      },
      visibleFrom: {
      },
      visibleTo: {
      }
    },
    cashBackDto: {
      pointsValue: {
        required: requiredIf(function(obj) {
          return (this.commonDto.rewardType == "CASH_BACK")
        }),
        maxLength: maxLength(20),
        numeric
      },
      rewardValue: {
        required: requiredIf(function(obj) {
          return (this.commonDto.rewardType == "CASH_BACK")
        }),
        maxLength: maxLength(20),
        numeric

      }
    },
    geoLocationDto: {

      ruleTemplateId: {
        required: requiredIf(function(obj) {
          return (this.commonDto.rewardType == "GEO_LOCATION")
        })
      },
      rule: {
        required: requiredIf(function(obj) {
          return (this.commonDto.rewardType == "GEO_LOCATION")
        })
      },
      rewardValue: {
        required: requiredIf(function(obj) {
          return (this.commonDto.rewardType == "GEO_LOCATION")
        }),
        maxLength:maxLength(20),
        numeric
      }

    },
    instantDiscountDto: {
      percentageValue: {
        required: requiredIf(function(obj) {
          return (this.commonDto.rewardType == "DISCOUNT")
        }),
        maxLength: maxLength(20),
        numeric
      },
      maxAmount: {
        required: requiredIf(function(obj) {
          return (this.commonDto.rewardType == "DISCOUNT")
        }),
        numeric
      },

    },
    couponDto: {
      couponLink: {
        url
      },
      couponCost: {
        required: requiredIf(function(obj) {
          return (this.commonDto.rewardType == "COUPON")
        }),
        maxLength: maxLength(20),
        numeric
      },
      couponcode: {
        required: requiredIf(function(obj) {
          return (this.commonDto.rewardType == "COUPON")
        }),
        numeric
      },
      couponType: {
        required: requiredIf(function(obj) {
          return (this.commonDto.rewardType == "COUPON")
        })
      },
      couponUsageType: {
        required: requiredIf(function(obj) {
          return (this.commonDto.rewardType == "COUPON")
        })
      },
      coupons: {
        required: requiredIf(function(obj) {
          return (this.commonDto.rewardType == "COUPON")
        }),
       
      },
      limitIsRequired: {
      },
      points:{

      },
      usageLimit: {
        maxLength: maxLength(20),
        numeric
      },
      usageLimitByCustomer: {
        maxLength: maxLength(20),
        numeric
      },
      expiryInDays: {
        required: requiredIf(function(obj) {
          return (this.couponDto.limitIsRequired =="1")
        }),
        numeric
      },
      validAfterDays: {
        required: requiredIf(function(obj) {
          return (this.couponDto.limitIsRequired =="1")
        }),
        numeric
      }
    }
    
 },
  methods: {
        getCouponCodeInfo() {
      let cachescope = this;
      let param = {
        id: this.couponDto.couponcode,
         partnerId:this.partnerId,
      };
      this.$store.dispatch("reward/CouponCount", param).then(function(res) {
       // cachescope.myDebug(JSON.stringify(res));
        cachescope.name = res.name;
      cachescope.couponcode = res;
      // console.log("coupon", cachescope.couponcode)

      }).catch(function(err){
        cachescope.$toast.open({
          message: "Reward redeem view failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/manageReward` });
      });
    },
    getTiersList() {
      let cachescope = this;
      cachescope.isLoading = true;
      this.$store.dispatch("tiers/initActive",this.partnerId).then(function(res) {
        cachescope.myDebug("Tiers: " + JSON.stringify(res));
        cachescope.tierList = [];
        res.data.forEach((tier) => {
          let tierObj = {};
          tierObj.id = tier.id;
          tierObj.name = tier.name;
          cachescope.tierList.push(tierObj);
        });
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Reward action failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/rewardcampaign` });
        cachescope.isLoading = false;
      });
    },
        handleImportCustomer: function () {
      this.fileError = false;
      $("#importModal").modal("toggle");
    },
     handleFileUpload() {
      this.fileError = false;
      this.importFile = this.$refs.file.files[0];
      if (
        this.importFile &&
        this.importFile["type"] !== "text/csv" &&
        this.importFile["type"] !== "application/vnd.ms-excel"
      ) {
        this.fileError = true;
      }
    },
    submitImportFile: function () {
      let formData = new FormData();
      $("#importModal").modal("hide");
      formData.append("file", this.importFile);
      let cachescope = this;
      this.isLoading = true;
      axios
        .post(`${process.env.VUE_APP_API_LOCATION}reward/uploadCoupon`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (res) {
          if (cachescope.fileError == false) {
            cachescope.$toast.open({
              message: "Upload Coupon import success",
              type: "success",
              duration: 3000,
              dismissible: true,
              position: "top",
            });
            cachescope.isLoading = false;
            cachescope.importFile = null;
          }
        })
        .catch(function (err) {
          cachescope.$toast.open({
            message: "Upload Coupon import failed",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "top",
          });
          cachescope.isLoading = false;
          cachescope.importFile = null;
        });
      
    },
    getRewardCategoryList() {
      let cachescope = this;
      cachescope.isLoading = true;
      let storeAction = "";
      if(this.action == "create") {
        storeAction = "reward/initCategoryActive";
      } else {
        storeAction = "reward/initCategory";
      }
      this.$store.dispatch(storeAction,this.partnerId
      ).then(function(res) {
       // cachescope.myDebug("Reward Category: " + JSON.stringify(res));
        cachescope.rewardCategoryList = [];
        res.data.forEach((rewardCategory) => {
          let rewardCategoryObj = {};
          rewardCategoryObj.id = rewardCategory.id;
          rewardCategoryObj.name = rewardCategory.name;
          cachescope.rewardCategoryList.push(rewardCategoryObj);
        });
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Reward action failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/rewardcampaign` });
        cachescope.isLoading = false;
      });
    },
    getSegmentList(id) {
      let cachescope = this;
      cachescope.isLoading = true;

      
      let storeAction = "segment/init";
      this.$store.dispatch(storeAction,id).then(function(res) {
        cachescope.myDebug("Segment: " + JSON.stringify(res));
        cachescope.segmentList = [];
        res.data.forEach((segment) => {
          let segmentObj = {};
          segmentObj.id = segment.id;
          segmentObj.name = segment.segmentName;
          cachescope.segmentList.push(segmentObj);
        });
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Reward action failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/rewardcampaign` });
        cachescope.isLoading = false;
      });
    },
    getRuleTemplateList() {
      let cachescope = this;
      cachescope.isLoading = true;
      let storeAction = "earningrule/earningrulelistAdmin";
      this.$store.dispatch(storeAction).then(function(res) {
       // cachescope.myDebug("Rule Template: " + JSON.stringify(res));
        cachescope.ruleTemplateList = [];
        res.data.forEach((template) => {
          let templateObj = {};
          templateObj.id = template.id;
          templateObj.name = template.name;
          cachescope.ruleTemplateList.push(templateObj);
        });
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Reward action failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/rewardcampaign` });
        cachescope.isLoading = false;
      });
    },
    getRuleList(id) {
      let cachescope = this;
      cachescope.isLoading = true;
      let suserid  = this.$store.getters["account/getuserid"];
      let storeAction = "earningrule/listRule";
      let param = {
        partnerId: suserid,
        templateId: id,
      //  pageNumber:this.pageNumber,
       // pageSize:this.pageSize
      };
      this.$store.dispatch(storeAction, param).then(function(res) {
        //cachescope.myDebug("Rule: " + JSON.stringify(res));
        cachescope.ruleList = [];
        res.data.forEach((rule) => {
          let ruleObj = {};
          ruleObj.id = rule.id;
          ruleObj.name = rule.ruleName;
          cachescope.ruleList.push(ruleObj);
        });
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Reward action failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/rewardcampaign` });
        cachescope.isLoading = false;
      });
    },
    getRewardInfo(id) {
      let cachescope = this;
      let dataobj={
        id,
   partnerId:this.partnerId,
      }
      this.$store.dispatch("reward/get", dataobj).then(function(res) {
        console.log("23456",res)
        //cachescope.myDebug(JSON.stringify(res));
        cachescope.commonDto.name = res.data[0].name;
        cachescope.commonDto.description = res.data[0].description;
        cachescope.commonDto.brandName = res.data[0].brandName;
        //cachescope.commonDto.informationLink = res.informationLink;
        //cachescope.commonDto.notificationContent = res.notificationContent;
        //cachescope.commonDto.rewardLabel = res.rewardLabel;
        cachescope.commonDto.rewardCategoryId = res.data[0].rewardCategoryId;
        cachescope.commonDto.rewardType = res.data[0].rewardType;
        //cachescope.commonDto.rewardTypeId = res.rewardTypeId;
        //cachescope.commonDto.rewardValue = res.rewardValue;
       // cachescope.commonDto.taxType = res.taxType;
        //cachescope.commonDto.taxValue = res.taxValue;
        cachescope.commonDto.activeFrom = res.data[0].activeFrom;
        cachescope.commonDto.activeTo = res.data[0].activeTo;
        cachescope.commonDto.visibleFrom = res.data[0].visibleFrom;
        cachescope.commonDto.visibleTo = res.data[0].visibleTo;
        cachescope.commonDto.isActive= res.data[0].isActive;
        cachescope.commonDto.isPublic = res.data[0].isPublic;
        cachescope.commonDto.programId = res.data[0].programId;
        cachescope.commonDto.allTimeActive = res.data[0].allTimeActive;
        res.targetTypeDtoList.forEach((ele) => {
          if(ele.targetType == "POS")
            cachescope.commonDto.pos = ele.targetTypeId;
          else if(ele.targetType == "TIER")
            cachescope.commonDto.tier = ele.targetTypeId;
          else if(ele.targetType == "SEGMENT")
            cachescope.commonDto.segment = ele.targetTypeId;
        });
        if(res.rewardType == "CASH_BACK") {
          cachescope.cashBackDto.pointsValue = res.data[0].rewardDetailsDto.cashBackDto.pointsValue;
          cachescope.cashBackDto.rewardValue = res.data[0].rewardDetailsDto.cashBackDto.rewardValue;
        } else if(res.rewardType == "GEO_LOCATION") {
          cachescope.geoLocationDto.rule.id = res.data[0].rewardDetailsDto.geoLocationDto.ruleId;
          cachescope.geoLocationDto.rule.name = res.data[0].rewardDetailsDto.geoLocationDto.ruleName;
          cachescope.geoLocationDto.rewardValue = res.data[0].rewardDetailsDto.geoLocationDto.rewardValue;
        } else if (res.rewardType == "DISCOUNT") {
          cachescope.instantDiscountDto.percentageValue = res.data[0].rewardDetailsDto.instantDiscountDto.percentageValue;
          cachescope.instantDiscountDto.maxAmount = res.data[0].rewardDetailsDto.instantDiscountDto.maxAmount;
        } else if (res.rewardType == "COUPON") {
          cachescope.couponDto.id = res.data[0].rewardDetailsDto.couponDto.id;
          cachescope.couponDto.code = res.data[0].rewardDetailsDto.couponDto.code;
          cachescope.couponDto.description = res.data[0].rewardDetailsDto.couponDto.description;
          cachescope.couponDto.termsAndConditions = res.data[0].rewardDetailsDto.couponDto.termsAndConditions;
          cachescope.couponDto.startDate = res.data[0].rewardDetailsDto.couponDto.startDate;
          cachescope.couponDto.endDate = res.data[0].rewardDetailsDto.couponDto.endDate;
          cachescope.couponDto.couponDiscountType = res.data[0].rewardDetailsDto.couponDto.couponDiscountType;
          cachescope.couponDto.discountValue = res.data[0].rewardDetailsDto.couponDto.discountValue;
          cachescope.couponDto.redemptionType = res.data[0].rewardDetailsDto.couponDto.redemptionType;
          cachescope.couponDto.isPublic = res.data[0].rewardDetailsDto.couponDto.isPublic;
          cachescope.couponDto.programId = res.data[0].rewardDetailsDto.couponDto.programId;
          cachescope.couponDto.createdByPartnerId = res.data[0].rewardDetailsDto.couponDto.createdByPartnerId;
          cachescope.couponDto.status = res.data[0].rewardDetailsDto.couponDto.status;
          cachescope.couponDto.couponLink = res.data[0].rewardDetailsDto.couponDto.couponLink;
          cachescope.couponDto.couponUsageType = res.data[0].rewardDetailsDto.couponDto.couponUsageType;
          cachescope.couponDto.coupons = res.data[0].rewardDetailsDto.couponDto.coupons;
          cachescope.couponDto.limitIsRequired = res.data[0].rewardDetailsDto.couponDto.limitIsRequired;
          cachescope.couponDto.usageLimit = res.data[0].rewardDetailsDto.couponDto.usageLimit;
          cachescope.couponDto.usageLimitByCustomer = res.data[0].rewardDetailsDto.couponDto.usageLimitByCustomer;
          cachescope.couponDto.expiryInDays = res.data[0].rewardDetailsDto.couponDto.expiryInDays;
          cachescope.couponDto.validAfterDays = res.data[0].rewardDetailsDto.couponDto.validAfterDays;
          cachescope.couponDto.couponType = res.data[0].rewardDetailsDto.couponDto.couponType;
        /* if( this.couponDto.couponType=="GIFT_CODE"){
               
          }*/
          cachescope.couponDto.couponCost = res.data[0].rewardDetailsDto.couponDto.couponCost;
        }
      })/*.catch(function(err){
        cachescope.$toast.open({
          message: "Reward view/edit failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.$router.push({ path: `/rewardcampaign` });
      });&&(this.handlelimit())*/
    },
    getUTCDateFormat(dateVal) {
      return (dateVal != "" && dateVal != null)?(moment(dateVal).format("YYYY-MM-DD")):"";
    },
    handleSubmit() {
      console.log("check reward id",this.commonDto.brandName,this.rewardBrandListID);
      if(this.isFormValid()) {
        let suserid  = this.$store.getters["account/getuserid"];
         if(this.couponDto.couponUsageType=="SINGLE")
            {
                this.couponDto.Us=1;
                this.couponDto.Val=1;

            }
            else{

                this.couponDto.Us=this.couponDto.usageLimit
                this.couponDto.Val=this.couponDto.usageLimitByCustomer;

            }
         if(this.couponDto.couponType =='GIFT_CODE'){
           this.couponDto.po=this.couponDto.points
         }
         else{
           this.couponDto.po=null;
         }
         if(this.couponDto.limitIsRequired=="0"){
             this.couponDto.exp=null;
              this.couponDto.val=null;
          }
          else{
              this.couponDto.exp=this.couponDto.expiryInDays;
              this.couponDto.val=this.couponDto.validAfterDays;
          }
        let postJson = {
          name: this.commonDto.name,
          rewardCategoryId: this.commonDto.rewardCategoryId,
          description: this.commonDto.description,
          brandName: this.commonDto.brandName,
          rewardType: this.commonDto.rewardType,
          //informationLink: this.commonDto.informationLink,
          //notificationContent: this.commonDto.notificationContent,
          //ewardLabel: this.commonDto.rewardLabel,
          //rewardValue: parseInt(this.cashBackDto.rewardValue),
          //taxType: this.commonDto.taxType,
          //taxValue: this.commonDto.taxValue,
          activeFrom: this.commonDto.allTimeActive?"":this.getUTCDateFormat(this.commonDto.activeFrom),
          activeTo: this.commonDto.allTimeActive?"":this.getUTCDateFormat(this.commonDto.activeTo),
          visibleFrom: this.getUTCDateFormat(this.commonDto.visibleFrom),
          visibleTo: this.getUTCDateFormat(this.commonDto.visibleTo),
          // couponsList:this.couponcode,
         
          isActive: this.commonDto.isActive,
          isPublic: this.commonDto.isPublic,
          targetTypeDtoList: [
            { targetType: "POS", targetTypeId: this.commonDto.pos },
            { targetType: "TIER", targetTypeId: this.commonDto.tier },
            { targetType: "SEGMENT", targetTypeId: this.commonDto.segment }
          ],
          programId: this.commonDto.programId,
          allTimeActive: this.commonDto.allTimeActive,
          rewardDetailsDto: {},
   
        }
        let rewardObj = postJson.rewardDetailsDto;
      /*  if(this.couponDto.limitIsRequired=="SINGLE"){
          this.couponDto.usageLimit=1;
          this.couponDto.usageLimitByCustomer=1;
          return true;
        }*/
        
        switch(this.commonDto.rewardType) {
          case "CASH_BACK":
            rewardObj.cashBackDto = {
              
              pointsValue: parseInt(this.cashBackDto.pointsValue),
              rewardValue:parseInt(this.cashBackDto.rewardValue)
              
            }
            break;
          case "GEO_LOCATION":
            rewardObj.geoLocationDto = {
              ruleName: this.geoLocationDto.rule.name,
              ruleId: this.geoLocationDto.rule.id,
              rewardValue:parseInt(this.geoLocationDto.rewardValue)
            }
            break;
          case "DISCOUNT":
            rewardObj.instantDiscountDto = {
              percentageValue: parseInt(this.instantDiscountDto.percentageValue),
              maxAmount: parseInt(this.instantDiscountDto.maxAmount)
            }
            break;
          case "COUPON":
            rewardObj.couponDto = {
              couponLink: this.couponDto.couponLink,
              couponCost: parseInt(this.couponDto.couponCost),
              couponType: this.couponDto.couponType,
              couponUsageType: this.couponDto.couponUsageType,
            
               points : this.couponDto.po,
      couponsList: [
        {
          couponcode: this.couponcode,
            coupons: this.couponDto.coupons,
        }
      ],
              limitIsRequired: parseInt(this.couponDto.limitIsRequired),
              usageLimit: parseInt(this.couponDto.Us),
              usageLimitByCustomer: parseInt(this.couponDto.Val),
              expiryInDays: parseInt(this.couponDto.exp),
              validAfterDays: parseInt(this.couponDto.val)
            }
            break;
          default:
            return;
        }

        let storeAction = "";
        let cachescope = this;
        this.myDebug("JSON:", JSON.stringify(postJson));

        let param = {
          id: this.rewardBrandListID,
          data: postJson
        }
        

        if(this.action == "create") {
          cachescope.isLoading = true;
          storeAction = "reward/create";
          this.$store.dispatch(storeAction, param).then(function(res) {
          cachescope.$toast.open({
              message: "Reward created successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.$router.push({ path: `/rewardcampaign` });
           cachescope.isLoading = false;
        }).catch(function(err){
          cachescope.$toast.open({
              message: "Reward creation failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });

          cachescope.$router.push({ path: `/rewardcampaign` });
           cachescope.isLoading = false;
        });
        } else if(this.action == "edit") {
          cachescope.isLoading = true;
          postJson.id = this.id;
          storeAction = "reward/update";
          this.$store.dispatch(storeAction, param).then(function(res) {
          cachescope.$toast.open({
              message: "Reward Updated successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });

          cachescope.$router.push({ path: `/rewardcampaign` });
          cachescope.isLoading = false;
        }).catch(function(err){
          cachescope.$toast.open({
              message: "Reward Updated failed",
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });

          cachescope.$router.push({ path: `/rewardcampaign` });
           cachescope.isLoading = false;
        });
        } else {
            this.myDebug("Invalid action");
            return;
        }
      }
    },
          loadBrandName(){
        let cacheScope = this;
        cacheScope.$store.dispatch("merchant/loadBrand",).then(function(res) {
          
          cacheScope.rewardBrandList=[];
                  res.data.forEach((template) => {
          let templateObj = {};
          templateObj.id = template.id;
          templateObj.name = template.userName;
          cacheScope.rewardBrandList.push(templateObj);
        });
        //console.log("check brandload data",cacheScope.rewardBrandList);
           // cacheScope.tierList = res.data;
        });
      },
    handleCancel() {
      this.$router.push({ path: `/rewardcampaign` });
    },
    handlelimit(){
        if((this.couponDto.limitIsRequired=="1")&&(this.couponDto.expiryInDays!==null)&&(this.couponDto.validAfterDays==!null)){
          return true;
        }
         
    
    
          else if(this.couponDto.limitIsRequired=="0"){
             this.couponDto.expiryInDays=null;
              this.couponDto.validAfterDays=null;
              return true;
          }


           else
              return false;   
    },
    setMinEndDate: function(type) {
        let startDate = "";
        if(type == "ACTIVE_FROM") {
          //console.log("active from date check",this.commonDto.activeFrom)
            startDate = this.commonDto.activeFrom;
            //console.log("date check",startDate);
            if((startDate != null) && (startDate != "")) {
                //this.commonDto.activeFrom = startDate
                // this.commonDto.activeTo = moment(startDate).format("YYYY-MM-DD").toString() + " 23:59:59";
                this.activeToDateConfig.minDate = startDate;
                //this.visibleFromDateConfig=startDate
            }
        } else if(type == "VISIBLE_FROM") {
          let startDate="";
          let endDate="";
            startDate = this.commonDto.activeFrom;
            endDate=this.commonDto.activeTo;
           let date=this.commonDto.visibleFrom;
            //console.log("check date",startDate);
            if((startDate != null) && (startDate != "")||(endDate!=null)&&(endDate!="")) {
              //console.log("enddate",endDate);
               //this.commonDto.visibleTo = moment(enddate).format("YYYY-MM-DD").toString() + " 23:59:59";
               //this.commonDto.visibleFrom= moment(startDate).format("YYYY-MM-DD").toString() + " 23:59:59";
               this.visibleFromDateConfig.minDate=startDate
               let msg=this.visibleFromDateConfig;
               //console.log("mindate",msg.minDate);
               //console.log("maxdate",msg.maxDate);
               this.visibleFromDateConfig.maxDate=endDate
               this.visibleToDateConfig.maxDate = msg.maxDate;
               this.visibleToDateConfig.minDate = date;
            }
        }
    },
    isFormValid() {
      this.$v.$touch();
      if (!this.$v.commonDto.$invalid) {
        switch(this.commonDto.rewardType) {
          case "CASH_BACK":
            if(!this.$v.cashBackDto.$invalid)
              return true;
            break;
          case "GEO_LOCATION":
            if(!this.$v.geoLocationDto.$invalid)
              return true;
            break;
          case "DISCOUNT":
            if(!this.$v.instantDiscountDto.$invalid)
              return true;
            break;
          case "COUPON":
            if(!this.$v.couponDto.$invalid)
              return true;
            break;
          default:
            break;
        }
        return false;
      }
      return false;
    }
  },
  watch : {
    "geoLocationDto.ruleTemplateId": function(newValue,oldValue){
      this.ruleList = [];
     console.log("template list",newValue);
      let res = filter(this.ruleTemplateList , row => (row.id == newValue));
     // console.log(res);
      if(res.length > 0){
        this.getRuleList(res[0].id);
      }
     },
     "commonDto.brandName":function(newValue,oldValue){
       let cachescope=this;
       let res = filter(this.rewardBrandList , row => (row.name == newValue));
      // console.log("check brandvalue",res[0].id);
       cachescope.rewardBrandListID=res[0].id;
     // console.log("check brandid",cachescope.rewardBrandListID);
     }
     
  },
  created(){
this.loadBrandName();
  },
  mounted() {
    $(".nav-reward").addClass("active");
    if(this.$route.query) {
      let obj = this.$route.query;
         let cache_obj = this;
    cache_obj.partnerId  = this.$store.getters["account/getuserid"];
   
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }
      if(this.action == "edit" && Object.prototype.hasOwnProperty.call(obj, 'reward')) {
        this.id = this.$route.query.reward;
      }
        if(this.action == "view" && Object.prototype.hasOwnProperty.call(obj, 'reward')) {
        this.id = this.$route.query.reward;
      }
    }
      let suserid  = this.$store.getters["account/getuserid"];
    this.getTiersList();
    this.getRewardCategoryList();
    this.getSegmentList(suserid);
    this.getRuleTemplateList();

    if((this.action == "edit") && (this.id != undefined)) {
      this.getRewardInfo(this.id);
    }
        if((this.action == "view") && (this.id != undefined)) {
      this.getRewardInfo(this.id);
    }
  }
};
</script>
