import React, { Component } from 'react';

import Header from '../components/Header/Header';
// import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import BuyItemFromUser from '../components/BuyItemFromUser/BuyItemFromUser';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class BuyFrom extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <BuyItemFromUser {...this.props}/>
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default BuyFrom
