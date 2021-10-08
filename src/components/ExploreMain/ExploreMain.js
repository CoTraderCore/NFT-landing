import React, { Component } from 'react';
import axios from 'axios';
import { IPFS_IMG_URL, API_URL } from '../../Config'

class ExploreMain extends Component {
   state = {
     availableNfts:[]
   }

   componentDidMount = async () => {
     try{
       const nftData = await axios.get(API_URL + 'nfts/')
       const allNfts = nftData.data.result
       const availableNfts = allNfts.filter(item => item.tokenIndexUsed === 0)
       this.setState({
         availableNfts
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
                                                <a href="/item-details">
                                                    <h5 className="mb-0">token index {item.tokenIndex}</h5>
                                                </a>
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
