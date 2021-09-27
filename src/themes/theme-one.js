import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Collections from '../components/Collections/Collections';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

// import Work from '../components/Work/Work';
// import Auctions from '../components/Auctions/AuctionsOne';
// import TopSeller from '../components/TopSeller/TopSellerOne';
// import Explore from '../components/Explore/ExploreOne';
// import Hero from '../components/Hero/Hero';

class ThemeOne extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Collections />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default ThemeOne;
