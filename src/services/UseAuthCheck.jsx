import { useEffect, useState } from "react";
import { getToken } from "./API";

const UseAuthCheck = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.post("https://seenau-api.onrender.com/api/v1/auth/refresh-token", {}, { withCredentials: true });

        const user = res.data?.user;
        if (user) {
          setIsAuth(true);
          setData(user);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          throw new Error("User data not found");
        }
      } catch (err) {
        setIsAuth(false);
        setLoading(false);
      } finally {
      }
    };
    checkAuth();
  }, []);
  return { isAuth, loading };
};
export default UseAuthCheck;
