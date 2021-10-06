import React, { Component } from 'react';
import axios from 'axios';
import { IPFS_IMG_URL } from '../../Config'
const count = [0,1,2,3,4,5,6,7,8,9]

class ExploreTwo extends Component {
    render() {
        return (
            <section className="explore-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-content">
                                    <span>TODO</span>
                                    <h3 className="mt-3 mb-0">TODO</h3>
                                </div>
                                <div className="intro-btn">
                                    <a className="btn content-btn" href="/explore-1">TODO</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {count.map((index) => {
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
                                                    <h5 className="mb-0">TODO</h5>
                                                </a>
                                                <div className="seller d-flex align-items-center my-3">
                                                    <span>Owned By</span>
                                                    <a href="/author">
                                                        <h6 className="ml-2 mb-0">TODO</h6>
                                                    </a>
                                                </div>
                                                <div className="card-bottom d-flex justify-content-between">
                                                    <span>TODO</span>
                                                    <span>TODO</span>
                                                </div>
                                                <a className="btn btn-bordered-white btn-smaller mt-3" href="/wallet-connect"><i className="icon-handbag mr-2" />TODO</a>
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

export default ExploreTwo;
