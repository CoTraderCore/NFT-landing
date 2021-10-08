import React, { Component } from 'react';
import axios from 'axios';
import { IPFS_IMG_URL, API_URL } from '../../Config'
import { Link } from "react-router-dom";


class SellOffers extends Component {
   state = {
     nftsOffers:[]
   }

   componentDidMount = async () => {
     try{
       const nftData = await axios.get(API_URL + 'nfts/')
       const allNfts = nftData.data.result
       const nftsOffers = allNfts.filter(item => item.isOffered && item.isOffered === 1)
       this.setState({
         nftsOffers
       })
     }catch(e){
       alert("Can not get data from api")
       console.log("Errr", e)
     }
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
                                    <span>NFTs for sale</span>
                                    <h3 className="mt-3 mb-0">users offer</h3>
                                </div>
                                <div className="intro-btn">
                                    <a className="btn content-btn" href="/explore-1">TODO</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {this.state.nftsOffers.map((item, index) => {
                            return (
                                <div key={`edt_${index}`} className="col-12 col-sm-6 col-lg-3 item">
                                    <div className="card">
                                        <div className="image-over">
                                            <a href="/item-details">
                                                <img className="profile-photo" src={`${IPFS_IMG_URL}${index}.png`} alt={"NFT"}/>
                                            </a>
                                        </div>
                                        {/* Card Caption */}
                                        <div className="card-caption col-12 p-0">
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <a href="/item-details">
                                                    <h5 className="mb-0">{item.isOffered}</h5>
                                                </a>
                                                <div className="seller d-flex align-items-center my-3">
                                                    <span>Owned By</span>
                                                    <a href="/author">
                                                        {
                                                          item.owner !== "0x"
                                                          ?
                                                          (
                                                            <h6 className="ml-2 mb-0">
                                                            {String(item.owner).replace(String(item.owner).substring(6,36), "...")}
                                                            </h6>
                                                          )
                                                          :
                                                          (
                                                            <h6 className="ml-2 mb-0">{item.owner}</h6>
                                                          )
                                                        }
                                                    </a>
                                                </div>
                                                <div className="card-bottom d-flex justify-content-between">
                                                </div>
                                                <Link to={`/buy-from-user/${item.tokenIndex}`} className="btn btn-bordered-white btn-smaller mt-3" ><i className="icon-handbag mr-2" />Buy</Link>
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

export default SellOffers;
