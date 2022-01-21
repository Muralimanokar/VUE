/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// Modules
import account from './modules/account';
import auth from './modules/auth';
import counter from './modules/counter';
import roles from './modules/roles';
import admin from './modules/admin';
import customer from './modules/customer';
import tiers from './modules/tiers';
import country from './modules/country';
import states from './modules/states';
import subscription from './modules/subscription';
import merchant from './modules/merchant';
import points from './modules/points';
import accountManage from './modules/account-manage';
import transaction from './modules/transaction';
import purchases from './modules/purchases';
import businessconf from './modules/businessconf';
import segment from './modules/segment';
import earningrule from './modules/earningrule';
import reward from './modules/reward';
import merchantTiers from './modules/merchant-tiers'
import merchantSegment from './modules/merchant-segment'
import merchantCustomer from './modules/merchant-customer';
import merchantTxn from './modules/merchant-txn';
import partner from './modules/partner'
import report from './modules/report'
import broadcastcampaign from './modules/broadcastcampaign';
import securityquestion from './modules/securityquestion';
import password from './modules/password';
import invite from './modules/invite';
import user from './modules/user';
import rule from './modules/rule';
import get from './modules/get';


const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  /**
   * Assign the modules to the store.
   */
  modules: {
    account,
    auth,
    counter,
    roles,
    admin,
    customer,
    tiers,
    country,
    states,
    subscription,
    merchant,
    points,
    accountManage,
    transaction,
    purchases,
    businessconf,
    segment,
    earningrule,
    reward,
    merchantTiers,
    merchantSegment,
    merchantCustomer,
    merchantTxn,
    partner,
    report,
    broadcastcampaign,
    securityquestion,
    password,
    invite,
    user,
    rule,
    get
  },

  /**
   * If strict mode should be enabled.
   */
  strict: debug,

  /**
   * Plugins used in the store.
   */
  plugins: debug ? [createLogger()] : [],
});
