import React, { useState } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import {
  Grid,
  Typography,
  Loader,
  Autocomplete,
  TextField,
} from "../components";
import { Card, Avatar } from "antd";
import moment from "moment";
import { useGetCryptoCoinsQuery } from "../services/cryptoApi";

import demoImage from "../assets/defaultnewscover.jpeg"

const News = ({ simplified }) => {
  const count = simplified ? 6 : 21;
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });
  const { data: coinData, isFetching: isFetchingCoinData } =
    useGetCryptoCoinsQuery(100);

  if (!cryptoNews?.value || isFetching || isFetchingCoinData) return <Loader />;
  const coins = coinData?.data?.coins.map((coin) => coin.name);
  coins.unshift("Cryptocurrency");
  
  return (
    <React.Fragment>
      <Grid
        container
        columnSpacing={4}
        rowSpacing={4}
        className="news-container"
      >
        {!simplified && (
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              options={coins?.map((coin) => coin)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
              onChange={(event, value) => setNewsCategory(value)}
            />
          </Grid>
        )}
        {cryptoNews.value.map((news, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Card hoverable>
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Typography className="news-title" level={5}>
                    {news.name}
                  </Typography>
                  <img
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                  />
                </div>
                <p style={{ color: "black" }}>
                  {news.description > 100
                    ? news.description.substring(0, 100) + "..."
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                    />
                    <p className="provider-name">{news.provider[0]?.name}</p>
                  </div>
                  <p>{moment(news.datePublished).startOf("ss").fromNow()}</p>
                </div>
              </a>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default News;
