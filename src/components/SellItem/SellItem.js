import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import axios from 'axios'

import NFTABI from '../../abi/NFTABI'
import { NFTAddress } from '../../Config'
import { API_URL, IPFS_IMG_URL, MainAsset } from '../../Config'
import Web3 from "web3";
import { toWei } from 'web3-utils'

class BuyItem extends Component {
    state = {
      tokenPrice:"0"
    }

    sell = async (e) => {
      e.preventDefault()
      if(this.state.tokenPrice <= 0){
        alert("Please input amount")
        return
      }

      if(this.props.walletStore.accountConnected){
        const web3 = this.props.walletStore.web3
        const account = this.props.walletStore.accounts[0]
        const nftId = this.props.match.params.item
        const nft = new web3.eth.Contract(NFTABI, NFTAddress)
        let ownerOf = "0x"

        try{
          ownerOf = await nft.methods.ownerOf(nftId).call()
        }catch(e){
          alert("Check ownership error")
          console.log("Errr", e)
          return
        }

        if(String(ownerOf).toLowerCase() !== String(account).toLowerCase()){
          alert("You are not owner")
          return
        }

        nft.methods.offerForSale(
          nftId,
          toWei(String(this.state.tokenPrice))
        ).send({ from:account })
      }
      else{
        alert("Please connect wallet")
      }
    }

    render() {
        return (
            <section className="author-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center">
                                <span>Sell</span>
                                <br/>
                                <br/>
                                <img className="profile-photo" src={`${IPFS_IMG_URL}${this.props.match.params.item}.png`} alt={"Carlie Anglemire"}/>
                            </div>
                            {/* Item Form */}
                            <form id="contact-form" className="item-form card no-hover">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            name="price"
                                            placeholder={`${MainAsset} amount`}
                                            required="required"
                                            onChange={((e) => this.setState({tokenPrice:e.target.value}))}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <button
                                        className="btn w-100 mt-3 mt-sm-4"
                                        onClick={(e) => this.sell(e)}
                                        ><i/>Offer at this price</button>
                                    </div>
                                </div>
                            </form>
                            <p className="form-message" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default inject("walletStore")(observer(BuyItem))
