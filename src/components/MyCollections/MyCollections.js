import React, { Component } from 'react'
import { IPFS_IMG_URL, API_URL } from '../../Config'
import { inject, observer } from 'mobx-react'
import axios from 'axios'

class MyCollections extends Component {
    state = {
      allNfts:[],
      myNfts:[],
      userWallet:undefined
    }

    componentDidMount = async () => {
      const nftData = await axios.get(API_URL + 'nfts/')
      const allNfts = nftData.data.result
      const userWallet = this.props.walletStore.accounts ? this.props.walletStore.accounts[0] : undefined
      const myNfts = allNfts.filter(item => item.owner.toLowerCase().includes(String(userWallet).toLowerCase()))
      this.setState({
        allNfts,
        userWallet,
        myNfts
      })
    }

    componentDidUpdate(prevProps, prevState){
      if(this.props.walletStore.accountConnected && !this.state.userWallet){
        const userWallet = this.props.walletStore.accounts[0]
        const myNfts = this.state.allNfts.filter(item => item.owner.toLowerCase().includes(String(userWallet).toLowerCase()))
        this.setState({
          userWallet,
          myNfts
        })
      }
    }

    render() {
        return (
            <section className="popular-collections-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-content">
                                    <h3 className="mt-3 mb-0">My nfts</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                      this.props.walletStore.accountConnected
                      ?
                      (
                        <div className="row items">
                            {this.state.myNfts.map((item, index) => {
                                return (
                                    <div key={`cd_${index}`} className="col-12 col-sm-6 col-lg-3 item">
                                        <div className="card no-hover text-center">
                                            <div className="image-over">
                                                <img className="profile-photo" src={`${IPFS_IMG_URL}${item.tokenIndex}.png`} alt={"NFT"}/>
                                                <br/>
                                                <a className="btn btn-bordered-white btn-smaller mt-3" href={`#/sell/${item.tokenIndex}`}>Sell</a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                      )
                      :
                      (
                        <p>Please connect wallet</p>
                      )
                    }

                </div>
            </section>
        );
    }
}

export default inject("walletStore")(observer(MyCollections))
