import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import axios from 'axios'

import NFTABI from '../../abi/NFTABI'
import { NFTAddress } from '../../Config'
import { API_URL } from '../../Config'

const initData = {
    pre_heading: "Buy item",
    heading: "Buy item",
    content: "Item description here, should be loaded from api, json, or props"
}

class BuyItem extends Component {
    state = {
      initData: {},
      ethAmount: 0,
      isReserved: false,
      isPurchased:false
    }

    componentDidMount = async () => {
      const { isReserved, isPurchased } = await this.checkNFTData()
      this.setState({
          initData: initData,
          isReserved,
          isPurchased
      })
    }

    componentDidUpdate = async (prevProps, prevState) => {
      if(prevProps.match.params.item !== this.props.match.params.item){
        const { isReserved, isPurchased } = await this.checkNFTData()
        this.setState({
            isReserved,
            isPurchased
        })
      }
    }

    checkNFTData = async () => {
       try{
         const nftData = await axios.get(API_URL + 'nft/' + this.props.match.params.item)
         const reserveTime = nftData.data.result.tokenReservedTime
         const buyStatus = nftData.data.result.tokenIndexUsed
         console.log("buyStatus", buyStatus)

         const now = Date.now() / 1000
         const reserveDelay = 900 // 15 minutes

         const isReserved = now > reserveTime + reserveDelay ? false : true
         const isPurchased = Number(buyStatus) === 1 ? true : false

         return { isReserved, isPurchased }
       }
       catch(e){
         alert("Error with api, please try latter")
         console.log("Error", e)
         return { isReserved:true, isPurchased:true }
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

    buy = async (e) => {
      e.preventDefault()
      if(this.props.walletStore.accountConnected){
        const web3 = this.props.walletStore.web3
        const contractNFT = new web3.eth.Contract(NFTABI, NFTAddress)

        // check input
        if(this.state.ethAmount <= 0){
          alert("Please input amount")
          return
        }

        // reserve this token in api
        const isReserved = await this.reserve()

        if(isReserved){
          // buy
          await contractNFT.methods.buyVampire(this.props.match.params.item)
          .send({
            from:this.props.walletStore.accounts[0],
            value: web3.utils.toWei(String(this.state.ethAmount))
          })
        }
      }
      else{
        alert("Please connect wallet")
      }
    }

    render() {
      console.log(this.state.isPurchased, this.state.isReserved)
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
                                        <div className="form-group mt-3">
                                            <input
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            name="price"
                                            placeholder="ETH amount"
                                            required="required"
                                            onChange={((e) => this.setState({ethAmount:e.target.value}))}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                    {
                                      !this.state.isReserved && !this.state.isPurchased
                                      ?
                                      (
                                        <button
                                        className="btn w-100 mt-3 mt-sm-4"
                                        onClick={(e) => this.buy(e)}
                                        ><i/>Buy</button>
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

export default inject("walletStore")(observer(BuyItem))
