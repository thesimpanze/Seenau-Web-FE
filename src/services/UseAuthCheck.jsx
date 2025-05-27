import { useEffect, useState } from "react";
import { getToken } from "./API";
import { use } from "react";

const UseAuthCheck = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getToken();

        setIsAuth(true);
        setData(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  return { isAuth };
};
export default UseAuthCheck;
