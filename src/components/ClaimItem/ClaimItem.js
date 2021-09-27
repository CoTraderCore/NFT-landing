import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import axios from 'axios'

import NFTABI from '../../abi/NFTABI'
import { NFTAddress } from '../../Config'
import { API_URL } from '../../Config'

const initData = {
    pre_heading: "Claim item",
    heading: "Claim item",
    content: "Item description here, should be loaded from api, json, or props"
}

class ClaimItem extends Component {
    state = {
      initData: {},
      isReserved: false
    }
    componentDidMount = async () => {
      const isReserved = await this.checkIsReserved()
      this.setState({
          initData: initData,
          isReserved
      })
    }

    checkIsReserved = async () => {
       const nftData = await axios.get(API_URL + 'nft/' + this.props.match.params.item)
       const reserveTime = nftData.data.result.tokenReservedTime
       const now = Date.now() / 1000
       const reserveDelay = 900 // 15 minutes
       if(now > reserveTime + reserveDelay){
         return false
       }else{
         return true
       }
    }

    reserve = async () => {
      const axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Authorization': 'Bearer ' + process.env.REACT_APP_AUTH_TOKEN
        }
      }

      const body = { tokenIndex:this.props.match.params.item }

      try{
        await axios.post(API_URL + 'reserve-token/', body, axiosConfig)
        return true
      }catch(err){
        alert("Server error, please try latter",err)
        console.log("Error", err)
        return false
      }
    }

    claim = async (e) => {
      e.preventDefault()
      if(this.props.walletStore.accountConnected){
        const web3 = this.props.walletStore.web3
        const contractNFT = new web3.eth.Contract(NFTABI, NFTAddress)

        // reserve this token in api
        const isReserved = await this.reserve()

        if(isReserved){
          // claim
          await contractNFT.methods.buyVampire(this.props.match.params.item)
          .send({
            from:this.props.walletStore.accounts[0]
          })
        }
      }
      else{
        alert("Please connect wallet")
      }
    }

    render() {
      console.log("this.state.isReserved", this.state.isReserved)
        return (
            <section className="author-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center">
                                <span>{this.state.initData.pre_heading}</span>
                                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                                <p>{this.state.initData.content}</p>
                                <p style={{color:"red"}}>Item id: {this.props.match.params.item}</p>
                            </div>
                            {/* Item Form */}
                            <form id="contact-form" className="item-form card no-hover">
                                <div className="row">
                                    <div className="col-12">
                                    {
                                      !this.state.isReserved
                                      ?
                                      (
                                        <button
                                        className="btn w-100 mt-3 mt-sm-4"
                                        onClick={(e) => this.claim(e)}
                                        ><i/>Claim</button>
                                      )
                                      :
                                      (
                                        <div className="intro text-center">
                                        <p style={{color:"red"}}> This NFT is not available </p>
                                        </div>
                                      )
                                    }
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

export default inject("walletStore")(observer(ClaimItem))
