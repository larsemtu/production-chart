import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import data from "./assets/prod-data.json";
import { ProductionChart } from ".";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductionChart data={data} cumulative={true} />
    productionchart rename lag npm pakke
    <ProductionChart data={data} cumulative={false} />
  </React.StrictMode>
);
