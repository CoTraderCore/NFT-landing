import { observable, action, decorate } from 'mobx'

class WalletStore {
  web3 = null;
  accounts = null;
  accountConnected = false;

  initWeb3 = (_web3) => {
    this.web3 = _web3
  }

  initAccounts = (_accounts) => {
    this.accounts = _accounts
    this.accountConnected = true
  }
}



decorate(WalletStore, {
    web3:observable,
    accounts:observable,
    accountConnected:observable,
    initWeb3: action,
    initAccounts: action,
})

export default new WalletStore();
