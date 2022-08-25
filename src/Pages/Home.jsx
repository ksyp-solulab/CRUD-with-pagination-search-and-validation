import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Input from "../components/SearchInput";
import SingleUser from "../components/SingleUser";
import InputForm from "../components/InputForm";


const Home = () => {
  const data = useSelector((state) => state.user.users);
  const singleData = useSelector((state) => state.user.singleUser);
  const dispatch = useDispatch();

  const [mainData, setMainData] = useState(data);
  const [showModel, setShowModel] = useState(false);

  
  
  useEffect(() => {
    setMainData(data)
  },[data])



  return (
    <>
      <h2>CRUD WITH Redux-Saga</h2>
      <Input setMainData={setMainData} data={data}/>
      <InputForm dispatch={dispatch} singleData={singleData} setShowModel={setShowModel} data={data} mainData={mainData}/>
      <SingleUser singleData={singleData} setShowModel={setShowModel} showModel={showModel} dispatch={dispatch}/>
    </>
  );
};

export default Home;
