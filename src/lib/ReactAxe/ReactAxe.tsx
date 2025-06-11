"use client";

import React, { useEffect } from "react";

const AxeReporter = () => {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" &&
      typeof window !== "undefined"
    ) {
      import("react-dom").then((ReactDOM) => {
        import("@axe-core/react").then((axe) => {
          axe.default(React, ReactDOM, 1000); // Configure axe-core as needed
        });
      });
    }
  }, []);

  return null;
};

export default AxeReporter;
