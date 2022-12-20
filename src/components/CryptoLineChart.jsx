import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const CryptoLineChart = ({
  coinHistory,
  coinName,
  currentPrice,
  currency,
  currencyData,
  symbol,
}) => {
  const coinPrice = [];
  const coinTimestamp = [];
  const coinHistoryData = coinHistory?.data?.history?.filter(
    (x) => x.price !== 0
  );

  for (let i = 0; i < coinHistoryData?.length; i += 1) {
    coinPrice.push(
      coinHistoryData[i]?.price * currencyData[currency.toLowerCase()]
    );
  }

  for (let i = 0; i < coinHistoryData?.length; i += 1) {
    const date = new Date(coinHistoryData[i].timestamp)
      .toISOString()
      .split("T");
    coinTimestamp.push(`${date[0]} ${date[1].slice(0, 8)}`);
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: `Price In ${currency}`,
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title
            type={coinHistory?.data?.change < 0 ? "danger" : "success"}
            level={5}
            className="price-change"
          >
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: {symbol} {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line style={{ minHeight: "500px" }} data={data} options={options} />
    </>
  );
};

export default CryptoLineChart;
