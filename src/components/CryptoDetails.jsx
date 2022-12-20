import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  Grid,
  MenuItem,
  FormControl,
  MenuSelect,
  InputLabel,
  CryptoLineChart,
  Typography,
  AccountBalanceOutlinedIcon,
  MonetizationOnOutlinedIcon,
  ErrorOutlineOutlinedIcon,
  NotInterestedOutlinedIcon,
  TrendingUpOutlinedIcon,
  CheckOutlinedIcon,
  LeaderboardOutlinedIcon,
  BoltOutlinedIcon,
  Loader,
} from "../components";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import { useGetCurrencyQuery } from "../services/currencyApi";
import { getReqPrecision } from "../services/utils";

const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

const currencies = [
  {
    value: "AUD",
    label: "Australian dollar",
    symbol: "$",
  },
  {
    value: "CAD",
    label: "Canadian dollar",
    symbol: "$",
  },
  {
    value: "CHF",
    label: "Swiss franc",
    symbol: "Fr",
  },
  {
    value: "CNY",
    label: "Chinese yuan",
    symbol: "¥",
  },
  {
    value: "EUR",
    label: "Euro",
    symbol: "€",
  },
  {
    value: "GBP",
    label: "British pound",
    symbol: "£",
  },
  {
    value: "HKD",
    label: "Hong Kong dollar",
    symbol: "$",
  },
  {
    value: "INR",
    label: "Indian rupee",
    symbol: "₹",
  },
  {
    value: "JPY",
    label: "Japanese yen",
    symbol: "¥",
  },
  {
    value: "KRW",
    label: "South Korean won",
    symbol: "₩",
  },
  {
    value: "MXN",
    label: "Mexican peso",
    symbol: "$",
  },
  {
    value: "NOK",
    label: "Norwegian krone",
    symbol: "kr",
  },
  {
    value: "NZD",
    label: "New Zealand dollar",
    symbol: "$",
  },
  {
    value: "SEK",
    label: "Swedish krona",
    symbol: "kr",
  },
  {
    value: "SGD",
    label: "Singapore dollar",
    symbol: "$",
  },
  {
    value: "USD",
    label: "United States dollar",
    symbol: "$",
  },
];

