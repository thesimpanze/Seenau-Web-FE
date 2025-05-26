import { useEffect, useState } from "react";
import { createPattern, getAllPatterns, getToken } from "../services/API";
import PrimaryButton from "../components/PrimaryButton";

const Testing = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getToken();
        if (res.status === 200) {
          setIsAuth(true);
          console.log('testing');
        } else {
          setIsAuth(false);
          console.log('testing failed');
        }
      } catch (err) {
        console.log(err);
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);
  return isAuth;
};
export default Testing;
