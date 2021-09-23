import React, { Component } from 'react';
import getWeb3 from '../../models/getWeb3'
import { inject, observer } from 'mobx-react'

class Wallet extends Component {

  connectWallet = async() =>{
    await getWeb3().then((response) => {
      this.props.walletStore.initWeb3(response)

      response.eth.getAccounts().then((result) => {
        this.props.walletStore.initAccounts(result)
      });
    });
  }

  render() {
    return (
      <div>
      {(this.props.walletStore.accountConnected)? <p>Account Connected Successfully!</p>:
        <button className="btn ml-lg-auto btn-bordered-white" onClick = {this.connectWallet}>Connect wallet</button>}
      </div>
      );
  }
}

export default inject("walletStore")(observer(Wallet))
