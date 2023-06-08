import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="*"
          element={
            <div style={{ width: "100vw", height: "100vh" }}>
              Page not found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
