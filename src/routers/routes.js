import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

// importing all the themes
import ThemeOne from "../themes/theme-one";
import ExploreOne from "../themes/explore-one";
import ExploreTwo from "../themes/explore-two";
import ExploreThree from "../themes/explore-three";
import ExploreFour from "../themes/explore-four";
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


class MyRouts extends React.Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={ThemeOne} />
            <Route exact path="/explore-1" component={ExploreOne} />
            <Route exact path="/explore-2" component={ExploreTwo} />
            <Route exact path="/explore-3" component={ExploreThree} />
            <Route exact path="/explore-4" component={ExploreFour} />
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
            <Route exact path="/claim" component={Claim} />

            <Route path="/buy/:item" render={(props) => <Buy {...props} />} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
export default MyRouts;
