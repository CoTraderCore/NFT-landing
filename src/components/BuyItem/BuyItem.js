import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import axios from 'axios'

import STAKEABI from '../../abi/STAKEABI'
import { StakeAddress } from '../../Config'
import { API_URL, IPFS_IMG_URL } from '../../Config'
import Web3 from "web3";
import { fromWei } from 'web3-utils'

class BuyItem extends Component {
    state = {
      isReserved: false,
      isPurchased:false,
      tokenPrice:"0"
    }

    componentDidMount = async () => {
      const { isReserved, isPurchased } = await this.checkNFTData()
      const web3 = new Web3(process.env.REACT_APP_WEB3_DEFAULT_PROVIDER)
      const contractSTAKE = new web3.eth.Contract(STAKEABI, StakeAddress)
      const tokenPrice = String(await contractSTAKE.methods.nftPrice().call())
      this.setState({
          isReserved,
          isPurchased,
          tokenPrice
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
        const contractSTAKE = new web3.eth.Contract(STAKEABI, StakeAddress)

        // reserve this token in api
        const isReserved = await this.reserve()

        if(isReserved){
          // buy
          await contractSTAKE.methods.buyNFT(this.props.match.params.item)
          .send({
            from:this.props.walletStore.accounts[0],
            value: web3.utils.toWei(String(this.state.tokenPrice))
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
                                <span>Buy </span>
                                <br/>
                                <br/>
                                <img className="profile-photo" src={`${IPFS_IMG_URL}${this.props.match.params.item}.png`} alt={"Carlie Anglemire"}/>
                                <p style={{color:"red"}}>Price { fromWei(this.state.tokenPrice) } ETH</p>
                            </div>
                            {/* Item Form */}
                            <form id="contact-form" className="item-form card no-hover">
                                <div className="row">

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
