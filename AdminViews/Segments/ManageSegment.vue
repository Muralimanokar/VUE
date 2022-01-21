<template>
  <app-layout>
    <div class="managemerchant_container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white m-0 p-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{ name: 'segment.index' }">Segment</router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page" v-if="action=='edit'">Edit Segment</li>
                        <li class="breadcrumb-item active" aria-current="page" v-else-if="action=='view'">View Segment</li>
                        <li class="breadcrumb-item active" aria-current="page" v-else>Add Segment</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="form-section pt-3">
       <!-- <div class="lock-form" v-if="this.action=='view'">
          <span class="btn btn-primary">
            <i class="fa fa-lock"></i>
          </span>
        </div>-->
            <div class="card">
                 <div class="card-header" id="headingOne">
                    <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Basic Details</h2>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.name.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Name *</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control"
                                     v-model.trim="$v.name.$model"
                                     :disabled="this.action =='view' ">
                                </div>
                                <div class="error col-sm-12 text-left" style="margin-left:50%" v-if="$v.name.$error && !$v.name.required">Please enter segment name</div>
                                <div class="error col-sm-12 text-left" style="margin-left:50%" v-if="$v.name.$error && !$v.name.maxLength">Maximum allowed length is 20 characters</div>
                                <div class="error col-sm-12 text-left" style="margin-left:50%" v-if="$v.name.$error && !$v.name.regex">Please enter a valid name</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.description1.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Description</label>
                                <div class="col-sm-6">
                                    <textarea class="form-control"
                                     v-model.trim="$v.description1.$model"
                                     :disabled="this.action =='view' ">
                                    </textarea>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.description1.$error && !$v.description1.maxLength">Maximum allowed length is 100 characters</div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.ruleCategory.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Rule Category *</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.ruleCategory.$model"
                                     :disabled="this.action =='view' "  @click="getrule()">
                                        <option value="" selected>Select</option>
                                        <option value="CUSTOMER">Customer</option>
                                      <!--  <option value="REWARD">Rewards</option>-->
                                        <option value="PURCHASE">Purchase</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-left" style="margin-left:50%" v-if="$v.ruleCategory.$error && !$v.ruleCategory.required">Please select a rule category</div>
                              </div>
                         </div>
                                                   <div class="col-md-4">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Status</label>
                                <div class="col-sm-6">
                                    <div class="custom-control custom-switch">  <!--:disabled="action=='Add'"-->
                                        <input type="checkbox" id="chk_15836853" class="custom-control-input" v-model="status"
                                        :disabled="this.action =='view' ">
                                        <label for="chk_15836853" class="custom-control-label"></label>
                                    </div>
                                </div>
                              </div>
                         </div>

                     </div>
                 </div>
            </div>
        </div>
        <div v-if="this.action=='create' || this.action === 'edit'">
          <draggable
          tag="div"
          class="draggable-list"
          ghost-class="moving-card"
          :list="rules"
          :animation="200">
           <div class="form-section" v-for="(item, idx) in rules" v-bind:key="item.id">
             <div class="card">
                 <div class="card-header" id="headingOne" :class="{'grabbable': rules.length != 1}">
                   <div class="row">
                     <div class="col-md-10">
                       <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Segment Rules</h2>
                     </div>
                     <div class="col-md-2 text-right">
                       <a class="btn icon-btn btn-sm plus text-success ml-2 bg-light" @click="addRule()">
                         <i class="fa fa-plus"></i>
                       </a>
                       <a class="btn icon-btn btn-sm minus text-danger ml-2 bg-light" @click="removeRule(idx)"  v-if="rules.length != 1" >
                         <i class="fa fa-minus"></i>
                       </a>
                       <!--<a class="btn icon-btn btn-sm plus ml-2 bg-light" @click="moveRuleUp(idx)" v-if="idx>0">
                         <i class="fa fa-arrow-up"></i>
                       </a>
                       <a class="btn icon-btn btn-sm plus ml-2 bg-light" @click="moveRuleDown(idx)" v-if="rules.length != 1 && idx != (rules.length - 1)">
                         <i class="fa fa-arrow-down"></i>
                       </a>-->
                     </div>
                   </div>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-12">
                             <div class="form-group row" :class="{ 'form-group--error': $v.rules.$each[idx].field.$error }">
                                <label for="name" class="col-sm-2
                                    col-form-label text-right">Field *</label>
                                <div class="col-sm-2" v-if="rules[idx].field==''">
                                    <select class="form-control"
                                     @change="handleFieldSelection($event,idx)"
                                      
                                     >
                                        <option value="" selected>Select</option>
                                        <option v-for="option in activeFieldOpts" v-bind:value="option.value" v-bind:key="option.value">{{option.text}}</option>
                                    </select>
                                    <div class="error col-sm-12 text-left" style="margin-left:-10%" v-if="$v.rules.$each[idx].field.$error && !$v.rules.$each[idx].field.required">Please select a field</div>
                                </div>
                                <div class="col-sm-10" v-else>
                                   <label class="font-weight-bold" > {{ getFieldText(rules[idx].field) }} </label>
                                   <a class="btn icon-btn btn-sm ml-2 bg-light" @click="editField(idx)">
                                     <i class="fa fa-pencil"></i>
                                   </a>
                                </div>

                              </div>
                         </div>
                         
                                                 
                     </div>
                     </div>
                     <div class="row">
                       
                        <!-- <div class="col-md-4" :class="{ 'form-group--error': $v.rules.$each[idx].aggregate.$error }">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Aggregate *</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.rules.$each[idx].aggregate.$model">
                                        <option value="" selected>Select</option>
                                        <option value="AVERAGE">Average</option>
                                        <option value="SUM">Sum</option>
                                        <option value="COUNT">Count</option>
                                    </select>
                                </div>
                                 <div class="error col-sm-12 text-right" v-if="$v.rules.$each[idx].aggregate.$error && !$v.rules.$each[idx].aggregate.required">Please select a Aggregate</div>
                              </div>
                         </div>-->
                         <div class="col-md-4" :class="{ 'form-group--error': $v.rules.$each[idx].ruleCondition.$error }">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Condition *</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.rules.$each[idx].ruleCondition.$model">
                                        <option value="" selected>Select</option>
                                        <option v-if="rules[idx].field=='BRAND'" value="CONTAINS">Contains </option>
                                        <option v-if="rules[idx].field=='BRAND'" value="MATCHES">Matches </option>
                                        <option v-if="rules[idx].field=='BRAND'" value="IN">In </option>
                                        <option v-if="rules[idx].field=='AGE' || rules[idx].field=='GENDER' || rules[idx].field=='LOCATION'" value="MATCHES">Matches</option>
                                        <option v-if="rules[idx].field=='AGE' || rules[idx].field=='GENDER' || rules[idx].field=='LOCATION'" value="IN">In</option>
                                        <option v-if="rules[idx].field=='AGE' || rules[idx].field=='TRANSACTIONS_COUNT' || rules[idx].field== 'TRANSACTIONS_VALUE' || rules[idx].field== 'AVERAGE_ORDER_VALUE' || rules[idx].field=='TIME_PERIOD'" value="BETWEEN">Between</option>
                                        <option v-if="rules[idx].field=='AGE' || rules[idx].field=='TRANSACTIONS_COUNT' || rules[idx].field== 'TRANSACTIONS_VALUE' || rules[idx].field== 'AVERAGE_ORDER_VALUE'" value="GREATER_THAN">Greater than</option>
                                        <option v-if="rules[idx].field=='AGE' || rules[idx].field=='TRANSACTIONS_COUNT' || rules[idx].field== 'TRANSACTIONS_VALUE' || rules[idx].field== 'AVERAGE_ORDER_VALUE'" value="LESS_THAN">Lesser than</option>
                                        <option v-if="rules[idx].field=='AGE' || rules[idx].field=='TRANSACTIONS_COUNT' || rules[idx].field== 'TRANSACTIONS_VALUE' || rules[idx].field== 'AVERAGE_ORDER_VALUE'" value="GREATER_THAN_OR_EQUAL">Greater than or equal</option>
                                        <option v-if="rules[idx].field=='AGE' || rules[idx].field=='TRANSACTIONS_COUNT' || rules[idx].field== 'TRANSACTIONS_VALUE' || rules[idx].field== 'AVERAGE_ORDER_VALUE'" value="LESS_THAN_OR_EQUAL">Lesser than or equal</option>
                                        <option v-if="rules[idx].field=='AGE' || rules[idx].field=='GENDER' || rules[idx].field=='LOCATION' || rules[idx].field=='TRANSACTIONS_COUNT' || rules[idx].field== 'TRANSACTIONS_VALUE' || rules[idx].field== 'AVERAGE_ORDER_VALUE' || rules[idx].field=='TRANSACTION_DAYS_AGO'|| rules[idx].field=='UPCOMING_BIRTHDAY_ANNIVERSARY'|| rules[idx].field=='UPCOMING_REGISTRATION_ANNIVERSARY'" value="EQUAL">Equal</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-left" style="margin-left:50%" v-if="$v.rules.$each[idx].ruleCondition.$error && !$v.rules.$each[idx].ruleCondition.required">Please select a condition</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.description2.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Rule Description</label>
                                <div class="col-sm-6">
                                    <textarea class="form-control" 
                                     v-model.trim="$v.description2.$model">
                                    </textarea>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.description2.$error && !$v.description2.maxLength">Maximum allowed length is 100 characters</div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                        <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.rules.$each[idx].value1.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right" v-if="rules[idx].ruleCondition!='BETWEEN'">Value *</label>
                                <label for="name" class="col-sm-6
                                    col-form-label text-right" v-else>Value (from) *</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control" 
                                     v-model="$v.rules.$each[idx].value1.$model">
                                </div>
                                <div class="error col-sm-12 text-left" style="margin-left:50%" v-if="$v.rules.$each[idx].value1.$error && !$v.rules.$each[idx].value1.required">Please enter a value</div>
                                <div class="error col-sm-12 text-left" style="margin-left:50%" v-if="$v.rules.$each[idx].value1.$error && !$v.rules.$each[idx].value1.regex">Please enter a valid value</div>
                              </div>
                        </div>
                        <div class="col-md-4" v-if="rules[idx].ruleCondition=='BETWEEN'">
                             <div class="form-group row" :class="{ 'form-group--error': $v.rules.$each[idx].value2.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Value (to)</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control" 
                                     v-model="$v.rules.$each[idx].value2.$model">
                                </div>
                                <div class="error col-sm-12 text-left" style="margin-left:50%" v-if="$v.rules.$each[idx].value2.$error && !$v.rules.$each[idx].value2.required">Please enter a value</div>
                                <div class="error col-sm-12 text-left" style="margin-left:50%" v-if="$v.rules.$each[idx].value2.$error && !$v.rules.$each[idx].value2.regex">Please enter a valid value</div>
                              </div>
                        </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.rules.$each[idx].isActive.$error }">
                                  <label for="name" class="col-sm-6
                                    col-form-label text-right">Status</label>
                                <div class="col-sm-6">
                                     <div class="custom-control custom-switch">
                                       <input type="checkbox" :id="item.id" class="custom-control-input"
                                         v-model="$v.rules.$each[idx].isActive.$model">
                                       <label :for="item.id" class="custom-control-label"></label>
                                     </div>
                                </div>
                             </div>
                         </div>
                     </div>
                     
                 </div>
            </div>
          
        </draggable>
        </div>
        <div v-else><draggable
          tag="div"
          class="draggable-list"
          ghost-class="moving-card"
          :list="rules"
          :animation="200">
           <div class="form-section" v-for="(item, idx) in rules" v-bind:key="item.id">
             <div class="card">
                 <div class="card-header" id="headingOne" :class="{'grabbable': rules.length != 1}">
                   <div class="row">
                     <div class="col-md-10">
                       <h2 class="mb-0"><i class="icon
                            icon-rewardcampaigns"></i> Segment Rules</h2>
                     </div>
                     <div class="col-md-2 text-right test">
                       <a class="btn icon-btn btn-sm plus text-success ml-2 bg-light" @click="addRule()" :disabled="true">
                         <i class="fa fa-plus" ></i>
                       </a>
                       <a class="btn icon-btn btn-sm minus text-danger ml-2 bg-light" @click="removeRule(idx)"  v-if="rules.length != 1" :disabled="true" >
                         <i class="fa fa-minus"></i>
                       </a>
                       <!--<a class="btn icon-btn btn-sm plus ml-2 bg-light" @click="moveRuleUp(idx)" v-if="idx>0">
                         <i class="fa fa-arrow-up"></i>
                       </a>
                       <a class="btn icon-btn btn-sm plus ml-2 bg-light" @click="moveRuleDown(idx)" v-if="rules.length != 1 && idx != (rules.length - 1)">
                         <i class="fa fa-arrow-down"></i>
                       </a>-->
                     </div>
                   </div>
                 </div>
                 <div class="card-body px-0">
                     <div class="row">
                         <div class="col-md-12">
                             <div class="form-group row" :class="{ 'form-group--error': $v.rules.$each[idx].field.$error }">
                                <label for="name" class="col-sm-2
                                    col-form-label text-right">Field *</label>
                                <div class="col-sm-2" v-if="rules[idx].field==''">
                                    <select class="form-control"
                                     @change="handleFieldSelection($event,idx)"
                                     :disabled="true">
                                        <option value="" selected>Select</option>
                                        <option v-for="option in activeFieldOpts" v-bind:value="option.value" v-bind:key="option.value">{{option.text}}</option>
                                    </select>
                                    <div class="error col-sm-12 text-left" style="margin-left:-10%" v-if="$v.rules.$each[idx].field.$error && !$v.rules.$each[idx].field.required">Please select a field</div>
                                </div>
                                <div class="col-sm-10" v-else>
                                   <label class="font-weight-bold" > {{ getFieldText(rules[idx].field) }} </label>
                                   <a class="btn icon-btn btn-sm ml-2 bg-light" @click="editField(idx)">
                                     <i class="fa fa-pencil" :disabled="true"></i>
                                   </a>
                                </div>

                              </div>
                         </div>
                         
                                                 
                     </div>
                     </div>
                     <div class="row">
                       
                        <!-- <div class="col-md-4" :class="{ 'form-group--error': $v.rules.$each[idx].aggregate.$error }">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Aggregate *</label>
                                <div class="col-sm-6">
                                    <select class="form-control"
                                     v-model="$v.rules.$each[idx].aggregate.$model">
                                        <option value="" selected>Select</option>
                                        <option value="AVERAGE">Average</option>
                                        <option value="SUM">Sum</option>
                                        <option value="COUNT">Count</option>
                                    </select>
                                </div>
                                 <div class="error col-sm-12 text-right" v-if="$v.rules.$each[idx].aggregate.$error && !$v.rules.$each[idx].aggregate.required">Please select a Aggregate</div>
                              </div>
                         </div>-->
                         <div class="col-md-4" :class="{ 'form-group--error': $v.rules.$each[idx].ruleCondition.$error }">
                             <div class="form-group row">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Condition *</label>
                                <div class="col-sm-6">
                                    <select class="form-control" :disabled="true"
                                     v-model="$v.rules.$each[idx].ruleCondition.$model">
                                        <option value="" selected>Select</option>
                                        <option v-if="rules[idx].field=='BRAND'" value="CONTAINS">Contains </option>
                                        <option v-if="rules[idx].field=='BRAND'" value="MATCHES">Matches </option>
                                        <option v-if="rules[idx].field=='BRAND'" value="IN">In </option>
                                        <option v-if="rules[idx].field=='AGE' || rules[idx].field=='GENDER' || rules[idx].field=='LOCATION'" value="MATCHES">Matches</option>
                                        <option v-if="rules[idx].field=='AGE' || rules[idx].field=='GENDER' || rules[idx].field=='LOCATION'" value="IN">In</option>
                                        <option v-if="rules[idx].field=='AGE' || rules[idx].field=='TRANSACTIONS_COUNT' || rules[idx].field== 'TRANSACTIONS_VALUE' || rules[idx].field== 'AVERAGE_ORDER_VALUE' || rules[idx].field=='TIME_PERIOD'" value="BETWEEN">Between</option>
                                        <option v-if="rules[idx].field=='AGE' || rules[idx].field=='TRANSACTIONS_COUNT' || rules[idx].field== 'TRANSACTIONS_VALUE' || rules[idx].field== 'AVERAGE_ORDER_VALUE'" value="GREATER_THAN">Greater than</option>
                                        <option v-if="rules[idx].field=='AGE' || rules[idx].field=='TRANSACTIONS_COUNT' || rules[idx].field== 'TRANSACTIONS_VALUE' || rules[idx].field== 'AVERAGE_ORDER_VALUE'" value="LESS_THAN">Lesser than</option>
                                        <option v-if="rules[idx].field=='AGE' || rules[idx].field=='TRANSACTIONS_COUNT' || rules[idx].field== 'TRANSACTIONS_VALUE' || rules[idx].field== 'AVERAGE_ORDER_VALUE'" value="GREATER_THAN_OR_EQUAL">Greater than or equal</option>
                                        <option v-if="rules[idx].field=='AGE' || rules[idx].field=='TRANSACTIONS_COUNT' || rules[idx].field== 'TRANSACTIONS_VALUE' || rules[idx].field== 'AVERAGE_ORDER_VALUE'" value="LESS_THAN_OR_EQUAL">Lesser than or equal</option>
                                        <option v-if="rules[idx].field=='AGE' || rules[idx].field=='GENDER' || rules[idx].field=='LOCATION' || rules[idx].field=='TRANSACTIONS_COUNT' || rules[idx].field== 'TRANSACTIONS_VALUE' || rules[idx].field== 'AVERAGE_ORDER_VALUE' || rules[idx].field=='TRANSACTION_DAYS_AGO'|| rules[idx].field=='UPCOMING_BIRTHDAY_ANNIVERSARY'|| rules[idx].field=='UPCOMING_REGISTRATION_ANNIVERSARY'" value="EQUAL">Equal</option>
                                    </select>
                                </div>
                                <div class="error col-sm-12 text-left" style="margin-left:50%" v-if="$v.rules.$each[idx].ruleCondition.$error && !$v.rules.$each[idx].ruleCondition.required">Please select a condition</div>
                              </div>
                         </div>
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.description2.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Rule Description</label>
                                <div class="col-sm-6">
                                    <textarea class="form-control" :disabled="true"
                                     v-model.trim="$v.description2.$model">
                                    </textarea>
                                </div>
                                <div class="error col-sm-12 text-right" v-if="$v.description2.$error && !$v.description2.maxLength">Maximum allowed length is 100 characters</div>
                              </div>
                         </div>
                     </div>
                     <div class="row">
                        <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.rules.$each[idx].value1.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right" v-if="rules[idx].ruleCondition!='BETWEEN'">Value *</label>
                                <label for="name" class="col-sm-6
                                    col-form-label text-right" v-else>Value (from) *</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control" :disabled="true"
                                     v-model="$v.rules.$each[idx].value1.$model">
                                </div>
                                <div class="error col-sm-12 text-left" style="margin-left:50%" v-if="$v.rules.$each[idx].value1.$error && !$v.rules.$each[idx].value1.required">Please enter a value</div>
                                <div class="error col-sm-12 text-left" style="margin-left:50%" v-if="$v.rules.$each[idx].value1.$error && !$v.rules.$each[idx].value1.regex">Please enter a valid value</div>
                              </div>
                        </div>
                        <div class="col-md-4" v-if="rules[idx].ruleCondition=='BETWEEN'">
                             <div class="form-group row" :class="{ 'form-group--error': $v.rules.$each[idx].value2.$error }">
                                <label for="name" class="col-sm-6
                                    col-form-label text-right">Value (to)</label>
                                <div class="col-sm-6">
                                   <input type="text" class="form-control" :disabled="true"
                                     v-model="$v.rules.$each[idx].value2.$model">
                                </div>
                                <div class="error col-sm-12 text-left" style="margin-left:50%" v-if="$v.rules.$each[idx].value2.$error && !$v.rules.$each[idx].value2.required">Please enter a value</div>
                                <div class="error col-sm-12 text-left" style="margin-left:50%" v-if="$v.rules.$each[idx].value2.$error && !$v.rules.$each[idx].value2.regex">Please enter a valid value</div>
                              </div>
                        </div>
                     </div>
                     <div class="row">
                         <div class="col-md-4">
                             <div class="form-group row" :class="{ 'form-group--error': $v.rules.$each[idx].isActive.$error }">
                                  <label for="name" class="col-sm-6
                                    col-form-label text-right">Status</label>
                                <div class="col-sm-6">
                                     <div class="custom-control custom-switch">
                                       <input type="checkbox" :id="item.id" class="custom-control-input" :disabled="true"
                                         v-model="$v.rules.$each[idx].isActive.$model">
                                       <label :for="item.id" class="custom-control-label"></label>
                                     </div>
                                </div>
                             </div>
                         </div>
                     </div>
                     
                 </div>
            </div>
          
        </draggable></div>
        
         
        <div v-if="this.action !='view' ">
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
.btn-outline-secondary{
    font-size: 13px;
    height: 31px;
    border: 1px solid #7e7e7e !important;
    border-right: 0px !important;
    color: #495057;
}
.phonefield_pnl .dropdown-item{
    font-size: 13px;
}
.resetpassword {
        color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}
