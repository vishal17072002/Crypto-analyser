import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import { Link, useLocation } from "react-router-dom";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArticleIcon from "@mui/icons-material/Article";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";

const MobileNavigation = () => {
  const pathName = ["/", "/cryptocurrencies", "/news", "/prediction"];
  const location = useLocation();

  return (
    <>
      <Paper
        sx={{ position: "fixed", bottom: 1, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          style={{ marginTop: "10px" }}
          showLabels
          value={pathName.indexOf(location.pathname)}
        >
          <BottomNavigationAction
            component={Link}
            to="/"
            label="Home"
            href="/"
            icon={<HomeIcon />}
          />

          <BottomNavigationAction
            component={Link}
            label="Cryptocurrenies"
            to="/cryptocurrencies"
            icon={<MonetizationOnIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/news"
            label="News"
            icon={<ArticleIcon />}
          />
          <BottomNavigationAction
            component={Link}
            label="Prediction"
            to="/prediction"
            icon={<StackedLineChartIcon />}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default MobileNavigation;
