import Proxy from './Proxy';

class RoleProxy extends Proxy {

  constructor(parameters = {}) {
    super('role', parameters);
  }

  getrolelist(param){
    let surl = process.env.VUE_APP_API_AUTH + `role/list`;
    return this.submit('get', surl);
  }

  getresourcelist(){
    let surl = process.env.VUE_APP_API_AUTH + "resources/all";
    return this.submit('get', surl);
  }

  getprivilegelist(){
    let surl = process.env.VUE_APP_API_AUTH + "privileges/all";
    return this.submit('get', surl);
  }

  createrole(param){
    let surl = process.env.VUE_APP_API_AUTH + "role/add";
    return this.submit('post', surl ,param);
  }

  getroledetails(param){
    let surl = process.env.VUE_APP_API_AUTH + "role/list?roleId=" +  param;
    return this.submit('get', surl);
  }

  updaterole(param){
    let surl = process.env.VUE_APP_API_AUTH + "role/update";
    return this.submit('post', surl ,param);
  }

  deleterole(roleId, newRoleId){
    let surl = process.env.VUE_APP_API_AUTH + `role/delete?roleId=${roleId}&newRoleId=${newRoleId}`;
    return this.submit('delete', surl, null);
  }

}

export default RoleProxy;
