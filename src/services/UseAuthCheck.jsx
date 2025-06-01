import { useEffect, useState } from "react";
import axios from "axios";

const UseAuthCheck = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  return { isAuth, loading };
};
export default UseAuthCheck;
