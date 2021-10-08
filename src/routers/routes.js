import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

// importing all the themes
import ThemeOne from "../themes/theme-one";
import Auctions from "../themes/auctions";
import ItemDetails from "../themes/item-details";
import Activity from "../themes/activity";
import Blog from "../themes/blog";
import BlogSingle from "../themes/blog-single";
import HelpCenter from "../themes/help-center";
import Authors from "../themes/authors";
import Author from "../themes/author";
import WalletConnect from "../themes/wallet-connect";
import Create from "../themes/create";
import Login from "../themes/login";
import Signup from "../themes/signup";
import Contact from "../themes/contact";
import Claim from "../themes/claim";
import Buy from "../themes/buy";
import BuyFrom from "../themes/buy-from";
import MyNfts from "../themes/my-nfts"
import Sell from "../themes/sell"
import Offers from "../themes/offers"
import Explore from "../themes/explore"

class MyRouts extends React.Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={ThemeOne} />
            <Route exact path="/auctions" component={Auctions} />
            <Route exact path="/item-details" component={ItemDetails} />
            <Route exact path="/activity" component={Activity} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/blog-single" component={BlogSingle} />
            <Route exact path="/help-center" component={HelpCenter} />
            <Route exact path="/authors" component={Authors} />
            <Route exact path="/author" component={Author} />
            <Route exact path="/wallet-connect" component={WalletConnect} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/contact" component={Contact} />


            <Route exact path="/explore" component={Explore} />
            <Route path="/offers" render={(props) => <Offers {...props} />} />}/>
            <Route path="/my-nfts" render={(props) => <MyNfts {...props} />} />}/>
            <Route path="/sell/:item" render={(props) => <Sell {...props} />} />}/>
            <Route path="/claim/:item" render={(props) => <Claim {...props} />} />}/>
            <Route path="/buy/:item" render={(props) => <Buy {...props} />} />
            <Route path="/buy-from-user/:item" render={(props) => <BuyFrom {...props} />} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
export default MyRouts;
