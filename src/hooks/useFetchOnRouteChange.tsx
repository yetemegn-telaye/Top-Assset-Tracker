import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useFetchOnRouteChange = (fetchFunction: () => void) => {
  const location = useLocation();

  useEffect(() => {
    fetchFunction();
  }, [location.pathname, fetchFunction]);
};

export default useFetchOnRouteChange;
