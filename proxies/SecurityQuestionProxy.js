import Proxy from './Proxy';

class SecurityQuestionProxy extends Proxy {

  constructor(parameters = {}) {
    super('security-questions', parameters);
  }

  getSecurityQuestions() {
    let url = process.env.VUE_APP_API_AUTH + "security-questions/all";
    return this.submit('get', url);
  }

  addOrChangeSecurityQuestions(param) {
    let url = `${process.env.VUE_APP_API_AUTH}security-questions/user/add-change?loyaltyId=${param.id}`;
    return this.submit('post', url, param.data);
  }

  getUserSecQuesAns(param) {
    let url = `${process.env.VUE_APP_API_AUTH}security-questions/user/all?loyaltyId=${param}`;
    return this.submit('get', url);
  }
}

export default SecurityQuestionProxy;
