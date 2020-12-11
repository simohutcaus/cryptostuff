import React from "react";
import _ from "lodash";
import moment from 'moment';
export const AppContext = React.createContext();

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;



const cc = require("cryptocompare");

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "settings",
      favorites: ["BTC", "ETH", "XMR"],
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      confirmFavorites: this.confirmFavorites,
      //coinList: [],
      isInFavorites: this.isInFavorites,
      setCurrentFavorite: this.setCurrentFavorite,
      currentFavorite: 'BTC'
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
  };

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList: coinList });
    //console.log(coinList);
  };

  fetchHistorical = async () => {
    //if (this.state.firstVisit) return;
    let results = await this.historical();
    let historical = [
      {
        name: this.state.currentFavorite,
        data: results.map((ticker, index) => [
          moment().subtract({months: TIME_UNITS - index}).valueOf(),
          ticker.USD
        ])
      }
    ]
    this.setState({historical})
    console.log('results ' +  results);
  }

  historical = async () => {
    let promises = [];
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(
          this.state.currentFavorite,
          ["USD"],
          moment()
          .subtract({months: units})
          .toDate()
        )
      )
    }
    
    return Promise.all(promises);

  }


  confirmFavorites = () => {
    console.log("Hello ");
    this.setState({
      firstVisit: false,
      page: "dashboard",
    }, () => {
      this.fetchCoins();
      this.fetchPrices();
    });
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        favorites: this.state.favorites
      })
    );
  };

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    prices = prices.filter((price) => Object.keys(price).length);
    console.log(prices);
    this.setState({ prices });
  };

  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        let priceData = await cc.priceFull(this.state.favorites[i], "USD");
        returnData.push(priceData);
      } catch (e) {
        console.warn("Fetch price error: ", e);
      }
    }
    return returnData;
  };



  addCoin = (key) => {
    let favorites = [...this.state.favorites];
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({ favorites });
    }
  };

  setCurrentFavorite = (sym) => {
    this.setState({
      currentFavorite: sym,
      historical: null
    }, this.fetchHistorical);
    localStorage.setItem('cryptoDash', JSON.stringify({
      ...JSON.parse(localStorage.getItem('cryptoDash')), currentFavorite: sym
    }))
  };

  removeCoin = (key) => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: _.pull(favorites, key) });
  };

  isInFavorites = (key) => _.includes(this.state.favorites, key);

  savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }
    let { favorites, currentFavorite } = cryptoDashData;
    return { favorites, currentFavorite };
  }

  setPage = (page) => this.setState({ page });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
