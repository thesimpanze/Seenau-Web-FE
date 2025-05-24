import { useEffect, useState } from "react";
import { createPattern, getPatterns } from "../services/API";
import PrimaryButton from "../components/PrimaryButton";

const Testing = () => {
  const [patterns, setPatterns] = useState([]);
  const handleSubmit = (e) =>{
    e.preventDefault();
    name = 'testing dari FE'
    focus_time = 25
    break_time = 5
    period = 4
    description = 'testing dari FE'
    category = 'testing'
  }
  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        let res = await getPatterns();
        setPatterns(res.data.data);
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
      }
    };
    fetchPatterns();
  }, []);
  console.log(patterns);
  return (
    <>
      <div className="">
        <form action="">

        <PrimaryButton>Testing</PrimaryButton>
        </form>
      </div>
    </>
  );
};
export default Testing;
