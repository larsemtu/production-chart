import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Supercharts } from "./index.tsx";

import data from "./assets/prod-data.json";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Supercharts data={data} cumulative={true} />

    <Supercharts data={data} cumulative={false} />
  </React.StrictMode>
);
