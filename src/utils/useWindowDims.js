import { useEffect, useState } from "react";

export function useWindowDims() {
  // Initialize state with undefined width/height so server and client renders match

  const [windowDims, setWindowDims] = useState({
    width: undefined,
    height: undefined,
  });

  const handleResize = () => {
    setWindowDims((prev) => ({
      ...prev,
      width: window.innerWidth,
      height: window.innerHeight,
    }));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowDims;
}
