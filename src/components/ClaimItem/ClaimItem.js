import React, { Component } from 'react';
import NFTABI from '../../abi/NFTABI'
import { NFTAddress } from '../../Config'
import { inject, observer } from 'mobx-react'


const initData = {
    pre_heading: "Claim item",
    heading: "Claim item",
    content: "Claim unique NFT (free up to 6000)"
}

class ClaimItem extends Component {
    state = {
        initData: {}
    }
    componentDidMount(){
        this.setState({
            initData: initData
        })
    }

    claim(e){
      e.preventDefault()
      if(this.props.walletStore.accountConnected){
        const web3 = this.props.walletStore.web3
        const contractNFT = new web3.eth.Contract(NFTABI, NFTAddress)
        contractNFT.methods.createNewVampire()
        .send({ from:this.props.walletStore.accounts[0] })
      }else{
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
                                <span>{this.state.initData.pre_heading}</span>
                                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                                <p>{this.state.initData.content}</p>
                            </div>
                            {/* Item Form */}
                            <form id="contact-form" className="item-form card no-hover">
                                <div className="row">

                                    <div className="col-12">
                                        <button
                                        className="btn w-100 mt-3 mt-sm-4"
                                        onClick={(e) => this.claim(e)}>Claim</button>
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
