import React from "react";
import ReactDOM from "react-dom";
import App from "./src/App";
import "antd/dist/antd.css";
import store from "./src/app/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");

if(rootElement.hasChildNodes()) {
    ReactDOM.hydrate(
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>,
        rootElement
    );
} else {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>,
        rootElement
    );
}

// ReactDOM.render(
//   <Router>
//     <Provider store={store}>
//     <App />
//     </Provider>
//   </Router>,
//   document.getElementById("root")
// );
