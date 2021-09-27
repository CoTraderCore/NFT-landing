import React, { Component } from 'react';
import { IPFS_IMG_URL } from '../../Config'

const count = [0,1,2,3,4,5,6,7]

class Collections extends Component {
    render() {
        return (
            <section className="popular-collections-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-content">
                                    <span>Collections</span>
                                    <h3 className="mt-3 mb-0">Most popular</h3>
                                </div>
                                <div className="intro-btn">
                                    <a className="btn content-btn text-left" href="#/explore-1">Explore</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {count.map((index) => {
                            return (
                                <div key={`cd_${index}`} className="col-12 col-sm-6 col-lg-3 item">
                                    <div className="card no-hover text-center">
                                        <div className="image-over">
                                            <a href="/item-details">
                                                <img className="profile-photo" src={`${IPFS_IMG_URL}${index}.png`} alt={"NFT"}/>
                                            </a>
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

export default Collections;
