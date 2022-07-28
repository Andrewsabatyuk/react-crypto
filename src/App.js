import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get(' https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data)
      }).catch(error => console.log(error))
  }, [])

  // need to add sort and filter properties

  const filterCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

  const handleChange = e => {
    setSearch(e.target.value)
  }

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coinheader">Search any coin</h1>
        <form>
          <input type="text" placeholder='search' className='coin-input'
            onChange={handleChange}
          />
        </form>
      </div>
      {filterCoins.map(coin => {
        return (
          <Coin key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        )
      })}
    </div>
  );
}

export default App;
