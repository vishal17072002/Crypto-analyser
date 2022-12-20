import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  FormControl,
  InputLabel,
  MenuSelect,
  MenuItem,
} from "../components";
import Paper from "@mui/material/Paper";

import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useGetCryptoCoinsQuery } from "../services/cryptoApi";
import { getReqPrecision } from "../services/utils";
import { Card } from "antd";
import millify from "millify";
import Loader from "./Loader";

/**
 *
 * @param {object} props
 * @returns {React.Component}
 */

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptoCoinsQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("relevance");

  useEffect(() => {
    setCryptos(cryptoList?.data?.coins.slice(0, 10));
    const filteredCryptos = cryptoList?.data?.coins
      .slice(0, simplified ? 10 : 100)
      .filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => b[sort] - a[sort]);

    setCryptos(filteredCryptos);
  }, [cryptoList, search, sort]);

  const filters = ["relevance", "price", "marketCap", "volume", "change"];

  if (isFetching) return <Loader />;
  console.log(cryptoList);
  return (
    <React.Fragment>
      {!simplified ? (
        <Grid container>
          <Grid item md={6}>
            <FormControl
              style={{ width: "150px" }}
              className="select-timeperiod"
            >
              <InputLabel>Sort</InputLabel>
              <MenuSelect
                value={sort}
                label="Sort"
                onChange={(e) => setSort(e.target.value)}
              >
                {filters.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </MenuSelect>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <div className="search-crypto">
              <Paper
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <InputBase
                  sx={{ flex: 1 }}
                  placeholder="Search Cryptocurrencies"
                  inputProps={{ "aria-label": "search cryptocurrencies" }}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <IconButton sx={{ p: "10px" }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </div>
          </Grid>
        </Grid>
      ) : (
        ""
      )}

      <Grid
        container
        columnSpacing={4}
        rowSpacing={4}
        className="crypto-card-container"
      >
        {cryptos?.map((crypto) => (
          <Grid
            item
            key={crypto.uuid}
            xs={12}
            sm={6}
            lg={3}
            className="crypto-card"
          >
            <Link to={`/crypto/${crypto.uuid}`}>
              <Card
                title={`${crypto.rank}. ${crypto.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={crypto.iconUrl}
                    alt="crypto news"
                  />
                }
                hoverable
              >
                <p>
                  Price: $
                  {millify(crypto.price, {
                    precision: getReqPrecision(crypto.price),
                  })}
                </p>
                <p>Market Cap: {millify(crypto.marketCap)}</p>
                <p>Daily Change: {millify(crypto.change)}%</p>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default Cryptocurrencies;