.resetpassword:hover {
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
}
.test{
  visibility: hidden;
}
</style>

<script>
import AppLayout from "@/layouts/Admin.vue";
import $ from "jquery";
import Draggable from "vuedraggable";
import DebugMixin from '@/mixins/debug';
import { required, requiredIf, maxLength, helpers, regex, numeric } from "vuelidate/lib/validators";
import moment from "moment";
import filter from "lodash/filter";
import Loading from 'vue-loading-overlay';
export default {
  name: "ManageSegment",
  components: {
    AppLayout,
    Draggable,
    Loading
  },
  mixins: [
    DebugMixin,
  ],
  data: function() {
    return {
      id: "",
      action: "create",
      name: "",
      description1: "",
      ruleCategory: "",
      description2: "",
      status:true,
      rules: [],
      fieldOpts: [
        {value:"AGE", text: "Age", active: true,id:3},
        {value:"GENDER", text: "Gender", active: true,id:4},
        {value:"LOCATION", text: "Location", active: true,id:5},
        {value:"TRANSACTIONS_COUNT", text: "Transaction count", active: true,id:6},
        {value:"TRANSACTIONS_VALUE", text: "Transaction value", active: true,id:7},
       // {value:"BRAND", text: "Brand", active: true},
        {value:"AVERAGE_ORDER_VALUE", text: "Average order value", active: true,id:8},
       // {value:"TIME_PERIOD", text: "Time period", active: true},
       // {value:"POS_PURCHASES", text: "POS purchases", active: true},
        {value:"TRANSACTION_DAYS_AGO", text: "Transaction days ago", active: true,id:9},
        {value:"UPCOMING_BIRTHDAY_ANNIVERSARY", text: "Upcoming birthday anniversary", active: true,id:10},
        {value:"UPCOMING_REGISTRATION_ANNIVERSARY", text: "Upcoming registration anniversary", active: true,id:11}
      ],
      a:[        
        {value:"AGE", text: "Age", active: true},
        {value:"GENDER", text: "Gender", active: true},
        {value:"LOCATION", text: "Location", active: true},
        {value:"UPCOMING_BIRTHDAY_ANNIVERSARY", text: "Upcoming birthday anniversary", active: true},
        {value:"UPCOMING_REGISTRATION_ANNIVERSARY", text: "Upcoming registration anniversary", active: true} , 

      ],
      b:[
                {value:"TRANSACTIONS_COUNT", text: "Transaction count", active: true},
        {value:"TRANSACTIONS_VALUE", text: "Transaction value", active: true},
        {value:"AVERAGE_ORDER_VALUE", text: "Average order value", active: true},
       // {value:"TRANSACTION_DAYS_AGO", text: "Transaction days ago", active: true},
        
        
      ],
      numOfRules: -1,
      isLoading: true,
      loadingbgcolor : '#0069d9'
    };
  },
  validations: {
    name: {
      required,
      regex: helpers.regex("alpha", /^[a-zA-Z][a-zA-Z\s]*$/),
      maxLength: maxLength(20)
    },
    description1: {
      maxLength: maxLength(100)
    },
    ruleCategory: {
      required
    },
    description2: {
      maxLength: maxLength(100)
    },
    rules:{
      $each: {
        level: {
          required
        },
        field: {
          required
        },
       // aggregate: {
         // required
        //},
        ruleCondition: {
          required
        },
        value1: {
          required,
          regex: helpers.regex("alpha", /^[a-zA-Z0-9][a-zA-Z0-9\s]*$/),
        },
        value2: {
          regex: helpers.regex("alpha", /^[0-9][0-9\s]*$/),
          required: requiredIf(function(obj) {
            return (this.ruleCondition == "BETWEEN")
          })
        },
        isActive: {
        },
      }
    }
  },
      handleSuspendItem : function(id){
       var bstatus = confirm("Are you sure Suspend this Merchant?");
      if(bstatus == true){
        let cachescope = this;
      cachescope.isLoading = true;
      this.$store.dispatch(`segment/deactivate`, id).then(function(res) {
        cachescope.isLoading = false;
        let idx = cachescope.rows.findIndex(ele => ele.id == id);
        if(idx >=0) {
          cachescope.rows[idx].isActive = !(cachescope.rows[idx].isActive);
        }
        cachescope.$toast.open({
          message: "segment suspended successfully",
          type: "success",
          duration: 2000,
          dismissible: true,
          position: 'top'
        });
      });
      }
    },
  methods: {
    getSegmentInfo(id) {
      let cachescope = this;
      cachescope.submitStatus = "LOADING";
      let suserid  = this.$store.getters["account/getuserid"];
      let param = {
        partnerId: suserid,
        id: this.id
      }
      this.$store.dispatch("segment/get", param).then(function(res) {
        cachescope.submitStatus = "IDLE";
        //cachescope.myDebug(JSON.stringify(res));
        cachescope.name = res.name;
        cachescope.status = res.status;
        cachescope.description1 = res.description;
        res.segmentRulesDtoList.forEach((ele,idx) => {
          cachescope.addRule();
          cachescope.rules[idx].segmentRulesDtoListId = ele.id;
          cachescope.ruleCategory = ele.ruleCategory;
          cachescope.description2 = ele.description;
          cachescope.rules[idx].level = ele.level;
          cachescope.rules[idx].field = ele.field;
         // cachescope.rules[idx].aggregate = ele.aggregate;
          cachescope.rules[idx].ruleCondition = ele.ruleCondition;
          cachescope.rules[idx].value1 = ele.value1;
          cachescope.rules[idx].value2 = ele.value2;
          cachescope.rules[idx].isActive = ele.isActive;
        });
        cachescope.isLoading = false;
      }).catch(function(err){
        cachescope.$toast.open({
          message: "Segment edit failed. Please try again after sometime",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: 'top'
        });
        cachescope.isLoading = false;
      });
    },
        getrule(){
 if(this.ruleCategory=="CUSTOMER")
   this.fieldOpts=this.a;
 else  if(this.ruleCategory == "PURCHASE")
 this.fieldOpts=this.b;
 else if(this.ruleCategory == "SELECT")
 this.fieldOpts=[];
    },
    addRule() {
      let id = ++this.numOfRules;
      let rule = {
        id: id,
        segmentRulesDtoListId: "",
        level: 0,
        field: "",
        description2:"",
       // aggregate: "",
        ruleCondition: "",
        value1: "",
        value2: "",
        isActive: true
      }
      this.rules.push(rule);
    },
    removeRule(idx) {
             var bstatus = confirm("Are you sure want to delete?");
       if(bstatus == true) {
      
      let oldVal = this.rules[idx].field;
      if(oldVal != "") {
        let oldField = this.fieldOpts.find(ele => {
          return ele.value == oldVal;
        })
        oldField.active = true;
      }
      this.$delete(this.rules, idx);
       }
    },
    /*moveRuleUp(idx) {
      let prevIdx = idx - 1;
      if(prevIdx < 0 ) {
        return;
      }
      let tmp = this.rules[idx];
      this.rules[idx] = this.rules[prevIdx];
      this.rules[prevIdx] = tmp;
      //[this.rules[idx], this.rules[prevIdx]] = [this.rules[prevIdx], this.rules[idx]];
    },
    moveRuleDown(idx) {
    },*/
    handleFieldSelection(event, idx) {
      let newVal = event.target.value;
      let oldVal = this.rules[idx].field;
      this.rules[idx].field = newVal;
      let newField = this.fieldOpts.find(ele => {
        return ele.value == newVal;
      })
      newField.active = false;
      if(oldVal != "") {
        let oldField = this.fieldOpts.find(ele => {
          return ele.value == oldVal;
        })
        oldField.active = true;
      }
    },
    editField(idx) {
      let val = this.rules[idx].field;
      this.rules[idx].field = "";
      if(val != "") {
        let field = this.fieldOpts.find(ele => {
          return ele.value == val;
        })
        field.active = true;
      }
    },
    getFieldText(val) {
      if(val != "") {
        let field = this.fieldOpts.find(ele => {
          return ele.value == val;
        })
        return field.text;
      }
    },
    handleSubmit() {
       
      if(this.isFormValid()) {
       
        this.isLoading = true;
        // console.log("segment submit");
        let suserid  = this.$store.getters["account/getuserid"];
        let postJson = {
          id: suserid,
          data: {
            name: this.name,
            description: this.description1,
            status:this.status,
            segmentRulesDtoList: []
          }
          
        }
        this.rules.forEach((ele,idx) => {
          let ruleObj = {
            ruleCategory: this.ruleCategory,
            description: this.description2,
            
            level: idx,
            field: ele.field,
            //aggregate: ele.aggregate,
            ruleCondition: ele.ruleCondition,
            value1: ele.value1,
            value2: ele.value2,
            isActive: ele.isActive
          }
          postJson.data.segmentRulesDtoList.push(ruleObj);
          if(this.action == "edit") {
            postJson.data.segmentRulesDtoList[idx].id = ele.segmentRulesDtoListId;
          }

        });
       console.log("check the data",postJson);
        this.submitStatus = "LOADING";
        let cachescope = this;
        let storeAction = "";
        if(this.action == "create") {
          storeAction = "segment/create";
          this.$store.dispatch(storeAction, postJson).then(function(res) {
          cachescope.$toast.open({
              message: "Segment created successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.$router.push({ path: `/segment` });
        }).catch(function(err){
          let msg=err.message;
          cachescope.$toast.open({
              message: msg,
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
          cachescope.$router.push({ path: `/segment` });
        });
        } else if(this.action == "edit") {
          postJson.data.id = this.id;
          storeAction = "segment/update";
          this.$store.dispatch(storeAction, postJson).then(function(res) {
          cachescope.$toast.open({
              message: "Segment Updated successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading = false;
          cachescope.$router.push({ path: `/segment` });
        }).catch(function(err){
          let msg=err.message;
          cachescope.submitStatus = "IDLE";
          cachescope.$toast.open({
              message: msg,
              type: "error",
              duration: 3000,
              dismissible: true,
              position: 'top'
          });
          cachescope.isLoading = false;
        });
        } else {
            this.myDebug("Invalid action");
            return;
        }
      }
    },
    handleCancel() {
      this.$router.push({ path: `/segment` });
    },
    isFormValid() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        return true;
      }
      return false;
    }
  },
  computed: {
    activeFieldOpts() {
      return this.fieldOpts.filter(function(ele) {
        return ele.active;
      })
    }
  },
  mounted() {
    $(".nav-segment").addClass("active");
   
    if(this.$route.query) {
      let obj = this.$route.query;
      if(Object.prototype.hasOwnProperty.call(obj, 'action')) {
        this.action = this.$route.query.action;
      }
      if(this.action != "create" && Object.prototype.hasOwnProperty.call(obj, 'segment')) {
        /* View or Edit action */
        this.id = this.$route.query.segment;
      }
    }

    if(this.action == "view") {
      /* TODO :: ADD A VIEWABLE layer on top */
    }

    if(this.action == "create") {
      this.isLoading = false;
      this.addRule();
    }

    if((this.action != "create") && (this.id != undefined)) {
        this.getSegmentInfo(this.id);
    }
  }
};
</script>
