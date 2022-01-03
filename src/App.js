import React, { useEffect } from "react";
import Layout from "./public/pages/layout";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

export default function App() {
  useEffect(() => {
    M.AutoInit();
  }, []);
  return <Layout />;
}
