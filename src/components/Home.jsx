import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptoCoinsQuery } from "../services/cryptoApi";
import { Typography, Grid, Cryptocurrencies,News, Loader } from "../components";
import { Statistic } from "antd";

const Home = () => {
  const { data, isFetching } = useGetCryptoCoinsQuery(20);
  // const data?.dat = data?.data?.stats;
  if (!isFetching) console.log(data);
  if (isFetching) return <Loader/>;
  return (
    <React.Fragment>
      <Typography className="heading" variant="h2">
        Global Crypto Stats
      </Typography>
      <Grid container spacing={2} className="home-stats">
        <Grid item xs={6}>
          <Statistic title="Total Cryptocurrencies" value={data?.data?.stats?.total} />
        </Grid>
        <Grid item xs={6}>
          <Statistic
            title="Total Exchanges"
            value={millify(data?.data?.stats?.totalExchanges)}
          />
        </Grid>
        <Grid item xs={6}>
          <Statistic
            title="Total Market Cap"
            value={millify(data?.data?.stats?.totalMarketCap)}
          />
        </Grid>
        <Grid item xs={6}>
          <Statistic
            title="Total 24h Volume"
            value={millify(data?.data?.stats?.total24hVolume)}
          />
        </Grid>
        <Grid item xs={6}>
          <Statistic
            title="Total Markets"
            value={millify(data?.data?.stats?.totalMarkets)}
          />
        </Grid>
      </Grid>
      <div className="home-heading-container">
        <Typography className="home-title" variant="h4">
          Top 10 Cryptocurrencies
        </Typography>
        <Typography className="show-more" variant="h5">
          <Link to="/cryptocurrencies">Show More</Link>
          
        </Typography>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Typography className="home-title" variant="h5">
          Latest Crypto News
        </Typography>
        <Typography className="show-more" variant="h5">
          <Link to="/news">Show More</Link>
        </Typography>
      </div>
      <News simplified />
    </React.Fragment>
  );
};

export default Home;
