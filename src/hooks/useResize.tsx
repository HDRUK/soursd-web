"use client";

import { useEffect, useState } from "react";

export const useResize = () => {
  const [dimensions, setDimensions] = useState([0, 0]);

  useEffect(() => {
    const handleResize = (): void => {
      setDimensions([window?.innerWidth, window?.innerHeight]);
    };

    window?.addEventListener("resize", handleResize);

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  return dimensions;
};
