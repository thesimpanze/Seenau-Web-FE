import { useEffect, useState } from "react";
import axios from "axios";

const UseAuthCheck = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.post("https://seenau-api.onrender.com/api/v1/auth/refresh-token", { withCredentials: true });
        // const res = await axios.post("http://localhost:3000/api/v1/auth/refresh-token", {}, { withCredentials: true });

        const user = res.data?.user;
        if (user) {
          setIsAuth(true);
          setData(user);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          throw new Error("User data not found");
        }
        setLoading(true);
        console.log(res)
      } catch (err) {
        setIsAuth(false);
        setLoading(false)
        console.log(err)
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  return { isAuth, loading };
};
export default UseAuthCheck;
