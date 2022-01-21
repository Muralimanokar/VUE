import { data, param } from 'jquery';
import Proxy from './Proxy';

class RewardProxy extends Proxy {

  constructor(parameters = {}) {
    super('reward', parameters);
  }

  getRewardList(param){
    return this.submit('get', `${this.endpoint}/list?partnerId=${param}`);
  }

  getReward(param){
    return this.submit('get', `${this.endpoint}/list?rewardId=${param.id}&partnerId=${param.partnerId}`);
  }

  createReward(partnerId, param){
    return this.submit('post', `${this.endpoint}/add/partner/${partnerId}`, param);
  }

  updateReward(partnerId, param){
    return this.submit('post', `${this.endpoint}/update/partner/${partnerId}`, param);
  }

 /* getRewardRedeemedList(param){
    if(param) {
      return this.submit('get', `${this.endpoint}/redeemed/list?rewardId=${param}`);
    } else {
      return this.submit('get', `${this.endpoint}/redeemed/list`);
    }
  }*/
  getRewardRedeemedList(param){

    return this.submit('get', `${this.endpoint}/redeemed/list/partner?partnerId=${param}`);
    
  }

  getRewardRedeemed(id){
    return this.submit('get', `${this.endpoint}/redeemed/one?redeemedId=${id}`);
  }

  getRewardCategoryList(param){
    return this.submit('get', `${this.endpoint}/category/all?partnerId=${param}`);
  }

  getRewardCategoryActiveList(){
    return this.submit('get', `${this.endpoint}/category/all?status=true`);
  }

  getRewardCategory(param){
    return this.submit('get', `${this.endpoint}/category/all?rewardCategoryId=${param.id}&partnerId=${param.partnerId}`);
  }

  createRewardCategory(param){
    return this.submit('post', `${this.endpoint}/category/add`, param);
  }

  updateRewardCategory(param){
    return this.submit('post', `${this.endpoint}/category/update`, param);
  }

  AssignRewardtocustomer(id, param){
    return this.submit('post', `${this.endpoint}/partner/${id}/assign/customer`, param);
  }

  segmentInit(segmentId){
    return this.submit('get', `${this.endpoint}/get/segment?segmentId=${segmentId}`);
  }

  tierInit(param){
    return this.submit('get', `${this.endpoint}/get/tier?tierId=${param.tierId}&partnerId=${param.partnerId}`);
  }
  rewardvalue(param){
    return this.submit('get', `${this.endpoint}/rewardType/list?type=${param.type}`);
  }
  couponcode(param){
    return this.submit('get', `${this.endpoint}/generateCoupon?couponCount=${param.id}`);
  }
}

export default RewardProxy;
