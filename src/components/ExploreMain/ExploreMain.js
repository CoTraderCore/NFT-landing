import React, { Component } from 'react'
import axios from 'axios'
import STAKEABI from '../../abi/STAKEABI'
import Web3 from "web3"
import { fromWei } from 'web3-utils'
import {
  IPFS_IMG_URL,
  API_URL,
  StakeAddress,
  MainAsset
} from '../../Config'


class ExploreMain extends Component {
   state = {
     availableNfts:[],
     tokenPrice:"0"
   }

   componentDidMount = async () => {
     let availableNfts = []
     let tokenPrice = "0"
     // Load data from blockchain
     try{
       const web3 = new Web3(process.env.REACT_APP_WEB3_DEFAULT_PROVIDER)
       const contractSTAKE = new web3.eth.Contract(STAKEABI, StakeAddress)
       tokenPrice = String(await contractSTAKE.methods.nftPrice().call())
     }catch(e){
       alert("Can not load data from contracts")
       console.log("Errr", e)
     }
     // Load data from api
     try{
       const nftData = await axios.get(API_URL + 'nfts/')
       const allNfts = nftData.data.result
       availableNfts = allNfts.filter(item => item.tokenIndexUsed === 0)
     }catch(e){
       alert("Can not get data from api")
       console.log("Errr", e)
     }

     this.setState({
       availableNfts,
       tokenPrice
     })
    }
    render() {
        return (
            <section className="explore-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-content">
                                    <span>Available nfts</span>
                                    <h3 className="mt-3 mb-0">for sell or claim</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {this.state.availableNfts.map((item, index) => {
                            return (
                                <div key={`edt_${item.tokenIndex}`} className="col-12 col-sm-6 col-lg-3 item">
                                    <div className="card">
                                        <div className="image-over">
                                            <a href="/item-details">
                                                <img className="profile-photo" src={`${IPFS_IMG_URL}${item.tokenIndex}.png`} alt={"NFT"}/>
                                            </a>
                                        </div>
                                        {/* Card Caption */}
                                        <div className="card-caption col-12 p-0">
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <h5 className="mb-0">Price {fromWei(String(this.state.tokenPrice))} {MainAsset}</h5>
                                                <div className="card-bottom d-flex justify-content-between">
                                                <a className="btn btn-bordered-white btn-smaller mt-3" href={`#/buy/${index}`}><i className="icon-handbag mr-2" />Buy</a>
                                                <br/>
                                                <a className="btn btn-bordered-white btn-smaller mt-3" href={`#/claim/${index}`}>Claim</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
}

export default ExploreMain;
