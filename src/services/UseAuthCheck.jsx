import { useEffect, useState } from "react";
import { getToken } from "./API";
import { use } from "react";

const UseAuthCheck = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getToken();
        
        if (res.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);
  return isAuth;
};
export default UseAuthCheck;
