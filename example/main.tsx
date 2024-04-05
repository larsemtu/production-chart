import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import data from "./prod-data.json";
import { ProductionChart } from "../src";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductionChart data={data} cumulative={true} />
    <ProductionChart data={data} cumulative={false} />
  </React.StrictMode>
);