/**
 *
 * @returns {React.Component}
 */

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const [currency, setCurrency] = useState("USD");
  const { data, isFetching: isCoinDataFetching } =
    useGetCryptoDetailsQuery(coinId);

  const { data: coinHistory, isFetching: isHistoryFetching } =
    useGetCryptoHistoryQuery({
      coinId,
      timePeriod,
    });

  const { data: currencyData, isFetching: isCurrencyDataFetching } =
    useGetCurrencyQuery(currency);

  const cryptoDetails = data?.data?.coin;

  const getSymbol = (currency) =>
    currencies.find((elem) => elem.value === currency).symbol;

  if (isCoinDataFetching || isHistoryFetching || isCurrencyDataFetching)
    return <Loader />;
  // console.log(cryptoDetails["24hVolume"]);
  const stats = [
    {
      title: `Price to ${currency}`,
      value: `${getSymbol(currency)} ${
        cryptoDetails.price &&
        millify(cryptoDetails.price * currencyData[currency.toLowerCase()], {
          precision: getReqPrecision(cryptoDetails.price),
        })
      }`,
      icon: <MonetizationOnOutlinedIcon />,
    },
    {
      title: "Rank",
      value: cryptoDetails.rank,
      icon: <LeaderboardOutlinedIcon />,
    },
    {
      title: "24h Volume",
      value: `${getSymbol(currency)} ${
        cryptoDetails["24hVolume"] &&
        millify(
          parseInt(cryptoDetails["24hVolume"]) * currencyData[currency.toLowerCase()]
        )
      }`,
      icon: <BoltOutlinedIcon />,
    },
    {
      title: "Market Cap",
      value: `${getSymbol(currency)} ${
        cryptoDetails.marketCap &&
        millify(cryptoDetails.marketCap * currencyData[currency.toLowerCase()])
      }`,
      icon: <MonetizationOnOutlinedIcon />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `${getSymbol(currency)} ${millify(
        cryptoDetails.allTimeHigh.price * currencyData[currency.toLowerCase()]
      )}`,
      icon: <TrendingUpOutlinedIcon />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <TrendingUpOutlinedIcon />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <AccountBalanceOutlinedIcon />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlinedIcon />
      ) : (
        <NotInterestedOutlinedIcon />
      ),
      icon: <ErrorOutlineOutlinedIcon />,
    },
  ];

  return (
    <React.Fragment>
      <Grid item className="coin-detail-container">
        <Grid item className="coin-heading-container">
          <Typography variant="h3" className="coin-name">
            {cryptoDetails.name} ({cryptoDetails.symbol}) Price
          </Typography>
          <p>
            {cryptoDetails.name} live price in {currency}. View value
            statistics, market cap and supply.
          </p>
        </Grid>
        <FormControl style={{ width: "150px" }} className="select-timeperiod">
          <InputLabel>Time Period</InputLabel>
          <MenuSelect
            value={timePeriod}
            label="Time Period"
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            {time.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </MenuSelect>
        </FormControl>
        <FormControl style={{ width: "150px" }} className="select-timeperiod">
          <InputLabel>Currency</InputLabel>
          <MenuSelect
            value={currency}
            label="Currency"
            onChange={(e) => setCurrency(e.target.value)}
          >
            {currencies.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}({item.value})
              </MenuItem>
            ))}
          </MenuSelect>
        </FormControl>
        <CryptoLineChart
          symbol={getSymbol(currency)}
          currency={currency}
          currencyData={currencyData}
          coinHistory={coinHistory}
          coinName={cryptoDetails.name}
          currentPrice={millify(
            cryptoDetails.price * currencyData[currency.toLowerCase()],
            {
              precision: getReqPrecision(
                cryptoDetails.price * currencyData[currency.toLowerCase()]
              ),
            }
          )}
        />
        <Grid container className="stats-container">
          <Grid xs={12} sm={5} item className="coin-value-statistics">
            <Grid item className="coin-value-statistics-heading">
              <Typography variant="h5" className="coin-details-heading">
                {cryptoDetails.name} Value Statistics
              </Typography>
              <p>
                An overview showing the statistics of {cryptoDetails.name}, such
                as the base and quote currency, the rank, and trading volume.
              </p>
            </Grid>
            {stats.map(({ icon, title, value }) => (
              <Grid item className="coin-stats" key={title}>
                <Grid item className="coin-stats-name">
                  <Typography variant="h6">{icon}</Typography>
                  <Typography variant="h6">{title}</Typography>
                </Grid>
                <Typography variant="h6" className="stats">
                  {value}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Grid xs={12} sm={5} item className="other-stats-info">
            <Grid item className="coin-value-statistics-heading">
              <Typography variant="h5" className="coin-details-heading">
                Other Statistics
              </Typography>
              <p>An overview showing the statistics of all Cryptocurrencies</p>
            </Grid>
            {genericStats.map(({ icon, title, value }) => (
              <Grid item className="coin-stats" key={title}>
                <Grid item className="coin-stats-name">
                  <Typography variant="h6">{icon}</Typography>
                  <Typography variant="h6">{title}</Typography>
                </Grid>
                <Typography variant="h6" className="stats">
                  {value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item className="coin-desc-link">
          <Grid container className="coin-desc">
            <Typography variant="h5" className="coin-details-heading">
              What is {cryptoDetails.name}?
            </Typography>
            {HTMLReactParser(cryptoDetails.description)}
          </Grid>
          <Grid item className="coin-links">
            <Typography variant="h5" className="coin-details-heading">
              {cryptoDetails.name} Links
            </Typography>
            {cryptoDetails.links?.map((link) => (
              <Grid container className="coin-link" spacing={2} key={link.name}>
                <Typography className="link-name" variant="h6">
                  {link.type}
                </Typography>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CryptoDetails;
