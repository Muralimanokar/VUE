import Proxy from './Proxy';

class BroadcastcampaignProxy extends Proxy {

  constructor(parameters = {}) {
    super('broadcast', parameters);
  }

  addTemplate(param){
    return this.submit('post', `${this.endpoint}/add`,param);
  }

  schedulecampaign(param){
    return this.submit('post', `${this.endpoint}/schedule`,param);
  }

  updateBroadcastcampaign(param){
    return this.submit('post', `${this.endpoint}/update`,param);
  }

  getBroadcastcampaign(id, param){
    this.parameters = param;
    return this.submit('get', `${this.endpoint}/partner/${id}/all`);
  }

  getBroadcastcampaignedit(id){
    return this.submit('get', `${this.endpoint}/one?id=${id}`);
  }

  deleteBroadcastcampaign(id){
    return this.submit('delete', `${this.endpoint}/delete?id=${id}`);
  }

}

export default BroadcastcampaignProxy;
